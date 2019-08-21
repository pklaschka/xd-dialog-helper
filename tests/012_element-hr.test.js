const hr = require('../src/main').types.HR;
const actions = {
    change: jest.fn(() => undefined),
    values: jest.fn(() => {
    }),
    close: jest.fn(() => {
    }),
    cancel: jest.fn(() => {
    }),
    registerElement: jest.fn(() => undefined)
};

const rendered = hr.render('dialog', {
    id: 'hr',
    htmlAttributes: {
        someAttr: 'hello'
    }
}, actions);

describe('HR Element', () => {
    describe('render()', () => {
        it('should render correctly', () => {
            expect(rendered).toMatchSnapshot();

            expect(hr.render('dialog', {id: 'noHTML'}, actions)).toMatchSnapshot();
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
        expect(hr.type).toMatchSnapshot();
    });
});
