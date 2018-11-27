let dialogs = {};

class DialogHelper {
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
     * @property {HEADER | TEXT_INPUT | SLIDER | DESCRIPTION | SELECT | TEXT_AREA | HR | CHECKBOX} type The type of the element
     * @property {string} id The unique identifier of the element (will get used in the results object of the modal)
     * @property {Array<{value:string, label:string}>} [options] The options that can get chosen by the user (**only** relevant for type`DialogHelper.SELECT`)
     * @property {string} [label=id] The label of the element (i.e., e.g., explanatory text or the text itself for headlines and descriptions)
     * @property {string} [unit=''] The unit of the numeric value (only relevant for type `DialogHelper.SLIDER`)
     * @property {Object} [htmlAttributes={}] Additional HTML attributes for the input field (e.g., `style`, `min` and `max` for numeric input etc.)
     */

    /**
     * Shows a dialog and awaits its results
     * @param {string} id The dialogs name / unique identifier
     * @param {string} title The title that gets displayed in the dialog
     * @param {Array<contentElement>} contents The contents of the dialog
     * @param {dialogOptions} options Additional options for the dialog
     * @return {Promise<object>} Promise, which resolves with the form values or rejects if the dialog gets canceled
     */
    static showDialog(id, title, contents, options) {
        return new Promise(async (resolve, reject) => {
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

            const titleElement = document.createElement('h1');
            titleElement.innerHTML = title;
            form.appendChild(titleElement);

            const elements = DialogHelper.parseElements(contents);

            for (let key in elements) {
                if (elements.hasOwnProperty(key))
                    form.appendChild(elements[key].wrapper);
            }

            const footer = document.createElement('footer');

            footer.innerHTML = `
        <button id="dialogHelperBtnCancel" uxp-variant="primary">${options.cancelButtonText || 'Cancel'}</button>
        <button id="dialogHelperBtnOk" type="submit" uxp-variant="cta">${options.okButtonText || 'Ok'}</button>`;

            form.appendChild(footer);
            dialog.appendChild(form);
            document.body.appendChild(dialog);

            function onsubmit() {
                let returnValue = {};
                for (let key in elements) {
                    if (elements.hasOwnProperty(key)) {
                        const element = elements[key];

                        if (element.input) {
                            if (element.input.type === 'checkbox') {
                                returnValue[key] = element.input.checked;
                            } else {
                                returnValue[key] = element.input.value || '';
                            }
                        }
                    }
                }

                dialog.close(returnValue);
            }

            form.onsubmit = onsubmit;

            const cancelButton = document.querySelector("#dialogHelperBtnCancel");
            cancelButton.addEventListener("click", () => dialog.close('cancel'));

            const okButton = document.querySelector("#dialogHelperBtnOk");
            okButton.addEventListener("click", e => {
                onsubmit();
                e.preventDefault();
            });

            if (options.onBeforeShow)
                options.onBeforeShow(dialog, elements.map(value => value.input ? value.input : value.wrapper));

            const result = await dialog.showModal();
            if (result !== 'cancel') {
                resolve(result);
            } else {
                reject(`Dialog '${id}' got canceled by the user`);
            }
        });
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
                /*case this.NUMBER_INPUT:
                    elementsObject[element.id] = this.parseInput(element, 'number');
                    break;*/
                case this.TEXT_AREA:
                    elementsObject[element.id] = this.parseTextarea(element);
                    break;
                case this.SELECT:
                    elementsObject[element.id] = this.parseSelect(element);
                    break;
                case this.SLIDER:
                    elementsObject[element.id] = this.parseSlider(element);
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
        const header = document.createElement('h2');
        header.innerHTML = contentElement.label;
        if (contentElement.htmlAttributes) {
            for (let name in contentElement.htmlAttributes) {
                header.setAttribute(name, contentElement.htmlAttributes[name]);
            }
        }
        header.id = contentElement.id;

        return {wrapper: header};
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

        let inputWrapper = document.createElement("label");
        inputWrapper.id = contentElement.id + '-wrapper';
        const input = document.createElement('input');
        input.type = type;
        input.id = contentElement.id;
        input.placeholder = contentElement.label;
        const inputLabel = document.createElement('span');
        inputLabel.id = contentElement.id + '-label';
        inputLabel.innerHTML = contentElement.label + '<br>';
        inputWrapper.appendChild(inputLabel);
        inputWrapper.appendChild(input);

        if (contentElement.htmlAttributes) {
            for (let name in contentElement.htmlAttributes) {
                input.setAttribute(name, contentElement.htmlAttributes[name]);
            }
        }

        return {wrapper: inputWrapper, input: input};
    }

