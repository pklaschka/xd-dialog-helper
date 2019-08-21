const textInput = require('../src/main').types.TEXT_INPUT;
const actions = {
    change: jest.fn(() => undefined),
    values: jest.fn(() => {}),
    close: jest.fn(() => {}),
    cancel: jest.fn(() => {}),
    registerElement: jest.fn(() => undefined)
};

let rendered;

describe('Text Input Element', () => {
    beforeEach(() => {
        rendered = textInput.render('dialog', {
            id: 'hr',
            label: 'Hello World',
            value: 'abc',
            htmlAttributes: {
                someAttr: 'hello'
            }
        }, actions);
    });

    describe('render()', () => {
        it('should render correctly', () => {
            expect(rendered).toMatchSnapshot();

            expect(textInput.render('dialog',{id: 'noHTML'}, actions)).toMatchSnapshot();
        });

        it('should correctly handle changing values', () => {
            rendered.input.value = '6';
            rendered.input.dispatchEvent(new Event('input'));

            expect(actions.change).toBeCalled();
            expect(textInput.value(rendered)).toBe('6');
        });
    });
    describe('value()', () => {
        it('should correctly return the value', () => {
            expect(textInput.value(rendered)).toBe('abc');
        });
    });
    describe('validate()', () => {
        it('should always return true if there\'s no required prop', () => {
            expect(textInput.valid(rendered)).toBeTruthy();
        });

        it('should return false for empty fields if required == true', () => {
            let emptyField = textInput.render('dialog',  {
                id: 'helloworld',
                label: 'My world',
                value: '',
                required: true
            }, actions);
            expect(textInput.valid(emptyField)).toBeFalsy();
        });

        it('should return true for non-empty fields if required == true', () => {
            let emptyField = textInput.render('dialog',  {
                id: 'helloworld',
                label: 'My world',
                value: 'a',
                required: true
            }, actions);
            expect(textInput.valid(emptyField)).toBeTruthy();
        });
    });
    describe('name', () => {
        expect(textInput.type).toMatchSnapshot();
    });
});
