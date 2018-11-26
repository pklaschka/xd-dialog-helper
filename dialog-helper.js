const dialogs = {};

class dialogHelper {
    /**
     * A callback that gets triggered before the dialog gets shown, but after all contents got generated. You can – e.g., – manually adjust things here.
     * @callback onBeforeShowCallback
     * @param {HTMLDialogElement} dialogElement The dialog element that gets shown
     * @param {Object<HTMLElement>} elements The dialog's elements in a key-value based manner (the key corresponds to the name of an input).
     */

    /**
     * Options regarding the dialogs properties
     * @typedef {Object} dialogOptions
     * @property {string} [okButtonText="Ok"] The text in the "ok" button (e.g., "ok", "insert" or similar)
     * @property {string} [cancelButtonText="Cancel"] The text in the "cancel" button (e.g., "cancel", "abort" or similar)
     * @property {string} [css] CSS code that gets injected into the style
     * @property {onBeforeShowCallback} [onBeforeShow] A function that gets triggered before the dialog gets shown. You can – e.g. – inject custom code here.
     */

    /**
     * A content element of the dialog
     * @typedef {Object} contentElement
     * @property {HEADER | TEXT_INPUT | DESCRIPTION | SELECT | TEXT_AREA | HR | NUMBER_INPUT | CHECKBOX} type The type of the element
     * @property {string} id The unique identifier of the element (will get used in the results object of the modal)
     * @property {Array<{value:string, label:string}>} [options] The options that can get chosen by the user (**only** relevant for type`dialogHelper.SELECT`)
     * @property {string} [label=id] The label of the element (i.e., e.g., explanatory text or the text itself for headlines and descriptions)
     * @property {Object} [htmlAttributes={}] Additional HTML attributes for the input field (e.g., `style`, `min` and `max` for numeric input etc.)
     */

    /**
     * Shows a dialog and awaits its results
     * @param {string} id The dialogs name / unique identifier
     * @param {string} title The title that gets displayed in the dialog
     * @param {Array<contentElement>} contents The contents of the dialog
     * @param {dialogOptions} options
     * @return {Promise<object>}
     */
    static async showDialog(id, title, contents, options) {
        let dialog;
        if (!dialogs[id]) {
            // Generate the dialog
            dialog = document.createElement('dialog');
            dialog.id = id;
            dialogs[id] = dialog;
        } else {
            dialog = dialogs[id];
            dialog.innerHTML = ''; // Empty the dialog
        }

        // fill the dialog with contents
        const form = document.createElement('form');

        const elements = dialogHelper.parseElements(contents);

        for (let key in elements) {
            if (elements.hasOwnProperty(key))
                form.appendChild(elements[key].wrapper);
        }

        const footer = document.createElement('footer');

        footer.innerHTML = `
        <button id="dialogHelperBtnOk" uxp-variant="primary">${options.cancelButtonText || 'Cancel'}</button>
        <button id="dialogHelperBtnCancel" type="submit" uxp-variant="cta">${options.okButtonText || 'Ok'}</button>`;

        form.appendChild(footer);
        dialog.appendChild(form);
        document.body.appendChild(dialog);

        function onsubmit() {
            let returnValue = {};
            for (let key in elements) {
                if (elements.hasOwnProperty(key)) {
                    const element = elements[key];

                    if (element.input) {
                        if (element.input.value !== undefined) {
                            returnValue[key] = element.input.value;
                        } else if (element.input.checked !== undefined) {
                            returnValue[key] = element.input.checked;
                        }
                    }
                }
            }

            dialog.close(returnValue);
        }

        form.onsubmit = onsubmit;

        const cancelButton = document.querySelector("#dialogHelperBtnCancel");
        cancelButton.addEventListener("click", () => dialog.close(`Dialog '${id}' got canceled by the user`));

        const okButton = document.querySelector("#dialogHelperBtnOk");
        okButton.addEventListener("click", e => {
            onsubmit();
            e.preventDefault();
        });

        if (options.onBeforeShow)
            options.onBeforeShow(dialog, elements.map(value => value.input ? value.input : value.wrapper));

        return await dialog.showModal();
    }

