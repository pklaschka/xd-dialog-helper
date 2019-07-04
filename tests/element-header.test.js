const header = require('../src/main').types.HEADER;
const actions = {
    change: jest.fn(() => undefined),
    values: jest.fn(() => {}),
    close: jest.fn(() => {}),
    cancel: jest.fn(() => {}),
    registerElement: jest.fn(() => undefined)
};

const rendered = header.render('dialog', {
    id: 'header',
    label: 'Hello World',
    htmlAttributes: {
        someAttr: 'hello'
    }
}, actions);

describe('Header Element', () => {
    describe('render()', () => {
        it('should render correctly', () => {
            expect(rendered).toMatchSnapshot();
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
        expect(header.type).toMatchSnapshot();
    });
});
