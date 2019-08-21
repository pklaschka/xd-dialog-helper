/**
 * A simple, single-line text input element
 * @type {ContentElementType}
 */
const TEXT = {
    render: (dialogId, props) => {
        const paragraph = document.createElement('p');
        paragraph.innerHTML = props.label;
        if (props.htmlAttributes) {
            for (let name in props.htmlAttributes) {
                paragraph.setAttribute(name, props.htmlAttributes[name]);
            }
        }
        paragraph.id = `${dialogId}-${props.id}`;

        return {
            wrapper: paragraph,
            type: TEXT,
            props,
            input: undefined
        };
    },
    valid: () => {
        return true;
    },
    value: () => undefined,
    type: 'Text'
};

module.exports = TEXT;