    /**
     * Create an object with the content elements in a key-value form (inside an object)
     * @private
     * @param {Array<contentElement>} contents
     * @return {Object<{wrapper:HTMLElement, input: HTMLElement}>} An object containing the elements in key-value form (with the key being the id)
     */
    static parseElements(contents) {
        let elementsObject = {};
        for (let element of contents) {
            switch (element.type) {
                case this.HEADER:
                    elementsObject[element.id] = this.parseHeader(element);
                    break;
                case this.TEXT_INPUT:
                    elementsObject[element.id] = this.parseInput(element, 'text');
                    break;
                case this.NUMBER_INPUT:
                    elementsObject[element.id] = this.parseInput(element, 'number');
                    break;
                case this.TEXT_AREA:
                    elementsObject[element.id] = this.parseTextarea(element);
                    break;
                case this.SELECT:
                    elementsObject[element.id] = this.parseSelect(element);
                    break;
                case this.CHECKBOX:
                    elementsObject[element.id] = this.parseCheckbox(element);
                    break;
                case this.HR:
                    elementsObject[element.id] = this.parseHR(element);
                    break;
                default:
                    elementsObject[element.id] = this.parseDescription(element);

            }
        }
        return elementsObject;
    }

    /**
     * @private
     * @param {contentElement} contentElement
     * @return {{wrapper: HTMLElement}}
     */
    static parseHeader(contentElement) {
        const heading = document.createElement('h2');
        heading.innerHTML = contentElement.label;
        if (contentElement.htmlAttributes) {
            for (let name in contentElement.htmlAttributes) {
                heading.setAttribute(name, contentElement.htmlAttributes[name]);
            }
        }
        heading.id = contentElement.id;

        return {wrapper: heading};
    }
    /**
     * @private
     * @param {contentElement} contentElement
     * @return {{wrapper: HTMLElement}}
     */
    static parseDescription(contentElement) {
        const paragraph = document.createElement('p');
        paragraph.innerHTML = contentElement.label;
        if (contentElement.htmlAttributes) {
            for (let name in contentElement.htmlAttributes) {
                paragraph.setAttribute(name, contentElement.htmlAttributes[name]);
            }
        }
        paragraph.id = contentElement.id;

        return {wrapper: paragraph};
    }
    /**
     * @private
     * @param {contentElement} contentElement
     * @return {{wrapper: HTMLElement}}
     */
    static parseHR(contentElement) {
        const rule = document.createElement('hr');
        if (contentElement.htmlAttributes) {
            for (let name in contentElement.htmlAttributes) {
                rule.setAttribute(name, contentElement.htmlAttributes[name]);
            }
        }
        rule.id = contentElement.id;

        return {wrapper: rule};
    }
    /**
     * @private
     * @param {contentElement} contentElement
     * @param {'text'|'number'} type
     * @return {{wrapper: HTMLElement, input: HTMLElement}}
     */
    static parseInput(contentElement, type) {

        let lblText = document.createElement("label");
        lblText.id = contentElement.id + '-wrapper';
        const txtInput = document.createElement('input');
        txtInput.type = type;
        txtInput.id = contentElement.id;
        txtInput.placeholder = contentElement.label;
        const spanLblCheck = document.createElement('span');
        spanLblCheck.id = contentElement.id + '-span';
        spanLblCheck.innerHTML = contentElement.label + '<br>';
        lblText.appendChild(spanLblCheck);
        lblText.appendChild(txtInput);

        if (contentElement.htmlAttributes) {
            for (let name in contentElement.htmlAttributes) {
                txtInput.setAttribute(name, contentElement.htmlAttributes[name]);
            }
        }

        return {wrapper: lblText, input: textInput};
    }
    /**
     * @private
     * @param {contentElement} contentElement
     * @return {{wrapper: HTMLElement, input: HTMLElement}}
     */
    static parseTextarea(contentElement) {
        let lblText = document.createElement("label");
        lblText.id = contentElement.id + '-wrapper';
        const txtInput = document.createElement('textarea');
        txtInput.id = contentElement.id;
        txtInput.placeholder = contentElement.label;
        const spanLblCheck = document.createElement('span');
        spanLblCheck.id = contentElement.id + '-span';
        spanLblCheck.innerHTML = contentElement.label + '<br>';
        lblText.appendChild(spanLblCheck);
        lblText.appendChild(txtInput);


        if (contentElement.htmlAttributes) {
            for (let name in contentElement.htmlAttributes) {
                txtInput.setAttribute(name, contentElement.htmlAttributes[name]);
            }
        }

        return {wrapper: lblText, input: textArea};
    }
    /**
     * @private
     * @param {contentElement} contentElement
     * @return {{wrapper: HTMLElement, input: HTMLElement}}
     */
    static parseCheckbox(contentElement) {
        const lblCheck = document.createElement("label");
        lblCheck.id = contentElement.id + '-wrapper';
        Object.assign(lblCheck.style, {flexDirection: "row", alignItems: "center"});

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.id = contentElement.id;
        checkBox.placeholder = contentElement.label;

        lblCheck.appendChild(checkBox);
        const spanLblCheck = document.createElement('span');
        spanLblCheck.id = contentElement.id + '-label';
        spanLblCheck.innerHTML = label;
        lblCheck.appendChild(spanLblCheck);


        if (contentElement.htmlAttributes) {
            for (let name in contentElement.htmlAttributes) {
                checkBox.setAttribute(name, contentElement.htmlAttributes[name]);
            }
        }

        return {wrapper: lblCheck, input: checkBox};
    }
    /**
     * @private
     * @param {contentElement} contentElement
     * @return {{wrapper: HTMLElement, input: HTMLElement}}
     */
    static parseSelect(contentElement) {
        const lblSelect = document.createElement("label");
        lblSelect.id = contentElement.id + "-wrapper";
        const spanLblSelect = document.createElement('span');
        spanLblSelect.id = contentElement.id + "-label";
        spanLblSelect.innerHTML = contentElement.label;
        lblSelect.appendChild(spanLblSelect);
        const select = document.createElement('select');
        select.id = contentElement.id;

        if (contentElement.htmlAttributes) {
            for (let name in contentElement.htmlAttributes) {
                select.setAttribute(name, contentElement.htmlAttributes[name]);
            }
        }

        for (let entry of contentElement.options) {
            let optEntry = document.createElement("option");
            optEntry.value = entry.value;
            optEntry.innerHTML = entry.label;
            select.appendChild(optEntry);
        }
        if (defaultValue) {
            select.value = defaultValue;
        }
        lblSelect.appendChild(select);

        return {wrapper: lblSelect, input: select};
    }




    /**
     * A headline
     */
    static get HEADER() {
        return 0;
    }

    /**
     * A simple text (primarily used for descriptions)
     */
    static get DESCRIPTION() {
        return 1;
    }

    /**
     * A simple text input
     */
    static get TEXT_INPUT() {
        return 2;
    }

    /**
     * A text area
     */
    static get TEXT_AREA() {
        return 3;
    }

    /**
     * A dropdown select field
     */
    static get SELECT() {
        return 4;
    }

    /**
     * A radio button selector
     */
    static get RADIO() {
        return 5;
    }

    /**
     * An input for numeric values
     */
    static get NUMBER_INPUT() {
        return 6;
    }

    /**
     * A horizontal ruler (`<hr>`)
     */
    static get HR() {
        return 7;
    }

    /**
     * A checkbox
     */
    static get CHECKBOX() {
        return 8;
    }
}

module.exports = dialogHelper;