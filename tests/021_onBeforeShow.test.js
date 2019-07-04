const dialogHelper = require('../src/main');

let resolver, rejector;

HTMLElement.prototype.showModal = () => {
    return new Promise((resolve, reject) => {
        resolver = resolve;
        rejector = reject;
    });
};
HTMLElement.prototype.close = (value) => {
    if (value !== 'reasonCanceled')
        resolver(value);
    else
        rejector(value);
};

describe('options.onBeforeShow', () => {
    it('should get called', () => {
        const beforeFn = jest.fn(() => true);
        dialogHelper.showDialog('dialog', 'My dialog', [], {
            onBeforeShow: beforeFn
        });

        expect(beforeFn).toBeCalled();
    });

    it('should get passed the correct parameters', () => {
        const beforeFn = jest.fn(() => true);

        const props = {
            id: 'cb',
            type: dialogHelper.types.CHECKBOX,
            value: false,
            required: true,
            label: 'Checkbox'
        };

        dialogHelper.showDialog('dialog', 'My dialog', [
            props
        ], {
            onBeforeShow: beforeFn
        });

        expect(beforeFn).toBeCalled();

        const args = beforeFn.mock.calls[0];

        expect(args[1][0].props).toBe(props);
        expect(document.body.children).toContain(args[0]);
        expect(args[1][0].input.id).toBe('dialog-cb');

        expect(beforeFn).toMatchSnapshot();
    });
});
