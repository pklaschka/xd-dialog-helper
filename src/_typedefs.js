/**
 * @typedef ActionList A list of actions that can get performed for the dialog
 * @property {function(): void} close submit dialog if valid
 * @property {function(): void} cancel cancel the dialog
 * @property {function(): void} change value of ContentElement has changed
 * @property {function(): object} values get dialog values
 * @property {function(element: ContentElement): void} registerContentElement register content ContentElement, e.g.,
 * child of a section ContentElement
 */

/**
 * @typedef ContentElementType
 * @property {function(props: ContentElementDeclaration, actions: ActionList): ContentElement} render Render the
 * ContentElement
 * @property {function(ContentElement: ContentElement): *} value Get the value of the passed ContentElement
 * @property {function(ContentElement: ContentElement): boolean} valid Checks if input of the given ContentElement is
 * valid
 * @property {string} type Name of the ContentElement type
 */

/**
 * @typedef ContentElementDeclaration
 * @property {string} id unique id of the object
 * @property {ContentElementType} type The type of the content element
 * @property {?*} value Initial value of an input field, if applicable
 * @property {?object} htmlAttributes Custom HTML attributes which get applied to the main element, e.g., the
 */

/**
 * @typedef ContentElement Data about a single content ContentElement (of a certain ContentElement type), gets returned
 * by {@link ContentElementType.render}
 * @property {HTMLElement} wrapper The wrapper that gets inserted when the ContentElement gets rendered
 * @property {ContentElementType} type The type of the ContentElement
 * @property {object} props Properties of the element
 * @property {?HTMLElement} input? Input element of the content element, if applicable
 */

/**
 * @callback onValidationCallback
 * @param {any[]} values The values (as they would be returned by the dialog)
 * @return {boolean} True if the dialog entries are valid
 */

/**
 * A callback that gets triggered before the dialog gets shown, but after all contents got generated. You can – e.g.,
 * – manually adjust things here.
 * @callback onBeforeShowCallback
 * @param {HTMLDialogElement} dialogElement The dialog element that gets shown
 * @param {ContentElement[]} elements The dialog's elements in a key-value based manner (the key corresponds to the
 * name of an input).,
 * @param {ActionList} actions Actions which can get performed like closing or canceling the dialog
 */

/**
 * Options regarding the dialogs properties
 * @typedef {Object} dialogOptions
 * @property {string} [okButtonText="Ok"] The text in the "ok" button (e.g., "ok", "insert" or similar)
 * @property {string} [cancelButtonText="Cancel"] The text in the "cancel" button (e.g., "cancel", "abort" or similar)
 * @property {string} [css] CSS code that gets injected into the style
 * @property {number} [width=360] The dialog width in px
 * @property {onBeforeShowCallback} [onBeforeShow] A function that gets triggered before the dialog gets shown.
 * You can – e.g. – inject custom code here.
 * @property {onValidationCallback} [onValidate] A function that gets triggered when inputs change. Its return value
 * determines if the inputs are value and therefore, if the ok button is clickable
 */
