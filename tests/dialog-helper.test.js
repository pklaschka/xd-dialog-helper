const DialogHelper = require('../dialog-helper');

let resolver, rejector;


describe('Dialog-Helper', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
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
                rejector(value)
        };
    });

    describe('simple dialog with one checkbox (\'#cb\')', () => {
        it('should resolve correctly', async done => {
            DialogHelper.showDialog('a', 'abc', [
                {type: DialogHelper.CHECKBOX, id: 'cb', label: 'Checkbox', value: true}
            ], {}).then(value => {
                expect(value).toEqual({cb: true});
                done();
            });
            document.getElementById('a-dialogHelperBtnOk').click();
        });

        it('should have the correct element and value', async done => {
            DialogHelper.showDialog('a', 'abc', [
                {type: DialogHelper.CHECKBOX, id: 'cb', label: 'Checkbox', value: true}
            ], {}).then(value => {
                expect(value).toEqual({cb: true});
                done();
            });
            expect(document.getElementById('a-cb').checked).toBeTruthy();
            document.getElementById('a-dialogHelperBtnOk').click();
        })

        it('should be able to process changed values', async done => {
            DialogHelper.showDialog('a', 'abc', [
                {type: DialogHelper.CHECKBOX, id: 'cb', label: 'Checkbox', value: true}
            ], {}).then(value => {
                expect(value).toEqual({cb: false});
                done();
            });
            expect(document.getElementById('a-cb').checked).toBeTruthy();
            document.getElementById('a-cb').click();
            expect(document.getElementById('a-cb').checked).toBeFalsy();
            document.getElementById('a-dialogHelperBtnOk').click();
        })
    });

    describe('simple dialog with one textfield (\'#txt\')', () => {
        it('should resolve correctly', async done => {
            DialogHelper.showDialog('b', 'abc', [
                {type: DialogHelper.TEXT_INPUT, id: 'txt', label: 'Text', value: 'Hello World'}
            ], {}).then(value => {
                expect(value).toEqual({txt: 'Hello World'});
                done();
            });
            document.getElementById('b-dialogHelperBtnOk').click();
        });

        it('should have the correct element and value', async done => {
            DialogHelper.showDialog('b', 'abc', [
                {type: DialogHelper.TEXT_INPUT, id: 'txt', label: 'Text', value: 'Hello World'}
            ], {}).then(value => {
                expect(value).toEqual({txt: 'Hello World'});
                done();
            });
            expect(document.getElementById('b-txt').value).toBe('Hello World');
            document.getElementById('b-dialogHelperBtnOk').click();
        })

        it('should be able to process changed values', async done => {
            DialogHelper.showDialog('b', 'abc', [
                {type: DialogHelper.TEXT_INPUT, id: 'txt', label: 'Text', value: 'Hello World'}
            ], {}).then(value => {
                expect(value).toEqual({txt: 'Hello World!'});
                done();
            });
            expect(document.getElementById('b-txt').value).toBe('Hello World');
            document.getElementById('b-txt').value += '!';
            expect(document.getElementById('b-txt').value).toBe('Hello World!');
            document.getElementById('b-dialogHelperBtnOk').click();
        })
    });

    describe('simple dialog with one select box (\'#select\')', () => {
        it('should resolve correctly', async done => {
            DialogHelper.showDialog('b', 'abc', [
                {
                    type: DialogHelper.SELECT,
                    id: 'select',
                    label: 'Text',
                    value: 'opt1',
                    options: [
                        {value: 'opt1', label: 'Option 1'},
                        {value: 'opt2', label: 'Option 2'},
                    ]
                }
            ], {}).then(value => {
                expect(value).toEqual({select: 'opt1'});
                done();
            });
            document.getElementById('b-dialogHelperBtnOk').click();
        });
        it('should initially select the correct element', async done => {
            DialogHelper.showDialog('b', 'abc', [
                {
                    type: DialogHelper.SELECT,
                    id: 'select',
                    label: 'Text',
                    value: 'opt1',
                    options: [
                        {value: 'opt1', label: 'Option 1'},
                        {value: 'opt2', label: 'Option 2'},
                    ]
                }
            ], {}).then(() => {
                done();
            });
            expect(document.getElementById('b-select').selectedIndex).toBe(0);
            expect(document.getElementById('b-select').value).toBe('opt1');
            document.getElementById('b-dialogHelperBtnOk').click();
        });
        it('should contain the correct amount of options', async done => {
            DialogHelper.showDialog('b', 'abc', [
                {
                    type: DialogHelper.SELECT,
                    id: 'select',
                    label: 'Text',
                    value: 'opt1',
                    options: [
                        {value: 'opt1', label: 'Option 1'},
                        {value: 'opt2', label: 'Option 2'},
                    ]
                }
            ], {}).then(() => {
                done();
            });
            expect(document.getElementById('b-select').children.length).toBe(2);
            document.getElementById('b-dialogHelperBtnOk').click();
        });
    });

    describe('multiple dialogs', function () {
        it('should correctly load the same dialog twice', async function (done) {
            DialogHelper.showDialog('b', 'abc', [
                {
                    type: DialogHelper.SELECT,
                    id: 'select',
                    label: 'Text',
                    value: 'opt1',
                    options: [
                        {value: 'opt1', label: 'Option 1'},
                        {value: 'opt2', label: 'Option 2'},
                    ]
                }
            ], {}).then(() => {
                DialogHelper.showDialog('b', 'abc', [
                    {
                        type: DialogHelper.SELECT,
                        id: 'select',
                        label: 'Text',
                        value: 'opt1',
                        options: [
                            {value: 'opt1', label: 'Option 1'},
                            {value: 'opt2', label: 'Option 2'},
                        ]
                    }
                ], {}).then(() => {
                    done();
                });

                expect(document.getElementById('b-select').children.length).toBe(2);
                document.getElementById('b-dialogHelperBtnOk').click();
            });
            expect(document.getElementById('b-select').children.length).toBe(2);
            document.getElementById('b-dialogHelperBtnOk').click();
        });

        it('should correctly load the same dialog with different contents twice', async function (done) {
            DialogHelper.showDialog('b', 'abc', [
                {
                    type: DialogHelper.SELECT,
                    id: 'select',
                    label: 'Text',
                    value: 'opt1',
                    options: [
                        {value: 'opt1', label: 'Option 1'},
                        {value: 'opt2', label: 'Option 2'},
                    ]
                }
            ], {}).then(() => {
                DialogHelper.showDialog('b', 'abc', [
                    {
                        type: DialogHelper.SELECT,
                        id: 'select',
                        label: 'Text',
                        value: 'opt1',
                        options: [
                            {value: 'opt1', label: 'Option 1'},
                            {value: 'opt2', label: 'Option 2'},
                            {value: 'opt3', label: 'Option 3'},
                        ]
                    }
                ], {}).then(() => {
                    done();
                });

                expect(document.getElementById('b-select').children.length).toBe(3);
                document.getElementById('b-dialogHelperBtnOk').click();
            });
            expect(document.getElementById('b-select').children.length).toBe(2);
            document.getElementById('b-dialogHelperBtnOk').click();
        });

        it('should correctly load two different dialogs after each other', async function (done) {
            DialogHelper.showDialog('b', 'abc', [
                {
                    type: DialogHelper.SELECT,
                    id: 'select',
                    label: 'Text',
                    value: 'opt1',
                    options: [
                        {value: 'opt1', label: 'Option 1'},
                        {value: 'opt2', label: 'Option 2'},
                    ]
                }
            ], {}).then(() => {
                DialogHelper.showDialog('c', 'abc', [
                    {
                        type: DialogHelper.SELECT,
                        id: 'select',
                        label: 'Text',
                        value: 'opt1',
                        options: [
                            {value: 'opt1', label: 'Option 1'},
                            {value: 'opt2', label: 'Option 2'},
                            {value: 'opt3', label: 'Option 3'},
                        ]
                    }
                ], {}).then(() => {
                    done();
                });

                expect(document.getElementById('c-select').children.length).toBe(3);
                document.getElementById('c-dialogHelperBtnOk').click();
            });
            expect(document.getElementById('b-select').children.length).toBe(2);
            document.getElementById('b-dialogHelperBtnOk').click();
        });
    });


    // Cancelling is currently not testable since JSDOM doesn't support form.onsubmit
});