    /**
     * @private
     * @param {contentElement} contentElement
     * @return {{wrapper: HTMLElement, input: HTMLElement}}
     */
    static parseSlider(contentElement) {
        const labelWrapper = document.createElement("label");
        labelWrapper.id = contentElement.id + '-wrapper';

        const label = document.createElement("span");
        label.textContent = contentElement.label;
        label.id = contentElement.id + '-label';

        const displayValue = document.createElement("span");
        displayValue.id = contentElement.id + '-value-label';
        displayValue.textContent =
            (contentElement.htmlAttributes && contentElement.htmlAttributes.value !== undefined)
                ? contentElement.htmlAttributes.value : '50'
            + (contentElement.unit || '');

        const labelAndDisplay = document.createElement("div");
        labelAndDisplay.className = "row";
        labelAndDisplay.style.justifyContent = "space-between";
        labelAndDisplay.appendChild(label);
        labelAndDisplay.appendChild(displayValue);

        const slider = document.createElement("input");
        slider.id = contentElement.id;
        slider.setAttribute("type", "range");
        slider.setAttribute("min", "0");
        slider.setAttribute("max", "100");
        slider.setAttribute("value", "50");

        slider.addEventListener('change',
            () => displayValue.textContent = Math.round(slider.value) + (contentElement.unit || ''));

        labelWrapper.appendChild(labelAndDisplay);
        labelWrapper.appendChild(slider);

        if (contentElement.htmlAttributes) {
            for (let name in contentElement.htmlAttributes) {
                slider.setAttribute(name, contentElement.htmlAttributes[name]);
            }
        }

        return {wrapper: labelWrapper, input: slider}
    }

    /**
     * @private
     * @param {contentElement} contentElement
     * @return {{wrapper: HTMLElement, input: HTMLElement}}
     */
    static parseTextarea(contentElement) {
        let textareaWrapper = document.createElement("label");
        textareaWrapper.id = contentElement.id + '-wrapper';
        const textarea = document.createElement('textarea');
        textarea.id = contentElement.id;
        textarea.placeholder = contentElement.label;
        const textareaLabel = document.createElement('span');
        textareaLabel.id = contentElement.id + '-label';
        textareaLabel.innerHTML = contentElement.label + '<br>';
        textareaWrapper.appendChild(textareaLabel);
        textareaWrapper.appendChild(textarea);


        if (contentElement.htmlAttributes) {
            for (let name in contentElement.htmlAttributes) {
                textarea.setAttribute(name, contentElement.htmlAttributes[name]);
            }
        }

        return {wrapper: textareaWrapper, input: textarea};
    }

    /**
     * @private
     * @param {contentElement} contentElement
     * @return {{wrapper: HTMLElement, input: HTMLElement}}
     */
    static parseCheckbox(contentElement) {
        const checkboxWrapper = document.createElement("label");
        checkboxWrapper.id = contentElement.id + '-wrapper';
        Object.assign(checkboxWrapper.style, {flexDirection: "row", alignItems: "center"});

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = contentElement.id;
        checkbox.placeholder = contentElement.label;

        checkboxWrapper.appendChild(checkbox);
        const checkboxLabel = document.createElement('span');
        checkboxLabel.id = contentElement.id + '-label';
        checkboxLabel.innerHTML = contentElement.label;
        checkboxWrapper.appendChild(checkboxLabel);


        if (contentElement.htmlAttributes) {
            for (let name in contentElement.htmlAttributes) {
                checkbox.setAttribute(name, contentElement.htmlAttributes[name]);
            }
        }

        return {wrapper: checkboxWrapper, input: checkbox};
    }

    /**
     * @private
     * @param {contentElement} contentElement
     * @return {{wrapper: HTMLElement, input: HTMLElement}}
     */
    static parseSelect(contentElement) {
        const selectWrapper = document.createElement("label");
        selectWrapper.id = contentElement.id + "-wrapper";
        const selectLabel = document.createElement('span');
        selectLabel.id = contentElement.id + "-label";
        selectLabel.innerHTML = contentElement.label;
        selectWrapper.appendChild(selectLabel);
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
        selectWrapper.appendChild(select);

        return {wrapper: selectWrapper, input: select};
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
     * A slider
     */
    static get SLIDER() {
        return 5;
    }

    /**
     * An input for numeric values
     */

    /*static get NUMBER_INPUT() {
        return 6;
    }*/

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

module.exports = DialogHelper;