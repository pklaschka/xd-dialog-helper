const hr = require('../dialog-helper').types.HR;
const actions = {
    change: jest.fn(() => undefined),
    values: jest.fn(() => {}),
    close: jest.fn(() => {}),
    cancel: jest.fn(() => {}),
    registerElement: jest.fn(() => undefined)
};

describe('HR Element', () => {
    describe('render()', () => {
        it('should render correctly', () => {
            const rendered = hr.render('dialog', {
                id: 'hr'
            }, actions);
            expect(rendered.props).toEqual({
                id: 'hr'
            });
            expect(rendered.wrapper.outerHTML).toBe('<hr id="dialog-hr">');
        });
    });
    describe('value()', () => {
        it('should correctly return undefined as value', () => {
            expect(hr.value({wrapper: document.createElement('hr')})).toBeUndefined();
        });
    });
    describe('validate()', () => {
        it('should always return true', () => {
            expect(hr.valid({})).toBeTruthy();
        });
    });
    describe('name', () => {
        expect(hr.type).toBe('Horizontal Rule');
    });
});
