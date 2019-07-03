const DialogHelper = require('xd-dialog-helper');

function showModal() {
    DialogHelper.showDialog('test', 'Test Plugin', [
        {
            type: DialogHelper.types.HR,
            id: 'hr'
        },
        {
            type: DialogHelper.types.TEXT,
            id: 'moin',
            label: 'test'
        },
        {
            type: DialogHelper.types.SELECT,
            id: 'whichOption',
            label: 'Choose an option:',
            options: [
                {
                    label: 'Option 1',
                    value: 'opt1'
                },
                {
                    label: 'Option 2',
                    value: 'opt2'
                }
            ],
            value: 'opt1'
        },
        {
            type: DialogHelper.types.TEXT_INPUT,
            id: 'txtInput',
            label: 'Some text input:',
            value: 'Initial Value'
        },
        {
            type: DialogHelper.types.HEADER,
            id: 'headline',
            label: 'Some more stuff'
        },
        {
            type: DialogHelper.types.SLIDER,
            id: 'slider',
            label: 'A slider for something',
            htmlAttributes: {
                min: 0,
                max: 200
            },
            unit: 'px',
            value: 10
        },
        {
            type: DialogHelper.types.TEXT_AREA,
            id: 'textArea',
            label: 'Message',
            value: 'Some text \n With new lines'
        },
        {
            type: DialogHelper.types.CHECKBOX,
            id: 'cb',
            label: 'I accept the terms and conditions',
            value: true
        },
    ], {
        okButtonText: 'Insert',
        width: 480
    }).then(results => console.log(JSON.stringify(results)), reason => console.log('Dialog got canceled ' + reason));

}

module.exports.commands = {
    showModal: showModal
};
