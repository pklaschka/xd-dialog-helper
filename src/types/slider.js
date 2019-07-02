/**
 * A simple, single-line text input element
 * @type ContentElementType
 */
const SLIDER = {
    render: (props, actions) => {
        if (
            props.htmlAttributes === undefined ||
            (props.htmlAttributes.value === undefined && props.value === undefined) ||
            props.htmlAttributes.min === undefined ||
            props.htmlAttributes.max === undefined
        ) {
            // eslint-disable-next-line no-console
            console.error('A slider must have a min, max and value parameter specified in its `htmlAttributes` ' +
                '(value can also be specified outside the `htmlAttributes`).');
            return null;
        }

        const wrapper = document.createElement('label');
        wrapper.id = props.id + '-wrapper';

        const label = document.createElement('span');
        label.textContent = props.label;
        label.id = props.id + '-label';

        const displayValue = document.createElement('span');
        displayValue.id = props.id + '-value-label';
        displayValue.textContent = (props.htmlAttributes.value || props.value) + (props.unit || '');

        const labelAndDisplay = document.createElement('div');
        labelAndDisplay.className = 'row';
        labelAndDisplay.style.justifyContent = 'space-between';
        labelAndDisplay.appendChild(label);
        labelAndDisplay.appendChild(displayValue);

        const input = document.createElement('input');
        input.id = props.id;
        input.setAttribute('type', 'range');

        input.addEventListener('input',
            () => {
                actions.change();
                displayValue.textContent = Math.round(Number.parseFloat(input.value)) + (props.unit || '');
            });

        wrapper.appendChild(labelAndDisplay);
        wrapper.appendChild(input);

        if (props.htmlAttributes) {
            for (let name in props.htmlAttributes) {
                if (props.htmlAttributes.hasOwnProperty(name))
                    input.setAttribute(name, props.htmlAttributes[name]);
            }
        }

        if (props.value !== undefined)
            input.value = props.value;

        return {
            wrapper,
            input,
            type: SLIDER,
            props
        };
    },
    valid: () => {
        return true;
    },
    value: (element) => element.input.value,
    type: 'Slider'
};

module.exports = SLIDER;
