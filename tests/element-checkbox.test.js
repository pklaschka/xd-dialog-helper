const checkbox = require('../dialog-helper').types.CHECKBOX;
const actions = {
    change: jest.fn(() => undefined),
    values: jest.fn(() => {}),
    close: jest.fn(() => {}),
    cancel: jest.fn(() => {}),
    registerElement: jest.fn(() => undefined)
};

const rendered = checkbox.render('dialog', {
    id: 'hr',
    label: 'Hello World'
}, actions);

describe('Checkbox Element', () => {
    describe('render()', () => {
        it('should render correctly', () => {
            expect(rendered).toMatchSnapshot();
        });
    });
    describe('value()', () => {
        it('should correctly return false as default value', () => {
            expect(checkbox.value(rendered)).toBe(false);
        });

        it('should correctly return true after the checkbox was checked', () => {
            rendered.input.click();
            expect(checkbox.value(rendered)).toBe(true);
        });
    });
    describe('validate()', () => {
        it('should always return true if there\'s no required prop', () => {
            expect(checkbox.valid(rendered)).toBeTruthy();
        });

        it('should return false for checked checkboxes if required == true', () => {
            let emptyField = checkbox.render('dialog',  {
                id: 'helloworld',
                label: 'My world',
                value: false,
                required: true
            }, actions);
            expect(checkbox.valid(emptyField)).toBeFalsy();
        });

        it('should return true for checked checkboxes if required == true', () => {
            let emptyField = checkbox.render('dialog',  {
                id: 'helloworld',
                label: 'My world',
                value: true,
                required: true
            }, actions);
            expect(checkbox.valid(emptyField)).toBeTruthy();
        });
    });
    describe('name', () => {
        expect(checkbox.type).toMatchSnapshot();
    });
});
