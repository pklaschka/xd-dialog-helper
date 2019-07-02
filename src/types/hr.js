/**
 * A horizontal rule element
 * @type {ContentElementType}
 */
const HR = {
    render: (dialogId, props) => {
        const rule = document.createElement('hr');
        if (props.htmlAttributes) {
            for (let name in props.htmlAttributes) {
                if (props.htmlAttributes.hasOwnProperty(name))
                    rule.setAttribute(name, props.htmlAttributes[name]);
            }
        }
        rule.id = `${dialogId}-${props.id}`;

        return {
            wrapper: rule,
            type: HR,
            props,
            input: undefined
        };
    },
    valid: () => {
        return true;
    },
    value: () => undefined,
    type: 'Horizontal Rule'
};

module.exports = HR;
