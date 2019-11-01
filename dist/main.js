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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/javascripts/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");

var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");

var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");

var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");

var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest(); // HTTP basic authentication

    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true); // Set the request timeout in MS

    request.timeout = config.timeout; // Listen for ready state

    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      } // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request


      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      } // Prepare the response


      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };
      settle(resolve, reject, response); // Clean up request

      request = null;
    }; // Handle browser request cancellation (as opposed to a manual cancellation)


    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Handle low level network errors


    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request)); // Clean up request

      request = null;
    }; // Handle timeout


    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.


    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js"); // Add xsrf header


      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    } // Add headers to the request


    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    } // Add withCredentials to request if needed


    if (config.withCredentials) {
      request.withCredentials = true;
    } // Add responseType to request if needed


    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    } // Handle progress if needed


    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    } // Not all browsers support upload events


    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel); // Clean up request

        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    } // Send the request


    request.send(requestData);
  });
};

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");

var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");

var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */


function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context); // Copy axios.prototype to instance

  utils.extend(instance, Axios.prototype, context); // Copy context to instance

  utils.extend(instance, context);
  return instance;
} // Create the default instance to be exported


var axios = createInstance(defaults); // Expose Axios class to allow class inheritance

axios.Axios = Axios; // Factory for creating new instances

axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
}; // Expose Cancel & CancelToken


axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js"); // Expose all/spread

axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");
module.exports = axios; // Allow use of default import syntax in TypeScript

module.exports.default = axios;

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */

function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;
module.exports = Cancel;

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */


function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}
/**
 * Throws a `Cancel` if cancellation has been requested.
 */


CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};
/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */


CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");

var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");

var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */


function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */


Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get'; // Hook up interceptors middleware

  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
}; // Provide aliases for supported request methods


utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
module.exports = Axios;

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}
/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */


InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};
/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */


InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */


InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");
/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */


module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");

var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");

var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");
/**
 * Throws a `Cancel` if cancellation has been requested.
 */


function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}
/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */


module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config); // Support baseURL config

  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  } // Ensure headers exist


  config.headers = config.headers || {}; // Transform request data

  config.data = transformData(config.data, config.headers, config.transformRequest); // Flatten headers

  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {});
  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });
  var adapter = config.adapter || defaults.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config); // Transform response data

    response.data = transformData(response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config); // Transform response data

      if (reason && reason.response) {
        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */

module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;

  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function () {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };

  return error;
};

/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");
/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */


module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};
  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });
  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });
  utils.forEach(['baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath'], function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });
  return config;
};

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");
/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */


module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;

  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
  }
};

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */


module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });
  return data;
};

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");

var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter; // Only Node.JS has a process variable that is of [[Class]] process

  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  }

  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
      return data;
    }

    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }

    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }

    return data;
  }],
  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        /* Ignore */
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};
defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
module.exports = defaults;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    return fn.apply(thisArg, args);
  };
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}
/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */


module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }

        parts.push(encode(key) + '=' + encode(v));
      });
    });
    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */

module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() : // Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */

module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;
  /**
  * Parse a URL to discover it's components
  *
  * @param {String} url The URL to be parsed
  * @returns {Object}
  */

  function resolveURL(url) {
    var href = url;

    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils

    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }

  originURL = resolveURL(window.location.href);
  /**
  * Determine if a URL shares the same origin as the current location
  *
  * @param {String} requestURL The URL to test
  * @returns {boolean} True if URL shares the same origin, otherwise false
  */

  return function isURLSameOrigin(requestURL) {
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : // Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js"); // Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers


var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */

module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {
    return parsed;
  }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }

      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });
  return parsed;
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */

module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/axios/node_modules/is-buffer/index.js");
/*global toString:true*/
// utils is a library of generic helper functions non-specific to axios


var toString = Object.prototype.toString;
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */

function isArray(val) {
  return toString.call(val) === '[object Array]';
}
/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */


function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}
/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */


function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */


function isArrayBufferView(val) {
  var result;

  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }

  return result;
}
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */


function isString(val) {
  return typeof val === 'string';
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */


function isNumber(val) {
  return typeof val === 'number';
}
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */


function isUndefined(val) {
  return typeof val === 'undefined';
}
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */


function isObject(val) {
  return val !== null && typeof val === 'object';
}
/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */


function isDate(val) {
  return toString.call(val) === '[object Date]';
}
/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */


function isFile(val) {
  return toString.call(val) === '[object File]';
}
/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */


function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */


function isFunction(val) {
  return toString.call(val) === '[object Function]';
}
/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */


function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}
/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */


function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */


function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */


function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */


function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  } // Force an array if not already something iterable


  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */


function merge()
/* obj1, obj2, obj3, ... */
{
  var result = {};

  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}
/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */


function deepMerge()
/* obj1, obj2, obj3, ... */
{
  var result = {};

  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */


function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};

/***/ }),

/***/ "./node_modules/axios/node_modules/is-buffer/index.js":
/*!************************************************************!*\
  !*** ./node_modules/axios/node_modules/is-buffer/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
module.exports = function isBuffer(obj) {
  return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
};

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),

/***/ "./src/javascripts/helper.js":
/*!***********************************!*\
  !*** ./src/javascripts/helper.js ***!
  \***********************************/
/*! exports provided: color, temperatureColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "color", function() { return color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "temperatureColor", function() { return temperatureColor; });
var color = d3.scaleLinear().domain([20, 40, 50, 65, 75, 85, 90, 100]).range(["#fffafa", "#00a6ca", "#00ccbc", "#90eb9d", "#ffff8c", "#f9d057", "#f29e2e", "#d7191c"]);
var temperatureColor = function temperatureColor(id, countryTemperature) {
  if (countryTemperature[id] !== undefined) {
    var jsonCountryTemperature = countryTemperature[id].temperature;
    return color(jsonCountryTemperature);
  } else {
    return "black";
  }
};

/***/ }),

/***/ "./src/javascripts/index.js":
/*!**********************************!*\
  !*** ./src/javascripts/index.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_index_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map */ "./src/javascripts/map.js");
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slider */ "./src/javascripts/slider.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);




window.addEventListener("DOMContentLoaded", function () {
  Object(_map__WEBPACK_IMPORTED_MODULE_1__["renderMap"])(10);
});

/***/ }),

/***/ "./src/javascripts/map.js":
/*!********************************!*\
  !*** ./src/javascripts/map.js ***!
  \********************************/
/*! exports provided: renderMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderMap", function() { return renderMap; });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/javascripts/slider.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./src/javascripts/helper.js");
/* harmony import */ var _selected_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selected-map */ "./src/javascripts/selected-map.js");



var renderMap = function renderMap(month) {
  var width = 500,
      height = 500,
      center = [-width / 2 + 3, 0],
      sens = 0.25,
      centeredFeature,
      timer,
      scaleChange,
      selectedFeature,
      originalScale = height / 2.1,
      scale = originalScale;
  var globeConfig = {
    speed: 0.005,
    verticalTilt: -23.5,
    horizontalTilt: 0
  };
  var svgVisual = d3.select("#map").append("svg"),
      svgFunctional = d3.select("#functional-map").append("svg"),
      gVisual = svgVisual.append('g'),
      gFunctional = svgFunctional.append('g');
  svgVisual.attr("width", width).attr("height", height);
  svgFunctional.attr("width", width).attr("height", height);
  var canvas = d3.select("#canvas").append("canvas");
  canvas.attr("width", width).attr("height", height).style('position', 'absolute').style('left', '0');
  var context,
      stationData = [];
  var projection = d3.geoOrthographic().translate([width / 2, height / 2]),
      path = d3.geoPath().projection(projection);
  var initialScale = projection.scale();
  queue().defer(d3.json, "./data/world-110m2.json").defer(d3.json, "./data/tas-2016-".concat(month, ".json")).defer(d3.json, "./data/iso-num-to-country.json").defer(d3.json, "./data/gsom-2016-".concat(month, "-tavg-prcp.json")).await(renderGlobalMap);

  function renderGlobalMap(error, topology, temperature, isoToCountryName, stations) {
    if (error) throw error;
    stationData = stations;
    var data = d3.range(10); // const tempScaleGroup = svgVisual.append("tempScaleGroup")

    var tempRangeBg = svgVisual.select;
    var rects = svgVisual.selectAll(".rects").data(data).enter().append("rect").attr("x", 10).attr("height", 10).attr("y", function (d, i) {
      return 10 + i * 9;
    }).attr("width", 10).attr("fill", function (d) {
      return Object(_helper__WEBPACK_IMPORTED_MODULE_1__["color"])(100 - d * 10);
    }).attr("stroke", "gray");
    svgVisual.selectAll("text").data(data).enter().append("text").html(function (d) {
      return "".concat(100 - d * 10, "&#176;F");
    }).attr("font-size", "0.32em").attr("x", 23).attr("height", 20).attr("y", function (d, i) {
      return 20 + i * 9;
    }).attr("width", 10).attr("fill", function (d) {
      return Object(_helper__WEBPACK_IMPORTED_MODULE_1__["color"])(100 - d * 10);
    });
    var geojson = topojson.feature(topology, topology.objects.countries);
    var tooltip = d3.select(".tooltip");
    drawOcean();
    drawGraticule();
    gVisual.selectAll("path.land").data(geojson.features).enter().append("path").attr("class", "land").attr("d", path).style("fill", function (d) {
      return Object(_helper__WEBPACK_IMPORTED_MODULE_1__["temperatureColor"])(d.id, temperature);
    });
    var countries = gFunctional.selectAll("path.land").data(geojson.features).enter().append("path").attr("class", "land").attr("d", path).style("fill", "transparent").on("click", function (d) {
      click(d, temperature);
    });

    function click(d, temperature) {
      selectedFeature = d; // console.log(selectedFeature.id);

      timer.stop();
      clicked(selectedFeature); // console.log("still me")

      Object(_selected_map__WEBPACK_IMPORTED_MODULE_2__["renderSelectedCountry"])("update", selectedFeature, Object(_helper__WEBPACK_IMPORTED_MODULE_1__["temperatureColor"])(selectedFeature.id, temperature), stationData[selectedFeature.id]);
      selectedCountryName = document.querySelector("#selected-country-name");
      countryName = isoToCountryName[selectedFeature.id];
      selectedCountryTemp = temperature[selectedFeature.id].temperature;
      selectedCountryName.innerHTML = "".concat(countryName, "</br>Avg Temp. ").concat(selectedCountryTemp.toFixed(1), " &#176;F");
    }

    countries.on("mouseover", function (d, i) {
      d3.select(this).attr("fill", "grey").style("stroke", "#eee").attr("stroke-width", 3);
      return tooltip.style("opacity", .9).text(isoToCountryName[d.id]);
    }).on("mousemove", function (d) {
      tooltip.style("opacity", .9).style("top", d3.event.pageY + "px").style("left", d3.event.pageX + 10 + "px").text(isoToCountryName[d.id]);
    }).on("mouseout", function (d, i) {
      d3.select(this).attr("fill", "white").attr("stroke-width", 1);
      tooltip.style("opacity", 0).style("top", 0 + "px").style("left", 0 + "px");
    });
    gFunctional.call(d3.drag().subject(function () {
      var r = projection.rotate();
      return {
        x: r[0] / sens,
        y: -r[1] / sens // x: r[0], y: r[1]

      };
    }).on("drag", function () {
      timer.stop();
      var rotate = projection.rotate();
      var scaleFactor = initialScale / projection.scale();
      projection.rotate([d3.event.x * sens, -d3.event.y * sens, rotate[2]]);
      svgVisual.selectAll("path").attr("d", path);
      svgFunctional.selectAll("path").attr("d", path);
      drawStations();
    }));

    var clicked = function clicked(selectedFeature) {
      var centroid, inverted, currentRotate, desiredRotate, r, currentScale, desiredScale, s;

      if (!selectedFeature || centeredFeature === selectedFeature) {
        centeredFeature = null;
        centroid = path.centroid(selectedFeature);
        inverted = projection.invert([centroid[0], centroid[1]]);
        currentRotate = projection.rotate();
        currentScale = projection.scale();
        r = d3.interpolate(currentRotate, [currentRotate[0], globeConfig.verticalTilt, globeConfig.horizontalTilt]); // s = d3.interpolate(currentScale, initialScale);
      } else {
        centroid = path.centroid(selectedFeature);
        inverted = projection.invert([centroid[0], centroid[1]]);
        currentRotate = projection.rotate();
        currentScale = projection.scale(); // desiredScale = projection.scale();

        r = d3.interpolate(currentRotate, [-inverted[0], -inverted[1]]); // s = d3.interpolate(currentScale, 200);

        centeredFeature = selectedFeature;
      }

      gVisual.transition().duration(750).tween("rotate", function () {
        return function (t) {
          projection.rotate(r(t));
          svgVisual.selectAll("path").attr("d", path);
          svgFunctional.selectAll("path").attr("d", path);
          drawStations();
        };
      }).on("end", function () {
        if (!centeredFeature) {
          enableRotation(currentRotate[0]);
        }
      });
      var selectedCountryName = document.querySelector("#selected-country-name");
      var countryName = isoToCountryName[selectedFeature.id];
      var selectedCountryTemp = temperature[selectedFeature.id].temperature;
      selectedCountryName.innerHTML = "".concat(countryName, "</br>Avg Temp. ").concat(selectedCountryTemp.toFixed(1), " &#176;F");
    };

    enableRotation();
    Object(_slider__WEBPACK_IMPORTED_MODULE_0__["renderSlider"])();
    Object(_selected_map__WEBPACK_IMPORTED_MODULE_2__["renderSelectedCountry"])("create", geojson.features[5], Object(_helper__WEBPACK_IMPORTED_MODULE_1__["color"])(temperature[geojson.features[5].id].temperature), stations[geojson.features[5].id]);
    var selectedCountryName = document.querySelector("#selected-country-name");
    var countryName = isoToCountryName[geojson.features[5].id];
    var selectedCountryTemp = temperature[geojson.features[5].id].temperature;
    selectedCountryName.innerHTML = "".concat(countryName, "</br>Avg Temp. ").concat(selectedCountryTemp.toFixed(1), " &#176;F");
    var selectedCountry;
    document.getElementById("month-slider").addEventListener("input", function (e) {
      var sliderLabel = document.getElementById("slider-current-month");
      var currentMonth = Number(e.target.value);
      var currentMonthString = e.target.value;
      sliderLabel.innerHTML = _slider__WEBPACK_IMPORTED_MODULE_0__["numMonthToName"][currentMonth];

      if (currentMonthString.length === 1) {
        currentMonthString = "0" + currentMonthString;
      }

      queue() // .defer(d3.json, "./data/world-110m2.json")
      .defer(d3.json, "./data/tas-2016-".concat(currentMonthString, ".json")) // .defer(d3.json, "./data/iso-num-to-country.json")
      .defer(d3.json, "./data/gsom-2016-".concat(currentMonthString, "-tavg-prcp.json")).await(handleSlider);

      function handleSlider(error, temperature, stations) {
        if (error) throw error; // console.log("hello")

        gVisual.selectAll("path.land").style("fill", function (d) {
          return Object(_helper__WEBPACK_IMPORTED_MODULE_1__["temperatureColor"])(d.id, temperature);
        }).style("stroke", "#eee");
        var gFunctional = d3.select("#selected-country").select('g');
        gFunctional.selectAll("path").style("fill", function (d) {
          selectedCountry = d.id || selectedCountry;
          return Object(_helper__WEBPACK_IMPORTED_MODULE_1__["temperatureColor"])(d.id, temperature);
        }).style("stroke", "#eee");
        countries.on("click", function (d) {
          click(d, temperature);
        }); // d3.json(`./data/gsom-2016-${currentMonthString}-tavg-prcp.json`, function (error, station) {

        stationData = stations;
        drawStations();
        Object(_selected_map__WEBPACK_IMPORTED_MODULE_2__["renderSelectedCountry"])("update", selectedFeature, Object(_helper__WEBPACK_IMPORTED_MODULE_1__["temperatureColor"])(selectedCountry, temperature), stationData[selectedCountry]);
        selectedCountryName = document.querySelector("#selected-country-name");
        countryName = isoToCountryName[selectedFeature.id];
        selectedCountryTemp = temperature[selectedFeature.id].temperature;
        selectedCountryName.innerHTML = "".concat(countryName, "</br>Avg Temp. ").concat(selectedCountryTemp.toFixed(1), " &#176;F"); // })
      } // d3.json(`./data/tas-2016-${currentMonthString}.json`, function (error, temperature) {
      //     if (error) throw error;
      //     gVisual.selectAll("path.land")
      //         .style("fill", function (d) {
      //             return temperatureColor(d.id, temperature);
      //         })
      //         .style("stroke", "#eee");
      //     let gFunctional = d3.select("#selected-country").select('g');
      //     gFunctional.selectAll("path")
      //         .style("fill", function (d) {
      //             selectedCountry = d.id || selectedCountry;
      //             return temperatureColor(d.id, temperature);
      //         })
      //         .style("stroke", "#eee");
      //     countries.on("click", function(d) {
      //             click(d, temperature);
      //         });
      //     d3.json(`./data/gsom-2016-${currentMonthString}-tavg-prcp.json`, function (error, station) {
      //         stationData = station;
      //         drawStations();
      //         renderSelectedCountry(
      //             "update",
      //             selectedFeature,
      //             temperatureColor(selectedCountry, temperature),
      //             // stationData);
      //             stationData[selectedCountry]);
      //     })
      // })

    }); // zoom and pan

    var zoom = d3.zoom().scaleExtent([1, Infinity]).on('zoom', function () {
      zoomed();
    });
    gFunctional.call(zoom);
    var previousScaleFactor = 1,
        originalScale = height / 2.1;

    function zoomed() {
      var dx = d3.event.sourceEvent.movementX;
      var dy = d3.event.sourceEvent.movementY;
      var event = d3.event.sourceEvent.type;
      context.save();
      context.clearRect(0, 0, width, height); // console.log("scale-pre",scale);

      if (event === 'wheel') {
        // console.log(d3.event.transform.k);
        var scaleFactor = d3.event.transform.k;
        scaleChange = scaleFactor - previousScaleFactor;
        scale = scale + scaleChange * originalScale;
        projection.scale(scale);
        previousScaleFactor = scaleFactor;
        gVisual.selectAll("path").attr("d", path);
        gFunctional.selectAll("path").attr("d", path);
      } else {} // let r = projection.rotate();
      // rotation = [r[0] + dx * 0.4, r[1] - dy * 0.5, r[2]];
      // projection.rotate(rotation);
      // gVisual.selectAll("path").attr("d", path);
      // gFunctional.selectAll("path").attr("d", path);
      // requestAnimationFrame(drawStations);


      drawStations(); // context.restore();
    }
  }

  function drawStationsSpecifiedCanvas(canvas, stationData) {
    context = canvas.node().getContext('2d');
    context.save();
    context.setTransform([1, 0, 0, 1, 0, 0]);
    context.clearRect(0, 0, width, height);
    context.restore();
    var pRotate = projection.rotate();

    for (var i in stationData) {
      var station = stationData[i],
          loc = station ? projection([station.LONGITUDE, station.LATITUDE]) : null;

      if (loc) {
        var longitude = Number(station.LONGITUDE) + 180,
            startLongitude = 360 - (pRotate[0] + 270) % 360,
            endLongitude = (startLongitude + 180) % 360;

        if (startLongitude < endLongitude && longitude > startLongitude && longitude < endLongitude || startLongitude > endLongitude && (longitude > startLongitude || longitude < endLongitude)) {
          var ending = projection([station.LONGITUDE, station.LATITUDE]);
          context.beginPath();
          context.arc(ending[0], ending[1], 2, 0, Math.PI * 2);
          context.strokeStyle = 'rgba(144, 253, 222, ' + 0.9 + ')';
          context.stroke();
          context.fillStyle = Object(_helper__WEBPACK_IMPORTED_MODULE_1__["color"])(station.TAVG * (9 / 5) + 32);
          context.fill();
        }
      }
    }
  }

  function drawStationsSpecificMonth(stationData) {
    context = canvas.node().getContext('2d');
    context.save();
    context.setTransform([1, 0, 0, 1, 0, 0]);
    context.clearRect(0, 0, width, height);
    context.restore();
    var pRotate = projection.rotate();

    for (var i in stationData) {
      var sationsPerCountry = stationData[i];

      for (var j in sationsPerCountry) {
        var station = sationsPerCountry[j],
            loc = station ? projection([station.LONGITUDE, station.LATITUDE]) : null;

        if (loc) {
          var longitude = Number(station.LONGITUDE) + 180,
              startLongitude = 360 - (pRotate[0] + 270) % 360,
              endLongitude = (startLongitude + 180) % 360;

          if (startLongitude < endLongitude && longitude > startLongitude && longitude < endLongitude || startLongitude > endLongitude && (longitude > startLongitude || longitude < endLongitude)) {
            context.strokeStyle = 'rgba(144, 253, 222, ' + 0.9 + ')'; // context.strokeStyle = 'rgba(0,0,0,1)';

            var ending = projection([station.LONGITUDE, station.LATITUDE]); // context.lineWidth = 2

            context.beginPath();
            context.arc(ending[0], ending[1], 2, 0, Math.PI * 2);
            context.stroke();
            context.fillStyle = Object(_helper__WEBPACK_IMPORTED_MODULE_1__["color"])(station.TAVG * (9 / 5) + 32);
            context.fill();
          }
        }
      }
    }
  }

  function drawStations() {
    context = canvas.node().getContext('2d');
    context.save();
    context.setTransform([1, 0, 0, 1, 0, 0]);
    context.clearRect(0, 0, width, height);
    context.restore();
    var pRotate = projection.rotate();

    for (var i in stationData) {
      var sationsPerCountry = stationData[i];

      for (var j in sationsPerCountry) {
        var station = sationsPerCountry[j],
            loc = station ? projection([station.LONGITUDE, station.LATITUDE]) : null;

        if (loc) {
          var longitude = Number(station.LONGITUDE) + 180,
              startLongitude = 360 - (pRotate[0] + 270) % 360,
              endLongitude = (startLongitude + 180) % 360;

          if (startLongitude < endLongitude && longitude > startLongitude && longitude < endLongitude || startLongitude > endLongitude && (longitude > startLongitude || longitude < endLongitude)) {
            context.strokeStyle = 'rgba(144, 253, 222, ' + 0.9 + ')'; // context.strokeStyle = 'rgba(0,0,0,1)';

            var ending = projection([station.LONGITUDE, station.LATITUDE]); // context.lineWidth = 2

            context.beginPath();
            context.arc(ending[0], ending[1], 2, 0, Math.PI * 2);
            context.stroke();
            context.fillStyle = Object(_helper__WEBPACK_IMPORTED_MODULE_1__["color"])(station.TAVG * (9 / 5) + 32);
            context.fill();
          }
        }
      }
    }
  }

  function enableRotation() {
    var startingAngle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
    timer = d3.timer(function (elapsed) {
      projection.rotate([startingAngle + globeConfig.speed * elapsed, globeConfig.verticalTilt, globeConfig.horizontalTilt]);
      svgVisual.selectAll("path").attr("d", path);
      svgFunctional.selectAll("path").attr("d", path);
      drawStations();
    });
  }

  function drawOcean() {
    gFunctional.selectAll("path.ocean").data([{
      type: "Sphere"
    }]).enter().append("path").style("fill", "transparent");
    gVisual.selectAll("path.ocean").data([{
      type: "Sphere"
    }]).enter().append("path").attr("class", "ocean"); // .attr("class", "ocean")
  }

  function drawGraticule() {
    var graticule = d3.geoGraticule().step([10, 10]);
    gVisual.selectAll("path.graticule").data([graticule()]).enter().append("path").attr("class", "graticule").attr("d", path).style("fill", "transparent");
  }
};

