/**
 * Check if current inputs are valid
 * @param {ContentElement[]} elements All elements of the dialog
 * @param {*} values The values of the input fields of the dialog
 * @param {onValidationCallback} onValidate The validation callback
 * @returns {boolean} inputs are valid?
 */
function isValid(elements, values, onValidate) {
    if (onValidate && !onValidate(values))
        return false;
    else {
        for (let element of elements) {
            if (!element.type.valid(element))
                return false;
        }
    }
    return true;
}

module.exports = isValid;
