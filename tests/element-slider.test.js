const slider = require('../dialog-helper').types.SLIDER;
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
