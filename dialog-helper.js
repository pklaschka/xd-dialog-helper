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
     * @property {HEADER | RADIO | TEXT_INPUT | DESCRIPTION | SELECT | TEXT_AREA | HR | NUMBER_INPUT} type The type of the element
     * @property {string} id The unique identifier of the element (will get used in the results object of the modal)
     * @property {Array<{value:string, label:string}>} [options] The options that can get chosen by the user (**only** relevant for types `dialogHelper.RADIO` and `dialogHelper.SELECT`)
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
                form.appendChild(elements[key]);
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

                    if (element.value !== undefined) {
                        returnValue[key] = element.value;
                    } else if (element.checked !== undefined) {
                        returnValue[key] = element.checked;
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
            options.onBeforeShow(dialog, elements);

        return await dialog.showModal();
    }

    /**
     * Create an object with the content elements in a key-value form (inside an object)
     * @private
     * @param {Array<contentElement>} contents
     * @return {Object<HTMLElement>} An object containing the elements in key-value form (with the key being the id)
     */
    static parseElements(contents) {
        return [];
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
}

module.exports = dialogHelper;