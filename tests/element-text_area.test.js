const textArea = require('../dialog-helper').types.TEXT_AREA;
const actions = {
    change: jest.fn(() => undefined),
    values: jest.fn(() => {}),
    close: jest.fn(() => {}),
    cancel: jest.fn(() => {}),
    registerElement: jest.fn(() => undefined)
};

const rendered = textArea.render('dialog', {
    id: 'hr',
    label: 'Hello World',
    value: 'abc'
}, actions);

describe('Text Area Element', () => {
    describe('render()', () => {
        it('should render correctly', () => {
            expect(rendered).toMatchSnapshot();
        });
    });
    describe('value()', () => {
        it('should correctly return the value', () => {
            expect(textArea.value(rendered)).toBe('abc');
        });
    });
    describe('validate()', () => {
        it('should always return true if there\'s no required prop', () => {
            expect(textArea.valid(rendered)).toBeTruthy();
        });

        it('should return false for empty fields if required == true', () => {
            let emptyField = textArea.render('dialog',  {
                id: 'helloworld',
                label: 'My world',
                value: '',
                required: true
            }, actions);
            expect(textArea.valid(emptyField)).toBeFalsy();
        });

        it('should return true for non-empty fields if required == true', () => {
            let emptyField = textArea.render('dialog',  {
                id: 'helloworld',
                label: 'My world',
                value: 'a',
                required: true
            }, actions);
            expect(textArea.valid(emptyField)).toBeTruthy();
        });
    });
    describe('name', () => {
        expect(textArea.type).toMatchSnapshot();
    });
});
