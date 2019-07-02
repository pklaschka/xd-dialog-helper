/**
 * A simple, single-line text input element
 * @type ContentElementType
 */
const TEXT_INPUT = {
    render: (dialogId, props, actions) => {
        let wrapper = document.createElement('label');
        wrapper.id = `${dialogId}-${props.id}` + '-wrapper';
        const input = document.createElement('input');
        input.id = `${dialogId}-${props.id}`;
        input.placeholder = props.label;
        const inputLabel = document.createElement('span');
        inputLabel.id = `${dialogId}-${props.id}` + '-label';
        inputLabel.innerHTML = props.label + '<br>';
        wrapper.appendChild(inputLabel);
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
            type: TEXT_INPUT,
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
    type: 'Input'
};

module.exports = TEXT_INPUT;
