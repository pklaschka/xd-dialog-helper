/**
 * A header element
 * @type {ContentElementType}
 */
const HEADER = {
    render: (dialogId, props) => {
        const header = document.createElement('h2');
        header.innerHTML = props.label;
        if (props.htmlAttributes) {
            for (let name in props.htmlAttributes) {
                header.setAttribute(name, props.htmlAttributes[name]);
            }
        }
        header.id = `${dialogId}-${props.id}`;

        return {
            wrapper: header,
            type: HEADER,
            input: undefined,
            props
        };
    },
    valid: () => {
        return true;
    },
    value: () => undefined,
    type: 'Header'
};

module.exports = HEADER;
