const slider = require('../src/main').types.SLIDER;
const actions = {
    change: jest.fn(() => undefined),
    values: jest.fn(() => {}),
    close: jest.fn(() => {}),
    cancel: jest.fn(() => {}),
    registerElement: jest.fn(() => undefined)
};

const rendered = slider.render('dialog', {
    id: 'slider',
    label: 'Move right',
    value: 5,
    htmlAttributes: {
        max: 10,
        min: 1
    },
    unit: 'cm'
}, actions);

global.console.error = jest.fn(() => {});

describe('Slider Element', () => {
    describe('render()', () => {
        it('should render correctly', () => {
            expect(rendered).toMatchSnapshot();
        });

        it('should log an error to the console for missing configuration', () => {
            expect(slider.render('dialog', {
                id: 'slider',
                label: 'Hello'
            }, actions)).toBeNull();
            expect(global.console.error).toBeCalled();
        });
    });
    describe('value()', () => {
        it('should return the correct numeric value', () => {
            expect(slider.value(rendered)).toBe(5);

        });

        it('should correctly handle changing values with a unit', () => {
            rendered.input.value = '6';
            rendered.input.dispatchEvent(new Event('input'));

            expect(actions.change).toBeCalled();
            expect(rendered.wrapper.querySelector('#dialog-slider-value-label').innerHTML).toBe('6cm');
            expect(slider.value(rendered)).toBe(6);
        });

        it('should correctly handle changing values without a unit', () => {
            const rendered2 = slider.render('dialog', {
                id: 'slider',
                label: 'Move right',
                value: 5,
                htmlAttributes: {
                    max: 10,
                    min: 1
                }
            }, actions);

            rendered2.input.value = '6';
            rendered2.input.dispatchEvent(new Event('input'));

            expect(actions.change).toBeCalled();
            expect(rendered2.wrapper.querySelector('#dialog-slider-value-label').innerHTML).toBe('6');
            expect(slider.value(rendered2)).toBe(6);
        });
    });
    describe('validate()', () => {
        it('should always return true', () => {
            expect(slider.valid(rendered)).toBeTruthy();
        });
    });
    describe('name', () => {
        expect(slider.type).toMatchSnapshot();
    });
});
