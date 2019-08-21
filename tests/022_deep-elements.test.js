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

describe('"Deep" elements, registerElement()', () => {
    /**
     * @type {ContentElementType}
     */
    const deepType = {
        valid: () => true,
        type: 'Deep type',
        value: () => undefined,
        render: (dialogId, props, actions) => {
            let wrapper = document.createElement('div');

            for (let child of props.children) {
                /**
                 * @type {ContentElement}
                 */
                let renderedChild = child.type.render(dialogId, child, actions);
                wrapper.appendChild(renderedChild.wrapper);
                actions.registerContentElement(renderedChild);
            }

            return {
                wrapper,
                props,
                type: deepType
            };
        }
    };

    it('should correctly add children to values', done => {
        dialogHelper.showDialog('dialog', 'My dialog', [
            {
                id: 'deep-element',
                type: deepType,
                children: [
                    {
                        id: 'cb1',
                        type: dialogHelper.types.CHECKBOX,
                        value: false,
                        label: 'Checkbox'
                    },
                    {
                        id: 'cb2',
                        type: dialogHelper.types.CHECKBOX,
                        value: true,
                        label: 'Checkbox'
                    },
                ]
            }
        ]).then(value => {
            expect(value).toEqual({cb1: false, cb2: true});
            done();
        });

        document.getElementById('dialog-dialogHelperBtnOk').click();
    });
});