/***/ }),

/***/ "./src/javascripts/selected-map.js":
/*!*****************************************!*\
  !*** ./src/javascripts/selected-map.js ***!
  \*****************************************/
/*! exports provided: renderSelectedCountry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderSelectedCountry", function() { return renderSelectedCountry; });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./src/javascripts/helper.js");

var renderSelectedCountry = function renderSelectedCountry(action, geojsonFeature, jsonCountryTemperature, stations) {
  var width = 500,
      height = 400,
      centered;
  var centerSVGPos = [width / 2, height / 2];
  var projection = d3.geoMercator(); // .center([50, 50])
  // .scale(150)
  // .rotate([0, 0]);

  var path = d3.geoPath().projection(projection);
  var canvas,
      context,
      stationData = [];
  var circleRadius = 4;
  var tooltip = d3.select(".tooltip");

  if (action === "update") {
    // canvas = d3.select("#selected-canvas").select("canvas");
    var svg = d3.select("#selected-functional-map");
    var g = svg.select('g');
    g.attr("transform", function (d) {
      return "translate(50,50)";
    });
    var bounds = path.bounds(geojsonFeature); // svg.append("text")
    //     .text("hello");

    projection.fitSize([width - 100, height - 100], geojsonFeature);
    g.selectAll("path").remove();
    g.selectAll("path").data([geojsonFeature]).enter().append("path").attr("d", path).style("fill", jsonCountryTemperature).style("stroke", "#eee"); // .attr("transform", function (d) {
    //     //     const centroid = path.centroid(d);
    //     //     const x = width / 2 - centroid[0];
    //     //     const y = height / 2 - centroid[1];
    //         return "translate(" + projection([d.long, d.lat]) + ")"
    // });

    stationData = stations; // console.log("selected-map", stationData);

    drawStations(); // const zoom = d3.zoom()
    //     .scaleExtent([1, Infinity])
    //     .translateExtent([[0, 0], [width, height]])
    //     .extent([[0, 0], [width, height]])
    //     .on('zoom', () => {
    //         g.style('stroke-width', `${1.5 / d3.event.transform.k}px`)
    //         g.attr('transform', d3.event.transform);
    //         // g.selectAll("circle").attr('transform', d3.event.transform);
    //         console.log(d3.event.transform);
    //     })
    // g.call(zoom);
  } else if (action === "create") {
    // canvas = d3.select("#selected-canvas").append("canvas")
    //     .attr("width", width)
    //     .attr("height", height)
    //     .style('position', 'absolute')
    //     .style('left', '0');
    var _svg = d3.select("#selected-functional-map").append("svg").attr("width", width).attr("height", height);

    var _g = _svg.append("g");

    _g.attr("transform", function (d) {
      return "translate(50,50)";
    });

    projection.fitSize([width - 100, height - 100], geojsonFeature); // console.log("centroid", path.centroid(geojsonFeature));
    // console.log(projection.translate([0, 0]));
    // console.log("centroid2", path.centroid(geojsonFeature));
    // projection.translate([100,100]);
    // projection.center([width/2, height/2]);

    var data = d3.range(10);

    var rects = _svg.selectAll(".rects").data(data).enter().append("rect").attr("x", 10).attr("height", 10).attr("y", function (d, i) {
      return 10 + i * 9;
    }).attr("width", 10).attr("fill", function (d) {
      return Object(_helper__WEBPACK_IMPORTED_MODULE_0__["color"])(100 - d * 10);
    }).attr("stroke", "gray");

    _svg.selectAll("text").data(data).enter().append("text").html(function (d) {
      return "".concat(100 - d * 10, "&#176;F");
    }).attr("font-size", "0.32em").attr("x", 23).attr("height", 20).attr("y", function (d, i) {
      return 20 + i * 9;
    }).attr("width", 10).attr("fill", function (d) {
      return Object(_helper__WEBPACK_IMPORTED_MODULE_0__["color"])(100 - d * 10);
    }); // .attr("stroke", "gray");


    _g.selectAll("path").data([geojsonFeature]).enter().append("path").attr("d", path).style("fill", jsonCountryTemperature).style("stroke", "#eee"); // .attr("transform", function (d) {
    //     const centroid = path.centroid(d);
    //     const x = width / 2 - centroid[0];
    //     const y = height / 2 - centroid[1];
    //     return "translate(" + x + "," + y + ")"
    // });


    stationData = stations; // console.log(stationData);

    drawStations();
    var zoom = d3.zoom().scaleExtent([1, Infinity]).translateExtent([[0, 0], [width, height]]).extent([[0, 0], [width, height]]).on('zoom', function () {
      var scaleXY = d3.event.transform;

      _g.attr("transform", function () {
        return "translate(" + (scaleXY.x + 50) + "," + (scaleXY.y + 50) + ") scale(" + scaleXY.k + ")";
      });

      _g.selectAll("circle").attr("r", function () {
        // console.log(d3.event.transform);
        var scaleXY = d3.event.transform;
        return circleRadius / scaleXY.k;
      });
    });

    _svg.call(zoom);
  }

  function drawStations() {
    var g = d3.select("#selected-functional-map").select("svg").select("g"); // console.log(stationData)

    if (stationData) {
      g.selectAll('circle') // g.selectAll('text')
      .remove();
      var stationsValue = g.selectAll('circle') // let stationsValue = g.selectAll('text')
      .data(stationData).enter().append('circle') // .append('text')
      // .attr('class', 'temp-text')
      // .text(d => {
      //         return (d.TAVG * (9 / 5) + 32).toFixed(0);
      // })
      // .attr('cx', d => projection([d.LONGITUDE, d.LATITUDE])[0])
      // .attr('cy', d => projection([d.LONGITUDE, d.LATITUDE])[1])
      .attr("transform", function (d) {
        return "translate(".concat(projection([d.LONGITUDE, d.LATITUDE])[0], ",\n                        ").concat(projection([d.LONGITUDE, d.LATITUDE])[1], ")");
      }).style("stroke", "#111").attr("stroke-width", 0.1) // .style("storke", "rgba(144, 253, 222, 1)")
      .attr('fill', function (d) {
        return Object(_helper__WEBPACK_IMPORTED_MODULE_0__["color"])(d.TAVG * (9 / 5) + 32);
      }).attr('r', circleRadius);
      stationsValue.on("mouseover", function (d, i) {
        d3.select(this).style("stroke", "#eee").attr("stroke-width", 0.2);
        return tooltip.style("opacity", .9).html("<p>" + d.NAME + "<br/>" + "Average Temp: " + (d.TAVG * (9 / 5) + 32).toFixed(1) + "&#176;F <br />" + "</p>"); // .text(`${d.NAME}`);
      }).on("mousemove", function (d) {
        tooltip.style("opacity", .9).style("top", d3.event.pageY + "px").style("left", d3.event.pageX + 10 + "px"); // .text(d.NAME);
      }).on("mouseout", function (d, i) {
        d3.select(this).style("stroke", "#111").attr("stroke-width", 0.1);
        tooltip.style("opacity", 0).style("top", 0 + "px").style("left", 0 + "px");
      });
    } else {
      g.selectAll('circle') // g.selectAll('text')
      .remove();
    }
  } // function drawStations() {
  //     context = canvas.node().getContext('2d');
  //     context.save();
  //     context.setTransform([1, 0, 0, 1, 0, 0]);
  //     context.clearRect(0, 0, width, height);
  //     context.restore();
  //     const pRotate = projection.rotate();
  //     for (let i in stationData) {
  //         let station = stationData[i],
  //             loc = station ? projection([station.LONGITUDE, station.LATITUDE]) : null;
  //         if (loc) {
  //             let longitude = Number(station.LONGITUDE) + 180,
  //                 startLongitude = 360 - ((pRotate[0] + 270) % 360),
  //                 endLongitude = (startLongitude + 180) % 360,
  //                 ending = projection([station.LONGITUDE, station.LATITUDE]);
  //             context.beginPath();
  //             context.arc(ending[0], ending[1], 6, 0, Math.PI * 2);
  //             context.strokeStyle = 'rgba(144, 253, 222, ' + 0.9 + ')';
  //             context.stroke();
  //             context.fillStyle = color(station.TAVG * (9 / 5) + 32);
  //             context.fill();
  //         }
  //     }
  // }

};

/***/ }),

