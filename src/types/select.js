/**
 * A simple, single-line text input element
 * @type ContentElementType
 */
const SELECT = {
    render: (props, actions) => {
        const wrapper = document.createElement('label');
        wrapper.id = props.id + '-wrapper';
        const selectLabel = document.createElement('span');
        selectLabel.id = props.id + '-label';
        selectLabel.innerHTML = props.label;
        wrapper.appendChild(selectLabel);
        const input = document.createElement('select');
        input.id = props.id;

        for (let entry of props.options) {
            let optEntry = document.createElement('option');
            optEntry.value = entry.value;
            optEntry.innerHTML = entry.label;
            input.appendChild(optEntry);
        }
        wrapper.appendChild(input);

        if (props.htmlAttributes) {
            for (let name in props.htmlAttributes) {
                input.setAttribute(name, props.htmlAttributes[name]);
            }
            // To select value in select:
            if (props.htmlAttributes['value'])
                input.value = props.htmlAttributes.value;
        }

        if (props.value !== undefined)
            input.value = props.value;

        input.addEventListener('change',
            () => {
                actions.change();
            });

        return {
            wrapper,
            input,
            type: SELECT,
            props
        };
    },
    valid: () => {
        return true;
    },
    value: (element) => element.input.value,
    type: 'Select'
};

module.exports = SELECT;
