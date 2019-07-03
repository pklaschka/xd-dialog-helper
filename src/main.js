const types = require('./types/types');
const isValid = require('./validation-function');

/**
 * Shows a dialog and awaits its results
 * @param {string} id The dialogs name / unique identifier
 * @param {string} title The title that gets displayed in the dialog
 * @param {Array<ContentElementDeclaration>} [contents=[]] The contents of the dialog
 * @param {dialogOptions} [options={}] Additional options for the dialog
 * @return {Promise<*>} Promise, which resolves with the form values or rejects if the dialog gets canceled
 */
async function showDialog(id, title, contents = [], options = {}) {
    const dialog = document.createElement('dialog');
    dialog.id = `${id}-dialog`;
    dialog.innerHTML = `
<style>
    dialog#${id} {
            width: ${options.width || 360}px;
    }
        
    ${options.css}
</style>
<form method="dialog">
<header><h1>${title}</h1><hr></header>
<main></main>
<footer>
<button id="${id}-dialogHelperBtnCancel" uxp-variant="primary">${options.cancelButtonText || 'Cancel'}</button>
<button id="${id}-dialogHelperBtnOk" type="submit" uxp-variant="cta">${options.okButtonText || 'Ok'}</button>
</footer>
</form>
    `;

    const main = dialog.querySelector('main');
    const form = dialog.querySelector('form');
    const btnOk = dialog.querySelector(`#${id}-dialogHelperBtnOk`);
    const btnCancel = dialog.querySelector(`#${id}-dialogHelperBtnCancel`);

    /**
     * @type {ContentElement[]}
     */
    let deepElements = [];
    /**
     * @type {ContentElement[]}
     */
    let elements = [];

    /**
     * @type {ActionList}
     */
    const actionList = {
        close: () => {
            if (!btnOk.disabled)
                dialog.close(JSON.stringify(actionList.values()));
        },
        cancel: () => {
            dialog.close('reasonCanceled');
        },
        values: () => {
            let returnValues = {};
            for (let element of elements) {
                returnValues[element.props.id] = element.type.value(element);
            }
            return returnValues;
        },
        change: () => {
            btnOk.disabled = !isValid(elements, actionList.values(), options.onValidate);
        },
        /**
         * @param {ContentElement} element The element that gets registered
         * @returns {void}
         */
        registerContentElement: (element) => {
            deepElements.push(element);
        }
    };

    btnOk.addEventListener('click', (e) => {
        e.preventDefault();
        actionList.close();
    });
    form.onsubmit = actionList.close;
    btnCancel.addEventListener('click', actionList.cancel);

    /**
     * @type {ContentElement[]}
     */
    const mainElements = contents.map(
        /**
         * @param {ContentElementDeclaration} content content element declaration
         * @return {ContentElement} The content element for the declared element
         */
        content => {
            let value = content.type.render(id, content, actionList);
            value['props'] = content; // Make sure to include props in the ContentElement
            value['type'] = content.type; // Make sure to include the type in the ContentElement
            return value;
        });

    for (let element of mainElements) {
        main.appendChild(element.wrapper);
    }

    elements.push(...mainElements);
    elements.push(...deepElements);

    // Actually show the dialog ...
    document.body.innerHTML = '';
    document.body.appendChild(dialog);

    if (options.onBeforeShow)
        await options.onBeforeShow(dialog, elements, actionList);

    actionList.change(); // Validate initial dialog state

    const results = await dialog.showModal();
    // ... and handle results:
    if (results === 'reasonCanceled') {
        throw new Error(results); // User canceled the dialog
    } else {
        return JSON.parse(results); // User submitted dialog
    }
}

module.exports = {
    types,
    showDialog,
    ...types // Deprecated, for backwards-compatibility. TODO: Remove for the version v1.1
};
