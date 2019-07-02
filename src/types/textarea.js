/**
 * A textarea input element
 * @type ContentElementType
 */
const TEXTAREA = {
    render: (props, actions) => {
        let wrapper = document.createElement('label');
        wrapper.id = props.id + '-wrapper';
        const input = document.createElement('textarea');
        input.id = props.id;
        input.placeholder = props.label;
        const textareaLabel = document.createElement('span');
        textareaLabel.id = props.id + '-label';
        textareaLabel.innerHTML = props.label + '<br>';
        wrapper.appendChild(textareaLabel);
        wrapper.appendChild(input);

        if (props.htmlAttributes) {
            for (let name in props.htmlAttributes) {
                if (props.htmlAttributes.hasOwnProperty(name))
                    input.setAttribute(name, props.htmlAttributes[name]);
            }
        }

        if (props.value !== undefined)
            input.value = props.value;

        input.addEventListener('input', () => { actions.change(); });

        return {
            wrapper,
            input,
            type: TEXTAREA,
            props
        };
    },
    valid: (element) => {
        if (element.props.required) {
            const value = this.value(element);
            return value.length > 0;
        } else {
            return true;
        }
    },
    value: (element) => element.input.value,
    type: 'Textarea'
};

module.exports = TEXTAREA;
