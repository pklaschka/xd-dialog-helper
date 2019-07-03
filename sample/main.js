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

module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var l=t[r]={i:r,l:!1,exports:{}};return e[r].call(l.exports,l,l.exports,n),l.l=!0,l.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(r,l,function(t){return e[t]}.bind(null,l));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){const r=n(1),l=n(10);e.exports={types:r,showDialog:async function(e,t,n=[],r={}){const i=document.createElement("dialog");i.id=`${e}-dialog`,i.innerHTML=`\n    <style>\n        dialog#${e} {\n                width: ${r.width||360}px;\n        }\n        \n        ${r.css}\n    </style>\n    <form method="dialog">\n        <header>\n            <h1>${t}</h1>\n            <hr>\n        </header>\n        <main></main>\n        <footer>\n            <button id="${e}-dialogHelperBtnCancel" uxp-variant="primary">\n                ${r.cancelButtonText||"Cancel"}\n            </button>\n            <button id="${e}-dialogHelperBtnOk" type="submit" uxp-variant="cta">\n                ${r.okButtonText||"Ok"}\n            </button>\n        </footer>\n    </form>\n    `;const a=i.querySelector("main"),o=i.querySelector("form"),u=i.querySelector(`#${e}-dialogHelperBtnOk`),d=i.querySelector(`#${e}-dialogHelperBtnCancel`);let p=[],s=[];const c={close:()=>{u.disabled||i.close(JSON.stringify(c.values()))},cancel:()=>{i.close("reasonCanceled")},values:()=>{let e={};for(let t of s)e[t.props.id]=t.type.value(t);return e},change:()=>{u.disabled=!l(s,c.values(),r.onValidate)},registerContentElement:e=>{p.push(e)}};u.addEventListener("click",e=>{e.preventDefault(),c.close()}),o.onsubmit=c.close,d.addEventListener("click",c.cancel);const m=n.map(t=>{let n=t.type.render(e,t,c);return n.props=t,n.type=t.type,n});for(let e of m)a.appendChild(e.wrapper);s.push(...m),s.push(...p),document.body.innerHTML="",document.body.appendChild(i),r.onBeforeShow&&await r.onBeforeShow(i,s,c),c.change();const h=await i.showModal();if("reasonCanceled"===h)throw new Error(h);return JSON.parse(h)},...r}},function(e,t,n){e.exports={CHECKBOX:n(2),HEADER:n(3),HR:n(4),SELECT:n(5),SLIDER:n(6),TEXT:n(7),TEXT_AREA:n(8),TEXT_INPUT:n(9)}},function(e,t){const n={render:(e,t,r)=>{const l=document.createElement("label");l.id=`${e}-${t.id}`+"-wrapper",Object.assign(l.style,{flexDirection:"row",alignItems:"center"});const i=document.createElement("input");i.type="checkbox",i.id=`${e}-${t.id}`,i.placeholder=t.label,l.appendChild(i);const a=document.createElement("span");if(a.id=`${e}-${t.id}`+"-label",a.innerHTML=t.label,l.appendChild(a),t.htmlAttributes)for(let e in t.htmlAttributes)t.htmlAttributes.hasOwnProperty(e)&&i.setAttribute(e,t.htmlAttributes[e]);return void 0!==t.value&&(i.value=t.value,i.checked=!0===t.value),i.addEventListener("change",()=>{r.change()}),{wrapper:l,input:i,type:n,props:t}},valid:e=>!e.props.required||this.value(e),value:e=>e.input.checked,type:"Input"};e.exports=n},function(e,t){const n={render:(e,t)=>{const r=document.createElement("h2");if(r.innerHTML=t.label,t.htmlAttributes)for(let e in t.htmlAttributes)t.htmlAttributes.hasOwnProperty(e)&&r.setAttribute(e,t.htmlAttributes[e]);return r.id=`${e}-${t.id}`,{wrapper:r,type:n,input:void 0,props:t}},valid:()=>!0,value:()=>void 0,type:"Header"};e.exports=n},function(e,t){const n={render:(e,t)=>{const r=document.createElement("hr");if(t.htmlAttributes)for(let e in t.htmlAttributes)t.htmlAttributes.hasOwnProperty(e)&&r.setAttribute(e,t.htmlAttributes[e]);return r.id=`${e}-${t.id}`,{wrapper:r,type:n,props:t,input:void 0}},valid:()=>!0,value:()=>void 0,type:"Horizontal Rule"};e.exports=n},function(e,t){const n={render:(e,t,r)=>{const l=document.createElement("label");l.id=`${e}-${t.id}`+"-wrapper";const i=document.createElement("span");i.id=`${e}-${t.id}`+"-label",i.innerHTML=t.label,l.appendChild(i);const a=document.createElement("select");a.id=`${e}-${t.id}`;for(let e of t.options){let t=document.createElement("option");t.value=e.value,t.innerHTML=e.label,a.appendChild(t)}if(l.appendChild(a),t.htmlAttributes){for(let e in t.htmlAttributes)a.setAttribute(e,t.htmlAttributes[e]);t.htmlAttributes.value&&(a.value=t.htmlAttributes.value)}return void 0!==t.value&&(a.value=t.value),a.addEventListener("change",()=>{r.change()}),{wrapper:l,input:a,type:n,props:t}},valid:()=>!0,value:e=>e.input.value,type:"Select"};e.exports=n},function(e,t){const n={render:(e,t,r)=>{if(void 0===t.htmlAttributes||void 0===t.htmlAttributes.value&&void 0===t.value||void 0===t.htmlAttributes.min||void 0===t.htmlAttributes.max)return console.error("A slider must have a min, max and value parameter specified in its `htmlAttributes` (value can also be specified outside the `htmlAttributes`)."),null;const l=document.createElement("label");l.id=`${e}-${t.id}`+"-wrapper";const i=document.createElement("span");i.textContent=t.label,i.id=`${e}-${t.id}`+"-label";const a=document.createElement("span");a.id=`${e}-${t.id}`+"-value-label",a.textContent=(t.htmlAttributes.value||t.value)+(t.unit||"");const o=document.createElement("div");o.className="row",o.style.justifyContent="space-between",o.appendChild(i),o.appendChild(a);const u=document.createElement("input");if(u.id=`${e}-${t.id}`,u.setAttribute("type","range"),u.addEventListener("input",()=>{r.change(),a.textContent=Math.round(Number.parseFloat(u.value))+(t.unit||"")}),l.appendChild(o),l.appendChild(u),t.htmlAttributes)for(let e in t.htmlAttributes)t.htmlAttributes.hasOwnProperty(e)&&u.setAttribute(e,t.htmlAttributes[e]);return void 0!==t.value&&(u.value=t.value),{wrapper:l,input:u,type:n,props:t}},valid:()=>!0,value:e=>Number.parseFloat(e.input.value),type:"Slider"};e.exports=n},function(e,t){const n={render:(e,t)=>{const r=document.createElement("p");if(r.innerHTML=t.label,t.htmlAttributes)for(let e in t.htmlAttributes)t.htmlAttributes.hasOwnProperty(e)&&r.setAttribute(e,t.htmlAttributes[e]);return r.id=`${e}-${t.id}`,{wrapper:r,type:n,props:t,input:void 0}},valid:()=>!0,value:()=>void 0,type:"Text"};e.exports=n},function(e,t){const n={render:(e,t,r)=>{let l=document.createElement("label");l.id=`${e}-${t.id}`+"-wrapper";const i=document.createElement("textarea");i.id=`${e}-${t.id}`,i.placeholder=t.label;const a=document.createElement("span");if(a.id=`${e}-${t.id}`+"-label",a.innerHTML=t.label+"<br>",l.appendChild(a),l.appendChild(i),t.htmlAttributes)for(let e in t.htmlAttributes)t.htmlAttributes.hasOwnProperty(e)&&i.setAttribute(e,t.htmlAttributes[e]);return void 0!==t.value&&(i.value=t.value),i.addEventListener("input",()=>{r.change()}),{wrapper:l,input:i,type:n,props:t}},valid:e=>{if(e.props.required){return this.value(e).length>0}return!0},value:e=>e.input.value,type:"Textarea"};e.exports=n},function(e,t){const n={render:(e,t,r)=>{let l=document.createElement("label");l.id=`${e}-${t.id}`+"-wrapper";const i=document.createElement("input");i.id=`${e}-${t.id}`,i.placeholder=t.label;const a=document.createElement("span");if(a.id=`${e}-${t.id}`+"-label",a.innerHTML=t.label+"<br>",l.appendChild(a),l.appendChild(i),t.htmlAttributes)for(let e in t.htmlAttributes)t.htmlAttributes.hasOwnProperty(e)&&i.setAttribute(e,t.htmlAttributes[e]);return void 0!==t.value&&(i.value=t.value),i.addEventListener("input",()=>{r.change()}),{wrapper:l,input:i,type:n,props:t}},valid:e=>{if(e.props.required){return this.value(e).length>0}return!0},value:e=>e.input.value,type:"Input"};e.exports=n},function(e,t){e.exports=function(e,t,n){if(n&&!n(t))return!1;for(let t of e)if(!t.type.valid(t))return!1;return!0}}]);

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


/***/ })

/******/ });