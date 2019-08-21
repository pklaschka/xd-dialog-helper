/**
 * A textarea input element
 * @type ContentElementType
 */
const TEXTAREA = {
    render: (dialogId, props, actions) => {
        let wrapper = document.createElement('label');
        wrapper.id = `${dialogId}-${props.id}` + '-wrapper';
        const input = document.createElement('textarea');
        input.id = `${dialogId}-${props.id}`;
        input.placeholder = props.label;
        const textareaLabel = document.createElement('span');
        textareaLabel.id = `${dialogId}-${props.id}` + '-label';
        textareaLabel.innerHTML = props.label + '<br>';
        wrapper.appendChild(textareaLabel);
        wrapper.appendChild(input);

        if (props.htmlAttributes) {
            for (let name in props.htmlAttributes) {
                input.setAttribute(name, props.htmlAttributes[name]);
            }
        }

        if (props.value !== undefined)
            input.value = props.value;

        input.addEventListener('input', () => {
            actions.change();
        });

        return {
            wrapper,
            input,
            type: TEXTAREA,
            props
        };
    },
    valid: (element) => {
        if (element.props.required) {
            const value = TEXTAREA.value(element);
            return value.length > 0;
        } else {
            return true;
        }
    },
    value: (element) => element.input.value,
    type: 'Textarea'
};

module.exports = TEXTAREA;
