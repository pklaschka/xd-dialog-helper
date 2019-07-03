declare module 'xd-dialog-helper' {
    /**
     * A list of actions that can get performed for the dialog
     */
    interface ActionList {
        /**
         * close submit dialog if valid
         */
        close(): void;

        /**
         * cancel cancel the dialog
         */
        cancel(): void;

        /**
         * change value of ContentElement has changed
         */
        change(): void;

        /**
         * get dialog values
         */
        values(): object;

        /**
         * register content ContentElement, e.g., child of a section ContentElement
         * @param element child element
         */
        registerContentElement(element: ContentElement): void;
    }

    /**
     * The parsed element, coming from the element types render function. Contains view and model information about the element.
     */
    interface ContentElement {
        /**
         * The wrapper (or outer-most) HTML element specific to the content element
         */
        readonly wrapper: HTMLElement;
        /**
         * The content element type of the element
         */
        readonly type: ContentElementType;
        /**
         * The properties with which the element got declared
         */
        readonly props: ContentElementDeclaration;
        /**
         * The input HTML element, if applicable
         */
        readonly input?: HTMLElement;
    }

    /**
     * A declaration for a content element which gets passed to the `showDialog()` function.
     */
    interface ContentElementDeclaration {
        /**
         * The unique id of the element. Will also get used for HTML element ids
         */
        id: string;
        /**
         * The type of the content element
         */
        type: ContentElementType;
        /**
         * The label of the element (may that be the text in case of a `types.TEXT` or the slider label in case of a `types.SLIDER`
         */
        label?: string;
        /**
         * Initial value, if applicable
         */
        value?: any;
        /**
         * HTML attributes in a key-value-pair object form that get applied to an element – dependent on the `type`. See documentation for the `type` for more information about how the attributes get applied for the specific type
         */
        htmlAttributes: object;
    }

    interface CheckboxType extends ContentElementType {
    }

    interface CheckboxDeclaration extends ContentElementDeclaration {
        type: CheckboxType;
        value?: boolean;
        required?: boolean;
    }

    interface TextInputType extends ContentElementType {
    }

    interface TextInputDeclaration extends ContentElementDeclaration {
        type: TextInputType;
        value?: string;
        required?: boolean;
    }

    interface TextAreaType extends ContentElementType {
    }

    interface TextAreaDeclaration extends ContentElementDeclaration {
        type: TextAreaType;
        value?: string;
        required?: boolean;
    }

    interface SelectType extends ContentElementType {
    }

    interface SelectDeclaration extends ContentElementDeclaration {
        type: SelectType;
        options: { value: string, label: string }[];
        value?: string;
    }

    interface SliderType extends ContentElementType {

    }

    interface SliderDeclaration extends ContentElementDeclaration {
        type: SliderType,
        value: number,
        htmlAttributes: {
            min: number,
            max: number,
            step?: number
        }
        unit?: string;
    }

    interface HeaderType extends ContentElementType {
    }

    interface HeaderDeclaration extends ContentElementDeclaration {
        type: HeaderType;
        value: undefined;
        required: undefined;
    }

    interface TextType extends ContentElementType {
    }

    interface TextDeclaration extends ContentElementDeclaration {
        type: TextType;
        value: undefined;
        required: undefined;
    }

    interface HRType extends ContentElementType {
    }

    interface HRDeclaration extends ContentElementDeclaration {
        type: HRType;
        value: undefined;
        required: undefined;
    }

    /**
     * A content element type. Defines how an element should behave, render etc.
     */
    interface ContentElementType {
        /**
         * Parses the content element declaration – passed as `props` and converts it into an actual content element (including its UI elements like `wrapper` etc.)
         * @param dialogId The dialogs id, should get used as a prefix for elements: `[dialog-id]-[element-id]-[...]`
         * @param props The element declaration which got passed to `showDialog(..., contents, ...)`
         * @param actions A list of actions which can get triggered (like close, cancel etc.). The most important one is `actions.change()`, which should get triggered whenever the element's value changes.
         * @returns The parsed content element, including UI elements like `wrapper`, the passed properties etc.
         */
        render(dialogId: string, props: ContentElementDeclaration, actions: ActionList): ContentElement;

        /**
         * Determines the current value of the content element
         * @param element The content element
         */
        value(element: ContentElement): any;

        /**
         * Determines if the element's inputs – based on the props passed in the declaration (e.g., `required`), are valid
         * @param element The content element
         */
        valid(element: ContentElement): any;

        /**
         * The element type's name (gets used for console output etc.)
         */
        readonly name: string;
    }

    /**
     * Show a dialog and await its results
     * @param id The dialog id. Must be unique to identify elements by their element ids.
     * @param title The title of the dialog. Gets displayed at the top.
     * @param contents Content elements of the dialog
     * @param options Additional options
     * @returns {Promise<object>} Promise that resolves with the dialog values in a key-value-pair form (as an object) or rejects if the user cancels the dialog
     */
    function showDialog(
        id: string,
        title: string,
        contents?: ContentElementDeclaration[],
        options?: {
            /**
             * The text in the "ok" button (e.g., "ok", "insert" or similar)
             * @default 'Ok'
             */
            okButtonText?: string;
            /**
             * The text in the "cancel" button (e.g., "cancel", "abort" or similar)
             * @default 'Cancel'
             */
            cancelButtonText?: string;
            /**
             * CSS code that gets injected into the style
             * @default ''
             */
            css?: string;
            /**
             * The dialog width in px
             * @default 360
             */
            width?: number;
            /**
             * A function that gets triggered before the dialog gets shown.
             * You can – e.g. – inject custom code here.
             * @param dialogElement The dialog element that gets shown
             * @param elements The dialog's elements in a key-value based manner (the key corresponds to the name of an input).,
             * @param actions Actions which can get performed like closing or canceling the dialog
             */
            onBeforeShow?: (dialogElement: HTMLDialogElement, elements: ContentElement[], actions: ActionList) => void;
            /**
             * A function that gets triggered when inputs change. Its return value
             * determines if the inputs are value and therefore, if the ok button is clickable
             * @param values The dialog values in a key-value-pair form (as an object)
             * @return {boolean} true if the values are valid, false if they're not
             */
            onValidate?: (values: object) => boolean;
        }
    ): Promise<object>;

    /**
     * @deprecated Using the types from the `dialog-helper` class directly is deprecated and will get removed in v1.0.
     * Use `require('xd-dialog-helper').types.CHECKBOX` instead.
     */
    const CHECKBOX: CheckboxType;
    /**
     * @deprecated Using the types from the `dialog-helper` class directly is deprecated and will get removed in v1.0.
     * Use `require('xd-dialog-helper').types.HEADER` instead.
     */
    const HEADER: HeaderType;
    /**
     * @deprecated Using the types from the `dialog-helper` class directly is deprecated and will get removed in v1.0.
     * Use `require('xd-dialog-helper').types.HR` instead.
     */
    const HR: HRType;
    /**
     * @deprecated Using the types from the `dialog-helper` class directly is deprecated and will get removed in v1.0.
     * Use `require('xd-dialog-helper').types.SELECT` instead.
     */
    const SELECT: SelectType;
    /**
     * @deprecated Using the types from the `dialog-helper` class directly is deprecated and will get removed in v1.0.
     * Use `require('xd-dialog-helper').types.SLIDER` instead.
     */
    const SLIDER: SliderType;
    /**
     * @deprecated Using the types from the `dialog-helper` class directly is deprecated and will get removed in v1.0.
     * Use `require('xd-dialog-helper').types.TEXT` instead.
     */
    const TEXT: TextType;
    /**
     * @deprecated Using the types from the `dialog-helper` class directly is deprecated and will get removed in v1.0.
     * Use `require('xd-dialog-helper').types.TEXT_AREA` instead.
     */
    const TEXT_AREA: TextAreaType;
    /**
     * @deprecated Using the types from the `dialog-helper` class directly is deprecated and will get removed in v1.0.
     * Use `require('xd-dialog-helper').types.TEXT_INPUT` instead.
     */
    const TEXT_INPUT: TextInputType;

    interface types {
        /**
         * A checkbox element
         *
         * ### Required props
         * - `id: string`
         * - `label: string`
         *
         * ### Supported props
         * - `value: boolean` – Initial value (default: `false`)
         * - `htmlAttributes: object` – get applied to the `<input type="checkbox">` element
         * - `required: boolean` – determines if checkbox must be checked for the element to be valid (default: `false`)
         */
        CHECKBOX: CheckboxType;
        /**
         * A headline element
         *
         * ### Required props
         * - `id: string`
         * - `label: string`
         *
         * ### Supported props
         * - `htmlAttributes: object` – get applied to the `<h2>` element
         */
        HEADER: HeaderType;
        /**
         * A horizontal rule (`<hr>`) element
         *
         * ### Required props
         * - `id: string`
         *
         * ### Supported props
         * - `htmlAttributes: object` – get applied to the `<hr>` element
         */
        HR: HRType;
        /**
         * A selection/dropdown element
         */
        SELECT: SelectType;
        /**
         * A numeric value slider element
         */
        SLIDER: SliderType;
        /**
         * A (static) text element
         */
        TEXT: TextType;
        /**
         * A text area input element
         */
        TEXT_AREA: TextAreaType;
        /**
         * A (single-line) text input element
         */
        TEXT_INPUT: TextInputType;
    }

    const types: types;
}
