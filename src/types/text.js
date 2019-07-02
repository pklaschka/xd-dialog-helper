/**
 * A simple, single-line text input element
 * @type {ContentElementType}
 */
const TEXT = {
    render: (props) => {
        const paragraph = document.createElement('p');
        paragraph.innerHTML = props.label;
        if (props.htmlAttributes) {
            for (let name in props.htmlAttributes) {
                if (props.htmlAttributes.hasOwnProperty(name))
                    paragraph.setAttribute(name, props.htmlAttributes[name]);
            }
        }
        paragraph.id = props.id;

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