/***/ "./src/javascripts/slider.js":
/*!***********************************!*\
  !*** ./src/javascripts/slider.js ***!
  \***********************************/
/*! exports provided: numMonthToName, renderSlider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numMonthToName", function() { return numMonthToName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderSlider", function() { return renderSlider; });
var numMonthToName = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
};
var renderSlider = function renderSlider() {
  var slider = document.getElementById("slider");
  slider.setAttribute("id", "slider-container");
  var sliderLabel = document.createElement("div");
  sliderLabel.setAttribute("id", "slider-current-month");
  sliderLabel.innerHTML = numMonthToName[10];
  var sliderSetting = document.createElement("input");
  sliderSetting.setAttribute("id", "month-slider");
  sliderSetting.setAttribute("type", "range");
  sliderSetting.setAttribute("min", "1");
  sliderSetting.setAttribute("max", "12");
  sliderSetting.setAttribute("value", "10");
  sliderSetting.setAttribute("step", "1");
  slider.appendChild(sliderSetting);
  slider.appendChild(sliderLabel);
};

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvamF2YXNjcmlwdHMvaGVscGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qYXZhc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvamF2YXNjcmlwdHMvbWFwLmpzIiwid2VicGFjazovLy8uL3NyYy9qYXZhc2NyaXB0cy9zZWxlY3RlZC1tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2phdmFzY3JpcHRzL3NsaWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MiXSwibmFtZXMiOlsiY29sb3IiLCJkMyIsInNjYWxlTGluZWFyIiwiZG9tYWluIiwicmFuZ2UiLCJ0ZW1wZXJhdHVyZUNvbG9yIiwiaWQiLCJjb3VudHJ5VGVtcGVyYXR1cmUiLCJ1bmRlZmluZWQiLCJqc29uQ291bnRyeVRlbXBlcmF0dXJlIiwidGVtcGVyYXR1cmUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVuZGVyTWFwIiwibW9udGgiLCJ3aWR0aCIsImhlaWdodCIsImNlbnRlciIsInNlbnMiLCJjZW50ZXJlZEZlYXR1cmUiLCJ0aW1lciIsInNjYWxlQ2hhbmdlIiwic2VsZWN0ZWRGZWF0dXJlIiwib3JpZ2luYWxTY2FsZSIsInNjYWxlIiwiZ2xvYmVDb25maWciLCJzcGVlZCIsInZlcnRpY2FsVGlsdCIsImhvcml6b250YWxUaWx0Iiwic3ZnVmlzdWFsIiwic2VsZWN0IiwiYXBwZW5kIiwic3ZnRnVuY3Rpb25hbCIsImdWaXN1YWwiLCJnRnVuY3Rpb25hbCIsImF0dHIiLCJjYW52YXMiLCJzdHlsZSIsImNvbnRleHQiLCJzdGF0aW9uRGF0YSIsInByb2plY3Rpb24iLCJnZW9PcnRob2dyYXBoaWMiLCJ0cmFuc2xhdGUiLCJwYXRoIiwiZ2VvUGF0aCIsImluaXRpYWxTY2FsZSIsInF1ZXVlIiwiZGVmZXIiLCJqc29uIiwiYXdhaXQiLCJyZW5kZXJHbG9iYWxNYXAiLCJlcnJvciIsInRvcG9sb2d5IiwiaXNvVG9Db3VudHJ5TmFtZSIsInN0YXRpb25zIiwiZGF0YSIsInRlbXBSYW5nZUJnIiwicmVjdHMiLCJzZWxlY3RBbGwiLCJlbnRlciIsImQiLCJpIiwiaHRtbCIsImdlb2pzb24iLCJ0b3BvanNvbiIsImZlYXR1cmUiLCJvYmplY3RzIiwiY291bnRyaWVzIiwidG9vbHRpcCIsImRyYXdPY2VhbiIsImRyYXdHcmF0aWN1bGUiLCJmZWF0dXJlcyIsIm9uIiwiY2xpY2siLCJzdG9wIiwiY2xpY2tlZCIsInJlbmRlclNlbGVjdGVkQ291bnRyeSIsInNlbGVjdGVkQ291bnRyeU5hbWUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb3VudHJ5TmFtZSIsInNlbGVjdGVkQ291bnRyeVRlbXAiLCJpbm5lckhUTUwiLCJ0b0ZpeGVkIiwidGV4dCIsImV2ZW50IiwicGFnZVkiLCJwYWdlWCIsImNhbGwiLCJkcmFnIiwic3ViamVjdCIsInIiLCJyb3RhdGUiLCJ4IiwieSIsInNjYWxlRmFjdG9yIiwiZHJhd1N0YXRpb25zIiwiY2VudHJvaWQiLCJpbnZlcnRlZCIsImN1cnJlbnRSb3RhdGUiLCJkZXNpcmVkUm90YXRlIiwiY3VycmVudFNjYWxlIiwiZGVzaXJlZFNjYWxlIiwicyIsImludmVydCIsImludGVycG9sYXRlIiwidHJhbnNpdGlvbiIsImR1cmF0aW9uIiwidHdlZW4iLCJ0IiwiZW5hYmxlUm90YXRpb24iLCJyZW5kZXJTbGlkZXIiLCJzZWxlY3RlZENvdW50cnkiLCJnZXRFbGVtZW50QnlJZCIsImUiLCJzbGlkZXJMYWJlbCIsImN1cnJlbnRNb250aCIsIk51bWJlciIsInRhcmdldCIsInZhbHVlIiwiY3VycmVudE1vbnRoU3RyaW5nIiwibnVtTW9udGhUb05hbWUiLCJsZW5ndGgiLCJoYW5kbGVTbGlkZXIiLCJ6b29tIiwic2NhbGVFeHRlbnQiLCJJbmZpbml0eSIsInpvb21lZCIsInByZXZpb3VzU2NhbGVGYWN0b3IiLCJkeCIsInNvdXJjZUV2ZW50IiwibW92ZW1lbnRYIiwiZHkiLCJtb3ZlbWVudFkiLCJ0eXBlIiwic2F2ZSIsImNsZWFyUmVjdCIsInRyYW5zZm9ybSIsImsiLCJkcmF3U3RhdGlvbnNTcGVjaWZpZWRDYW52YXMiLCJub2RlIiwiZ2V0Q29udGV4dCIsInNldFRyYW5zZm9ybSIsInJlc3RvcmUiLCJwUm90YXRlIiwic3RhdGlvbiIsImxvYyIsIkxPTkdJVFVERSIsIkxBVElUVURFIiwibG9uZ2l0dWRlIiwic3RhcnRMb25naXR1ZGUiLCJlbmRMb25naXR1ZGUiLCJlbmRpbmciLCJiZWdpblBhdGgiLCJhcmMiLCJNYXRoIiwiUEkiLCJzdHJva2VTdHlsZSIsInN0cm9rZSIsImZpbGxTdHlsZSIsIlRBVkciLCJmaWxsIiwiZHJhd1N0YXRpb25zU3BlY2lmaWNNb250aCIsInNhdGlvbnNQZXJDb3VudHJ5IiwiaiIsInN0YXJ0aW5nQW5nbGUiLCJlbGFwc2VkIiwiZ3JhdGljdWxlIiwiZ2VvR3JhdGljdWxlIiwic3RlcCIsImFjdGlvbiIsImdlb2pzb25GZWF0dXJlIiwiY2VudGVyZWQiLCJjZW50ZXJTVkdQb3MiLCJnZW9NZXJjYXRvciIsImNpcmNsZVJhZGl1cyIsInN2ZyIsImciLCJib3VuZHMiLCJmaXRTaXplIiwicmVtb3ZlIiwidHJhbnNsYXRlRXh0ZW50IiwiZXh0ZW50Iiwic2NhbGVYWSIsInN0YXRpb25zVmFsdWUiLCJOQU1FIiwic2xpZGVyIiwic2V0QXR0cmlidXRlIiwiY3JlYXRlRWxlbWVudCIsInNsaWRlclNldHRpbmciLCJhcHBlbmRDaGlsZCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGlCQUFpQixtQkFBTyxDQUFDLHNEQUFhLEU7Ozs7Ozs7Ozs7OztBQ0F6Qjs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7O0FBRWhDLGFBQWEsbUJBQU8sQ0FBQyxpRUFBa0I7O0FBRXZDLGVBQWUsbUJBQU8sQ0FBQywyRUFBdUI7O0FBRTlDLG1CQUFtQixtQkFBTyxDQUFDLG1GQUEyQjs7QUFFdEQsc0JBQXNCLG1CQUFPLENBQUMseUZBQThCOztBQUU1RCxrQkFBa0IsbUJBQU8sQ0FBQyx5RUFBcUI7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNENBQTRDO0FBQzVDOztBQUVBLHVDQUF1Qzs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrSEFBa0g7O0FBRWxILHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLE9BQU87OztBQUdQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDOztBQUV4QztBQUNBLE1BQU07OztBQUdOO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhFQUE4RTs7QUFFOUU7QUFDQSxNQUFNOzs7QUFHTjtBQUNBO0FBQ0E7QUFDQSxrRUFBa0U7O0FBRWxFO0FBQ0EsTUFBTTs7O0FBR047QUFDQSwyR0FBMkc7O0FBRTNHO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7OztBQUdBO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMseUVBQXNCLEVBQUU7OztBQUdwRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOzs7QUFHTDtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCOztBQUV2QjtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQSxHQUFHO0FBQ0gsRTs7Ozs7Ozs7Ozs7O0FDdkthOztBQUViLFlBQVksbUJBQU8sQ0FBQyxrREFBUzs7QUFFN0IsV0FBVyxtQkFBTyxDQUFDLGdFQUFnQjs7QUFFbkMsWUFBWSxtQkFBTyxDQUFDLDREQUFjOztBQUVsQyxrQkFBa0IsbUJBQU8sQ0FBQyx3RUFBb0I7O0FBRTlDLGVBQWUsbUJBQU8sQ0FBQyx3REFBWTtBQUNuQztBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxNQUFNO0FBQ2xCOzs7QUFHQTtBQUNBO0FBQ0Esd0RBQXdEOztBQUV4RCxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRCxxQ0FBcUM7O0FBRXJDLG9CQUFvQjs7QUFFcEI7QUFDQTtBQUNBLEVBQUU7OztBQUdGLGVBQWUsbUJBQU8sQ0FBQyxrRUFBaUI7QUFDeEMsb0JBQW9CLG1CQUFPLENBQUMsNEVBQXNCO0FBQ2xELGlCQUFpQixtQkFBTyxDQUFDLHNFQUFtQixFQUFFOztBQUU5QztBQUNBO0FBQ0E7O0FBRUEsZUFBZSxtQkFBTyxDQUFDLG9FQUFrQjtBQUN6Qyx1QkFBdUI7O0FBRXZCLCtCOzs7Ozs7Ozs7Ozs7QUNsRGE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0I7Ozs7Ozs7Ozs7OztBQ2pCYTs7QUFFYixhQUFhLG1CQUFPLENBQUMsMkRBQVU7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZCOzs7Ozs7Ozs7Ozs7QUMxRGE7O0FBRWI7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7OztBQ0phOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTs7QUFFaEMsZUFBZSxtQkFBTyxDQUFDLHlFQUFxQjs7QUFFNUMseUJBQXlCLG1CQUFPLENBQUMsaUZBQXNCOztBQUV2RCxzQkFBc0IsbUJBQU8sQ0FBQywyRUFBbUI7O0FBRWpELGtCQUFrQixtQkFBTyxDQUFDLG1FQUFlO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0Esc0VBQXNFOztBQUV0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOzs7QUFHRjtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQztBQUNELHVCOzs7Ozs7Ozs7Ozs7QUN0RmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsWUFBWSxPQUFPO0FBQ25COzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLG9DOzs7Ozs7Ozs7Ozs7QUN0RGE7O0FBRWIsbUJBQW1CLG1CQUFPLENBQUMscUVBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxNQUFNO0FBQ25COzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUNsQmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZOztBQUVoQyxvQkFBb0IsbUJBQU8sQ0FBQyx1RUFBaUI7O0FBRTdDLGVBQWUsbUJBQU8sQ0FBQyx1RUFBb0I7O0FBRTNDLGVBQWUsbUJBQU8sQ0FBQyx5REFBYTs7QUFFcEMsb0JBQW9CLG1CQUFPLENBQUMscUZBQTRCOztBQUV4RCxrQkFBa0IsbUJBQU8sQ0FBQyxpRkFBMEI7QUFDcEQ7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQSx1Q0FBdUM7O0FBRXZDO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSCx3Q0FBd0M7O0FBRXhDLG9GQUFvRjs7QUFFcEYsMERBQTBELHFDQUFxQyxzQkFBc0I7QUFDckg7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EseUNBQXlDOztBQUV6QztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsMkNBQTJDOztBQUUzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSCxFOzs7Ozs7Ozs7Ozs7QUNoRWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsTUFBTTtBQUNuQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDM0NhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxtREFBVTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDekNhOztBQUViLGtCQUFrQixtQkFBTyxDQUFDLG1FQUFlO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxPQUFPO0FBQ2xCOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7OztBQ3BCYTs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsTUFBTTtBQUNqQixXQUFXLGVBQWU7QUFDMUIsYUFBYSxFQUFFO0FBQ2Y7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDbkJBLCtDQUFhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxrREFBUzs7QUFFN0IsMEJBQTBCLG1CQUFPLENBQUMsOEZBQStCOztBQUVqRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWM7O0FBRWQ7QUFDQTtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxpRUFBaUI7QUFDdkMsR0FBRztBQUNIO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLGdFQUFnQjtBQUN0Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdFQUF3RTtBQUN4RTtBQUNBOztBQUVBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsMEI7Ozs7Ozs7Ozs7Ozs7QUM1RmE7O0FBRWI7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDWmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUNqRWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjs7QUFFQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDWGE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHNDQUFzQztBQUN0QyxLQUFLO0FBQ0w7QUFDQSx3REFBd0Qsd0JBQXdCO0FBQ2hGO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQyxHOzs7Ozs7Ozs7Ozs7QUM5Q1k7QUFDYjtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUNiYTs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixjQUFjO0FBQ2Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhDQUE4Qzs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixjQUFjLFFBQVE7QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEc7Ozs7Ozs7Ozs7OztBQ3pEWTs7QUFFYixZQUFZLG1CQUFPLENBQUMsbURBQVU7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFOzs7Ozs7Ozs7Ozs7QUNYYTs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVksRUFBRTtBQUNsQzs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUNqRGE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDMUJhOztBQUViLFdBQVcsbUJBQU8sQ0FBQyxnRUFBZ0I7O0FBRW5DLGVBQWUsbUJBQU8sQ0FBQyx1RUFBVztBQUNsQztBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixXQUFXLFNBQVM7QUFDcEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVMsR0FBRyxTQUFTO0FBQzVDLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUMsT0FBTztBQUM5QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGdDQUFnQztBQUNoQyxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLHVDQUF1QyxPQUFPO0FBQzlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUN0V0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDUkE7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7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QUFULENBQXdCLFFBQXhCLENBQWY7QUFDQXlFLFFBQU0sQ0FBQ0MsWUFBUCxDQUFvQixJQUFwQixFQUEwQixrQkFBMUI7QUFFQSxNQUFNeEUsV0FBVyxHQUFHckMsUUFBUSxDQUFDOEcsYUFBVCxDQUF1QixLQUF2QixDQUFwQjtBQUNBekUsYUFBVyxDQUFDd0UsWUFBWixDQUF5QixJQUF6QixFQUErQixzQkFBL0I7QUFDQXhFLGFBQVcsQ0FBQ2pDLFNBQVosR0FBd0J1QyxjQUFjLENBQUMsRUFBRCxDQUF0QztBQUVBLE1BQU1vRSxhQUFhLEdBQUcvRyxRQUFRLENBQUM4RyxhQUFULENBQXVCLE9BQXZCLENBQXRCO0FBQ0FDLGVBQWEsQ0FBQ0YsWUFBZCxDQUEyQixJQUEzQixFQUFpQyxjQUFqQztBQUNBRSxlQUFhLENBQUNGLFlBQWQsQ0FBMkIsTUFBM0IsRUFBbUMsT0FBbkM7QUFDQUUsZUFBYSxDQUFDRixZQUFkLENBQTJCLEtBQTNCLEVBQWtDLEdBQWxDO0FBQ0FFLGVBQWEsQ0FBQ0YsWUFBZCxDQUEyQixLQUEzQixFQUFrQyxJQUFsQztBQUNBRSxlQUFhLENBQUNGLFlBQWQsQ0FBMkIsT0FBM0IsRUFBb0MsSUFBcEM7QUFDQUUsZUFBYSxDQUFDRixZQUFkLENBQTJCLE1BQTNCLEVBQW1DLEdBQW5DO0FBRUFELFFBQU0sQ0FBQ0ksV0FBUCxDQUFtQkQsYUFBbkI7QUFDQUgsUUFBTSxDQUFDSSxXQUFQLENBQW1CM0UsV0FBbkI7QUFDSCxDQWxCTSxDOzs7Ozs7Ozs7OztBQ2xCUCx1QyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvamF2YXNjcmlwdHMvaW5kZXguanNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG5cbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xuXG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xuXG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTsgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcblxuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0OyAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG5cbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcblxuXG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuXG5cbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpOyAvLyBDbGVhbiB1cCByZXF1ZXN0XG5cbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07IC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcblxuXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTsgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuXG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9OyAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG5cblxuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpOyAvLyBDbGVhbiB1cCByZXF1ZXN0XG5cbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07IC8vIEhhbmRsZSB0aW1lb3V0XG5cblxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcigndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLCByZXF1ZXN0KSk7IC8vIENsZWFuIHVwIHJlcXVlc3RcblxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTsgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cblxuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTsgLy8gQWRkIHhzcmYgaGVhZGVyXG5cblxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID8gY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOiB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9IC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG5cblxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcblxuXG4gICAgaWYgKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICB9IC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcblxuXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuXG5cbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9IC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG5cblxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTsgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuXG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9IC8vIFNlbmQgdGhlIHJlcXVlc3RcblxuXG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG5cbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xuXG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL2NvcmUvbWVyZ2VDb25maWcnKTtcblxudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cblxuXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTsgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcblxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7IC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG4gIHJldHVybiBpbnN0YW5jZTtcbn0gLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG5cblxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpOyAvLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcblxuYXhpb3MuQXhpb3MgPSBBeGlvczsgLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuXG5heGlvcy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGF4aW9zLmRlZmF1bHRzLCBpbnN0YW5jZUNvbmZpZykpO1xufTsgLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5cblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7IC8vIEV4cG9zZSBhbGwvc3ByZWFkXG5cbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcblxuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBheGlvczsgLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5cbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvczsiLCIndXNlIHN0cmljdCc7XG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuXG5cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5cblxuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuXG5cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcblxudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG5cbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xuXG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL21lcmdlQ29uZmlnJyk7XG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5cblxuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuXG5cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuICAgIGNvbmZpZy51cmwgPSBhcmd1bWVudHNbMF07XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICB9XG5cbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QgPyBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCkgOiAnZ2V0JzsgLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5BeGlvcy5wcm90b3R5cGUuZ2V0VXJpID0gZnVuY3Rpb24gZ2V0VXJpKGNvbmZpZykge1xuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICByZXR1cm4gYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLnJlcGxhY2UoL15cXD8vLCAnJyk7XG59OyAvLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcblxuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAodXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybFxuICAgIH0pKTtcbiAgfTtcbn0pO1xudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAodXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cblxuXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5cblxuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuXG5cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG5cbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xuXG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG5cbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb21iaW5lVVJMcycpO1xuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5cblxuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTsgLy8gU3VwcG9ydCBiYXNlVVJMIGNvbmZpZ1xuXG4gIGlmIChjb25maWcuYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChjb25maWcudXJsKSkge1xuICAgIGNvbmZpZy51cmwgPSBjb21iaW5lVVJMcyhjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gIH0gLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcblxuXG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307IC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcblxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoY29uZmlnLmRhdGEsIGNvbmZpZy5oZWFkZXJzLCBjb25maWcudHJhbnNmb3JtUmVxdWVzdCk7IC8vIEZsYXR0ZW4gaGVhZGVyc1xuXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LCBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSwgY29uZmlnLmhlYWRlcnMgfHwge30pO1xuICB1dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLCBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgfSk7XG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7IC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG5cbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShyZXNwb25zZS5kYXRhLCByZXNwb25zZS5oZWFkZXJzLCBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UpO1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpOyAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEocmVhc29uLnJlc3BvbnNlLmRhdGEsIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLCBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcblxuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG5cbiAgZXJyb3IucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIGVycm9yLmlzQXhpb3NFcnJvciA9IHRydWU7XG5cbiAgZXJyb3IudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgY29kZTogdGhpcy5jb2RlXG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gZXJyb3I7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbi8qKlxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxuICogYnkgbWVyZ2luZyB0d28gY29uZmlndXJhdGlvbiBvYmplY3RzIHRvZ2V0aGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuICB1dGlscy5mb3JFYWNoKFsndXJsJywgJ21ldGhvZCcsICdwYXJhbXMnLCAnZGF0YSddLCBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKHByb3ApIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH1cbiAgfSk7XG4gIHV0aWxzLmZvckVhY2goWydoZWFkZXJzJywgJ2F1dGgnLCAncHJveHknXSwgZnVuY3Rpb24gbWVyZ2VEZWVwUHJvcGVydGllcyhwcm9wKSB7XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSB1dGlscy5kZWVwTWVyZ2UoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gdXRpbHMuZGVlcE1lcmdlKGNvbmZpZzFbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzFbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcxW3Byb3BdO1xuICAgIH1cbiAgfSk7XG4gIHV0aWxzLmZvckVhY2goWydiYXNlVVJMJywgJ3RyYW5zZm9ybVJlcXVlc3QnLCAndHJhbnNmb3JtUmVzcG9uc2UnLCAncGFyYW1zU2VyaWFsaXplcicsICd0aW1lb3V0JywgJ3dpdGhDcmVkZW50aWFscycsICdhZGFwdGVyJywgJ3Jlc3BvbnNlVHlwZScsICd4c3JmQ29va2llTmFtZScsICd4c3JmSGVhZGVyTmFtZScsICdvblVwbG9hZFByb2dyZXNzJywgJ29uRG93bmxvYWRQcm9ncmVzcycsICdtYXhDb250ZW50TGVuZ3RoJywgJ3ZhbGlkYXRlU3RhdHVzJywgJ21heFJlZGlyZWN0cycsICdodHRwQWdlbnQnLCAnaHR0cHNBZ2VudCcsICdjYW5jZWxUb2tlbicsICdzb2NrZXRQYXRoJ10sIGZ1bmN0aW9uIGRlZmF1bHRUb0NvbmZpZzIocHJvcCkge1xuICAgIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMVtwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzFbcHJvcF07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGNvbmZpZztcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG5cbiAgaWYgKCF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmNvbmZpZywgbnVsbCwgcmVzcG9uc2UucmVxdWVzdCwgcmVzcG9uc2UpKTtcbiAgfVxufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuICByZXR1cm4gZGF0YTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyOyAvLyBPbmx5IE5vZGUuSlMgaGFzIGEgcHJvY2VzcyB2YXJpYWJsZSB0aGF0IGlzIG9mIFtbQ2xhc3NdXSBwcm9jZXNzXG5cbiAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy9odHRwJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfVxuXG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdBY2NlcHQnKTtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8IHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHwgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHwgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHwgdXRpbHMuaXNGaWxlKGRhdGEpIHx8IHV0aWxzLmlzQmxvYihkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvKiBJZ25vcmUgKi9cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcbmRlZmF1bHRzLmhlYWRlcnMgPSB7XG4gIGNvbW1vbjoge1xuICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJ1xuICB9XG59O1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzOyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLnJlcGxhY2UoLyU0MC9naSwgJ0AnKS5yZXBsYWNlKC8lM0EvZ2ksICc6JykucmVwbGFjZSgvJTI0L2csICckJykucmVwbGFjZSgvJTJDL2dpLCAnLCcpLnJlcGxhY2UoLyUyMC9nLCAnKycpLnJlcGxhY2UoLyU1Qi9naSwgJ1snKS5yZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcblxuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHZhciBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoJyMnKTtcblxuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cblxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTCA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKSA6IGJhc2VVUkw7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgPyAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbmZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgcmV0dXJuIHtcbiAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICB2YXIgY29va2llID0gW107XG4gICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICB9LFxuICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgIHJldHVybiBtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICB9XG4gIH07XG59KCkgOiAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG5mdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIHJldHVybiB7XG4gICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICB9O1xufSgpOyIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgPyAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3Rcbi8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgdmFyIG9yaWdpblVSTDtcbiAgLyoqXG4gICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICpcbiAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICogQHJldHVybnMge09iamVjdH1cbiAgKi9cblxuICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgaWYgKG1zaWUpIHtcbiAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgfVxuXG4gICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7IC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcblxuICAgIHJldHVybiB7XG4gICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgIHBhdGhuYW1lOiB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJyA/IHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDogJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICB9O1xuICB9XG5cbiAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gIC8qKlxuICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICpcbiAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICovXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgdmFyIHBhcnNlZCA9IHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XG4gICAgcmV0dXJuIHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdDtcbiAgfTtcbn0oKSA6IC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG5mdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG59KCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpOyAvLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xuXG5cbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFsnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLCAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJywgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCddO1xuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7XG4gICAgcmV0dXJuIHBhcnNlZDtcbiAgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gKHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gOiBbXSkuY29uY2F0KFt2YWxdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHBhcnNlZDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xuXG52YXIgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKTtcbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBGb3JtRGF0YTtcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuXG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIEFycmF5QnVmZmVyLmlzVmlldykge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IHZhbCAmJiB2YWwuYnVmZmVyICYmIHZhbC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcjtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuXG5cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgKG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnIHx8IG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTmF0aXZlU2NyaXB0JyB8fCBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05TJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJztcbn1cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuXG5cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfSAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcblxuXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5cblxuZnVuY3Rpb24gbWVyZ2UoKVxuLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovXG57XG4gIHZhciByZXN1bHQgPSB7fTtcblxuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogRnVuY3Rpb24gZXF1YWwgdG8gbWVyZ2Ugd2l0aCB0aGUgZGlmZmVyZW5jZSBiZWluZyB0aGF0IG5vIHJlZmVyZW5jZVxuICogdG8gb3JpZ2luYWwgb2JqZWN0cyBpcyBrZXB0LlxuICpcbiAqIEBzZWUgbWVyZ2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cblxuXG5mdW5jdGlvbiBkZWVwTWVyZ2UoKVxuLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovXG57XG4gIHZhciByZXN1bHQgPSB7fTtcblxuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IGRlZXBNZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IGRlZXBNZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuXG5cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZGVlcE1lcmdlOiBkZWVwTWVyZ2UsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICB0cmltOiB0cmltXG59OyIsIi8qIVxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIEJ1ZmZlclxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxodHRwczovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNCdWZmZXIob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmouY29uc3RydWN0b3IgIT0gbnVsbCAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopO1xufTsiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTsgLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQoKSB7XG4gIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5cbihmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gIH1cblxuICB0cnkge1xuICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgfVxufSkoKTtcblxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICB9IC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG5cblxuICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRyeSB7XG4gICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgfSAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG5cblxuICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgfVxuICB9XG59XG5cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBkcmFpbmluZyA9IGZhbHNlO1xuXG4gIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgfSBlbHNlIHtcbiAgICBxdWV1ZUluZGV4ID0gLTE7XG4gIH1cblxuICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgZHJhaW5RdWV1ZSgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gIGlmIChkcmFpbmluZykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICBkcmFpbmluZyA9IHRydWU7XG4gIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG5cbiAgd2hpbGUgKGxlbikge1xuICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgIHF1ZXVlID0gW107XG5cbiAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICB9XG5cbiAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgfVxuXG4gIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG5cbiAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICB9XG59OyAvLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5cblxuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gIHRoaXMuZnVuID0gZnVuO1xuICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xuXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIFtdO1xufTtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAnLyc7XG59O1xuXG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIDA7XG59OyIsImV4cG9ydCBjb25zdCBjb2xvciA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAuZG9tYWluKFsyMCwgNDAsIDUwLCA2NSwgNzUsIDg1LCA5MCwgMTAwXSlcbiAgICAucmFuZ2UoW1wiI2ZmZmFmYVwiLFxuICAgICAgICBcIiMwMGE2Y2FcIixcbiAgICAgICAgXCIjMDBjY2JjXCIsXG4gICAgICAgIFwiIzkwZWI5ZFwiLFxuICAgICAgICBcIiNmZmZmOGNcIixcbiAgICAgICAgXCIjZjlkMDU3XCIsXG4gICAgICAgIFwiI2YyOWUyZVwiLFxuICAgICAgICBcIiNkNzE5MWNcIl0pO1xuXG5leHBvcnQgY29uc3QgdGVtcGVyYXR1cmVDb2xvciA9IChpZCwgY291bnRyeVRlbXBlcmF0dXJlKSA9PiB7XG5cbiAgICBpZiAoY291bnRyeVRlbXBlcmF0dXJlW2lkXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGpzb25Db3VudHJ5VGVtcGVyYXR1cmUgPSBjb3VudHJ5VGVtcGVyYXR1cmVbaWRdLnRlbXBlcmF0dXJlO1xuICAgICAgICByZXR1cm4gY29sb3IoanNvbkNvdW50cnlUZW1wZXJhdHVyZSlcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJibGFja1wiXG4gICAgfVxufVxuIiwiaW1wb3J0IFwiLi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmltcG9ydCB7IHJlbmRlck1hcCB9IGZyb20gXCIuL21hcFwiO1xuaW1wb3J0IHsgcmVuZGVyU2xpZGVyIH0gZnJvbSBcIi4vc2xpZGVyXCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgcmVuZGVyTWFwKDEwKTtcbn0pOyIsImltcG9ydCB7XG4gICAgcmVuZGVyU2xpZGVyLFxuICAgIG51bU1vbnRoVG9OYW1lXG59IGZyb20gXCIuL3NsaWRlclwiO1xuXG5pbXBvcnQge1xuICAgIGNvbG9yLFxuICAgIHRlbXBlcmF0dXJlQ29sb3IsXG59IGZyb20gXCIuL2hlbHBlclwiXG5cbmltcG9ydCB7IHJlbmRlclNlbGVjdGVkQ291bnRyeSB9IGZyb20gXCIuL3NlbGVjdGVkLW1hcFwiO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyTWFwID0gKG1vbnRoKSA9PiB7XG5cbiAgICBsZXQgd2lkdGggPSA1MDAsXG4gICAgICAgIGhlaWdodCA9IDUwMCxcbiAgICAgICAgY2VudGVyID0gWy13aWR0aCAvIDIgKyAzLCAwXSxcbiAgICAgICAgc2VucyA9IDAuMjUsXG4gICAgICAgIGNlbnRlcmVkRmVhdHVyZSxcbiAgICAgICAgdGltZXIsXG4gICAgICAgIHNjYWxlQ2hhbmdlLFxuICAgICAgICBzZWxlY3RlZEZlYXR1cmUsXG4gICAgICAgIG9yaWdpbmFsU2NhbGUgPSBoZWlnaHQgLyAyLjEsXG4gICAgICAgIHNjYWxlID0gb3JpZ2luYWxTY2FsZTtcblxuICAgIGNvbnN0IGdsb2JlQ29uZmlnID0ge1xuICAgICAgICBzcGVlZDogMC4wMDUsXG4gICAgICAgIHZlcnRpY2FsVGlsdDogLTIzLjUsXG4gICAgICAgIGhvcml6b250YWxUaWx0OiAwXG4gICAgfVxuXG4gICAgbGV0IHN2Z1Zpc3VhbCA9IGQzLnNlbGVjdChcIiNtYXBcIikuYXBwZW5kKFwic3ZnXCIpLFxuICAgICAgICBzdmdGdW5jdGlvbmFsID0gZDMuc2VsZWN0KFwiI2Z1bmN0aW9uYWwtbWFwXCIpLmFwcGVuZChcInN2Z1wiKSxcbiAgICAgICAgZ1Zpc3VhbCA9IHN2Z1Zpc3VhbC5hcHBlbmQoJ2cnKSxcbiAgICAgICAgZ0Z1bmN0aW9uYWwgPSBzdmdGdW5jdGlvbmFsLmFwcGVuZCgnZycpO1xuXG4gICAgc3ZnVmlzdWFsLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCkuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpO1xuICAgIHN2Z0Z1bmN0aW9uYWwuYXR0cihcIndpZHRoXCIsIHdpZHRoKS5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG5cbiAgICBsZXQgY2FudmFzID0gZDMuc2VsZWN0KFwiI2NhbnZhc1wiKS5hcHBlbmQoXCJjYW52YXNcIik7XG4gICAgY2FudmFzXG4gICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAgICAgLnN0eWxlKCdwb3NpdGlvbicsICdhYnNvbHV0ZScpXG4gICAgICAgIC5zdHlsZSgnbGVmdCcsICcwJyk7XG5cbiAgICBsZXQgY29udGV4dCwgc3RhdGlvbkRhdGEgPSBbXTtcblxuICAgIGxldCBwcm9qZWN0aW9uID0gZDMuZ2VvT3J0aG9ncmFwaGljKCkudHJhbnNsYXRlKFt3aWR0aCAvIDIsIGhlaWdodCAvIDJdKSxcbiAgICAgICAgcGF0aCA9IGQzLmdlb1BhdGgoKS5wcm9qZWN0aW9uKHByb2plY3Rpb24pO1xuXG4gICAgY29uc3QgaW5pdGlhbFNjYWxlID0gcHJvamVjdGlvbi5zY2FsZSgpO1xuXG4gICAgcXVldWUoKVxuICAgICAgICAuZGVmZXIoZDMuanNvbiwgXCIuL2RhdGEvd29ybGQtMTEwbTIuanNvblwiKVxuICAgICAgICAuZGVmZXIoZDMuanNvbiwgYC4vZGF0YS90YXMtMjAxNi0ke21vbnRofS5qc29uYClcbiAgICAgICAgLmRlZmVyKGQzLmpzb24sIFwiLi9kYXRhL2lzby1udW0tdG8tY291bnRyeS5qc29uXCIpXG4gICAgICAgIC5kZWZlcihkMy5qc29uLCBgLi9kYXRhL2dzb20tMjAxNi0ke21vbnRofS10YXZnLXByY3AuanNvbmApXG4gICAgICAgIC5hd2FpdChyZW5kZXJHbG9iYWxNYXApO1xuXG4gICAgZnVuY3Rpb24gcmVuZGVyR2xvYmFsTWFwKFxuICAgICAgICBlcnJvcixcbiAgICAgICAgdG9wb2xvZ3ksXG4gICAgICAgIHRlbXBlcmF0dXJlLFxuICAgICAgICBpc29Ub0NvdW50cnlOYW1lLFxuICAgICAgICBzdGF0aW9ucyxcbiAgICApIHtcbiAgICAgICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcblxuICAgICAgICBzdGF0aW9uRGF0YSA9IHN0YXRpb25zO1xuXG4gICAgICAgIGNvbnN0IGRhdGEgPSBkMy5yYW5nZSgxMCk7XG5cbiAgICAgICAgLy8gY29uc3QgdGVtcFNjYWxlR3JvdXAgPSBzdmdWaXN1YWwuYXBwZW5kKFwidGVtcFNjYWxlR3JvdXBcIilcblxuICAgICAgICBjb25zdCB0ZW1wUmFuZ2VCZyA9IHN2Z1Zpc3VhbC5zZWxlY3RcblxuICAgICAgICBjb25zdCByZWN0cyA9IHN2Z1Zpc3VhbC5zZWxlY3RBbGwoXCIucmVjdHNcIilcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAgICAgICAgIC5hdHRyKFwieFwiLCAxMClcbiAgICAgICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIDEwKVxuICAgICAgICAgICAgLmF0dHIoXCJ5XCIsIChkLCBpKSA9PiAxMCArIGkgKiA5KVxuICAgICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCAxMClcbiAgICAgICAgICAgIC5hdHRyKFwiZmlsbFwiLCBkID0+IGNvbG9yKDEwMCAtIGQgKiAxMCkpXG4gICAgICAgICAgICAuYXR0cihcInN0cm9rZVwiLCBcImdyYXlcIik7XG5cbiAgICAgICAgc3ZnVmlzdWFsLnNlbGVjdEFsbChcInRleHRcIilcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgICAgICAgIC5odG1sKGQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBgJHsoMTAwIC0gZCAqIDEwKX0mIzE3NjtGYDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cihcImZvbnQtc2l6ZVwiLCBcIjAuMzJlbVwiKVxuICAgICAgICAgICAgLmF0dHIoXCJ4XCIsIDIzKVxuICAgICAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgMjApXG4gICAgICAgICAgICAuYXR0cihcInlcIiwgKGQsIGkpID0+IDIwICsgaSAqIDkpXG4gICAgICAgICAgICAuYXR0cihcIndpZHRoXCIsIDEwKVxuICAgICAgICAgICAgLmF0dHIoXCJmaWxsXCIsIGQgPT4gY29sb3IoMTAwIC0gZCAqIDEwKSlcblxuICAgICAgICBjb25zdCBnZW9qc29uID0gdG9wb2pzb24uZmVhdHVyZSh0b3BvbG9neSwgdG9wb2xvZ3kub2JqZWN0cy5jb3VudHJpZXMpO1xuXG4gICAgICAgIGNvbnN0IHRvb2x0aXAgPSBkMy5zZWxlY3QoXCIudG9vbHRpcFwiKTtcblxuICAgICAgICBkcmF3T2NlYW4oKTtcbiAgICAgICAgZHJhd0dyYXRpY3VsZSgpO1xuXG4gICAgICAgIGdWaXN1YWwuc2VsZWN0QWxsKFwicGF0aC5sYW5kXCIpXG4gICAgICAgICAgICAuZGF0YShnZW9qc29uLmZlYXR1cmVzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwibGFuZFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJkXCIsIHBhdGgpXG4gICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlbXBlcmF0dXJlQ29sb3IoZC5pZCwgdGVtcGVyYXR1cmUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGNvdW50cmllcyA9IGdGdW5jdGlvbmFsLnNlbGVjdEFsbChcInBhdGgubGFuZFwiKVxuICAgICAgICAgICAgLmRhdGEoZ2VvanNvbi5mZWF0dXJlcylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImxhbmRcIilcbiAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBwYXRoKVxuICAgICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBcInRyYW5zcGFyZW50XCIpXG4gICAgICAgICAgICAub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNsaWNrKGQsIHRlbXBlcmF0dXJlKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gY2xpY2soZCwgdGVtcGVyYXR1cmUpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkRmVhdHVyZSA9IGQ7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzZWxlY3RlZEZlYXR1cmUuaWQpO1xuICAgICAgICAgICAgdGltZXIuc3RvcCgpO1xuICAgICAgICAgICAgY2xpY2tlZChzZWxlY3RlZEZlYXR1cmUpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJzdGlsbCBtZVwiKVxuXG4gICAgICAgICAgICByZW5kZXJTZWxlY3RlZENvdW50cnkoXG4gICAgICAgICAgICAgICAgXCJ1cGRhdGVcIixcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEZlYXR1cmUsXG4gICAgICAgICAgICAgICAgdGVtcGVyYXR1cmVDb2xvcihzZWxlY3RlZEZlYXR1cmUuaWQsIHRlbXBlcmF0dXJlKSxcbiAgICAgICAgICAgICAgICBzdGF0aW9uRGF0YVtzZWxlY3RlZEZlYXR1cmUuaWRdKTtcbiAgICAgICAgICAgIHNlbGVjdGVkQ291bnRyeU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlbGVjdGVkLWNvdW50cnktbmFtZVwiKTtcbiAgICAgICAgICAgIGNvdW50cnlOYW1lID0gaXNvVG9Db3VudHJ5TmFtZVtzZWxlY3RlZEZlYXR1cmUuaWRdO1xuICAgICAgICAgICAgc2VsZWN0ZWRDb3VudHJ5VGVtcCA9IHRlbXBlcmF0dXJlW3NlbGVjdGVkRmVhdHVyZS5pZF0udGVtcGVyYXR1cmU7XG5cbiAgICAgICAgICAgIHNlbGVjdGVkQ291bnRyeU5hbWUuaW5uZXJIVE1MID0gYCR7Y291bnRyeU5hbWV9PC9icj5BdmcgVGVtcC4gJHtzZWxlY3RlZENvdW50cnlUZW1wLnRvRml4ZWQoMSl9ICYjMTc2O0ZgO1xuICAgICAgICB9XG5cbiAgICAgICAgY291bnRyaWVzLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgICAgICAgICAuYXR0cihcImZpbGxcIiwgXCJncmV5XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwic3Ryb2tlXCIsIFwiI2VlZVwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIDMpO1xuXG4gICAgICAgICAgICByZXR1cm4gdG9vbHRpcC5zdHlsZShcIm9wYWNpdHlcIiwgLjkpXG4gICAgICAgICAgICAgICAgLnRleHQoaXNvVG9Db3VudHJ5TmFtZVtkLmlkXSk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB0b29sdGlwLnN0eWxlKFwib3BhY2l0eVwiLCAuOSlcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIChkMy5ldmVudC5wYWdlWSkgKyBcInB4XCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgKGQzLmV2ZW50LnBhZ2VYICsgMTApICsgXCJweFwiKVxuICAgICAgICAgICAgICAgICAgICAudGV4dChpc29Ub0NvdW50cnlOYW1lW2QuaWRdKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cihcImZpbGxcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cihcInN0cm9rZS13aWR0aFwiLCAxKTtcbiAgICAgICAgICAgICAgICB0b29sdGlwLnN0eWxlKFwib3BhY2l0eVwiLCAwKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgMCArIFwicHhcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCAwICsgXCJweFwiKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGdGdW5jdGlvbmFsLmNhbGwoXG4gICAgICAgICAgICBkMy5kcmFnKClcbiAgICAgICAgICAgICAgICAuc3ViamVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHIgPSBwcm9qZWN0aW9uLnJvdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogclswXSAvIHNlbnMsIHk6IC1yWzFdIC8gc2Vuc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8geDogclswXSwgeTogclsxXVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKFwiZHJhZ1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVyLnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm90YXRlID0gcHJvamVjdGlvbi5yb3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlRmFjdG9yID0gaW5pdGlhbFNjYWxlIC8gcHJvamVjdGlvbi5zY2FsZSgpO1xuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0aW9uLnJvdGF0ZShbZDMuZXZlbnQueCAqIHNlbnMsIC1kMy5ldmVudC55ICogc2Vucywgcm90YXRlWzJdXSk7XG4gICAgICAgICAgICAgICAgICAgIHN2Z1Zpc3VhbC5zZWxlY3RBbGwoXCJwYXRoXCIpLmF0dHIoXCJkXCIsIHBhdGgpO1xuICAgICAgICAgICAgICAgICAgICBzdmdGdW5jdGlvbmFsLnNlbGVjdEFsbChcInBhdGhcIikuYXR0cihcImRcIiwgcGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIGRyYXdTdGF0aW9ucygpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBjb25zdCBjbGlja2VkID0gKHNlbGVjdGVkRmVhdHVyZSkgPT4ge1xuXG4gICAgICAgICAgICBsZXQgY2VudHJvaWQsIGludmVydGVkLCBjdXJyZW50Um90YXRlLCBkZXNpcmVkUm90YXRlLCByLCBjdXJyZW50U2NhbGUsIGRlc2lyZWRTY2FsZSwgcztcblxuICAgICAgICAgICAgaWYgKCFzZWxlY3RlZEZlYXR1cmUgfHwgY2VudGVyZWRGZWF0dXJlID09PSBzZWxlY3RlZEZlYXR1cmUpIHtcbiAgICAgICAgICAgICAgICBjZW50ZXJlZEZlYXR1cmUgPSBudWxsO1xuICAgICAgICAgICAgICAgIGNlbnRyb2lkID0gcGF0aC5jZW50cm9pZChzZWxlY3RlZEZlYXR1cmUpO1xuICAgICAgICAgICAgICAgIGludmVydGVkID0gcHJvamVjdGlvbi5pbnZlcnQoW2NlbnRyb2lkWzBdLCBjZW50cm9pZFsxXV0pO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRSb3RhdGUgPSBwcm9qZWN0aW9uLnJvdGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgY3VycmVudFNjYWxlID0gcHJvamVjdGlvbi5zY2FsZSgpO1xuXG4gICAgICAgICAgICAgICAgciA9IGQzLmludGVycG9sYXRlKGN1cnJlbnRSb3RhdGUsIFtjdXJyZW50Um90YXRlWzBdLCBnbG9iZUNvbmZpZy52ZXJ0aWNhbFRpbHQsIGdsb2JlQ29uZmlnLmhvcml6b250YWxUaWx0XSk7XG4gICAgICAgICAgICAgICAgLy8gcyA9IGQzLmludGVycG9sYXRlKGN1cnJlbnRTY2FsZSwgaW5pdGlhbFNjYWxlKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjZW50cm9pZCA9IHBhdGguY2VudHJvaWQoc2VsZWN0ZWRGZWF0dXJlKTtcbiAgICAgICAgICAgICAgICBpbnZlcnRlZCA9IHByb2plY3Rpb24uaW52ZXJ0KFtjZW50cm9pZFswXSwgY2VudHJvaWRbMV1dKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50Um90YXRlID0gcHJvamVjdGlvbi5yb3RhdGUoKTtcblxuICAgICAgICAgICAgICAgIGN1cnJlbnRTY2FsZSA9IHByb2plY3Rpb24uc2NhbGUoKTtcbiAgICAgICAgICAgICAgICAvLyBkZXNpcmVkU2NhbGUgPSBwcm9qZWN0aW9uLnNjYWxlKCk7XG5cbiAgICAgICAgICAgICAgICByID0gZDMuaW50ZXJwb2xhdGUoY3VycmVudFJvdGF0ZSwgWy1pbnZlcnRlZFswXSwgLWludmVydGVkWzFdXSk7XG4gICAgICAgICAgICAgICAgLy8gcyA9IGQzLmludGVycG9sYXRlKGN1cnJlbnRTY2FsZSwgMjAwKTtcbiAgICAgICAgICAgICAgICBjZW50ZXJlZEZlYXR1cmUgPSBzZWxlY3RlZEZlYXR1cmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnVmlzdWFsLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgIC5kdXJhdGlvbig3NTApXG4gICAgICAgICAgICAgICAgLnR3ZWVuKFwicm90YXRlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0aW9uLnJvdGF0ZShyKHQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN2Z1Zpc3VhbC5zZWxlY3RBbGwoXCJwYXRoXCIpLmF0dHIoXCJkXCIsIHBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ZnRnVuY3Rpb25hbC5zZWxlY3RBbGwoXCJwYXRoXCIpLmF0dHIoXCJkXCIsIHBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJhd1N0YXRpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5vbihcImVuZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2VudGVyZWRGZWF0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVSb3RhdGlvbihjdXJyZW50Um90YXRlWzBdKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRDb3VudHJ5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VsZWN0ZWQtY291bnRyeS1uYW1lXCIpO1xuICAgICAgICAgICAgbGV0IGNvdW50cnlOYW1lID0gaXNvVG9Db3VudHJ5TmFtZVtzZWxlY3RlZEZlYXR1cmUuaWRdO1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkQ291bnRyeVRlbXAgPSB0ZW1wZXJhdHVyZVtzZWxlY3RlZEZlYXR1cmUuaWRdLnRlbXBlcmF0dXJlO1xuXG4gICAgICAgICAgICBzZWxlY3RlZENvdW50cnlOYW1lLmlubmVySFRNTCA9IGAke2NvdW50cnlOYW1lfTwvYnI+QXZnIFRlbXAuICR7c2VsZWN0ZWRDb3VudHJ5VGVtcC50b0ZpeGVkKDEpIH0gJiMxNzY7RmA7XG4gICAgICAgIH07XG5cbiAgICAgICAgZW5hYmxlUm90YXRpb24oKTtcblxuICAgICAgICByZW5kZXJTbGlkZXIoKTtcbiAgICAgICAgcmVuZGVyU2VsZWN0ZWRDb3VudHJ5KFxuICAgICAgICAgICAgXCJjcmVhdGVcIixcbiAgICAgICAgICAgIGdlb2pzb24uZmVhdHVyZXNbNV0sXG4gICAgICAgICAgICBjb2xvcih0ZW1wZXJhdHVyZVtnZW9qc29uLmZlYXR1cmVzWzVdLmlkXS50ZW1wZXJhdHVyZSksXG4gICAgICAgICAgICBzdGF0aW9uc1tnZW9qc29uLmZlYXR1cmVzWzVdLmlkXSxcbiAgICAgICAgKTtcblxuICAgICAgICBsZXQgc2VsZWN0ZWRDb3VudHJ5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VsZWN0ZWQtY291bnRyeS1uYW1lXCIpO1xuICAgICAgICBsZXQgY291bnRyeU5hbWUgPSBpc29Ub0NvdW50cnlOYW1lW2dlb2pzb24uZmVhdHVyZXNbNV0uaWRdO1xuICAgICAgICBsZXQgc2VsZWN0ZWRDb3VudHJ5VGVtcCA9IHRlbXBlcmF0dXJlW2dlb2pzb24uZmVhdHVyZXNbNV0uaWRdLnRlbXBlcmF0dXJlO1xuXG4gICAgICAgIHNlbGVjdGVkQ291bnRyeU5hbWUuaW5uZXJIVE1MID0gYCR7Y291bnRyeU5hbWV9PC9icj5BdmcgVGVtcC4gJHtzZWxlY3RlZENvdW50cnlUZW1wLnRvRml4ZWQoMSkgfSAmIzE3NjtGYDtcblxuICAgICAgICBsZXQgc2VsZWN0ZWRDb3VudHJ5O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vbnRoLXNsaWRlclwiKVxuICAgICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzbGlkZXJMYWJlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2xpZGVyLWN1cnJlbnQtbW9udGhcIik7XG5cbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudE1vbnRoID0gTnVtYmVyKGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudE1vbnRoU3RyaW5nID0gZS50YXJnZXQudmFsdWU7XG5cbiAgICAgICAgICAgICAgICBzbGlkZXJMYWJlbC5pbm5lckhUTUwgPSBudW1Nb250aFRvTmFtZVtjdXJyZW50TW9udGhdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRNb250aFN0cmluZy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE1vbnRoU3RyaW5nID0gXCIwXCIgKyBjdXJyZW50TW9udGhTdHJpbmc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcXVldWUoKVxuICAgICAgICAgICAgICAgICAgICAvLyAuZGVmZXIoZDMuanNvbiwgXCIuL2RhdGEvd29ybGQtMTEwbTIuanNvblwiKVxuICAgICAgICAgICAgICAgICAgICAuZGVmZXIoZDMuanNvbiwgYC4vZGF0YS90YXMtMjAxNi0ke2N1cnJlbnRNb250aFN0cmluZ30uanNvbmApXG4gICAgICAgICAgICAgICAgICAgIC8vIC5kZWZlcihkMy5qc29uLCBcIi4vZGF0YS9pc28tbnVtLXRvLWNvdW50cnkuanNvblwiKVxuICAgICAgICAgICAgICAgICAgICAuZGVmZXIoZDMuanNvbiwgYC4vZGF0YS9nc29tLTIwMTYtJHtjdXJyZW50TW9udGhTdHJpbmd9LXRhdmctcHJjcC5qc29uYClcbiAgICAgICAgICAgICAgICAgICAgLmF3YWl0KGhhbmRsZVNsaWRlcik7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaGFuZGxlU2xpZGVyKFxuICAgICAgICAgICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgICAgICAgICAgdGVtcGVyYXR1cmUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRpb25zXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGVsbG9cIilcblxuICAgICAgICAgICAgICAgICAgICBnVmlzdWFsLnNlbGVjdEFsbChcInBhdGgubGFuZFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZW1wZXJhdHVyZUNvbG9yKGQuaWQsIHRlbXBlcmF0dXJlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJzdHJva2VcIiwgXCIjZWVlXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBnRnVuY3Rpb25hbCA9IGQzLnNlbGVjdChcIiNzZWxlY3RlZC1jb3VudHJ5XCIpLnNlbGVjdCgnZycpO1xuXG4gICAgICAgICAgICAgICAgICAgIGdGdW5jdGlvbmFsLnNlbGVjdEFsbChcInBhdGhcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENvdW50cnkgPSBkLmlkIHx8IHNlbGVjdGVkQ291bnRyeTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVtcGVyYXR1cmVDb2xvcihkLmlkLCB0ZW1wZXJhdHVyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwic3Ryb2tlXCIsIFwiI2VlZVwiKTtcblxuICAgICAgICAgICAgICAgICAgICBjb3VudHJpZXMub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2soZCwgdGVtcGVyYXR1cmUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBkMy5qc29uKGAuL2RhdGEvZ3NvbS0yMDE2LSR7Y3VycmVudE1vbnRoU3RyaW5nfS10YXZnLXByY3AuanNvbmAsIGZ1bmN0aW9uIChlcnJvciwgc3RhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBzdGF0aW9uRGF0YSA9IHN0YXRpb25zO1xuICAgICAgICAgICAgICAgICAgICBkcmF3U3RhdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyU2VsZWN0ZWRDb3VudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ1cGRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRmVhdHVyZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlQ29sb3Ioc2VsZWN0ZWRDb3VudHJ5LCB0ZW1wZXJhdHVyZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aW9uRGF0YVtzZWxlY3RlZENvdW50cnldXG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDb3VudHJ5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VsZWN0ZWQtY291bnRyeS1uYW1lXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb3VudHJ5TmFtZSA9IGlzb1RvQ291bnRyeU5hbWVbc2VsZWN0ZWRGZWF0dXJlLmlkXTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDb3VudHJ5VGVtcCA9IHRlbXBlcmF0dXJlW3NlbGVjdGVkRmVhdHVyZS5pZF0udGVtcGVyYXR1cmU7XG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDb3VudHJ5TmFtZS5pbm5lckhUTUwgPSBgJHtjb3VudHJ5TmFtZX08L2JyPkF2ZyBUZW1wLiAke3NlbGVjdGVkQ291bnRyeVRlbXAudG9GaXhlZCgxKSB9ICYjMTc2O0ZgO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAvLyBkMy5qc29uKGAuL2RhdGEvdGFzLTIwMTYtJHtjdXJyZW50TW9udGhTdHJpbmd9Lmpzb25gLCBmdW5jdGlvbiAoZXJyb3IsIHRlbXBlcmF0dXJlKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XG5cbiAgICAgICAgICAgICAgICAvLyAgICAgZ1Zpc3VhbC5zZWxlY3RBbGwoXCJwYXRoLmxhbmRcIilcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm4gdGVtcGVyYXR1cmVDb2xvcihkLmlkLCB0ZW1wZXJhdHVyZSk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgLnN0eWxlKFwic3Ryb2tlXCIsIFwiI2VlZVwiKTtcblxuICAgICAgICAgICAgICAgIC8vICAgICBsZXQgZ0Z1bmN0aW9uYWwgPSBkMy5zZWxlY3QoXCIjc2VsZWN0ZWQtY291bnRyeVwiKS5zZWxlY3QoJ2cnKTtcblxuICAgICAgICAgICAgICAgIC8vICAgICBnRnVuY3Rpb25hbC5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgc2VsZWN0ZWRDb3VudHJ5ID0gZC5pZCB8fCBzZWxlY3RlZENvdW50cnk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgcmV0dXJuIHRlbXBlcmF0dXJlQ29sb3IoZC5pZCwgdGVtcGVyYXR1cmUpO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIC5zdHlsZShcInN0cm9rZVwiLCBcIiNlZWVcIik7XG5cbiAgICAgICAgICAgICAgICAvLyAgICAgY291bnRyaWVzLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNsaWNrKGQsIHRlbXBlcmF0dXJlKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gICAgIGQzLmpzb24oYC4vZGF0YS9nc29tLTIwMTYtJHtjdXJyZW50TW9udGhTdHJpbmd9LXRhdmctcHJjcC5qc29uYCwgZnVuY3Rpb24gKGVycm9yLCBzdGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBzdGF0aW9uRGF0YSA9IHN0YXRpb247XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBkcmF3U3RhdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHJlbmRlclNlbGVjdGVkQ291bnRyeShcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBcInVwZGF0ZVwiLFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHNlbGVjdGVkRmVhdHVyZSxcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB0ZW1wZXJhdHVyZUNvbG9yKHNlbGVjdGVkQ291bnRyeSwgdGVtcGVyYXR1cmUpLFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIC8vIHN0YXRpb25EYXRhKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBzdGF0aW9uRGF0YVtzZWxlY3RlZENvdW50cnldKTtcblxuICAgICAgICAgICAgICAgIC8vICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIH0pXG5cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAvLyB6b29tIGFuZCBwYW5cbiAgICBjb25zdCB6b29tID0gZDMuem9vbSgpXG4gICAgICAgIC5zY2FsZUV4dGVudChbMSwgSW5maW5pdHldKVxuICAgICAgICAub24oJ3pvb20nLCAoKSA9PiB7XG4gICAgICAgICAgICB6b29tZWQoKTtcbiAgICAgICAgfSlcblxuICAgIGdGdW5jdGlvbmFsLmNhbGwoem9vbSk7XG5cbiAgICBsZXQgcHJldmlvdXNTY2FsZUZhY3RvciA9IDEsIG9yaWdpbmFsU2NhbGUgPSBoZWlnaHQgLyAyLjE7XG5cbiAgICBmdW5jdGlvbiB6b29tZWQoKSB7XG5cbiAgICAgICAgbGV0IGR4ID0gZDMuZXZlbnQuc291cmNlRXZlbnQubW92ZW1lbnRYO1xuICAgICAgICBsZXQgZHkgPSBkMy5ldmVudC5zb3VyY2VFdmVudC5tb3ZlbWVudFk7XG5cbiAgICAgICAgbGV0IGV2ZW50ID0gZDMuZXZlbnQuc291cmNlRXZlbnQudHlwZTtcblxuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwic2NhbGUtcHJlXCIsc2NhbGUpO1xuXG4gICAgICAgIGlmIChldmVudCA9PT0gJ3doZWVsJykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZDMuZXZlbnQudHJhbnNmb3JtLmspO1xuICAgICAgICAgICAgbGV0IHNjYWxlRmFjdG9yID0gZDMuZXZlbnQudHJhbnNmb3JtLms7XG4gICAgICAgICAgICBzY2FsZUNoYW5nZSA9IHNjYWxlRmFjdG9yIC0gcHJldmlvdXNTY2FsZUZhY3RvcjtcbiAgICAgICAgICAgIHNjYWxlID0gc2NhbGUgKyBzY2FsZUNoYW5nZSAqIG9yaWdpbmFsU2NhbGU7XG5cbiAgICAgICAgICAgIHByb2plY3Rpb24uc2NhbGUoc2NhbGUpO1xuICAgICAgICAgICAgcHJldmlvdXNTY2FsZUZhY3RvciA9IHNjYWxlRmFjdG9yO1xuXG4gICAgICAgICAgICBnVmlzdWFsLnNlbGVjdEFsbChcInBhdGhcIikuYXR0cihcImRcIiwgcGF0aCk7XG4gICAgICAgICAgICBnRnVuY3Rpb25hbC5zZWxlY3RBbGwoXCJwYXRoXCIpLmF0dHIoXCJkXCIsIHBhdGgpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIC8vIGxldCByID0gcHJvamVjdGlvbi5yb3RhdGUoKTtcbiAgICAgICAgICAgIC8vIHJvdGF0aW9uID0gW3JbMF0gKyBkeCAqIDAuNCwgclsxXSAtIGR5ICogMC41LCByWzJdXTtcbiAgICAgICAgICAgIC8vIHByb2plY3Rpb24ucm90YXRlKHJvdGF0aW9uKTtcblxuICAgICAgICAgICAgLy8gZ1Zpc3VhbC5zZWxlY3RBbGwoXCJwYXRoXCIpLmF0dHIoXCJkXCIsIHBhdGgpO1xuICAgICAgICAgICAgLy8gZ0Z1bmN0aW9uYWwuc2VsZWN0QWxsKFwicGF0aFwiKS5hdHRyKFwiZFwiLCBwYXRoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXdTdGF0aW9ucyk7XG4gICAgICAgIGRyYXdTdGF0aW9ucygpO1xuXG4gICAgICAgIC8vIGNvbnRleHQucmVzdG9yZSgpO1xuXG4gICAgfVxufVxuZnVuY3Rpb24gZHJhd1N0YXRpb25zU3BlY2lmaWVkQ2FudmFzKGNhbnZhcywgc3RhdGlvbkRhdGEpIHtcbiAgICBjb250ZXh0ID0gY2FudmFzLm5vZGUoKS5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGNvbnRleHQuc2F2ZSgpO1xuXG4gICAgY29udGV4dC5zZXRUcmFuc2Zvcm0oWzEsIDAsIDAsIDEsIDAsIDBdKTtcblxuICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgY29udGV4dC5yZXN0b3JlKCk7XG5cbiAgICBjb25zdCBwUm90YXRlID0gcHJvamVjdGlvbi5yb3RhdGUoKTtcblxuICAgIGZvciAobGV0IGkgaW4gc3RhdGlvbkRhdGEpIHtcbiAgICAgICAgbGV0IHN0YXRpb24gPSBzdGF0aW9uRGF0YVtpXSxcblxuICAgICAgICAgICAgbG9jID0gc3RhdGlvbiA/IHByb2plY3Rpb24oW3N0YXRpb24uTE9OR0lUVURFLCBzdGF0aW9uLkxBVElUVURFXSkgOiBudWxsO1xuXG4gICAgICAgIGlmIChsb2MpIHtcbiAgICAgICAgICAgIGxldCBsb25naXR1ZGUgPSBOdW1iZXIoc3RhdGlvbi5MT05HSVRVREUpICsgMTgwLFxuICAgICAgICAgICAgICAgIHN0YXJ0TG9uZ2l0dWRlID0gMzYwIC0gKChwUm90YXRlWzBdICsgMjcwKSAlIDM2MCksXG4gICAgICAgICAgICAgICAgZW5kTG9uZ2l0dWRlID0gKHN0YXJ0TG9uZ2l0dWRlICsgMTgwKSAlIDM2MDtcblxuICAgICAgICAgICAgaWYgKChzdGFydExvbmdpdHVkZSA8IGVuZExvbmdpdHVkZSAmJlxuICAgICAgICAgICAgICAgIGxvbmdpdHVkZSA+IHN0YXJ0TG9uZ2l0dWRlICYmXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlIDwgZW5kTG9uZ2l0dWRlKSB8fFxuICAgICAgICAgICAgICAgIChzdGFydExvbmdpdHVkZSA+IGVuZExvbmdpdHVkZSAmJlxuICAgICAgICAgICAgICAgICAgICAobG9uZ2l0dWRlID4gc3RhcnRMb25naXR1ZGUgfHwgbG9uZ2l0dWRlIDwgZW5kTG9uZ2l0dWRlKSkpIHtcblxuICAgICAgICAgICAgICAgIGxldCBlbmRpbmcgPSBwcm9qZWN0aW9uKFtzdGF0aW9uLkxPTkdJVFVERSwgc3RhdGlvbi5MQVRJVFVERV0pO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5hcmMoZW5kaW5nWzBdLCBlbmRpbmdbMV0sIDIsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJ3JnYmEoMTQ0LCAyNTMsIDIyMiwgJyArIDAuOSArICcpJztcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3Ioc3RhdGlvbi5UQVZHICogKDkgLyA1KSArIDMyKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGwoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG59XG5cbiAgICBmdW5jdGlvbiBkcmF3U3RhdGlvbnNTcGVjaWZpY01vbnRoKHN0YXRpb25EYXRhKSB7XG4gICAgICAgIGNvbnRleHQgPSBjYW52YXMubm9kZSgpLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuXG4gICAgICAgIGNvbnRleHQuc2V0VHJhbnNmb3JtKFsxLCAwLCAwLCAxLCAwLCAwXSk7XG5cbiAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG5cbiAgICAgICAgY29uc3QgcFJvdGF0ZSA9IHByb2plY3Rpb24ucm90YXRlKCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSBpbiBzdGF0aW9uRGF0YSkge1xuICAgICAgICAgICAgbGV0IHNhdGlvbnNQZXJDb3VudHJ5ID0gc3RhdGlvbkRhdGFbaV07XG4gICAgICAgICAgICBmb3IgKGxldCBqIGluIHNhdGlvbnNQZXJDb3VudHJ5KSB7XG4gICAgICAgICAgICAgICAgbGV0IHN0YXRpb24gPSBzYXRpb25zUGVyQ291bnRyeVtqXSxcblxuICAgICAgICAgICAgICAgICAgICBsb2MgPSBzdGF0aW9uID8gcHJvamVjdGlvbihbc3RhdGlvbi5MT05HSVRVREUsIHN0YXRpb24uTEFUSVRVREVdKSA6IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZiAobG9jKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsb25naXR1ZGUgPSBOdW1iZXIoc3RhdGlvbi5MT05HSVRVREUpICsgMTgwLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRMb25naXR1ZGUgPSAzNjAgLSAoKHBSb3RhdGVbMF0gKyAyNzApICUgMzYwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZExvbmdpdHVkZSA9IChzdGFydExvbmdpdHVkZSArIDE4MCkgJSAzNjA7XG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAoKHN0YXJ0TG9uZ2l0dWRlIDwgZW5kTG9uZ2l0dWRlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBsb25naXR1ZGUgPiBzdGFydExvbmdpdHVkZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgbG9uZ2l0dWRlIDwgZW5kTG9uZ2l0dWRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgKHN0YXJ0TG9uZ2l0dWRlID4gZW5kTG9uZ2l0dWRlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGxvbmdpdHVkZSA+IHN0YXJ0TG9uZ2l0dWRlIHx8IGxvbmdpdHVkZSA8IGVuZExvbmdpdHVkZSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJ3JnYmEoMTQ0LCAyNTMsIDIyMiwgJyArIDAuOSArICcpJztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAncmdiYSgwLDAsMCwxKSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW5kaW5nID0gcHJvamVjdGlvbihbc3RhdGlvbi5MT05HSVRVREUsIHN0YXRpb24uTEFUSVRVREVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnRleHQubGluZVdpZHRoID0gMlxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuYXJjKGVuZGluZ1swXSwgZW5kaW5nWzFdLCAyLCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcihzdGF0aW9uLlRBVkcgKiAoOSAvIDUpICsgMzIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuZnVuY3Rpb24gZHJhd1N0YXRpb25zKCkge1xuICAgIGNvbnRleHQgPSBjYW52YXMubm9kZSgpLmdldENvbnRleHQoJzJkJyk7XG4gICAgY29udGV4dC5zYXZlKCk7XG5cbiAgICBjb250ZXh0LnNldFRyYW5zZm9ybShbMSwgMCwgMCwgMSwgMCwgMF0pO1xuXG4gICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICBjb250ZXh0LnJlc3RvcmUoKTtcblxuICAgIGNvbnN0IHBSb3RhdGUgPSBwcm9qZWN0aW9uLnJvdGF0ZSgpO1xuXG4gICAgZm9yIChsZXQgaSBpbiBzdGF0aW9uRGF0YSkge1xuICAgICAgICBsZXQgc2F0aW9uc1BlckNvdW50cnkgPSBzdGF0aW9uRGF0YVtpXTtcbiAgICAgICAgZm9yIChsZXQgaiBpbiBzYXRpb25zUGVyQ291bnRyeSkge1xuICAgICAgICAgICAgbGV0IHN0YXRpb24gPSBzYXRpb25zUGVyQ291bnRyeVtqXSxcblxuICAgICAgICAgICAgICAgIGxvYyA9IHN0YXRpb24gPyBwcm9qZWN0aW9uKFtzdGF0aW9uLkxPTkdJVFVERSwgc3RhdGlvbi5MQVRJVFVERV0pIDogbnVsbDtcblxuICAgICAgICAgICAgaWYgKGxvYykge1xuICAgICAgICAgICAgICAgIGxldCBsb25naXR1ZGUgPSBOdW1iZXIoc3RhdGlvbi5MT05HSVRVREUpICsgMTgwLFxuICAgICAgICAgICAgICAgICAgICBzdGFydExvbmdpdHVkZSA9IDM2MCAtICgocFJvdGF0ZVswXSArIDI3MCkgJSAzNjApLFxuICAgICAgICAgICAgICAgICAgICBlbmRMb25naXR1ZGUgPSAoc3RhcnRMb25naXR1ZGUgKyAxODApICUgMzYwO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAoKHN0YXJ0TG9uZ2l0dWRlIDwgZW5kTG9uZ2l0dWRlICYmXG4gICAgICAgICAgICAgICAgICAgIGxvbmdpdHVkZSA+IHN0YXJ0TG9uZ2l0dWRlICYmXG4gICAgICAgICAgICAgICAgICAgIGxvbmdpdHVkZSA8IGVuZExvbmdpdHVkZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgKHN0YXJ0TG9uZ2l0dWRlID4gZW5kTG9uZ2l0dWRlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAobG9uZ2l0dWRlID4gc3RhcnRMb25naXR1ZGUgfHwgbG9uZ2l0dWRlIDwgZW5kTG9uZ2l0dWRlKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9ICdyZ2JhKDE0NCwgMjUzLCAyMjIsICcgKyAwLjkgKyAnKSc7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAncmdiYSgwLDAsMCwxKSc7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmRpbmcgPSBwcm9qZWN0aW9uKFtzdGF0aW9uLkxPTkdJVFVERSwgc3RhdGlvbi5MQVRJVFVERV0pO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb250ZXh0LmxpbmVXaWR0aCA9IDJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5hcmMoZW5kaW5nWzBdLCBlbmRpbmdbMV0sIDIsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcihzdGF0aW9uLlRBVkcgKiAoOSAvIDUpICsgMzIpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGwoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZW5hYmxlUm90YXRpb24oc3RhcnRpbmdBbmdsZSA9IDMwMCkge1xuICAgIHRpbWVyID0gZDMudGltZXIoZnVuY3Rpb24gKGVsYXBzZWQpIHtcbiAgICAgICAgcHJvamVjdGlvbi5yb3RhdGUoW3N0YXJ0aW5nQW5nbGUgKyBnbG9iZUNvbmZpZy5zcGVlZCAqIGVsYXBzZWQsIGdsb2JlQ29uZmlnLnZlcnRpY2FsVGlsdCwgZ2xvYmVDb25maWcuaG9yaXpvbnRhbFRpbHRdKTtcbiAgICAgICAgc3ZnVmlzdWFsLnNlbGVjdEFsbChcInBhdGhcIikuYXR0cihcImRcIiwgcGF0aCk7XG4gICAgICAgIHN2Z0Z1bmN0aW9uYWwuc2VsZWN0QWxsKFwicGF0aFwiKS5hdHRyKFwiZFwiLCBwYXRoKTtcbiAgICAgICAgZHJhd1N0YXRpb25zKCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGRyYXdPY2VhbigpIHtcblxuICAgIGdGdW5jdGlvbmFsLnNlbGVjdEFsbChcInBhdGgub2NlYW5cIilcbiAgICAgICAgLmRhdGEoW3sgdHlwZTogXCJTcGhlcmVcIiB9XSlcbiAgICAgICAgLmVudGVyKClcbiAgICAgICAgLmFwcGVuZChcInBhdGhcIilcbiAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBcInRyYW5zcGFyZW50XCIpXG5cbiAgICBnVmlzdWFsLnNlbGVjdEFsbChcInBhdGgub2NlYW5cIilcbiAgICAgICAgLmRhdGEoW3sgdHlwZTogXCJTcGhlcmVcIiB9XSlcbiAgICAgICAgLmVudGVyKClcbiAgICAgICAgLmFwcGVuZChcInBhdGhcIilcbiAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcIm9jZWFuXCIpXG4gICAgLy8gLmF0dHIoXCJjbGFzc1wiLCBcIm9jZWFuXCIpXG59XG5cbmZ1bmN0aW9uIGRyYXdHcmF0aWN1bGUoKSB7XG4gICAgY29uc3QgZ3JhdGljdWxlID0gZDMuZ2VvR3JhdGljdWxlKClcbiAgICAgICAgLnN0ZXAoWzEwLCAxMF0pO1xuXG4gICAgZ1Zpc3VhbC5zZWxlY3RBbGwoXCJwYXRoLmdyYXRpY3VsZVwiKVxuICAgICAgICAuZGF0YShbZ3JhdGljdWxlKCldKVxuICAgICAgICAuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiZ3JhdGljdWxlXCIpXG4gICAgICAgIC5hdHRyKFwiZFwiLCBwYXRoKVxuICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIFwidHJhbnNwYXJlbnRcIilcbn1cbn1cbiIsImltcG9ydCB7XG4gICAgY29sb3IsXG4gICAgdGVtcGVyYXR1cmVDb2xvcixcbn0gZnJvbSBcIi4vaGVscGVyXCJcblxuZXhwb3J0IGNvbnN0IHJlbmRlclNlbGVjdGVkQ291bnRyeSA9IChcbiAgICBhY3Rpb24sXG4gICAgZ2VvanNvbkZlYXR1cmUsXG4gICAganNvbkNvdW50cnlUZW1wZXJhdHVyZSxcbiAgICBzdGF0aW9uc1xuKSA9PiB7XG4gICAgbGV0IHdpZHRoID0gNTAwLCBoZWlnaHQgPSA0MDAsIGNlbnRlcmVkO1xuXG4gICAgbGV0IGNlbnRlclNWR1BvcyA9IFt3aWR0aCAvIDIsIGhlaWdodCAvIDJdO1xuXG4gICAgbGV0IHByb2plY3Rpb24gPSBkMy5nZW9NZXJjYXRvcigpO1xuICAgIC8vIC5jZW50ZXIoWzUwLCA1MF0pXG4gICAgLy8gLnNjYWxlKDE1MClcbiAgICAvLyAucm90YXRlKFswLCAwXSk7XG5cbiAgICBsZXQgcGF0aCA9IGQzLmdlb1BhdGgoKS5wcm9qZWN0aW9uKHByb2plY3Rpb24pO1xuXG4gICAgbGV0IGNhbnZhcywgY29udGV4dCwgc3RhdGlvbkRhdGEgPSBbXTtcbiAgICBsZXQgY2lyY2xlUmFkaXVzID0gNDtcblxuICAgIGNvbnN0IHRvb2x0aXAgPSBkMy5zZWxlY3QoXCIudG9vbHRpcFwiKTtcblxuXG4gICAgaWYgKGFjdGlvbiA9PT0gXCJ1cGRhdGVcIikge1xuICAgICAgICAvLyBjYW52YXMgPSBkMy5zZWxlY3QoXCIjc2VsZWN0ZWQtY2FudmFzXCIpLnNlbGVjdChcImNhbnZhc1wiKTtcbiAgICAgICAgbGV0IHN2ZyA9IGQzLnNlbGVjdChcIiNzZWxlY3RlZC1mdW5jdGlvbmFsLW1hcFwiKTtcbiAgICAgICAgbGV0IGcgPSBzdmcuc2VsZWN0KCdnJyk7XG4gICAgICAgIGcuYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgcmV0dXJuIFwidHJhbnNsYXRlKDUwLDUwKVwiXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBib3VuZHMgPSBwYXRoLmJvdW5kcyhnZW9qc29uRmVhdHVyZSk7XG5cbiAgICAgICAgLy8gc3ZnLmFwcGVuZChcInRleHRcIilcbiAgICAgICAgLy8gICAgIC50ZXh0KFwiaGVsbG9cIik7XG5cbiAgICAgICAgcHJvamVjdGlvbi5maXRTaXplKFsod2lkdGggLSAxMDApLCAoaGVpZ2h0IC0gMTAwKV0sIGdlb2pzb25GZWF0dXJlKVxuXG4gICAgICAgIGcuc2VsZWN0QWxsKFwicGF0aFwiKS5yZW1vdmUoKTtcbiAgICAgICAgZy5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gICAgICAgICAgICAuZGF0YShbZ2VvanNvbkZlYXR1cmVdKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImRcIiwgcGF0aClcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwganNvbkNvdW50cnlUZW1wZXJhdHVyZSlcbiAgICAgICAgICAgIC5zdHlsZShcInN0cm9rZVwiLCBcIiNlZWVcIilcbiAgICAgICAgLy8gLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgLy8gICAgIC8vICAgICBjb25zdCBjZW50cm9pZCA9IHBhdGguY2VudHJvaWQoZCk7XG4gICAgICAgIC8vICAgICAvLyAgICAgY29uc3QgeCA9IHdpZHRoIC8gMiAtIGNlbnRyb2lkWzBdO1xuICAgICAgICAvLyAgICAgLy8gICAgIGNvbnN0IHkgPSBoZWlnaHQgLyAyIC0gY2VudHJvaWRbMV07XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgcHJvamVjdGlvbihbZC5sb25nLCBkLmxhdF0pICsgXCIpXCJcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIHN0YXRpb25EYXRhID0gc3RhdGlvbnM7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwic2VsZWN0ZWQtbWFwXCIsIHN0YXRpb25EYXRhKTtcbiAgICAgICAgZHJhd1N0YXRpb25zKCk7XG5cbiAgICAgICAgLy8gY29uc3Qgem9vbSA9IGQzLnpvb20oKVxuICAgICAgICAvLyAgICAgLnNjYWxlRXh0ZW50KFsxLCBJbmZpbml0eV0pXG4gICAgICAgIC8vICAgICAudHJhbnNsYXRlRXh0ZW50KFtbMCwgMF0sIFt3aWR0aCwgaGVpZ2h0XV0pXG4gICAgICAgIC8vICAgICAuZXh0ZW50KFtbMCwgMF0sIFt3aWR0aCwgaGVpZ2h0XV0pXG4gICAgICAgIC8vICAgICAub24oJ3pvb20nLCAoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgZy5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgYCR7MS41IC8gZDMuZXZlbnQudHJhbnNmb3JtLmt9cHhgKVxuICAgICAgICAvLyAgICAgICAgIGcuYXR0cigndHJhbnNmb3JtJywgZDMuZXZlbnQudHJhbnNmb3JtKTtcbiAgICAgICAgLy8gICAgICAgICAvLyBnLnNlbGVjdEFsbChcImNpcmNsZVwiKS5hdHRyKCd0cmFuc2Zvcm0nLCBkMy5ldmVudC50cmFuc2Zvcm0pO1xuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGQzLmV2ZW50LnRyYW5zZm9ybSk7XG4gICAgICAgIC8vICAgICB9KVxuXG4gICAgICAgIC8vIGcuY2FsbCh6b29tKTtcblxuICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSBcImNyZWF0ZVwiKSB7XG4gICAgICAgIC8vIGNhbnZhcyA9IGQzLnNlbGVjdChcIiNzZWxlY3RlZC1jYW52YXNcIikuYXBwZW5kKFwiY2FudmFzXCIpXG4gICAgICAgIC8vICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKVxuICAgICAgICAvLyAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAvLyAgICAgLnN0eWxlKCdwb3NpdGlvbicsICdhYnNvbHV0ZScpXG4gICAgICAgIC8vICAgICAuc3R5bGUoJ2xlZnQnLCAnMCcpO1xuXG4gICAgICAgIGxldCBzdmcgPSBkMy5zZWxlY3QoXCIjc2VsZWN0ZWQtZnVuY3Rpb25hbC1tYXBcIilcbiAgICAgICAgICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gICAgICAgICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpO1xuICAgICAgICBsZXQgZyA9IHN2Zy5hcHBlbmQoXCJnXCIpO1xuICAgICAgICBnLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBcInRyYW5zbGF0ZSg1MCw1MClcIlxuICAgICAgICB9KTtcblxuICAgICAgICBwcm9qZWN0aW9uLmZpdFNpemUoWyh3aWR0aCAtIDEwMCksIChoZWlnaHQgLSAxMDApXSwgZ2VvanNvbkZlYXR1cmUpO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY2VudHJvaWRcIiwgcGF0aC5jZW50cm9pZChnZW9qc29uRmVhdHVyZSkpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0aW9uLnRyYW5zbGF0ZShbMCwgMF0pKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJjZW50cm9pZDJcIiwgcGF0aC5jZW50cm9pZChnZW9qc29uRmVhdHVyZSkpO1xuICAgICAgICAvLyBwcm9qZWN0aW9uLnRyYW5zbGF0ZShbMTAwLDEwMF0pO1xuICAgICAgICAvLyBwcm9qZWN0aW9uLmNlbnRlcihbd2lkdGgvMiwgaGVpZ2h0LzJdKTtcblxuICAgICAgICBjb25zdCBkYXRhID0gZDMucmFuZ2UoMTApO1xuICAgICAgICBjb25zdCByZWN0cyA9IHN2Zy5zZWxlY3RBbGwoXCIucmVjdHNcIilcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAgICAgICAgIC5hdHRyKFwieFwiLCAxMClcbiAgICAgICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIDEwKVxuICAgICAgICAgICAgLmF0dHIoXCJ5XCIsIChkLCBpKSA9PiAxMCArIGkgKiA5KVxuICAgICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCAxMClcbiAgICAgICAgICAgIC5hdHRyKFwiZmlsbFwiLCBkID0+IGNvbG9yKDEwMCAtIGQgKiAxMCkpXG4gICAgICAgICAgICAuYXR0cihcInN0cm9rZVwiLCBcImdyYXlcIik7XG5cbiAgICAgICAgc3ZnLnNlbGVjdEFsbChcInRleHRcIilcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgICAgICAgIC5odG1sKGQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBgJHsoMTAwIC0gZCAqIDEwKX0mIzE3NjtGYDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cihcImZvbnQtc2l6ZVwiLCBcIjAuMzJlbVwiKVxuICAgICAgICAgICAgLmF0dHIoXCJ4XCIsIDIzKVxuICAgICAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgMjApXG4gICAgICAgICAgICAuYXR0cihcInlcIiwgKGQsIGkpID0+IDIwICsgaSAqIDkpXG4gICAgICAgICAgICAuYXR0cihcIndpZHRoXCIsIDEwKVxuICAgICAgICAgICAgLmF0dHIoXCJmaWxsXCIsIGQgPT4gY29sb3IoMTAwIC0gZCAqIDEwKSlcbiAgICAgICAgLy8gLmF0dHIoXCJzdHJva2VcIiwgXCJncmF5XCIpO1xuXG4gICAgICAgIGcuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgICAgICAgICAgLmRhdGEoW2dlb2pzb25GZWF0dXJlXSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJkXCIsIHBhdGgpXG4gICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGpzb25Db3VudHJ5VGVtcGVyYXR1cmUpXG4gICAgICAgICAgICAuc3R5bGUoXCJzdHJva2VcIiwgXCIjZWVlXCIpXG4gICAgICAgIC8vIC5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIC8vICAgICBjb25zdCBjZW50cm9pZCA9IHBhdGguY2VudHJvaWQoZCk7XG4gICAgICAgIC8vICAgICBjb25zdCB4ID0gd2lkdGggLyAyIC0gY2VudHJvaWRbMF07XG4gICAgICAgIC8vICAgICBjb25zdCB5ID0gaGVpZ2h0IC8gMiAtIGNlbnRyb2lkWzFdO1xuICAgICAgICAvLyAgICAgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgeCArIFwiLFwiICsgeSArIFwiKVwiXG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIHN0YXRpb25EYXRhID0gc3RhdGlvbnM7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHN0YXRpb25EYXRhKTtcbiAgICAgICAgZHJhd1N0YXRpb25zKCk7XG5cbiAgICAgICAgY29uc3Qgem9vbSA9IGQzLnpvb20oKVxuICAgICAgICAgICAgLnNjYWxlRXh0ZW50KFsxLCBJbmZpbml0eV0pXG4gICAgICAgICAgICAudHJhbnNsYXRlRXh0ZW50KFtbMCwgMF0sIFt3aWR0aCwgaGVpZ2h0XV0pXG4gICAgICAgICAgICAuZXh0ZW50KFtbMCwgMF0sIFt3aWR0aCwgaGVpZ2h0XV0pXG4gICAgICAgICAgICAub24oJ3pvb20nLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHNjYWxlWFkgPSBkMy5ldmVudC50cmFuc2Zvcm07XG4gICAgICAgICAgICAgICAgZy5hdHRyKFwidHJhbnNmb3JtXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgKHNjYWxlWFkueCArIDUwKSArIFwiLFwiICsgKHNjYWxlWFkueSArIDUwKSArIFwiKSBzY2FsZShcIiArIHNjYWxlWFkuayArIFwiKVwiO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGcuc2VsZWN0QWxsKFwiY2lyY2xlXCIpLmF0dHIoXCJyXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZDMuZXZlbnQudHJhbnNmb3JtKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlWFkgPSBkMy5ldmVudC50cmFuc2Zvcm07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoY2lyY2xlUmFkaXVzIC8gc2NhbGVYWS5rKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgc3ZnLmNhbGwoem9vbSk7XG5cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYXdTdGF0aW9ucygpIHtcbiAgICAgICAgbGV0IGcgPSBkMy5zZWxlY3QoXCIjc2VsZWN0ZWQtZnVuY3Rpb25hbC1tYXBcIikuc2VsZWN0KFwic3ZnXCIpLnNlbGVjdChcImdcIik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHN0YXRpb25EYXRhKVxuXG4gICAgICAgIGlmIChzdGF0aW9uRGF0YSkge1xuICAgICAgICAgICAgZy5zZWxlY3RBbGwoJ2NpcmNsZScpXG4gICAgICAgICAgICAgICAgLy8gZy5zZWxlY3RBbGwoJ3RleHQnKVxuICAgICAgICAgICAgICAgIC5yZW1vdmUoKTtcblxuICAgICAgICAgICAgbGV0IHN0YXRpb25zVmFsdWUgPSBnLnNlbGVjdEFsbCgnY2lyY2xlJylcbiAgICAgICAgICAgICAgICAvLyBsZXQgc3RhdGlvbnNWYWx1ZSA9IGcuc2VsZWN0QWxsKCd0ZXh0JylcbiAgICAgICAgICAgICAgICAuZGF0YShzdGF0aW9uRGF0YSlcbiAgICAgICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAgICAgLy8gLmFwcGVuZCgndGV4dCcpXG4gICAgICAgICAgICAgICAgLy8gLmF0dHIoJ2NsYXNzJywgJ3RlbXAtdGV4dCcpXG4gICAgICAgICAgICAgICAgLy8gLnRleHQoZCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gKGQuVEFWRyAqICg5IC8gNSkgKyAzMikudG9GaXhlZCgwKTtcbiAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICAgIC8vIC5hdHRyKCdjeCcsIGQgPT4gcHJvamVjdGlvbihbZC5MT05HSVRVREUsIGQuTEFUSVRVREVdKVswXSlcbiAgICAgICAgICAgICAgICAvLyAuYXR0cignY3knLCBkID0+IHByb2plY3Rpb24oW2QuTE9OR0lUVURFLCBkLkxBVElUVURFXSlbMV0pXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgdHJhbnNsYXRlKCR7cHJvamVjdGlvbihbZC5MT05HSVRVREUsIGQuTEFUSVRVREVdKVswXX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAke3Byb2plY3Rpb24oW2QuTE9OR0lUVURFLCBkLkxBVElUVURFXSlbMV19KWBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInN0cm9rZVwiLCBcIiMxMTFcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcInN0cm9rZS13aWR0aFwiLCAwLjEpXG4gICAgICAgICAgICAgICAgLy8gLnN0eWxlKFwic3RvcmtlXCIsIFwicmdiYSgxNDQsIDI1MywgMjIyLCAxKVwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgKGQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbG9yKGQuVEFWRyAqICg5IC8gNSkgKyAzMilcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgY2lyY2xlUmFkaXVzKTtcblxuICAgICAgICAgICAgc3RhdGlvbnNWYWx1ZS5vbihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJzdHJva2VcIiwgXCIjZWVlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIDAuMik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdG9vbHRpcC5zdHlsZShcIm9wYWNpdHlcIiwgLjkpXG4gICAgICAgICAgICAgICAgICAgIC5odG1sKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8cD5cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBkLk5BTUUgKyBcIjxici8+XCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJBdmVyYWdlIFRlbXA6IFwiICsgKGQuVEFWRyAqICg5IC8gNSkgKyAzMikudG9GaXhlZCgxKSArIFwiJiMxNzY7RiA8YnIgLz5cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjwvcD5cIlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIC8vIC50ZXh0KGAke2QuTkFNRX1gKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXAuc3R5bGUoXCJvcGFjaXR5XCIsIC45KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIChkMy5ldmVudC5wYWdlWSkgKyBcInB4XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIChkMy5ldmVudC5wYWdlWCArIDEwKSArIFwicHhcIilcbiAgICAgICAgICAgICAgICAgICAgLy8gLnRleHQoZC5OQU1FKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwic3Ryb2tlXCIsIFwiIzExMVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgMC4xKVxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwLnN0eWxlKFwib3BhY2l0eVwiLCAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIDAgKyBcInB4XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIDAgKyBcInB4XCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZy5zZWxlY3RBbGwoJ2NpcmNsZScpXG4gICAgICAgICAgICAgICAgLy8gZy5zZWxlY3RBbGwoJ3RleHQnKVxuICAgICAgICAgICAgICAgIC5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICAvLyBmdW5jdGlvbiBkcmF3U3RhdGlvbnMoKSB7XG4gICAgLy8gICAgIGNvbnRleHQgPSBjYW52YXMubm9kZSgpLmdldENvbnRleHQoJzJkJyk7XG4gICAgLy8gICAgIGNvbnRleHQuc2F2ZSgpO1xuXG4gICAgLy8gICAgIGNvbnRleHQuc2V0VHJhbnNmb3JtKFsxLCAwLCAwLCAxLCAwLCAwXSk7XG5cbiAgICAvLyAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAvLyAgICAgY29udGV4dC5yZXN0b3JlKCk7XG5cbiAgICAvLyAgICAgY29uc3QgcFJvdGF0ZSA9IHByb2plY3Rpb24ucm90YXRlKCk7XG5cbiAgICAvLyAgICAgZm9yIChsZXQgaSBpbiBzdGF0aW9uRGF0YSkge1xuXG4gICAgLy8gICAgICAgICBsZXQgc3RhdGlvbiA9IHN0YXRpb25EYXRhW2ldLFxuICAgIC8vICAgICAgICAgICAgIGxvYyA9IHN0YXRpb24gPyBwcm9qZWN0aW9uKFtzdGF0aW9uLkxPTkdJVFVERSwgc3RhdGlvbi5MQVRJVFVERV0pIDogbnVsbDtcblxuICAgIC8vICAgICAgICAgaWYgKGxvYykge1xuICAgIC8vICAgICAgICAgICAgIGxldCBsb25naXR1ZGUgPSBOdW1iZXIoc3RhdGlvbi5MT05HSVRVREUpICsgMTgwLFxuICAgIC8vICAgICAgICAgICAgICAgICBzdGFydExvbmdpdHVkZSA9IDM2MCAtICgocFJvdGF0ZVswXSArIDI3MCkgJSAzNjApLFxuICAgIC8vICAgICAgICAgICAgICAgICBlbmRMb25naXR1ZGUgPSAoc3RhcnRMb25naXR1ZGUgKyAxODApICUgMzYwLFxuICAgIC8vICAgICAgICAgICAgICAgICBlbmRpbmcgPSBwcm9qZWN0aW9uKFtzdGF0aW9uLkxPTkdJVFVERSwgc3RhdGlvbi5MQVRJVFVERV0pO1xuXG4gICAgLy8gICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAvLyAgICAgICAgICAgICBjb250ZXh0LmFyYyhlbmRpbmdbMF0sIGVuZGluZ1sxXSwgNiwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIC8vICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAncmdiYSgxNDQsIDI1MywgMjIyLCAnICsgMC45ICsgJyknO1xuICAgIC8vICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgLy8gICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcihzdGF0aW9uLlRBVkcgKiAoOSAvIDUpICsgMzIpO1xuICAgIC8vICAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG5cbiAgICAvLyB9XG59IiwiZXhwb3J0IGNvbnN0IG51bU1vbnRoVG9OYW1lID0ge1xuICAgIDE6IFwiSmFudWFyeVwiLFxuICAgIDI6IFwiRmVicnVhcnlcIixcbiAgICAzOiBcIk1hcmNoXCIsXG4gICAgNDogXCJBcHJpbFwiLFxuICAgIDU6IFwiTWF5XCIsXG4gICAgNjogXCJKdW5lXCIsXG4gICAgNzogXCJKdWx5XCIsXG4gICAgODogXCJBdWd1c3RcIixcbiAgICA5OiBcIlNlcHRlbWJlclwiLFxuICAgIDEwOiBcIk9jdG9iZXJcIixcbiAgICAxMTogXCJOb3ZlbWJlclwiLFxuICAgIDEyOiBcIkRlY2VtYmVyXCIsXG59XG5cblxuXG5cbmV4cG9ydCBjb25zdCByZW5kZXJTbGlkZXIgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzbGlkZXJcIik7XG4gICAgc2xpZGVyLnNldEF0dHJpYnV0ZShcImlkXCIsIFwic2xpZGVyLWNvbnRhaW5lclwiKTtcblxuICAgIGNvbnN0IHNsaWRlckxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzbGlkZXJMYWJlbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInNsaWRlci1jdXJyZW50LW1vbnRoXCIpO1xuICAgIHNsaWRlckxhYmVsLmlubmVySFRNTCA9IG51bU1vbnRoVG9OYW1lWzEwXTtcblxuICAgIGNvbnN0IHNsaWRlclNldHRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgc2xpZGVyU2V0dGluZy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm1vbnRoLXNsaWRlclwiKTtcbiAgICBzbGlkZXJTZXR0aW5nLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJyYW5nZVwiKTtcbiAgICBzbGlkZXJTZXR0aW5nLnNldEF0dHJpYnV0ZShcIm1pblwiLCBcIjFcIik7XG4gICAgc2xpZGVyU2V0dGluZy5zZXRBdHRyaWJ1dGUoXCJtYXhcIiwgXCIxMlwiKTtcbiAgICBzbGlkZXJTZXR0aW5nLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwiMTBcIik7XG4gICAgc2xpZGVyU2V0dGluZy5zZXRBdHRyaWJ1dGUoXCJzdGVwXCIsIFwiMVwiKTtcblxuICAgIHNsaWRlci5hcHBlbmRDaGlsZChzbGlkZXJTZXR0aW5nKTtcbiAgICBzbGlkZXIuYXBwZW5kQ2hpbGQoc2xpZGVyTGFiZWwpO1xufVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==