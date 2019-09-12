module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../dialog-helper.js":
/*!***************************!*\
  !*** ../dialog-helper.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){const r=n(1),i=n(10);e.exports={types:r,showDialog:async function(e,t,n=[],r={}){const l=document.createElement("dialog");l.id=`${e}-dialog`,l.innerHTML=`\n<style>\n    form {\n        width: ${r.width||360}px;\n    }\n\n\t\tdiv, main > *, label, input:not([type="checkbox"]), select, textarea {\n\t\t\tdisplay: block;\n\t\t\twidth: 100%;\n\t\t}\n\t\t\n\t\tmain > * + * {\n\t\t    margin-top: 1em;\n\t\t}\n\t\t\n\t\t.checkbox-wrapper {\n\t\t    display: flex;\n\t\t}\n\t\t\n\t\t.checkbox-wrapper span, .checkbox-wrapper input{\n\t\t    display: block;\n\t\t    width: auto;\n\t\t    \n\t\t}\n\t\t\n\t\tinput[type=checkbox], input[type=checkbox] + span {\n\t\t    display: block;\n\t\t    width: auto;\n\t\t}\n\t\t\n    ${r.css||""}\n</style>\n<form method="dialog">\n<h1>${t}</h1><hr>\n<main></main>\n<footer>\n<button id="${e}-dialogHelperBtnCancel" uxp-variant="primary">${r.cancelButtonText||"Cancel"}</button>\n<button id="${e}-dialogHelperBtnOk" type="submit" uxp-variant="cta">${r.okButtonText||"Ok"}</button>\n</footer>\n</form>\n    `;const o=l.querySelector("main"),a=l.querySelector("form"),u=l.querySelector(`#${e}-dialogHelperBtnOk`),p=l.querySelector(`#${e}-dialogHelperBtnCancel`);let d=[],c=[];const s={close:()=>{u.disabled||l.close(JSON.stringify(s.values()))},cancel:()=>{l.close(0)},values:()=>{let e={};for(let t of c)e[t.props.id]=t.type.value(t);return e},change:()=>{u.disabled=!i(c,s.values(),r.onValidate)},registerContentElement:e=>{d.push(e)}};u.addEventListener("click",e=>{e.preventDefault(),s.close()}),a.onsubmit=s.close,p.addEventListener("click",s.cancel);const m=n.map(t=>{let n=t.type.render(e,t,s);return n.props=t,n.type=t.type,n});for(let e of m)o.appendChild(e.wrapper);c.push(...m),c.push(...d),document.body.innerHTML="",document.body.appendChild(l),r.onBeforeShow&&await r.onBeforeShow(l,c,s),s.change();const b=await l.showModal();if(0===b)throw new Error("reasonCanceled");return JSON.parse(b)},...r}},function(e,t,n){e.exports={CHECKBOX:n(2),HEADER:n(3),HR:n(4),SELECT:n(5),SLIDER:n(6),TEXT:n(7),TEXT_AREA:n(8),TEXT_INPUT:n(9)}},function(e,t){const n={render:(e,t,r)=>{const i=document.createElement("label");i.id=`${e}-${t.id}`+"-wrapper",i.className="checkbox-wrapper",Object.assign(i.style,{flexDirection:"row",alignItems:"center"});const l=document.createElement("input");l.type="checkbox",l.id=`${e}-${t.id}`,l.placeholder=t.label,i.appendChild(l);const o=document.createElement("span");if(o.id=`${e}-${t.id}`+"-label",o.innerHTML=t.label,i.appendChild(o),t.htmlAttributes)for(let e in t.htmlAttributes)l.setAttribute(e,t.htmlAttributes[e]);return void 0!==t.value&&(l.value=t.value,l.checked=!0===t.value),l.addEventListener("change",()=>{r.change()}),{wrapper:i,input:l,type:n,props:t}},valid:e=>!e.props.required||n.value(e),value:e=>e.input.checked,type:"Input"};e.exports=n},function(e,t){const n={render:(e,t)=>{const r=document.createElement("h2");if(r.innerHTML=t.label,t.htmlAttributes)for(let e in t.htmlAttributes)r.setAttribute(e,t.htmlAttributes[e]);return r.id=`${e}-${t.id}`,{wrapper:r,type:n,input:void 0,props:t}},valid:()=>!0,value:()=>void 0,type:"Header"};e.exports=n},function(e,t){const n={render:(e,t)=>{const r=document.createElement("hr");if(t.htmlAttributes)for(let e in t.htmlAttributes)r.setAttribute(e,t.htmlAttributes[e]);return r.id=`${e}-${t.id}`,{wrapper:r,type:n,props:t,input:void 0}},valid:()=>!0,value:()=>void 0,type:"Horizontal Rule"};e.exports=n},function(e,t){const n={render:(e,t,r)=>{if(void 0===t.options)return console.error("A select box must have an `options` parameter passed in the props."),null;const i=document.createElement("label");i.id=`${e}-${t.id}`+"-wrapper";const l=document.createElement("span");l.id=`${e}-${t.id}`+"-label",l.innerHTML=t.label,i.appendChild(l);const o=document.createElement("select");o.id=`${e}-${t.id}`;for(let e of t.options){let t=document.createElement("option");t.value=e.value,t.innerHTML=e.label,o.appendChild(t)}if(i.appendChild(o),t.htmlAttributes)for(let e in t.htmlAttributes)o.setAttribute(e,t.htmlAttributes[e]);return void 0!==t.value&&(o.value=t.value),o.addEventListener("change",()=>{r.change()}),{wrapper:i,input:o,type:n,props:t}},valid:()=>!0,value:e=>e.input.value,type:"Select"};e.exports=n},function(e,t){const n={render:(e,t,r)=>{if(void 0===t.htmlAttributes||void 0===t.value||void 0===t.htmlAttributes.min||void 0===t.htmlAttributes.max)return console.error("A slider must have a min, max and value parameter specified in its `htmlAttributes` (value can also be specified outside the `htmlAttributes`)."),null;const i=document.createElement("label");i.id=`${e}-${t.id}`+"-wrapper";const l=document.createElement("span");l.textContent=t.label,l.id=`${e}-${t.id}`+"-label";const o=document.createElement("span");o.id=`${e}-${t.id}-value-label`,o.textContent=(t.htmlAttributes.value||t.value)+(t.unit||"");const a=document.createElement("div");a.className="row",a.style.justifyContent="space-between",a.appendChild(l),a.appendChild(o);const u=document.createElement("input");u.id=`${e}-${t.id}`,u.setAttribute("type","range"),u.addEventListener("input",()=>{r.change(),o.textContent=Math.round(Number.parseFloat(u.value))+(t.unit||"")}),i.appendChild(a),i.appendChild(u);for(let e in t.htmlAttributes)u.setAttribute(e,t.htmlAttributes[e]);return u.value=t.value,{wrapper:i,input:u,type:n,props:t}},valid:()=>!0,value:e=>Number.parseFloat(e.input.value),type:"Slider"};e.exports=n},function(e,t){const n={render:(e,t)=>{const r=document.createElement("p");if(r.innerHTML=t.label,t.htmlAttributes)for(let e in t.htmlAttributes)r.setAttribute(e,t.htmlAttributes[e]);return r.id=`${e}-${t.id}`,{wrapper:r,type:n,props:t,input:void 0}},valid:()=>!0,value:()=>void 0,type:"Text"};e.exports=n},function(e,t){const n={render:(e,t,r)=>{let i=document.createElement("label");i.id=`${e}-${t.id}`+"-wrapper";const l=document.createElement("textarea");l.id=`${e}-${t.id}`,l.placeholder=t.label;const o=document.createElement("span");if(o.id=`${e}-${t.id}`+"-label",o.innerHTML=t.label+"",i.appendChild(o),i.appendChild(l),t.htmlAttributes)for(let e in t.htmlAttributes)l.setAttribute(e,t.htmlAttributes[e]);return void 0!==t.value&&(l.value=t.value),l.addEventListener("input",()=>{r.change()}),{wrapper:i,input:l,type:n,props:t}},valid:e=>{if(e.props.required){return n.value(e).length>0}return!0},value:e=>e.input.value,type:"Textarea"};e.exports=n},function(e,t){const n={render:(e,t,r)=>{let i=document.createElement("label");i.id=`${e}-${t.id}`+"-wrapper";const l=document.createElement("input");l.id=`${e}-${t.id}`,l.placeholder=t.label;const o=document.createElement("span");if(o.id=`${e}-${t.id}`+"-label",o.innerHTML=t.label+"",i.appendChild(o),i.appendChild(l),t.htmlAttributes)for(let e in t.htmlAttributes)l.setAttribute(e,t.htmlAttributes[e]);return void 0!==t.value&&(l.value=t.value),l.addEventListener("input",()=>{r.change()}),{wrapper:i,input:l,type:n,props:t}},valid:e=>{if(e.props.required){return n.value(e).length>0}return!0},value:e=>e.input.value,type:"Input"};e.exports=n},function(e,t){e.exports=function(e,t,n){if(n&&!n(t))return!1;for(let t of e)if(!t.type.valid(t))return!1;return!0}}]);

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const DialogHelper = __webpack_require__(/*! xd-dialog-helper */ "../dialog-helper.js");

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
            value: true,
            required: true
        },
    ], {
        okButtonText: 'Insert',
        width: 480
    }).then(results => console.log(JSON.stringify(results)), reason => console.log('Dialog got canceled ' + reason));

}

module.exports.commands = {
    showModal: showModal
};


/***/ })

/******/ });