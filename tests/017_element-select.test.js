const select = require('../src/main').types.SELECT;
const actions = {
    change: jest.fn(() => undefined),
    values: jest.fn(() => {}),
    close: jest.fn(() => {}),
    cancel: jest.fn(() => {}),
    registerElement: jest.fn(() => undefined)
};

const rendered = select.render('dialog', {
    id: 'select',
    label: 'Move right',
    value: 'a',
    options: [
        {
            value: 'a',
            label: 'A'
        },
        {
            value: 'b',
            label: 'B'
        }
    ],
    htmlAttributes: {
        someAttr: 'hello'
    }
}, actions);

global.console.error = jest.fn(() => {});

describe('Select Element', () => {
    describe('render()', () => {
        it('should render correctly', () => {
            expect(rendered).toMatchSnapshot();

            expect(select.render('dialog', {id: 'noHTML', options: []}, actions)).toMatchSnapshot();
        });

        it('should log an error to the console for missing configuration', () => {
            expect(select.render('dialog', {
                id: 'select',
                label: 'Hello'
            }, actions)).toBeNull();
            expect(global.console.error).toBeCalled();
        });
    });
    describe('value()', () => {
        it('should return the correct value', () => {
            expect(select.value(rendered)).toBe('a');

        });

        it('should correctly handle changing values', () => {
            rendered.input.value = 'b';
            rendered.input.dispatchEvent(new Event('change'));

            expect(actions.change).toBeCalled();
            expect(select.value(rendered)).toBe('b');
        });
    });
    describe('validate()', () => {
        it('should always return true', () => {
            expect(select.valid(rendered)).toBeTruthy();
        });
    });
    describe('name', () => {
        expect(select.type).toMatchSnapshot();
    });
});
