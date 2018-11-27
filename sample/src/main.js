const DialogHelper = require('xd-dialog-helper');

function showModal() {
    DialogHelper.showDialog('test', 'Test Plugin', [
        {
            type: DialogHelper.HR,
            id: 'hr',
        },
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
        },
        {
            type: DialogHelper.HEADER,
            id: 'headline',
            label: 'Some more stuff'
        },
        {
            type: DialogHelper.SLIDER,
            id: 'slider',
            label: 'A slider for something',
            htmlAttributes: {
                'min': 1,
                'max': 3,
                value: 2
            }
        },
        {
            type: DialogHelper.TEXT_AREA,
            id: 'textArea',
            label: 'Message'
        },
        {
            type: DialogHelper.CHECKBOX,
            id: 'cb',
            label: 'I accept the terms and conditions'
        },
    ], {
        okButtonText: 'Insert',
    }).then(results => console.log(JSON.stringify(results)), reason => console.log('Dialog got canceled ' + reason));

}

module.exports.commands = {
    showModal: showModal
};