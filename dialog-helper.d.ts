declare module 'xd-dialog-helper' {
    /**
     * A list of actions that can get performed for the dialog
     */
    export interface ActionList {
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
    export interface ContentElement {
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
    export interface ContentElementDeclaration {
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
        label: string;
        /**
         * Initial value, if applicable
         */
        value?: any;
        /**
         * HTML attributes in a key-value-pair object form that get applied to an element – dependent on the `type`. See documentation for the `type` for more information about how the attributes get applied for the specific type
         */
        htmlAttributes: object;
    }

    export interface ContentElementType {
        /**
         *
         * @param dialogId
         * @param props
         * @param actions
         */
        render(dialogId: string, props: ContentElementDeclaration, actions: ActionList): ContentElement;

        /**
         *
         * @param element
         */
        value(element: ContentElement): any;

        /**
         *
         * @param element
         */
        valid(element: ContentElement): any;

        /**
         *
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
    export function showDialog(
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
    export const CHECKBOX: ContentElementType;
    /**
     * @deprecated Using the types from the `dialog-helper` class directly is deprecated and will get removed in v1.0.
     * Use `require('xd-dialog-helper').types.HEADER` instead.
     */
    export const HEADER: ContentElementType;
    /**
     * @deprecated Using the types from the `dialog-helper` class directly is deprecated and will get removed in v1.0.
     * Use `require('xd-dialog-helper').types.HR` instead.
     */
    export const HR: ContentElementType;
    /**
     * @deprecated Using the types from the `dialog-helper` class directly is deprecated and will get removed in v1.0.
     * Use `require('xd-dialog-helper').types.SELECT` instead.
     */
    export const SELECT: ContentElementType;
    /**
     * @deprecated Using the types from the `dialog-helper` class directly is deprecated and will get removed in v1.0.
     * Use `require('xd-dialog-helper').types.SLIDER` instead.
     */
    export const SLIDER: ContentElementType;
    /**
     * @deprecated Using the types from the `dialog-helper` class directly is deprecated and will get removed in v1.0.
     * Use `require('xd-dialog-helper').types.TEXT` instead.
     */
    export const TEXT: ContentElementType;
    /**
     * @deprecated Using the types from the `dialog-helper` class directly is deprecated and will get removed in v1.0.
     * Use `require('xd-dialog-helper').types.TEXT_AREA` instead.
     */
    export const TEXT_AREA: ContentElementType;
    /**
     * @deprecated Using the types from the `dialog-helper` class directly is deprecated and will get removed in v1.0.
     * Use `require('xd-dialog-helper').types.TEXT_INPUT` instead.
     */
    export const TEXT_INPUT: ContentElementType;

    interface types {
        /**
         * A checkbox element
         */
        CHECKBOX: ContentElementType;
        /**
         * A headline element
         */
        HEADER: ContentElementType;
        /**
         * A horizontal rule (`<hr>`) element
         */
        HR: ContentElementType;
        /**
         * A selection/dropdown element
         */
        SELECT: ContentElementType;
        /**
         * A numeric value slider element
         */
        SLIDER: ContentElementType;
        /**
         * A (static) text element
         */
        TEXT: ContentElementType;
        /**
         * A text area input element
         */
        TEXT_AREA: ContentElementType;
        /**
         * A (single-line) text input element
         */
        TEXT_INPUT: ContentElementType;
    }

    export const types: types;
}
