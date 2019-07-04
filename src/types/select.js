/**
 * A simple, single-line text input element
 * @type ContentElementType
 */
const SELECT = {
    render: (dialogId, props, actions) => {
        if (
            props.options === undefined
        ) {
            // eslint-disable-next-line no-console
            console.error('A select box must have an `options` parameter passed in the props.');
            return null;
        }

        const wrapper = document.createElement('label');
        wrapper.id = `${dialogId}-${props.id}` + '-wrapper';
        const selectLabel = document.createElement('span');
        selectLabel.id = `${dialogId}-${props.id}` + '-label';
        selectLabel.innerHTML = props.label;
        wrapper.appendChild(selectLabel);
        const input = document.createElement('select');
        input.id = `${dialogId}-${props.id}`;

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
