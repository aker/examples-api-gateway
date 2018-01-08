webpackJsonp([0,3],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/home/aker/Study/examples-api-gateway/js-frontend/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/home/aker/Study/examples-api-gateway/js-frontend/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(158);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//import { initialize } from "./app";
	/**
	 * Fire-up React Router.
	 */
	/**
	 * Created by andrew on 12/02/16.
	 */
	initialize().then(function (_ref) {
	  var provider = _ref.provider;
	
	  var reactRoot = window.document.getElementById("root");
	  _reactDom2.default.render(provider, reactRoot);
	});
	
	/**
	 * Detect whether the server-side render has been discarded due to an invalid checksum.
	 */
	if (process.env.NODE_ENV !== "production") {
	  var reactRoot = window.document.getElementById("root");
	  if (!reactRoot.firstChild || !reactRoot.firstChild.attributes || !reactRoot.firstChild.attributes["data-react-checksum"]) {
	    console.error("Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.");
	  }
	}
	
	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/home/aker/Study/examples-api-gateway/js-frontend/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "client.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ })
]);
//# sourceMappingURL=app.f33f31e9fddbf8e88c29.js.map