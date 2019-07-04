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

describe('Dialog validation', () => {
    describe('simple dialog with a required checkbox', () => {
        let dialogPromise;

        beforeEach(() => {
            document.body.innerHTML = '';

            dialogPromise = dialogHelper.showDialog('dialog', 'My dialog', [
                {
                    id: 'cb',
                    type: dialogHelper.types.CHECKBOX,
                    value: false,
                    required: true,
                    label: 'Checkbox'
                }
            ]);
        });

        it('shouldn\'t validate and therefore deactivate the submit button with the checkbox unchecked', done => {
            expect(document.getElementById('dialog-dialogHelperBtnOk').disabled).toBeTruthy();
            done();
        });

        it('should validate and therefore activate the submit button after the checkbox gets checked', done => {
            document.getElementById('dialog-cb').click();
            expect(document.getElementById('dialog-dialogHelperBtnOk').disabled).toBeFalsy();

            dialogPromise.then(value => {
                expect(value).toEqual({cb: true});
                done();
            });

            document.getElementById('dialog-dialogHelperBtnOk').click();
        });
    });
    describe('simple dialog with a checkbox and an onValidate function requiring the checkbox to be checked', () => {
        let dialogPromise;

        beforeEach(() => {
            document.body.innerHTML = '';

            dialogPromise = dialogHelper.showDialog('dialog', 'My dialog', [
                {
                    id: 'cb',
                    type: dialogHelper.types.CHECKBOX,
                    value: false,
                    label: 'Checkbox'
                }
            ], {
                onValidate: (values) => values.cb
            });
        });

        it('shouldn\'t validate and therefore deactivate the submit button with the checkbox unchecked', done => {
            expect(document.getElementById('dialog-dialogHelperBtnOk').disabled).toBeTruthy();
            done();
        });

        it('should validate and therefore activate the submit button after the checkbox gets checked', done => {
            document.getElementById('dialog-cb').click();
            expect(document.getElementById('dialog-dialogHelperBtnOk').disabled).toBeFalsy();

            dialogPromise.then(value => {
                expect(value).toEqual({cb: true});
                done();
            });

            document.getElementById('dialog-dialogHelperBtnOk').click();
        });
    });

    describe('actions.close()', () => {
        it('shouldn\'t work when the dialog is invalid', (done) => {
            document.body.innerHTML = '';
            let closer;

            let dialogPromise = dialogHelper.showDialog('dialog', 'My dialog', [
                {
                    id: 'cb',
                    type: dialogHelper.types.CHECKBOX,
                    value: false,
                    required: true,
                    label: 'Checkbox'
                }
            ], {onBeforeShow: (htmlDialogElement, contentElements, actionList) => { closer = actionList.close; }});

            setTimeout(() => {
                closer();
                expect(dialogPromise.resolves).not.toBeTruthy();
                done();
            }, 100);
        });
    });
});
