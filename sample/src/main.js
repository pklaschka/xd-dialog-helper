const DialogHelper = require('xd-dialog-helper');

async function showModal() {
    let results = await DialogHelper.showDialog('test', 'Test Plugin', [
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
    });

    console.log(JSON.stringify(results));
}

module.exports.commands = {
    showModal: showModal
};