const DialogHelper = require('xd-dialog-helper');

function showModal() {
    DialogHelper.showDialog('test', 'Test Plugin', [
        {
            type: DialogHelper.DESCRIPTION,
            id: 'moin',
            label: 'test'
        },
        {
            type: DialogHelper.SELECT,
            id: 'whichOption',
            label: 'Choose an option:',
            options: [
                {
                    label: 'Option 1',
                    value: 1
                },
                {
                    label: 'Option 2',
                    value: 2
                }
            ]
        },
        {
            type: DialogHelper.TEXT_INPUT,
            id: 'txtInput',
            label: 'Some text input:'
        }
    ], {
        okButtonText: 'Insert',
    }).then(results => console.log(JSON.stringify(results)), reason => console.log('Dialog got canceled ' + reason));

}

module.exports.commands = {
    showModal: showModal
};