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
  Object(_map__WEBPACK_IMPORTED_MODULE_1__["renderMap"])(11);
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
    Object(_slider__WEBPACK_IMPORTED_MODULE_0__["renderSlider"])(month);
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

    var data = d3.range(10); // const rects = svg.selectAll(".rects")
    //     .data(data)
    //     .enter()
    //     .append("rect")
    //     .attr("x", 10)
    //     .attr("height", 10)
    //     .attr("y", (d, i) => 10 + i * 9)
    //     .attr("width", 10)
    //     .attr("fill", d => color(100 - d * 10))
    //     .attr("stroke", "gray");
    // svg.selectAll("text")
    //     .data(data)
    //     .enter()
    //     .append("text")
    //     .html(d => {
    //         return `${(100 - d * 10)}&#176;F`;
    //     })
    //     .attr("font-size", "0.32em")
    //     .attr("x", 23)
    //     .attr("height", 20)
    //     .attr("y", (d, i) => 20 + i * 9)
    //     .attr("width", 10)
    //     .attr("fill", d => color(100 - d * 10))
    // // .attr("stroke", "gray");

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
        return tooltip.style("opacity", .9).html("<p>" + d.NAME + "<br/>" + "Average Temp: " + (d.TAVG * (9 / 5) + 32).toFixed(1) + "&#176;F <br />" + "</p>").style("top", d3.event.pageY + "px").style("left", d3.event.pageX + 10 + "px");
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
var renderSlider = function renderSlider(month) {
  var slider = document.getElementById("slider");
  slider.setAttribute("id", "slider-container");
  var sliderLabel = document.createElement("div");
  sliderLabel.setAttribute("id", "slider-current-month");
  sliderLabel.innerHTML = numMonthToName[month];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvamF2YXNjcmlwdHMvaGVscGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qYXZhc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvamF2YXNjcmlwdHMvbWFwLmpzIiwid2VicGFjazovLy8uL3NyYy9qYXZhc2NyaXB0cy9zZWxlY3RlZC1tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2phdmFzY3JpcHRzL3NsaWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3M/ZGMyYSJdLCJuYW1lcyI6WyJjb2xvciIsImQzIiwic2NhbGVMaW5lYXIiLCJkb21haW4iLCJyYW5nZSIsInRlbXBlcmF0dXJlQ29sb3IiLCJpZCIsImNvdW50cnlUZW1wZXJhdHVyZSIsInVuZGVmaW5lZCIsImpzb25Db3VudHJ5VGVtcGVyYXR1cmUiLCJ0ZW1wZXJhdHVyZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW5kZXJNYXAiLCJtb250aCIsIndpZHRoIiwiaGVpZ2h0IiwiY2VudGVyIiwic2VucyIsImNlbnRlcmVkRmVhdHVyZSIsInRpbWVyIiwic2NhbGVDaGFuZ2UiLCJzZWxlY3RlZEZlYXR1cmUiLCJvcmlnaW5hbFNjYWxlIiwic2NhbGUiLCJnbG9iZUNvbmZpZyIsInNwZWVkIiwidmVydGljYWxUaWx0IiwiaG9yaXpvbnRhbFRpbHQiLCJzdmdWaXN1YWwiLCJzZWxlY3QiLCJhcHBlbmQiLCJzdmdGdW5jdGlvbmFsIiwiZ1Zpc3VhbCIsImdGdW5jdGlvbmFsIiwiYXR0ciIsImNhbnZhcyIsInN0eWxlIiwiY29udGV4dCIsInN0YXRpb25EYXRhIiwicHJvamVjdGlvbiIsImdlb09ydGhvZ3JhcGhpYyIsInRyYW5zbGF0ZSIsInBhdGgiLCJnZW9QYXRoIiwiaW5pdGlhbFNjYWxlIiwicXVldWUiLCJkZWZlciIsImpzb24iLCJhd2FpdCIsInJlbmRlckdsb2JhbE1hcCIsImVycm9yIiwidG9wb2xvZ3kiLCJpc29Ub0NvdW50cnlOYW1lIiwic3RhdGlvbnMiLCJkYXRhIiwidGVtcFJhbmdlQmciLCJyZWN0cyIsInNlbGVjdEFsbCIsImVudGVyIiwiZCIsImkiLCJodG1sIiwiZ2VvanNvbiIsInRvcG9qc29uIiwiZmVhdHVyZSIsIm9iamVjdHMiLCJjb3VudHJpZXMiLCJ0b29sdGlwIiwiZHJhd09jZWFuIiwiZHJhd0dyYXRpY3VsZSIsImZlYXR1cmVzIiwib24iLCJjbGljayIsInN0b3AiLCJjbGlja2VkIiwicmVuZGVyU2VsZWN0ZWRDb3VudHJ5Iiwic2VsZWN0ZWRDb3VudHJ5TmFtZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvdW50cnlOYW1lIiwic2VsZWN0ZWRDb3VudHJ5VGVtcCIsImlubmVySFRNTCIsInRvRml4ZWQiLCJ0ZXh0IiwiZXZlbnQiLCJwYWdlWSIsInBhZ2VYIiwiY2FsbCIsImRyYWciLCJzdWJqZWN0IiwiciIsInJvdGF0ZSIsIngiLCJ5Iiwic2NhbGVGYWN0b3IiLCJkcmF3U3RhdGlvbnMiLCJjZW50cm9pZCIsImludmVydGVkIiwiY3VycmVudFJvdGF0ZSIsImRlc2lyZWRSb3RhdGUiLCJjdXJyZW50U2NhbGUiLCJkZXNpcmVkU2NhbGUiLCJzIiwiaW52ZXJ0IiwiaW50ZXJwb2xhdGUiLCJ0cmFuc2l0aW9uIiwiZHVyYXRpb24iLCJ0d2VlbiIsInQiLCJlbmFibGVSb3RhdGlvbiIsInJlbmRlclNsaWRlciIsInNlbGVjdGVkQ291bnRyeSIsImdldEVsZW1lbnRCeUlkIiwiZSIsInNsaWRlckxhYmVsIiwiY3VycmVudE1vbnRoIiwiTnVtYmVyIiwidGFyZ2V0IiwidmFsdWUiLCJjdXJyZW50TW9udGhTdHJpbmciLCJudW1Nb250aFRvTmFtZSIsImxlbmd0aCIsImhhbmRsZVNsaWRlciIsInpvb20iLCJzY2FsZUV4dGVudCIsIkluZmluaXR5Iiwiem9vbWVkIiwicHJldmlvdXNTY2FsZUZhY3RvciIsImR4Iiwic291cmNlRXZlbnQiLCJtb3ZlbWVudFgiLCJkeSIsIm1vdmVtZW50WSIsInR5cGUiLCJzYXZlIiwiY2xlYXJSZWN0IiwidHJhbnNmb3JtIiwiayIsImRyYXdTdGF0aW9uc1NwZWNpZmllZENhbnZhcyIsIm5vZGUiLCJnZXRDb250ZXh0Iiwic2V0VHJhbnNmb3JtIiwicmVzdG9yZSIsInBSb3RhdGUiLCJzdGF0aW9uIiwibG9jIiwiTE9OR0lUVURFIiwiTEFUSVRVREUiLCJsb25naXR1ZGUiLCJzdGFydExvbmdpdHVkZSIsImVuZExvbmdpdHVkZSIsImVuZGluZyIsImJlZ2luUGF0aCIsImFyYyIsIk1hdGgiLCJQSSIsInN0cm9rZVN0eWxlIiwic3Ryb2tlIiwiZmlsbFN0eWxlIiwiVEFWRyIsImZpbGwiLCJkcmF3U3RhdGlvbnNTcGVjaWZpY01vbnRoIiwic2F0aW9uc1BlckNvdW50cnkiLCJqIiwic3RhcnRpbmdBbmdsZSIsImVsYXBzZWQiLCJncmF0aWN1bGUiLCJnZW9HcmF0aWN1bGUiLCJzdGVwIiwiYWN0aW9uIiwiZ2VvanNvbkZlYXR1cmUiLCJjZW50ZXJlZCIsImNlbnRlclNWR1BvcyIsImdlb01lcmNhdG9yIiwiY2lyY2xlUmFkaXVzIiwic3ZnIiwiZyIsImJvdW5kcyIsImZpdFNpemUiLCJyZW1vdmUiLCJ0cmFuc2xhdGVFeHRlbnQiLCJleHRlbnQiLCJzY2FsZVhZIiwic3RhdGlvbnNWYWx1ZSIsIk5BTUUiLCJzbGlkZXIiLCJzZXRBdHRyaWJ1dGUiLCJjcmVhdGVFbGVtZW50Iiwic2xpZGVyU2V0dGluZyIsImFwcGVuZENoaWxkIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RB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Q0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsU0FBUztBQUNwQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUyxHQUFHLFNBQVM7QUFDNUMsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLHVDQUF1QyxPQUFPO0FBQzlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsZ0NBQWdDO0FBQ2hDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25COzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQ3RXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUNSQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtB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RSxXQUFuQjtBQUNILENBbEJNLEM7Ozs7Ozs7Ozs7O0FDbEJQLHVDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qYXZhc2NyaXB0cy9pbmRleC5qc1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcblxudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG5cbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG5cbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkIHx8ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpOyAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7IC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcblxuICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuXG5cbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG5cblxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7IC8vIENsZWFuIHVwIHJlcXVlc3RcblxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTsgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuXG5cbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJywgcmVxdWVzdCkpOyAvLyBDbGVhbiB1cCByZXF1ZXN0XG5cbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07IC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcblxuXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7IC8vIENsZWFuIHVwIHJlcXVlc3RcblxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTsgLy8gSGFuZGxlIHRpbWVvdXRcblxuXG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTsgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuXG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9OyAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuXG5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgdmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpOyAvLyBBZGQgeHNyZiBoZWFkZXJcblxuXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgPyBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH0gLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcblxuXG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuXG5cbiAgICBpZiAoY29uZmlnLndpdGhDcmVkZW50aWFscykge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIH0gLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuXG5cbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG5cblxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH0gLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcblxuXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpOyAvLyBDbGVhbiB1cCByZXF1ZXN0XG5cbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH0gLy8gU2VuZCB0aGUgcmVxdWVzdFxuXG5cbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcblxudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG5cbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29yZS9tZXJnZUNvbmZpZycpO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpOyAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTsgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG5cbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcbiAgcmV0dXJuIGluc3RhbmNlO1xufSAvLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcblxuXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7IC8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuXG5heGlvcy5BeGlvcyA9IEF4aW9zOyAvLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG5cbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoYXhpb3MuZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59OyAvLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cblxuXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTsgLy8gRXhwb3NlIGFsbC9zcHJlYWRcblxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuXG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zOyAvLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcblxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zOyIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cblxuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5cblxuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cblxuXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5cblxuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjsiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9idWlsZFVSTCcpO1xuXG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcblxudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG5cbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vbWVyZ2VDb25maWcnKTtcbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cblxuXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5cblxuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSBhcmd1bWVudHNbMV0gfHwge307XG4gICAgY29uZmlnLnVybCA9IGFyZ3VtZW50c1swXTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gIH1cblxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZCA/IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKSA6ICdnZXQnOyAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG5cbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbkF4aW9zLnByb3RvdHlwZS5nZXRVcmkgPSBmdW5jdGlvbiBnZXRVcmkoY29uZmlnKSB7XG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIHJldHVybiBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcikucmVwbGFjZSgvXlxcPy8sICcnKTtcbn07IC8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xuXG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uICh1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uICh1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBBeGlvczsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuXG5cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cblxuXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5cblxuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcblxudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG5cbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcblxudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cblxuXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpOyAvLyBTdXBwb3J0IGJhc2VVUkwgY29uZmlnXG5cbiAgaWYgKGNvbmZpZy5iYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKGNvbmZpZy51cmwpKSB7XG4gICAgY29uZmlnLnVybCA9IGNvbWJpbmVVUkxzKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgfSAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuXG5cbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTsgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShjb25maWcuZGF0YSwgY29uZmlnLmhlYWRlcnMsIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0KTsgLy8gRmxhdHRlbiBoZWFkZXJzXG5cbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LCBjb25maWcuaGVhZGVycyB8fCB7fSk7XG4gIHV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICB9KTtcbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTsgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcblxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKHJlc3BvbnNlLmRhdGEsIHJlc3BvbnNlLmhlYWRlcnMsIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7IC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG5cbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShyZWFzb24ucmVzcG9uc2UuZGF0YSwgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTsiLCIndXNlIHN0cmljdCc7XG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuXG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cblxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgZXJyb3IuaXNBeGlvc0Vycm9yID0gdHJ1ZTtcblxuICBlcnJvci50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICBjb2RlOiB0aGlzLmNvZGVcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBlcnJvcjtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuLyoqXG4gKiBDb25maWctc3BlY2lmaWMgbWVyZ2UtZnVuY3Rpb24gd2hpY2ggY3JlYXRlcyBhIG5ldyBjb25maWctb2JqZWN0XG4gKiBieSBtZXJnaW5nIHR3byBjb25maWd1cmF0aW9uIG9iamVjdHMgdG9nZXRoZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzFcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICB2YXIgY29uZmlnID0ge307XG4gIHV0aWxzLmZvckVhY2goWyd1cmwnLCAnbWV0aG9kJywgJ3BhcmFtcycsICdkYXRhJ10sIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIocHJvcCkge1xuICAgIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfVxuICB9KTtcbiAgdXRpbHMuZm9yRWFjaChbJ2hlYWRlcnMnLCAnYXV0aCcsICdwcm94eSddLCBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKHByb3ApIHtcbiAgICBpZiAodXRpbHMuaXNPYmplY3QoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IHV0aWxzLmRlZXBNZXJnZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSB1dGlscy5kZWVwTWVyZ2UoY29uZmlnMVtwcm9wXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMVtwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzFbcHJvcF07XG4gICAgfVxuICB9KTtcbiAgdXRpbHMuZm9yRWFjaChbJ2Jhc2VVUkwnLCAndHJhbnNmb3JtUmVxdWVzdCcsICd0cmFuc2Zvcm1SZXNwb25zZScsICdwYXJhbXNTZXJpYWxpemVyJywgJ3RpbWVvdXQnLCAnd2l0aENyZWRlbnRpYWxzJywgJ2FkYXB0ZXInLCAncmVzcG9uc2VUeXBlJywgJ3hzcmZDb29raWVOYW1lJywgJ3hzcmZIZWFkZXJOYW1lJywgJ29uVXBsb2FkUHJvZ3Jlc3MnLCAnb25Eb3dubG9hZFByb2dyZXNzJywgJ21heENvbnRlbnRMZW5ndGgnLCAndmFsaWRhdGVTdGF0dXMnLCAnbWF4UmVkaXJlY3RzJywgJ2h0dHBBZ2VudCcsICdodHRwc0FnZW50JywgJ2NhbmNlbFRva2VuJywgJ3NvY2tldFBhdGgnXSwgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcxW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gY29uZmlnO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcblxuICBpZiAoIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuY29uZmlnLCBudWxsLCByZXNwb25zZS5yZXF1ZXN0LCByZXNwb25zZSkpO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG4gIHJldHVybiBkYXRhO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7IC8vIE9ubHkgTm9kZS5KUyBoYXMgYSBwcm9jZXNzIHZhcmlhYmxlIHRoYXQgaXMgb2YgW1tDbGFzc11dIHByb2Nlc3NcblxuICBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9XG5cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHwgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fCB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fCB1dGlscy5pc1N0cmVhbShkYXRhKSB8fCB1dGlscy5pc0ZpbGUoZGF0YSkgfHwgdXRpbHMuaXNCbG9iKGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8qIElnbm9yZSAqL1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkucmVwbGFjZSgvJTQwL2dpLCAnQCcpLnJlcGxhY2UoLyUzQS9naSwgJzonKS5yZXBsYWNlKC8lMjQvZywgJyQnKS5yZXBsYWNlKC8lMkMvZ2ksICcsJykucmVwbGFjZSgvJTIwL2csICcrJykucmVwbGFjZSgvJTVCL2dpLCAnWycpLnJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuXG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuXG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuXG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpIDogYmFzZVVSTDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/IC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICByZXR1cm4ge1xuICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgIH0sXG4gICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgcmV0dXJuIG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGw7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgIH1cbiAgfTtcbn0oKSA6IC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbmZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgcmV0dXJuIHtcbiAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gIH07XG59KCk7IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/IC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG5mdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICB2YXIgb3JpZ2luVVJMO1xuICAvKipcbiAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgKlxuICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAqL1xuXG4gIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICBpZiAobXNpZSkge1xuICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICB9XG5cbiAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTsgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgcGF0aG5hbWU6IHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nID8gdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOiAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgIH07XG4gIH1cblxuICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgLyoqXG4gICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgKlxuICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgKi9cblxuICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICB2YXIgcGFyc2VkID0gdXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICByZXR1cm4gcGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiYgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0O1xuICB9O1xufSgpIDogLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbmZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbn0oKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7IC8vIEhlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG5cblxudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gWydhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJywgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLCAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J107XG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHtcbiAgICByZXR1cm4gcGFyc2VkO1xuICB9XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cigwLCBpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2YuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcGFyc2VkO1xufTsiLCIndXNlIHN0cmljdCc7XG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG5cbnZhciBpc0J1ZmZlciA9IHJlcXVpcmUoJ2lzLWJ1ZmZlcicpO1xuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIHZhciByZXN1bHQ7XG5cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgQXJyYXlCdWZmZXIuaXNWaWV3KSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gdmFsICYmIHZhbC5idWZmZXIgJiYgdmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5cblxuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICovXG5cblxuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAobmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScgfHwgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOYXRpdmVTY3JpcHQnIHx8IG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTlMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xufVxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5cblxuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9IC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuXG5cbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cblxuXG5mdW5jdGlvbiBtZXJnZSgpXG4vKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi9cbntcbiAgdmFyIHJlc3VsdCA9IHt9O1xuXG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBGdW5jdGlvbiBlcXVhbCB0byBtZXJnZSB3aXRoIHRoZSBkaWZmZXJlbmNlIGJlaW5nIHRoYXQgbm8gcmVmZXJlbmNlXG4gKiB0byBvcmlnaW5hbCBvYmplY3RzIGlzIGtlcHQuXG4gKlxuICogQHNlZSBtZXJnZVxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuXG5cbmZ1bmN0aW9uIGRlZXBNZXJnZSgpXG4vKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi9cbntcbiAgdmFyIHJlc3VsdCA9IHt9O1xuXG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5cblxuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBkZWVwTWVyZ2U6IGRlZXBNZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW1cbn07IiwiLyohXG4gKiBEZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgQnVmZmVyXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0J1ZmZlcihvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIG9iai5jb25zdHJ1Y3RvciAhPSBudWxsICYmIHR5cGVvZiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iaik7XG59OyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9OyAvLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cblxuKGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgfVxuXG4gIHRyeSB7XG4gICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICB9XG59KSgpO1xuXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gIH0gLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcblxuXG4gIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gIH1cblxuICB0cnkge1xuICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICB9IC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcblxuXG4gIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gIH1cblxuICB0cnkge1xuICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0cnkge1xuICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGRyYWluaW5nID0gZmFsc2U7XG5cbiAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICB9IGVsc2Uge1xuICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgfVxuXG4gIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICBkcmFpblF1ZXVlKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgaWYgKGRyYWluaW5nKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gIGRyYWluaW5nID0gdHJ1ZTtcbiAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcblxuICB3aGlsZSAobGVuKSB7XG4gICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgcXVldWUgPSBbXTtcblxuICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gIH1cblxuICBjdXJyZW50UXVldWUgPSBudWxsO1xuICBkcmFpbmluZyA9IGZhbHNlO1xuICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICB9XG5cbiAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcblxuICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gIH1cbn07IC8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcblxuXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgdGhpcy5mdW4gPSBmdW47XG4gIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cblxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5cbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gW107XG59O1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICcvJztcbn07XG5cbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gMDtcbn07IiwiZXhwb3J0IGNvbnN0IGNvbG9yID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oWzIwLCA0MCwgNTAsIDY1LCA3NSwgODUsIDkwLCAxMDBdKVxuICAgIC5yYW5nZShbXCIjZmZmYWZhXCIsXG4gICAgICAgIFwiIzAwYTZjYVwiLFxuICAgICAgICBcIiMwMGNjYmNcIixcbiAgICAgICAgXCIjOTBlYjlkXCIsXG4gICAgICAgIFwiI2ZmZmY4Y1wiLFxuICAgICAgICBcIiNmOWQwNTdcIixcbiAgICAgICAgXCIjZjI5ZTJlXCIsXG4gICAgICAgIFwiI2Q3MTkxY1wiXSk7XG5cbmV4cG9ydCBjb25zdCB0ZW1wZXJhdHVyZUNvbG9yID0gKGlkLCBjb3VudHJ5VGVtcGVyYXR1cmUpID0+IHtcblxuICAgIGlmIChjb3VudHJ5VGVtcGVyYXR1cmVbaWRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QganNvbkNvdW50cnlUZW1wZXJhdHVyZSA9IGNvdW50cnlUZW1wZXJhdHVyZVtpZF0udGVtcGVyYXR1cmU7XG4gICAgICAgIHJldHVybiBjb2xvcihqc29uQ291bnRyeVRlbXBlcmF0dXJlKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcImJsYWNrXCJcbiAgICB9XG59XG4iLCJpbXBvcnQgXCIuLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuaW1wb3J0IHsgcmVuZGVyTWFwIH0gZnJvbSBcIi4vbWFwXCI7XG5pbXBvcnQgeyByZW5kZXJTbGlkZXIgfSBmcm9tIFwiLi9zbGlkZXJcIjtcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICByZW5kZXJNYXAoMTEpO1xufSk7IiwiaW1wb3J0IHtcbiAgICByZW5kZXJTbGlkZXIsXG4gICAgbnVtTW9udGhUb05hbWVcbn0gZnJvbSBcIi4vc2xpZGVyXCI7XG5cbmltcG9ydCB7XG4gICAgY29sb3IsXG4gICAgdGVtcGVyYXR1cmVDb2xvcixcbn0gZnJvbSBcIi4vaGVscGVyXCJcblxuaW1wb3J0IHsgcmVuZGVyU2VsZWN0ZWRDb3VudHJ5IH0gZnJvbSBcIi4vc2VsZWN0ZWQtbWFwXCI7XG5cbmV4cG9ydCBjb25zdCByZW5kZXJNYXAgPSAobW9udGgpID0+IHtcblxuICAgIGxldCB3aWR0aCA9IDUwMCxcbiAgICAgICAgaGVpZ2h0ID0gNTAwLFxuICAgICAgICBjZW50ZXIgPSBbLXdpZHRoIC8gMiArIDMsIDBdLFxuICAgICAgICBzZW5zID0gMC4yNSxcbiAgICAgICAgY2VudGVyZWRGZWF0dXJlLFxuICAgICAgICB0aW1lcixcbiAgICAgICAgc2NhbGVDaGFuZ2UsXG4gICAgICAgIHNlbGVjdGVkRmVhdHVyZSxcbiAgICAgICAgb3JpZ2luYWxTY2FsZSA9IGhlaWdodCAvIDIuMSxcbiAgICAgICAgc2NhbGUgPSBvcmlnaW5hbFNjYWxlO1xuXG4gICAgY29uc3QgZ2xvYmVDb25maWcgPSB7XG4gICAgICAgIHNwZWVkOiAwLjAwNSxcbiAgICAgICAgdmVydGljYWxUaWx0OiAtMjMuNSxcbiAgICAgICAgaG9yaXpvbnRhbFRpbHQ6IDBcbiAgICB9XG5cbiAgICBsZXQgc3ZnVmlzdWFsID0gZDMuc2VsZWN0KFwiI21hcFwiKS5hcHBlbmQoXCJzdmdcIiksXG4gICAgICAgIHN2Z0Z1bmN0aW9uYWwgPSBkMy5zZWxlY3QoXCIjZnVuY3Rpb25hbC1tYXBcIikuYXBwZW5kKFwic3ZnXCIpLFxuICAgICAgICBnVmlzdWFsID0gc3ZnVmlzdWFsLmFwcGVuZCgnZycpLFxuICAgICAgICBnRnVuY3Rpb25hbCA9IHN2Z0Z1bmN0aW9uYWwuYXBwZW5kKCdnJyk7XG5cbiAgICBzdmdWaXN1YWwuYXR0cihcIndpZHRoXCIsIHdpZHRoKS5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG4gICAgc3ZnRnVuY3Rpb25hbC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KTtcblxuICAgIGxldCBjYW52YXMgPSBkMy5zZWxlY3QoXCIjY2FudmFzXCIpLmFwcGVuZChcImNhbnZhc1wiKTtcbiAgICBjYW52YXNcbiAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAuc3R5bGUoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJylcbiAgICAgICAgLnN0eWxlKCdsZWZ0JywgJzAnKTtcblxuICAgIGxldCBjb250ZXh0LCBzdGF0aW9uRGF0YSA9IFtdO1xuXG4gICAgbGV0IHByb2plY3Rpb24gPSBkMy5nZW9PcnRob2dyYXBoaWMoKS50cmFuc2xhdGUoW3dpZHRoIC8gMiwgaGVpZ2h0IC8gMl0pLFxuICAgICAgICBwYXRoID0gZDMuZ2VvUGF0aCgpLnByb2plY3Rpb24ocHJvamVjdGlvbik7XG5cbiAgICBjb25zdCBpbml0aWFsU2NhbGUgPSBwcm9qZWN0aW9uLnNjYWxlKCk7XG5cbiAgICBxdWV1ZSgpXG4gICAgICAgIC5kZWZlcihkMy5qc29uLCBcIi4vZGF0YS93b3JsZC0xMTBtMi5qc29uXCIpXG4gICAgICAgIC5kZWZlcihkMy5qc29uLCBgLi9kYXRhL3Rhcy0yMDE2LSR7bW9udGh9Lmpzb25gKVxuICAgICAgICAuZGVmZXIoZDMuanNvbiwgXCIuL2RhdGEvaXNvLW51bS10by1jb3VudHJ5Lmpzb25cIilcbiAgICAgICAgLmRlZmVyKGQzLmpzb24sIGAuL2RhdGEvZ3NvbS0yMDE2LSR7bW9udGh9LXRhdmctcHJjcC5qc29uYClcbiAgICAgICAgLmF3YWl0KHJlbmRlckdsb2JhbE1hcCk7XG5cbiAgICBmdW5jdGlvbiByZW5kZXJHbG9iYWxNYXAoXG4gICAgICAgIGVycm9yLFxuICAgICAgICB0b3BvbG9neSxcbiAgICAgICAgdGVtcGVyYXR1cmUsXG4gICAgICAgIGlzb1RvQ291bnRyeU5hbWUsXG4gICAgICAgIHN0YXRpb25zLFxuICAgICkge1xuICAgICAgICBpZiAoZXJyb3IpIHRocm93IGVycm9yO1xuXG4gICAgICAgIHN0YXRpb25EYXRhID0gc3RhdGlvbnM7XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IGQzLnJhbmdlKDEwKTtcblxuICAgICAgICAvLyBjb25zdCB0ZW1wU2NhbGVHcm91cCA9IHN2Z1Zpc3VhbC5hcHBlbmQoXCJ0ZW1wU2NhbGVHcm91cFwiKVxuXG4gICAgICAgIGNvbnN0IHRlbXBSYW5nZUJnID0gc3ZnVmlzdWFsLnNlbGVjdFxuXG4gICAgICAgIGNvbnN0IHJlY3RzID0gc3ZnVmlzdWFsLnNlbGVjdEFsbChcIi5yZWN0c1wiKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJ4XCIsIDEwKVxuICAgICAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgMTApXG4gICAgICAgICAgICAuYXR0cihcInlcIiwgKGQsIGkpID0+IDEwICsgaSAqIDkpXG4gICAgICAgICAgICAuYXR0cihcIndpZHRoXCIsIDEwKVxuICAgICAgICAgICAgLmF0dHIoXCJmaWxsXCIsIGQgPT4gY29sb3IoMTAwIC0gZCAqIDEwKSlcbiAgICAgICAgICAgIC5hdHRyKFwic3Ryb2tlXCIsIFwiZ3JheVwiKTtcblxuICAgICAgICBzdmdWaXN1YWwuc2VsZWN0QWxsKFwidGV4dFwiKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgICAgICAgLmh0bWwoZCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAkeygxMDAgLSBkICogMTApfSYjMTc2O0ZgO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKFwiZm9udC1zaXplXCIsIFwiMC4zMmVtXCIpXG4gICAgICAgICAgICAuYXR0cihcInhcIiwgMjMpXG4gICAgICAgICAgICAuYXR0cihcImhlaWdodFwiLCAyMClcbiAgICAgICAgICAgIC5hdHRyKFwieVwiLCAoZCwgaSkgPT4gMjAgKyBpICogOSlcbiAgICAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgMTApXG4gICAgICAgICAgICAuYXR0cihcImZpbGxcIiwgZCA9PiBjb2xvcigxMDAgLSBkICogMTApKVxuXG4gICAgICAgIGNvbnN0IGdlb2pzb24gPSB0b3BvanNvbi5mZWF0dXJlKHRvcG9sb2d5LCB0b3BvbG9neS5vYmplY3RzLmNvdW50cmllcyk7XG5cbiAgICAgICAgY29uc3QgdG9vbHRpcCA9IGQzLnNlbGVjdChcIi50b29sdGlwXCIpO1xuXG4gICAgICAgIGRyYXdPY2VhbigpO1xuICAgICAgICBkcmF3R3JhdGljdWxlKCk7XG5cbiAgICAgICAgZ1Zpc3VhbC5zZWxlY3RBbGwoXCJwYXRoLmxhbmRcIilcbiAgICAgICAgICAgIC5kYXRhKGdlb2pzb24uZmVhdHVyZXMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZChcInBhdGhcIilcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJsYW5kXCIpXG4gICAgICAgICAgICAuYXR0cihcImRcIiwgcGF0aClcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGVtcGVyYXR1cmVDb2xvcihkLmlkLCB0ZW1wZXJhdHVyZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBsZXQgY291bnRyaWVzID0gZ0Z1bmN0aW9uYWwuc2VsZWN0QWxsKFwicGF0aC5sYW5kXCIpXG4gICAgICAgICAgICAuZGF0YShnZW9qc29uLmZlYXR1cmVzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwibGFuZFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJkXCIsIHBhdGgpXG4gICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIFwidHJhbnNwYXJlbnRcIilcbiAgICAgICAgICAgIC5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgY2xpY2soZCwgdGVtcGVyYXR1cmUpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBjbGljayhkLCB0ZW1wZXJhdHVyZSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRGZWF0dXJlID0gZDtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHNlbGVjdGVkRmVhdHVyZS5pZCk7XG4gICAgICAgICAgICB0aW1lci5zdG9wKCk7XG4gICAgICAgICAgICBjbGlja2VkKHNlbGVjdGVkRmVhdHVyZSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInN0aWxsIG1lXCIpXG5cbiAgICAgICAgICAgIHJlbmRlclNlbGVjdGVkQ291bnRyeShcbiAgICAgICAgICAgICAgICBcInVwZGF0ZVwiLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRmVhdHVyZSxcbiAgICAgICAgICAgICAgICB0ZW1wZXJhdHVyZUNvbG9yKHNlbGVjdGVkRmVhdHVyZS5pZCwgdGVtcGVyYXR1cmUpLFxuICAgICAgICAgICAgICAgIHN0YXRpb25EYXRhW3NlbGVjdGVkRmVhdHVyZS5pZF0pO1xuICAgICAgICAgICAgc2VsZWN0ZWRDb3VudHJ5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VsZWN0ZWQtY291bnRyeS1uYW1lXCIpO1xuICAgICAgICAgICAgY291bnRyeU5hbWUgPSBpc29Ub0NvdW50cnlOYW1lW3NlbGVjdGVkRmVhdHVyZS5pZF07XG4gICAgICAgICAgICBzZWxlY3RlZENvdW50cnlUZW1wID0gdGVtcGVyYXR1cmVbc2VsZWN0ZWRGZWF0dXJlLmlkXS50ZW1wZXJhdHVyZTtcblxuICAgICAgICAgICAgc2VsZWN0ZWRDb3VudHJ5TmFtZS5pbm5lckhUTUwgPSBgJHtjb3VudHJ5TmFtZX08L2JyPkF2ZyBUZW1wLiAke3NlbGVjdGVkQ291bnRyeVRlbXAudG9GaXhlZCgxKX0gJiMxNzY7RmA7XG4gICAgICAgIH1cblxuICAgICAgICBjb3VudHJpZXMub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiZmlsbFwiLCBcImdyZXlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJzdHJva2VcIiwgXCIjZWVlXCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgMyk7XG5cbiAgICAgICAgICAgIHJldHVybiB0b29sdGlwLnN0eWxlKFwib3BhY2l0eVwiLCAuOSlcbiAgICAgICAgICAgICAgICAudGV4dChpc29Ub0NvdW50cnlOYW1lW2QuaWRdKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHRvb2x0aXAuc3R5bGUoXCJvcGFjaXR5XCIsIC45KVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgKGQzLmV2ZW50LnBhZ2VZKSArIFwicHhcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCAoZDMuZXZlbnQucGFnZVggKyAxMCkgKyBcInB4XCIpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KGlzb1RvQ291bnRyeU5hbWVbZC5pZF0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwiZmlsbFwiLCBcIndoaXRlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIDEpO1xuICAgICAgICAgICAgICAgIHRvb2x0aXAuc3R5bGUoXCJvcGFjaXR5XCIsIDApXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCAwICsgXCJweFwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIDAgKyBcInB4XCIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgZ0Z1bmN0aW9uYWwuY2FsbChcbiAgICAgICAgICAgIGQzLmRyYWcoKVxuICAgICAgICAgICAgICAgIC5zdWJqZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgciA9IHByb2plY3Rpb24ucm90YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiByWzBdIC8gc2VucywgeTogLXJbMV0gLyBzZW5zXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB4OiByWzBdLCB5OiByWzFdXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oXCJkcmFnXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGltZXIuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByb3RhdGUgPSBwcm9qZWN0aW9uLnJvdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGVGYWN0b3IgPSBpbml0aWFsU2NhbGUgLyBwcm9qZWN0aW9uLnNjYWxlKCk7XG4gICAgICAgICAgICAgICAgICAgIHByb2plY3Rpb24ucm90YXRlKFtkMy5ldmVudC54ICogc2VucywgLWQzLmV2ZW50LnkgKiBzZW5zLCByb3RhdGVbMl1dKTtcbiAgICAgICAgICAgICAgICAgICAgc3ZnVmlzdWFsLnNlbGVjdEFsbChcInBhdGhcIikuYXR0cihcImRcIiwgcGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIHN2Z0Z1bmN0aW9uYWwuc2VsZWN0QWxsKFwicGF0aFwiKS5hdHRyKFwiZFwiLCBwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgZHJhd1N0YXRpb25zKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIGNvbnN0IGNsaWNrZWQgPSAoc2VsZWN0ZWRGZWF0dXJlKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBjZW50cm9pZCwgaW52ZXJ0ZWQsIGN1cnJlbnRSb3RhdGUsIGRlc2lyZWRSb3RhdGUsIHIsIGN1cnJlbnRTY2FsZSwgZGVzaXJlZFNjYWxlLCBzO1xuXG4gICAgICAgICAgICBpZiAoIXNlbGVjdGVkRmVhdHVyZSB8fCBjZW50ZXJlZEZlYXR1cmUgPT09IHNlbGVjdGVkRmVhdHVyZSkge1xuICAgICAgICAgICAgICAgIGNlbnRlcmVkRmVhdHVyZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgY2VudHJvaWQgPSBwYXRoLmNlbnRyb2lkKHNlbGVjdGVkRmVhdHVyZSk7XG4gICAgICAgICAgICAgICAgaW52ZXJ0ZWQgPSBwcm9qZWN0aW9uLmludmVydChbY2VudHJvaWRbMF0sIGNlbnRyb2lkWzFdXSk7XG4gICAgICAgICAgICAgICAgY3VycmVudFJvdGF0ZSA9IHByb2plY3Rpb24ucm90YXRlKCk7XG5cbiAgICAgICAgICAgICAgICBjdXJyZW50U2NhbGUgPSBwcm9qZWN0aW9uLnNjYWxlKCk7XG5cbiAgICAgICAgICAgICAgICByID0gZDMuaW50ZXJwb2xhdGUoY3VycmVudFJvdGF0ZSwgW2N1cnJlbnRSb3RhdGVbMF0sIGdsb2JlQ29uZmlnLnZlcnRpY2FsVGlsdCwgZ2xvYmVDb25maWcuaG9yaXpvbnRhbFRpbHRdKTtcbiAgICAgICAgICAgICAgICAvLyBzID0gZDMuaW50ZXJwb2xhdGUoY3VycmVudFNjYWxlLCBpbml0aWFsU2NhbGUpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNlbnRyb2lkID0gcGF0aC5jZW50cm9pZChzZWxlY3RlZEZlYXR1cmUpO1xuICAgICAgICAgICAgICAgIGludmVydGVkID0gcHJvamVjdGlvbi5pbnZlcnQoW2NlbnRyb2lkWzBdLCBjZW50cm9pZFsxXV0pO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRSb3RhdGUgPSBwcm9qZWN0aW9uLnJvdGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgY3VycmVudFNjYWxlID0gcHJvamVjdGlvbi5zY2FsZSgpO1xuICAgICAgICAgICAgICAgIC8vIGRlc2lyZWRTY2FsZSA9IHByb2plY3Rpb24uc2NhbGUoKTtcblxuICAgICAgICAgICAgICAgIHIgPSBkMy5pbnRlcnBvbGF0ZShjdXJyZW50Um90YXRlLCBbLWludmVydGVkWzBdLCAtaW52ZXJ0ZWRbMV1dKTtcbiAgICAgICAgICAgICAgICAvLyBzID0gZDMuaW50ZXJwb2xhdGUoY3VycmVudFNjYWxlLCAyMDApO1xuICAgICAgICAgICAgICAgIGNlbnRlcmVkRmVhdHVyZSA9IHNlbGVjdGVkRmVhdHVyZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdWaXN1YWwudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgLmR1cmF0aW9uKDc1MClcbiAgICAgICAgICAgICAgICAudHdlZW4oXCJyb3RhdGVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3Rpb24ucm90YXRlKHIodCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ZnVmlzdWFsLnNlbGVjdEFsbChcInBhdGhcIikuYXR0cihcImRcIiwgcGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdmdGdW5jdGlvbmFsLnNlbGVjdEFsbChcInBhdGhcIikuYXR0cihcImRcIiwgcGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcmF3U3RhdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKFwiZW5kXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjZW50ZXJlZEZlYXR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZVJvdGF0aW9uKGN1cnJlbnRSb3RhdGVbMF0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZENvdW50cnlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWxlY3RlZC1jb3VudHJ5LW5hbWVcIik7XG4gICAgICAgICAgICBsZXQgY291bnRyeU5hbWUgPSBpc29Ub0NvdW50cnlOYW1lW3NlbGVjdGVkRmVhdHVyZS5pZF07XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRDb3VudHJ5VGVtcCA9IHRlbXBlcmF0dXJlW3NlbGVjdGVkRmVhdHVyZS5pZF0udGVtcGVyYXR1cmU7XG5cbiAgICAgICAgICAgIHNlbGVjdGVkQ291bnRyeU5hbWUuaW5uZXJIVE1MID0gYCR7Y291bnRyeU5hbWV9PC9icj5BdmcgVGVtcC4gJHtzZWxlY3RlZENvdW50cnlUZW1wLnRvRml4ZWQoMSkgfSAmIzE3NjtGYDtcbiAgICAgICAgfTtcblxuICAgICAgICBlbmFibGVSb3RhdGlvbigpO1xuXG4gICAgICAgIHJlbmRlclNsaWRlcihtb250aCk7XG4gICAgICAgIHJlbmRlclNlbGVjdGVkQ291bnRyeShcbiAgICAgICAgICAgIFwiY3JlYXRlXCIsXG4gICAgICAgICAgICBnZW9qc29uLmZlYXR1cmVzWzVdLFxuICAgICAgICAgICAgY29sb3IodGVtcGVyYXR1cmVbZ2VvanNvbi5mZWF0dXJlc1s1XS5pZF0udGVtcGVyYXR1cmUpLFxuICAgICAgICAgICAgc3RhdGlvbnNbZ2VvanNvbi5mZWF0dXJlc1s1XS5pZF0sXG4gICAgICAgICk7XG5cbiAgICAgICAgbGV0IHNlbGVjdGVkQ291bnRyeU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlbGVjdGVkLWNvdW50cnktbmFtZVwiKTtcbiAgICAgICAgbGV0IGNvdW50cnlOYW1lID0gaXNvVG9Db3VudHJ5TmFtZVtnZW9qc29uLmZlYXR1cmVzWzVdLmlkXTtcbiAgICAgICAgbGV0IHNlbGVjdGVkQ291bnRyeVRlbXAgPSB0ZW1wZXJhdHVyZVtnZW9qc29uLmZlYXR1cmVzWzVdLmlkXS50ZW1wZXJhdHVyZTtcblxuICAgICAgICBzZWxlY3RlZENvdW50cnlOYW1lLmlubmVySFRNTCA9IGAke2NvdW50cnlOYW1lfTwvYnI+QXZnIFRlbXAuICR7c2VsZWN0ZWRDb3VudHJ5VGVtcC50b0ZpeGVkKDEpIH0gJiMxNzY7RmA7XG5cbiAgICAgICAgbGV0IHNlbGVjdGVkQ291bnRyeTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb250aC1zbGlkZXJcIilcbiAgICAgICAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2xpZGVyTGFiZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNsaWRlci1jdXJyZW50LW1vbnRoXCIpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRNb250aCA9IE51bWJlcihlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRNb250aFN0cmluZyA9IGUudGFyZ2V0LnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgc2xpZGVyTGFiZWwuaW5uZXJIVE1MID0gbnVtTW9udGhUb05hbWVbY3VycmVudE1vbnRoXTtcblxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50TW9udGhTdHJpbmcubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRNb250aFN0cmluZyA9IFwiMFwiICsgY3VycmVudE1vbnRoU3RyaW5nO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHF1ZXVlKClcbiAgICAgICAgICAgICAgICAgICAgLy8gLmRlZmVyKGQzLmpzb24sIFwiLi9kYXRhL3dvcmxkLTExMG0yLmpzb25cIilcbiAgICAgICAgICAgICAgICAgICAgLmRlZmVyKGQzLmpzb24sIGAuL2RhdGEvdGFzLTIwMTYtJHtjdXJyZW50TW9udGhTdHJpbmd9Lmpzb25gKVxuICAgICAgICAgICAgICAgICAgICAvLyAuZGVmZXIoZDMuanNvbiwgXCIuL2RhdGEvaXNvLW51bS10by1jb3VudHJ5Lmpzb25cIilcbiAgICAgICAgICAgICAgICAgICAgLmRlZmVyKGQzLmpzb24sIGAuL2RhdGEvZ3NvbS0yMDE2LSR7Y3VycmVudE1vbnRoU3RyaW5nfS10YXZnLXByY3AuanNvbmApXG4gICAgICAgICAgICAgICAgICAgIC5hd2FpdChoYW5kbGVTbGlkZXIpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGhhbmRsZVNsaWRlcihcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlLFxuICAgICAgICAgICAgICAgICAgICBzdGF0aW9uc1xuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImhlbGxvXCIpXG5cbiAgICAgICAgICAgICAgICAgICAgZ1Zpc3VhbC5zZWxlY3RBbGwoXCJwYXRoLmxhbmRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVtcGVyYXR1cmVDb2xvcihkLmlkLCB0ZW1wZXJhdHVyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwic3Ryb2tlXCIsIFwiI2VlZVwiKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZ0Z1bmN0aW9uYWwgPSBkMy5zZWxlY3QoXCIjc2VsZWN0ZWQtY291bnRyeVwiKS5zZWxlY3QoJ2cnKTtcblxuICAgICAgICAgICAgICAgICAgICBnRnVuY3Rpb25hbC5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDb3VudHJ5ID0gZC5pZCB8fCBzZWxlY3RlZENvdW50cnk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlbXBlcmF0dXJlQ29sb3IoZC5pZCwgdGVtcGVyYXR1cmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInN0cm9rZVwiLCBcIiNlZWVcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgY291bnRyaWVzLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrKGQsIHRlbXBlcmF0dXJlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZDMuanNvbihgLi9kYXRhL2dzb20tMjAxNi0ke2N1cnJlbnRNb250aFN0cmluZ30tdGF2Zy1wcmNwLmpzb25gLCBmdW5jdGlvbiAoZXJyb3IsIHN0YXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGlvbkRhdGEgPSBzdGF0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgZHJhd1N0YXRpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlclNlbGVjdGVkQ291bnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidXBkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEZlYXR1cmUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wZXJhdHVyZUNvbG9yKHNlbGVjdGVkQ291bnRyeSwgdGVtcGVyYXR1cmUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGlvbkRhdGFbc2VsZWN0ZWRDb3VudHJ5XVxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ291bnRyeU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlbGVjdGVkLWNvdW50cnktbmFtZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgY291bnRyeU5hbWUgPSBpc29Ub0NvdW50cnlOYW1lW3NlbGVjdGVkRmVhdHVyZS5pZF07XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ291bnRyeVRlbXAgPSB0ZW1wZXJhdHVyZVtzZWxlY3RlZEZlYXR1cmUuaWRdLnRlbXBlcmF0dXJlO1xuXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ291bnRyeU5hbWUuaW5uZXJIVE1MID0gYCR7Y291bnRyeU5hbWV9PC9icj5BdmcgVGVtcC4gJHtzZWxlY3RlZENvdW50cnlUZW1wLnRvRml4ZWQoMSkgfSAmIzE3NjtGYDtcblxuICAgICAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgLy8gZDMuanNvbihgLi9kYXRhL3Rhcy0yMDE2LSR7Y3VycmVudE1vbnRoU3RyaW5nfS5qc29uYCwgZnVuY3Rpb24gKGVycm9yLCB0ZW1wZXJhdHVyZSkge1xuICAgICAgICAgICAgICAgIC8vICAgICBpZiAoZXJyb3IpIHRocm93IGVycm9yO1xuXG4gICAgICAgICAgICAgICAgLy8gICAgIGdWaXN1YWwuc2VsZWN0QWxsKFwicGF0aC5sYW5kXCIpXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgcmV0dXJuIHRlbXBlcmF0dXJlQ29sb3IoZC5pZCwgdGVtcGVyYXR1cmUpO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIC5zdHlsZShcInN0cm9rZVwiLCBcIiNlZWVcIik7XG5cbiAgICAgICAgICAgICAgICAvLyAgICAgbGV0IGdGdW5jdGlvbmFsID0gZDMuc2VsZWN0KFwiI3NlbGVjdGVkLWNvdW50cnlcIikuc2VsZWN0KCdnJyk7XG5cbiAgICAgICAgICAgICAgICAvLyAgICAgZ0Z1bmN0aW9uYWwuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHNlbGVjdGVkQ291bnRyeSA9IGQuaWQgfHwgc2VsZWN0ZWRDb3VudHJ5O1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHJldHVybiB0ZW1wZXJhdHVyZUNvbG9yKGQuaWQsIHRlbXBlcmF0dXJlKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAuc3R5bGUoXCJzdHJva2VcIiwgXCIjZWVlXCIpO1xuXG4gICAgICAgICAgICAgICAgLy8gICAgIGNvdW50cmllcy5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBjbGljayhkLCB0ZW1wZXJhdHVyZSk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vICAgICBkMy5qc29uKGAuL2RhdGEvZ3NvbS0yMDE2LSR7Y3VycmVudE1vbnRoU3RyaW5nfS10YXZnLXByY3AuanNvbmAsIGZ1bmN0aW9uIChlcnJvciwgc3RhdGlvbikge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgc3RhdGlvbkRhdGEgPSBzdGF0aW9uO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgZHJhd1N0YXRpb25zKCk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICByZW5kZXJTZWxlY3RlZENvdW50cnkoXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgXCJ1cGRhdGVcIixcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBzZWxlY3RlZEZlYXR1cmUsXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgdGVtcGVyYXR1cmVDb2xvcihzZWxlY3RlZENvdW50cnksIHRlbXBlcmF0dXJlKSxcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAvLyBzdGF0aW9uRGF0YSk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgc3RhdGlvbkRhdGFbc2VsZWN0ZWRDb3VudHJ5XSk7XG5cbiAgICAgICAgICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyB9KVxuXG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgLy8gem9vbSBhbmQgcGFuXG4gICAgY29uc3Qgem9vbSA9IGQzLnpvb20oKVxuICAgICAgICAuc2NhbGVFeHRlbnQoWzEsIEluZmluaXR5XSlcbiAgICAgICAgLm9uKCd6b29tJywgKCkgPT4ge1xuICAgICAgICAgICAgem9vbWVkKCk7XG4gICAgICAgIH0pXG5cbiAgICBnRnVuY3Rpb25hbC5jYWxsKHpvb20pO1xuXG4gICAgbGV0IHByZXZpb3VzU2NhbGVGYWN0b3IgPSAxLCBvcmlnaW5hbFNjYWxlID0gaGVpZ2h0IC8gMi4xO1xuXG4gICAgZnVuY3Rpb24gem9vbWVkKCkge1xuXG4gICAgICAgIGxldCBkeCA9IGQzLmV2ZW50LnNvdXJjZUV2ZW50Lm1vdmVtZW50WDtcbiAgICAgICAgbGV0IGR5ID0gZDMuZXZlbnQuc291cmNlRXZlbnQubW92ZW1lbnRZO1xuXG4gICAgICAgIGxldCBldmVudCA9IGQzLmV2ZW50LnNvdXJjZUV2ZW50LnR5cGU7XG5cbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInNjYWxlLXByZVwiLHNjYWxlKTtcblxuICAgICAgICBpZiAoZXZlbnQgPT09ICd3aGVlbCcpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGQzLmV2ZW50LnRyYW5zZm9ybS5rKTtcbiAgICAgICAgICAgIGxldCBzY2FsZUZhY3RvciA9IGQzLmV2ZW50LnRyYW5zZm9ybS5rO1xuICAgICAgICAgICAgc2NhbGVDaGFuZ2UgPSBzY2FsZUZhY3RvciAtIHByZXZpb3VzU2NhbGVGYWN0b3I7XG4gICAgICAgICAgICBzY2FsZSA9IHNjYWxlICsgc2NhbGVDaGFuZ2UgKiBvcmlnaW5hbFNjYWxlO1xuXG4gICAgICAgICAgICBwcm9qZWN0aW9uLnNjYWxlKHNjYWxlKTtcbiAgICAgICAgICAgIHByZXZpb3VzU2NhbGVGYWN0b3IgPSBzY2FsZUZhY3RvcjtcblxuICAgICAgICAgICAgZ1Zpc3VhbC5zZWxlY3RBbGwoXCJwYXRoXCIpLmF0dHIoXCJkXCIsIHBhdGgpO1xuICAgICAgICAgICAgZ0Z1bmN0aW9uYWwuc2VsZWN0QWxsKFwicGF0aFwiKS5hdHRyKFwiZFwiLCBwYXRoKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAvLyBsZXQgciA9IHByb2plY3Rpb24ucm90YXRlKCk7XG4gICAgICAgICAgICAvLyByb3RhdGlvbiA9IFtyWzBdICsgZHggKiAwLjQsIHJbMV0gLSBkeSAqIDAuNSwgclsyXV07XG4gICAgICAgICAgICAvLyBwcm9qZWN0aW9uLnJvdGF0ZShyb3RhdGlvbik7XG5cbiAgICAgICAgICAgIC8vIGdWaXN1YWwuc2VsZWN0QWxsKFwicGF0aFwiKS5hdHRyKFwiZFwiLCBwYXRoKTtcbiAgICAgICAgICAgIC8vIGdGdW5jdGlvbmFsLnNlbGVjdEFsbChcInBhdGhcIikuYXR0cihcImRcIiwgcGF0aCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3U3RhdGlvbnMpO1xuICAgICAgICBkcmF3U3RhdGlvbnMoKTtcblxuICAgICAgICAvLyBjb250ZXh0LnJlc3RvcmUoKTtcblxuICAgIH1cbn1cbmZ1bmN0aW9uIGRyYXdTdGF0aW9uc1NwZWNpZmllZENhbnZhcyhjYW52YXMsIHN0YXRpb25EYXRhKSB7XG4gICAgY29udGV4dCA9IGNhbnZhcy5ub2RlKCkuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjb250ZXh0LnNhdmUoKTtcblxuICAgIGNvbnRleHQuc2V0VHJhbnNmb3JtKFsxLCAwLCAwLCAxLCAwLCAwXSk7XG5cbiAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIGNvbnRleHQucmVzdG9yZSgpO1xuXG4gICAgY29uc3QgcFJvdGF0ZSA9IHByb2plY3Rpb24ucm90YXRlKCk7XG5cbiAgICBmb3IgKGxldCBpIGluIHN0YXRpb25EYXRhKSB7XG4gICAgICAgIGxldCBzdGF0aW9uID0gc3RhdGlvbkRhdGFbaV0sXG5cbiAgICAgICAgICAgIGxvYyA9IHN0YXRpb24gPyBwcm9qZWN0aW9uKFtzdGF0aW9uLkxPTkdJVFVERSwgc3RhdGlvbi5MQVRJVFVERV0pIDogbnVsbDtcblxuICAgICAgICBpZiAobG9jKSB7XG4gICAgICAgICAgICBsZXQgbG9uZ2l0dWRlID0gTnVtYmVyKHN0YXRpb24uTE9OR0lUVURFKSArIDE4MCxcbiAgICAgICAgICAgICAgICBzdGFydExvbmdpdHVkZSA9IDM2MCAtICgocFJvdGF0ZVswXSArIDI3MCkgJSAzNjApLFxuICAgICAgICAgICAgICAgIGVuZExvbmdpdHVkZSA9IChzdGFydExvbmdpdHVkZSArIDE4MCkgJSAzNjA7XG5cbiAgICAgICAgICAgIGlmICgoc3RhcnRMb25naXR1ZGUgPCBlbmRMb25naXR1ZGUgJiZcbiAgICAgICAgICAgICAgICBsb25naXR1ZGUgPiBzdGFydExvbmdpdHVkZSAmJlxuICAgICAgICAgICAgICAgIGxvbmdpdHVkZSA8IGVuZExvbmdpdHVkZSkgfHxcbiAgICAgICAgICAgICAgICAoc3RhcnRMb25naXR1ZGUgPiBlbmRMb25naXR1ZGUgJiZcbiAgICAgICAgICAgICAgICAgICAgKGxvbmdpdHVkZSA+IHN0YXJ0TG9uZ2l0dWRlIHx8IGxvbmdpdHVkZSA8IGVuZExvbmdpdHVkZSkpKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgZW5kaW5nID0gcHJvamVjdGlvbihbc3RhdGlvbi5MT05HSVRVREUsIHN0YXRpb24uTEFUSVRVREVdKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuYXJjKGVuZGluZ1swXSwgZW5kaW5nWzFdLCAyLCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9ICdyZ2JhKDE0NCwgMjUzLCAyMjIsICcgKyAwLjkgKyAnKSc7XG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yKHN0YXRpb24uVEFWRyAqICg5IC8gNSkgKyAzMik7XG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG4gICAgZnVuY3Rpb24gZHJhd1N0YXRpb25zU3BlY2lmaWNNb250aChzdGF0aW9uRGF0YSkge1xuICAgICAgICBjb250ZXh0ID0gY2FudmFzLm5vZGUoKS5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBjb250ZXh0LnNhdmUoKTtcblxuICAgICAgICBjb250ZXh0LnNldFRyYW5zZm9ybShbMSwgMCwgMCwgMSwgMCwgMF0pO1xuXG4gICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuXG4gICAgICAgIGNvbnN0IHBSb3RhdGUgPSBwcm9qZWN0aW9uLnJvdGF0ZSgpO1xuXG4gICAgICAgIGZvciAobGV0IGkgaW4gc3RhdGlvbkRhdGEpIHtcbiAgICAgICAgICAgIGxldCBzYXRpb25zUGVyQ291bnRyeSA9IHN0YXRpb25EYXRhW2ldO1xuICAgICAgICAgICAgZm9yIChsZXQgaiBpbiBzYXRpb25zUGVyQ291bnRyeSkge1xuICAgICAgICAgICAgICAgIGxldCBzdGF0aW9uID0gc2F0aW9uc1BlckNvdW50cnlbal0sXG5cbiAgICAgICAgICAgICAgICAgICAgbG9jID0gc3RhdGlvbiA/IHByb2plY3Rpb24oW3N0YXRpb24uTE9OR0lUVURFLCBzdGF0aW9uLkxBVElUVURFXSkgOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYgKGxvYykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbG9uZ2l0dWRlID0gTnVtYmVyKHN0YXRpb24uTE9OR0lUVURFKSArIDE4MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0TG9uZ2l0dWRlID0gMzYwIC0gKChwUm90YXRlWzBdICsgMjcwKSAlIDM2MCksXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRMb25naXR1ZGUgPSAoc3RhcnRMb25naXR1ZGUgKyAxODApICUgMzYwO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKChzdGFydExvbmdpdHVkZSA8IGVuZExvbmdpdHVkZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgbG9uZ2l0dWRlID4gc3RhcnRMb25naXR1ZGUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvbmdpdHVkZSA8IGVuZExvbmdpdHVkZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIChzdGFydExvbmdpdHVkZSA+IGVuZExvbmdpdHVkZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChsb25naXR1ZGUgPiBzdGFydExvbmdpdHVkZSB8fCBsb25naXR1ZGUgPCBlbmRMb25naXR1ZGUpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9ICdyZ2JhKDE0NCwgMjUzLCAyMjIsICcgKyAwLjkgKyAnKSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb250ZXh0LnN0cm9rZVN0eWxlID0gJ3JnYmEoMCwwLDAsMSknO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVuZGluZyA9IHByb2plY3Rpb24oW3N0YXRpb24uTE9OR0lUVURFLCBzdGF0aW9uLkxBVElUVURFXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb250ZXh0LmxpbmVXaWR0aCA9IDJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmFyYyhlbmRpbmdbMF0sIGVuZGluZ1sxXSwgMiwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3Ioc3RhdGlvbi5UQVZHICogKDkgLyA1KSArIDMyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbmZ1bmN0aW9uIGRyYXdTdGF0aW9ucygpIHtcbiAgICBjb250ZXh0ID0gY2FudmFzLm5vZGUoKS5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGNvbnRleHQuc2F2ZSgpO1xuXG4gICAgY29udGV4dC5zZXRUcmFuc2Zvcm0oWzEsIDAsIDAsIDEsIDAsIDBdKTtcblxuICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgY29udGV4dC5yZXN0b3JlKCk7XG5cbiAgICBjb25zdCBwUm90YXRlID0gcHJvamVjdGlvbi5yb3RhdGUoKTtcblxuICAgIGZvciAobGV0IGkgaW4gc3RhdGlvbkRhdGEpIHtcbiAgICAgICAgbGV0IHNhdGlvbnNQZXJDb3VudHJ5ID0gc3RhdGlvbkRhdGFbaV07XG4gICAgICAgIGZvciAobGV0IGogaW4gc2F0aW9uc1BlckNvdW50cnkpIHtcbiAgICAgICAgICAgIGxldCBzdGF0aW9uID0gc2F0aW9uc1BlckNvdW50cnlbal0sXG5cbiAgICAgICAgICAgICAgICBsb2MgPSBzdGF0aW9uID8gcHJvamVjdGlvbihbc3RhdGlvbi5MT05HSVRVREUsIHN0YXRpb24uTEFUSVRVREVdKSA6IG51bGw7XG5cbiAgICAgICAgICAgIGlmIChsb2MpIHtcbiAgICAgICAgICAgICAgICBsZXQgbG9uZ2l0dWRlID0gTnVtYmVyKHN0YXRpb24uTE9OR0lUVURFKSArIDE4MCxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRMb25naXR1ZGUgPSAzNjAgLSAoKHBSb3RhdGVbMF0gKyAyNzApICUgMzYwKSxcbiAgICAgICAgICAgICAgICAgICAgZW5kTG9uZ2l0dWRlID0gKHN0YXJ0TG9uZ2l0dWRlICsgMTgwKSAlIDM2MDtcblxuXG4gICAgICAgICAgICAgICAgaWYgKChzdGFydExvbmdpdHVkZSA8IGVuZExvbmdpdHVkZSAmJlxuICAgICAgICAgICAgICAgICAgICBsb25naXR1ZGUgPiBzdGFydExvbmdpdHVkZSAmJlxuICAgICAgICAgICAgICAgICAgICBsb25naXR1ZGUgPCBlbmRMb25naXR1ZGUpIHx8XG4gICAgICAgICAgICAgICAgICAgIChzdGFydExvbmdpdHVkZSA+IGVuZExvbmdpdHVkZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKGxvbmdpdHVkZSA+IHN0YXJ0TG9uZ2l0dWRlIHx8IGxvbmdpdHVkZSA8IGVuZExvbmdpdHVkZSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAncmdiYSgxNDQsIDI1MywgMjIyLCAnICsgMC45ICsgJyknO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb250ZXh0LnN0cm9rZVN0eWxlID0gJ3JnYmEoMCwwLDAsMSknO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZW5kaW5nID0gcHJvamVjdGlvbihbc3RhdGlvbi5MT05HSVRVREUsIHN0YXRpb24uTEFUSVRVREVdKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29udGV4dC5saW5lV2lkdGggPSAyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuYXJjKGVuZGluZ1swXSwgZW5kaW5nWzFdLCAyLCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3Ioc3RhdGlvbi5UQVZHICogKDkgLyA1KSArIDMyKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGVuYWJsZVJvdGF0aW9uKHN0YXJ0aW5nQW5nbGUgPSAzMDApIHtcbiAgICB0aW1lciA9IGQzLnRpbWVyKGZ1bmN0aW9uIChlbGFwc2VkKSB7XG4gICAgICAgIHByb2plY3Rpb24ucm90YXRlKFtzdGFydGluZ0FuZ2xlICsgZ2xvYmVDb25maWcuc3BlZWQgKiBlbGFwc2VkLCBnbG9iZUNvbmZpZy52ZXJ0aWNhbFRpbHQsIGdsb2JlQ29uZmlnLmhvcml6b250YWxUaWx0XSk7XG4gICAgICAgIHN2Z1Zpc3VhbC5zZWxlY3RBbGwoXCJwYXRoXCIpLmF0dHIoXCJkXCIsIHBhdGgpO1xuICAgICAgICBzdmdGdW5jdGlvbmFsLnNlbGVjdEFsbChcInBhdGhcIikuYXR0cihcImRcIiwgcGF0aCk7XG4gICAgICAgIGRyYXdTdGF0aW9ucygpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBkcmF3T2NlYW4oKSB7XG5cbiAgICBnRnVuY3Rpb25hbC5zZWxlY3RBbGwoXCJwYXRoLm9jZWFuXCIpXG4gICAgICAgIC5kYXRhKFt7IHR5cGU6IFwiU3BoZXJlXCIgfV0pXG4gICAgICAgIC5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgIC5zdHlsZShcImZpbGxcIiwgXCJ0cmFuc3BhcmVudFwiKVxuXG4gICAgZ1Zpc3VhbC5zZWxlY3RBbGwoXCJwYXRoLm9jZWFuXCIpXG4gICAgICAgIC5kYXRhKFt7IHR5cGU6IFwiU3BoZXJlXCIgfV0pXG4gICAgICAgIC5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJvY2VhblwiKVxuICAgIC8vIC5hdHRyKFwiY2xhc3NcIiwgXCJvY2VhblwiKVxufVxuXG5mdW5jdGlvbiBkcmF3R3JhdGljdWxlKCkge1xuICAgIGNvbnN0IGdyYXRpY3VsZSA9IGQzLmdlb0dyYXRpY3VsZSgpXG4gICAgICAgIC5zdGVwKFsxMCwgMTBdKTtcblxuICAgIGdWaXN1YWwuc2VsZWN0QWxsKFwicGF0aC5ncmF0aWN1bGVcIilcbiAgICAgICAgLmRhdGEoW2dyYXRpY3VsZSgpXSlcbiAgICAgICAgLmVudGVyKClcbiAgICAgICAgLmFwcGVuZChcInBhdGhcIilcbiAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImdyYXRpY3VsZVwiKVxuICAgICAgICAuYXR0cihcImRcIiwgcGF0aClcbiAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBcInRyYW5zcGFyZW50XCIpXG59XG59XG4iLCJpbXBvcnQge1xuICAgIGNvbG9yLFxuICAgIHRlbXBlcmF0dXJlQ29sb3IsXG59IGZyb20gXCIuL2hlbHBlclwiXG5cbmV4cG9ydCBjb25zdCByZW5kZXJTZWxlY3RlZENvdW50cnkgPSAoXG4gICAgYWN0aW9uLFxuICAgIGdlb2pzb25GZWF0dXJlLFxuICAgIGpzb25Db3VudHJ5VGVtcGVyYXR1cmUsXG4gICAgc3RhdGlvbnNcbikgPT4ge1xuICAgIGxldCB3aWR0aCA9IDUwMCwgaGVpZ2h0ID0gNDAwLCBjZW50ZXJlZDtcblxuICAgIGxldCBjZW50ZXJTVkdQb3MgPSBbd2lkdGggLyAyLCBoZWlnaHQgLyAyXTtcblxuICAgIGxldCBwcm9qZWN0aW9uID0gZDMuZ2VvTWVyY2F0b3IoKTtcbiAgICAvLyAuY2VudGVyKFs1MCwgNTBdKVxuICAgIC8vIC5zY2FsZSgxNTApXG4gICAgLy8gLnJvdGF0ZShbMCwgMF0pO1xuXG4gICAgbGV0IHBhdGggPSBkMy5nZW9QYXRoKCkucHJvamVjdGlvbihwcm9qZWN0aW9uKTtcblxuICAgIGxldCBjYW52YXMsIGNvbnRleHQsIHN0YXRpb25EYXRhID0gW107XG4gICAgbGV0IGNpcmNsZVJhZGl1cyA9IDQ7XG5cbiAgICBjb25zdCB0b29sdGlwID0gZDMuc2VsZWN0KFwiLnRvb2x0aXBcIik7XG5cblxuICAgIGlmIChhY3Rpb24gPT09IFwidXBkYXRlXCIpIHtcbiAgICAgICAgLy8gY2FudmFzID0gZDMuc2VsZWN0KFwiI3NlbGVjdGVkLWNhbnZhc1wiKS5zZWxlY3QoXCJjYW52YXNcIik7XG4gICAgICAgIGxldCBzdmcgPSBkMy5zZWxlY3QoXCIjc2VsZWN0ZWQtZnVuY3Rpb25hbC1tYXBcIik7XG4gICAgICAgIGxldCBnID0gc3ZnLnNlbGVjdCgnZycpO1xuICAgICAgICBnLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBcInRyYW5zbGF0ZSg1MCw1MClcIlxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgYm91bmRzID0gcGF0aC5ib3VuZHMoZ2VvanNvbkZlYXR1cmUpO1xuXG4gICAgICAgIC8vIHN2Zy5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAgIC8vICAgICAudGV4dChcImhlbGxvXCIpO1xuXG4gICAgICAgIHByb2plY3Rpb24uZml0U2l6ZShbKHdpZHRoIC0gMTAwKSwgKGhlaWdodCAtIDEwMCldLCBnZW9qc29uRmVhdHVyZSlcblxuICAgICAgICBnLnNlbGVjdEFsbChcInBhdGhcIikucmVtb3ZlKCk7XG4gICAgICAgIGcuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgICAgICAgICAgLmRhdGEoW2dlb2pzb25GZWF0dXJlXSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJkXCIsIHBhdGgpXG4gICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGpzb25Db3VudHJ5VGVtcGVyYXR1cmUpXG4gICAgICAgICAgICAuc3R5bGUoXCJzdHJva2VcIiwgXCIjZWVlXCIpXG4gICAgICAgIC8vIC5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIC8vICAgICAvLyAgICAgY29uc3QgY2VudHJvaWQgPSBwYXRoLmNlbnRyb2lkKGQpO1xuICAgICAgICAvLyAgICAgLy8gICAgIGNvbnN0IHggPSB3aWR0aCAvIDIgLSBjZW50cm9pZFswXTtcbiAgICAgICAgLy8gICAgIC8vICAgICBjb25zdCB5ID0gaGVpZ2h0IC8gMiAtIGNlbnRyb2lkWzFdO1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiBcInRyYW5zbGF0ZShcIiArIHByb2plY3Rpb24oW2QubG9uZywgZC5sYXRdKSArIFwiKVwiXG4gICAgICAgIC8vIH0pO1xuICAgICAgICBzdGF0aW9uRGF0YSA9IHN0YXRpb25zO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInNlbGVjdGVkLW1hcFwiLCBzdGF0aW9uRGF0YSk7XG4gICAgICAgIGRyYXdTdGF0aW9ucygpO1xuXG4gICAgICAgIC8vIGNvbnN0IHpvb20gPSBkMy56b29tKClcbiAgICAgICAgLy8gICAgIC5zY2FsZUV4dGVudChbMSwgSW5maW5pdHldKVxuICAgICAgICAvLyAgICAgLnRyYW5zbGF0ZUV4dGVudChbWzAsIDBdLCBbd2lkdGgsIGhlaWdodF1dKVxuICAgICAgICAvLyAgICAgLmV4dGVudChbWzAsIDBdLCBbd2lkdGgsIGhlaWdodF1dKVxuICAgICAgICAvLyAgICAgLm9uKCd6b29tJywgKCkgPT4ge1xuICAgICAgICAvLyAgICAgICAgIGcuc3R5bGUoJ3N0cm9rZS13aWR0aCcsIGAkezEuNSAvIGQzLmV2ZW50LnRyYW5zZm9ybS5rfXB4YClcbiAgICAgICAgLy8gICAgICAgICBnLmF0dHIoJ3RyYW5zZm9ybScsIGQzLmV2ZW50LnRyYW5zZm9ybSk7XG4gICAgICAgIC8vICAgICAgICAgLy8gZy5zZWxlY3RBbGwoXCJjaXJjbGVcIikuYXR0cigndHJhbnNmb3JtJywgZDMuZXZlbnQudHJhbnNmb3JtKTtcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhkMy5ldmVudC50cmFuc2Zvcm0pO1xuICAgICAgICAvLyAgICAgfSlcblxuICAgICAgICAvLyBnLmNhbGwoem9vbSk7XG5cbiAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gXCJjcmVhdGVcIikge1xuICAgICAgICAvLyBjYW52YXMgPSBkMy5zZWxlY3QoXCIjc2VsZWN0ZWQtY2FudmFzXCIpLmFwcGVuZChcImNhbnZhc1wiKVxuICAgICAgICAvLyAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgICAgLy8gICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAgICAgLy8gICAgIC5zdHlsZSgncG9zaXRpb24nLCAnYWJzb2x1dGUnKVxuICAgICAgICAvLyAgICAgLnN0eWxlKCdsZWZ0JywgJzAnKTtcblxuICAgICAgICBsZXQgc3ZnID0gZDMuc2VsZWN0KFwiI3NlbGVjdGVkLWZ1bmN0aW9uYWwtbWFwXCIpXG4gICAgICAgICAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKVxuICAgICAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KTtcbiAgICAgICAgbGV0IGcgPSBzdmcuYXBwZW5kKFwiZ1wiKTtcbiAgICAgICAgZy5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJ0cmFuc2xhdGUoNTAsNTApXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcHJvamVjdGlvbi5maXRTaXplKFsod2lkdGggLSAxMDApLCAoaGVpZ2h0IC0gMTAwKV0sIGdlb2pzb25GZWF0dXJlKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNlbnRyb2lkXCIsIHBhdGguY2VudHJvaWQoZ2VvanNvbkZlYXR1cmUpKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocHJvamVjdGlvbi50cmFuc2xhdGUoWzAsIDBdKSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY2VudHJvaWQyXCIsIHBhdGguY2VudHJvaWQoZ2VvanNvbkZlYXR1cmUpKTtcbiAgICAgICAgLy8gcHJvamVjdGlvbi50cmFuc2xhdGUoWzEwMCwxMDBdKTtcbiAgICAgICAgLy8gcHJvamVjdGlvbi5jZW50ZXIoW3dpZHRoLzIsIGhlaWdodC8yXSk7XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IGQzLnJhbmdlKDEwKTtcbiAgICAgICAgLy8gY29uc3QgcmVjdHMgPSBzdmcuc2VsZWN0QWxsKFwiLnJlY3RzXCIpXG4gICAgICAgIC8vICAgICAuZGF0YShkYXRhKVxuICAgICAgICAvLyAgICAgLmVudGVyKClcbiAgICAgICAgLy8gICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAgIC8vICAgICAuYXR0cihcInhcIiwgMTApXG4gICAgICAgIC8vICAgICAuYXR0cihcImhlaWdodFwiLCAxMClcbiAgICAgICAgLy8gICAgIC5hdHRyKFwieVwiLCAoZCwgaSkgPT4gMTAgKyBpICogOSlcbiAgICAgICAgLy8gICAgIC5hdHRyKFwid2lkdGhcIiwgMTApXG4gICAgICAgIC8vICAgICAuYXR0cihcImZpbGxcIiwgZCA9PiBjb2xvcigxMDAgLSBkICogMTApKVxuICAgICAgICAvLyAgICAgLmF0dHIoXCJzdHJva2VcIiwgXCJncmF5XCIpO1xuXG4gICAgICAgIC8vIHN2Zy5zZWxlY3RBbGwoXCJ0ZXh0XCIpXG4gICAgICAgIC8vICAgICAuZGF0YShkYXRhKVxuICAgICAgICAvLyAgICAgLmVudGVyKClcbiAgICAgICAgLy8gICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAgIC8vICAgICAuaHRtbChkID0+IHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gYCR7KDEwMCAtIGQgKiAxMCl9JiMxNzY7RmA7XG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyAgICAgLmF0dHIoXCJmb250LXNpemVcIiwgXCIwLjMyZW1cIilcbiAgICAgICAgLy8gICAgIC5hdHRyKFwieFwiLCAyMylcbiAgICAgICAgLy8gICAgIC5hdHRyKFwiaGVpZ2h0XCIsIDIwKVxuICAgICAgICAvLyAgICAgLmF0dHIoXCJ5XCIsIChkLCBpKSA9PiAyMCArIGkgKiA5KVxuICAgICAgICAvLyAgICAgLmF0dHIoXCJ3aWR0aFwiLCAxMClcbiAgICAgICAgLy8gICAgIC5hdHRyKFwiZmlsbFwiLCBkID0+IGNvbG9yKDEwMCAtIGQgKiAxMCkpXG4gICAgICAgIC8vIC8vIC5hdHRyKFwic3Ryb2tlXCIsIFwiZ3JheVwiKTtcblxuICAgICAgICBnLnNlbGVjdEFsbChcInBhdGhcIilcbiAgICAgICAgICAgIC5kYXRhKFtnZW9qc29uRmVhdHVyZV0pXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZChcInBhdGhcIilcbiAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBwYXRoKVxuICAgICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBqc29uQ291bnRyeVRlbXBlcmF0dXJlKVxuICAgICAgICAgICAgLnN0eWxlKFwic3Ryb2tlXCIsIFwiI2VlZVwiKVxuICAgICAgICAvLyAuYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAvLyAgICAgY29uc3QgY2VudHJvaWQgPSBwYXRoLmNlbnRyb2lkKGQpO1xuICAgICAgICAvLyAgICAgY29uc3QgeCA9IHdpZHRoIC8gMiAtIGNlbnRyb2lkWzBdO1xuICAgICAgICAvLyAgICAgY29uc3QgeSA9IGhlaWdodCAvIDIgLSBjZW50cm9pZFsxXTtcbiAgICAgICAgLy8gICAgIHJldHVybiBcInRyYW5zbGF0ZShcIiArIHggKyBcIixcIiArIHkgKyBcIilcIlxuICAgICAgICAvLyB9KTtcblxuICAgICAgICBzdGF0aW9uRGF0YSA9IHN0YXRpb25zO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhzdGF0aW9uRGF0YSk7XG4gICAgICAgIGRyYXdTdGF0aW9ucygpO1xuXG4gICAgICAgIGNvbnN0IHpvb20gPSBkMy56b29tKClcbiAgICAgICAgICAgIC5zY2FsZUV4dGVudChbMSwgSW5maW5pdHldKVxuICAgICAgICAgICAgLnRyYW5zbGF0ZUV4dGVudChbWzAsIDBdLCBbd2lkdGgsIGhlaWdodF1dKVxuICAgICAgICAgICAgLmV4dGVudChbWzAsIDBdLCBbd2lkdGgsIGhlaWdodF1dKVxuICAgICAgICAgICAgLm9uKCd6b29tJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzY2FsZVhZID0gZDMuZXZlbnQudHJhbnNmb3JtO1xuICAgICAgICAgICAgICAgIGcuYXR0cihcInRyYW5zZm9ybVwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInRyYW5zbGF0ZShcIiArIChzY2FsZVhZLnggKyA1MCkgKyBcIixcIiArIChzY2FsZVhZLnkgKyA1MCkgKyBcIikgc2NhbGUoXCIgKyBzY2FsZVhZLmsgKyBcIilcIjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBnLnNlbGVjdEFsbChcImNpcmNsZVwiKS5hdHRyKFwiclwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGQzLmV2ZW50LnRyYW5zZm9ybSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzY2FsZVhZID0gZDMuZXZlbnQudHJhbnNmb3JtO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGNpcmNsZVJhZGl1cyAvIHNjYWxlWFkuayk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIHN2Zy5jYWxsKHpvb20pO1xuXG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmF3U3RhdGlvbnMoKSB7XG4gICAgICAgIGxldCBnID0gZDMuc2VsZWN0KFwiI3NlbGVjdGVkLWZ1bmN0aW9uYWwtbWFwXCIpLnNlbGVjdChcInN2Z1wiKS5zZWxlY3QoXCJnXCIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhzdGF0aW9uRGF0YSlcblxuICAgICAgICBpZiAoc3RhdGlvbkRhdGEpIHtcbiAgICAgICAgICAgIGcuc2VsZWN0QWxsKCdjaXJjbGUnKVxuICAgICAgICAgICAgICAgIC8vIGcuc2VsZWN0QWxsKCd0ZXh0JylcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIGxldCBzdGF0aW9uc1ZhbHVlID0gZy5zZWxlY3RBbGwoJ2NpcmNsZScpXG4gICAgICAgICAgICAgICAgLy8gbGV0IHN0YXRpb25zVmFsdWUgPSBnLnNlbGVjdEFsbCgndGV4dCcpXG4gICAgICAgICAgICAgICAgLmRhdGEoc3RhdGlvbkRhdGEpXG4gICAgICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAgICAgICAgIC8vIC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgICAgIC8vIC5hdHRyKCdjbGFzcycsICd0ZW1wLXRleHQnKVxuICAgICAgICAgICAgICAgIC8vIC50ZXh0KGQgPT4ge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuIChkLlRBVkcgKiAoOSAvIDUpICsgMzIpLnRvRml4ZWQoMCk7XG4gICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgICAgICAvLyAuYXR0cignY3gnLCBkID0+IHByb2plY3Rpb24oW2QuTE9OR0lUVURFLCBkLkxBVElUVURFXSlbMF0pXG4gICAgICAgICAgICAgICAgLy8gLmF0dHIoJ2N5JywgZCA9PiBwcm9qZWN0aW9uKFtkLkxPTkdJVFVERSwgZC5MQVRJVFVERV0pWzFdKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYHRyYW5zbGF0ZSgke3Byb2plY3Rpb24oW2QuTE9OR0lUVURFLCBkLkxBVElUVURFXSlbMF19LFxuICAgICAgICAgICAgICAgICAgICAgICAgJHtwcm9qZWN0aW9uKFtkLkxPTkdJVFVERSwgZC5MQVRJVFVERV0pWzFdfSlgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJzdHJva2VcIiwgXCIjMTExXCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgMC4xKVxuICAgICAgICAgICAgICAgIC8vIC5zdHlsZShcInN0b3JrZVwiLCBcInJnYmEoMTQ0LCAyNTMsIDIyMiwgMSlcIilcbiAgICAgICAgICAgICAgICAuYXR0cignZmlsbCcsIChkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb2xvcihkLlRBVkcgKiAoOSAvIDUpICsgMzIpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuYXR0cigncicsIGNpcmNsZVJhZGl1cyk7XG5cbiAgICAgICAgICAgIHN0YXRpb25zVmFsdWUub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwic3Ryb2tlXCIsIFwiI2VlZVwiKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cihcInN0cm9rZS13aWR0aFwiLCAwLjIpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvb2x0aXAuc3R5bGUoXCJvcGFjaXR5XCIsIC45KVxuICAgICAgICAgICAgICAgICAgICAuaHRtbChcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPHA+XCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgZC5OQU1FICsgXCI8YnIvPlwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQXZlcmFnZSBUZW1wOiBcIiArIChkLlRBVkcgKiAoOSAvIDUpICsgMzIpLnRvRml4ZWQoMSkgKyBcIiYjMTc2O0YgPGJyIC8+XCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCI8L3A+XCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgKGQzLmV2ZW50LnBhZ2VZKSArIFwicHhcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCAoZDMuZXZlbnQucGFnZVggKyAxMCkgKyBcInB4XCIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXAuc3R5bGUoXCJvcGFjaXR5XCIsIC45KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCAoZDMuZXZlbnQucGFnZVkpICsgXCJweFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgKGQzLmV2ZW50LnBhZ2VYICsgMTApICsgXCJweFwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gLnRleHQoZC5OQU1FKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwic3Ryb2tlXCIsIFwiIzExMVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgMC4xKVxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwLnN0eWxlKFwib3BhY2l0eVwiLCAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIDAgKyBcInB4XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIDAgKyBcInB4XCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZy5zZWxlY3RBbGwoJ2NpcmNsZScpXG4gICAgICAgICAgICAgICAgLy8gZy5zZWxlY3RBbGwoJ3RleHQnKVxuICAgICAgICAgICAgICAgIC5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICAvLyBmdW5jdGlvbiBkcmF3U3RhdGlvbnMoKSB7XG4gICAgLy8gICAgIGNvbnRleHQgPSBjYW52YXMubm9kZSgpLmdldENvbnRleHQoJzJkJyk7XG4gICAgLy8gICAgIGNvbnRleHQuc2F2ZSgpO1xuXG4gICAgLy8gICAgIGNvbnRleHQuc2V0VHJhbnNmb3JtKFsxLCAwLCAwLCAxLCAwLCAwXSk7XG5cbiAgICAvLyAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAvLyAgICAgY29udGV4dC5yZXN0b3JlKCk7XG5cbiAgICAvLyAgICAgY29uc3QgcFJvdGF0ZSA9IHByb2plY3Rpb24ucm90YXRlKCk7XG5cbiAgICAvLyAgICAgZm9yIChsZXQgaSBpbiBzdGF0aW9uRGF0YSkge1xuXG4gICAgLy8gICAgICAgICBsZXQgc3RhdGlvbiA9IHN0YXRpb25EYXRhW2ldLFxuICAgIC8vICAgICAgICAgICAgIGxvYyA9IHN0YXRpb24gPyBwcm9qZWN0aW9uKFtzdGF0aW9uLkxPTkdJVFVERSwgc3RhdGlvbi5MQVRJVFVERV0pIDogbnVsbDtcblxuICAgIC8vICAgICAgICAgaWYgKGxvYykge1xuICAgIC8vICAgICAgICAgICAgIGxldCBsb25naXR1ZGUgPSBOdW1iZXIoc3RhdGlvbi5MT05HSVRVREUpICsgMTgwLFxuICAgIC8vICAgICAgICAgICAgICAgICBzdGFydExvbmdpdHVkZSA9IDM2MCAtICgocFJvdGF0ZVswXSArIDI3MCkgJSAzNjApLFxuICAgIC8vICAgICAgICAgICAgICAgICBlbmRMb25naXR1ZGUgPSAoc3RhcnRMb25naXR1ZGUgKyAxODApICUgMzYwLFxuICAgIC8vICAgICAgICAgICAgICAgICBlbmRpbmcgPSBwcm9qZWN0aW9uKFtzdGF0aW9uLkxPTkdJVFVERSwgc3RhdGlvbi5MQVRJVFVERV0pO1xuXG4gICAgLy8gICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAvLyAgICAgICAgICAgICBjb250ZXh0LmFyYyhlbmRpbmdbMF0sIGVuZGluZ1sxXSwgNiwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIC8vICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAncmdiYSgxNDQsIDI1MywgMjIyLCAnICsgMC45ICsgJyknO1xuICAgIC8vICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgLy8gICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcihzdGF0aW9uLlRBVkcgKiAoOSAvIDUpICsgMzIpO1xuICAgIC8vICAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG5cbiAgICAvLyB9XG59IiwiZXhwb3J0IGNvbnN0IG51bU1vbnRoVG9OYW1lID0ge1xuICAgIDE6IFwiSmFudWFyeVwiLFxuICAgIDI6IFwiRmVicnVhcnlcIixcbiAgICAzOiBcIk1hcmNoXCIsXG4gICAgNDogXCJBcHJpbFwiLFxuICAgIDU6IFwiTWF5XCIsXG4gICAgNjogXCJKdW5lXCIsXG4gICAgNzogXCJKdWx5XCIsXG4gICAgODogXCJBdWd1c3RcIixcbiAgICA5OiBcIlNlcHRlbWJlclwiLFxuICAgIDEwOiBcIk9jdG9iZXJcIixcbiAgICAxMTogXCJOb3ZlbWJlclwiLFxuICAgIDEyOiBcIkRlY2VtYmVyXCIsXG59XG5cblxuXG5cbmV4cG9ydCBjb25zdCByZW5kZXJTbGlkZXIgPSAobW9udGgpID0+IHtcbiAgICBjb25zdCBzbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNsaWRlclwiKTtcbiAgICBzbGlkZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzbGlkZXItY29udGFpbmVyXCIpO1xuXG4gICAgY29uc3Qgc2xpZGVyTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNsaWRlckxhYmVsLnNldEF0dHJpYnV0ZShcImlkXCIsIFwic2xpZGVyLWN1cnJlbnQtbW9udGhcIik7XG4gICAgc2xpZGVyTGFiZWwuaW5uZXJIVE1MID0gbnVtTW9udGhUb05hbWVbbW9udGhdO1xuXG4gICAgY29uc3Qgc2xpZGVyU2V0dGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBzbGlkZXJTZXR0aW5nLnNldEF0dHJpYnV0ZShcImlkXCIsIFwibW9udGgtc2xpZGVyXCIpO1xuICAgIHNsaWRlclNldHRpbmcuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInJhbmdlXCIpO1xuICAgIHNsaWRlclNldHRpbmcuc2V0QXR0cmlidXRlKFwibWluXCIsIFwiMVwiKTtcbiAgICBzbGlkZXJTZXR0aW5nLnNldEF0dHJpYnV0ZShcIm1heFwiLCBcIjEyXCIpO1xuICAgIHNsaWRlclNldHRpbmcuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCIxMFwiKTtcbiAgICBzbGlkZXJTZXR0aW5nLnNldEF0dHJpYnV0ZShcInN0ZXBcIiwgXCIxXCIpO1xuXG4gICAgc2xpZGVyLmFwcGVuZENoaWxkKHNsaWRlclNldHRpbmcpO1xuICAgIHNsaWRlci5hcHBlbmRDaGlsZChzbGlkZXJMYWJlbCk7XG59XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9