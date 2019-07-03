const header = require('../dialog-helper').types.HEADER;
const actions = {
    change: jest.fn(() => undefined),
    values: jest.fn(() => {}),
    close: jest.fn(() => {}),
    cancel: jest.fn(() => {}),
    registerElement: jest.fn(() => undefined)
};

describe('Header Element', () => {
    describe('render()', () => {
        it('should render correctly', () => {
            const rendered = header.render('dialog', {
                id: 'hr',
                label: 'Hello World'
            }, actions);
            expect(rendered.props).toEqual({
                id: 'hr',
                label: 'Hello World'
            });
            expect(rendered.wrapper.outerHTML).toBe('<h2 id="dialog-hr">Hello World</h2>');
        });
    });
    describe('value()', () => {
        it('should correctly return undefined as value', () => {
            expect(header.value({wrapper: document.createElement('h2')})).toBeUndefined();
        });
    });
    describe('validate()', () => {
        it('should always return true', () => {
            expect(header.valid({})).toBeTruthy();
        });
    });
    describe('name', () => {
        expect(header.type).toBe('Header');
    });
});
