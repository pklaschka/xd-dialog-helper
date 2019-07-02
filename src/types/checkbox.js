/**
 * A simple, single-line text input element
 * @type ContentElementType
 */
const CHECKBOX = {
    render: (props, actions) => {
        const wrapper = document.createElement('label');
        wrapper.id = props.id + '-wrapper';
        Object.assign(wrapper.style, {flexDirection: 'row', alignItems: 'center'});

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = props.id;
        input.placeholder = props.label;

        wrapper.appendChild(input);
        const checkboxLabel = document.createElement('span');
        checkboxLabel.id = props.id + '-label';
        checkboxLabel.innerHTML = props.label;
        wrapper.appendChild(checkboxLabel);


        if (props.htmlAttributes) {
            for (let name in props.htmlAttributes) {
                if (props.htmlAttributes.hasOwnProperty(name))
                    input.setAttribute(name, props.htmlAttributes[name]);
            }
        }

        if (props.value !== undefined) {
            input.value = props.value;
            input.checked = props.value === true;
        }

        input.addEventListener('change', () => {
            actions.change();
        });

        return {
            wrapper,
            input,
            type: CHECKBOX,
            props
        };
    },
    valid: (element) => {
        if (element.props.required) {
            return this.value(element);
        } else {
            return true;
        }
    },
    value: (element) => element.input.checked,
    type: 'Input'
};

module.exports = CHECKBOX;
