const text = require('../dialog-helper').types.TEXT;
const actions = {
    change: jest.fn(() => undefined),
    values: jest.fn(() => {}),
    close: jest.fn(() => {}),
    cancel: jest.fn(() => {}),
    registerElement: jest.fn(() => undefined)
};

describe('Text Element', () => {
    describe('render()', () => {
        it('should render correctly', () => {
            const rendered = text.render('dialog', {
                id: 'hr',
                label: 'Hello World'
            }, actions);
            expect(rendered.props).toEqual({
                id: 'hr',
                label: 'Hello World'
            });
            expect(rendered.wrapper.outerHTML).toBe('<p id="dialog-hr">Hello World</p>');
        });
    });
    describe('value()', () => {
        it('should correctly return undefined as value', () => {
            expect(text.value({wrapper: document.createElement('p')})).toBeUndefined();
        });
    });
    describe('validate()', () => {
        it('should always return true', () => {
            expect(text.valid({})).toBeTruthy();
        });
    });
    describe('name', () => {
        expect(text.type).toBe('Text');
    });
});
