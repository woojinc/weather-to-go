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
      sens = 0.25,
      centeredFeature,
      timer,
      scaleChange,
      selectedFeature,
      context,
      canvas,
      projection,
      path,
      scale = originalScale,
      originalScale = height / 2.1,
      stationData = [],
      svgVisual,
      svgFunctional,
      gVisual,
      gFunctional;
  var globeConfig = {
    speed: 0.005,
    verticalTilt: -23.5,
    horizontalTilt: 0
  };
  svgVisual = d3.select("#map").append("svg");
  svgFunctional = d3.select("#functional-map").append("svg");
  gVisual = svgVisual.append('g');
  gFunctional = svgFunctional.append('g');
  svgVisual.attr("width", width).attr("height", height);
  svgFunctional.attr("width", width).attr("height", height);
  projection = d3.geoOrthographic().translate([width / 2, height / 2]);
  path = d3.geoPath().projection(projection);
  canvas = d3.select("#canvas").append("canvas");
  canvas.attr("width", width).attr("height", height).style('position', 'absolute').style('left', '0');
  var initialScale = projection.scale();
  queue().defer(d3.json, "./data/world-110m2.json").defer(d3.json, "./data/tas-2016-".concat(month, ".json")).defer(d3.json, "./data/iso-num-to-country.json").defer(d3.json, "./data/gsom-2016-".concat(month, "-tavg-prcp.json")).await(renderGlobalMap);

  function renderGlobalMap(error, topology, temperature, isoToCountryName, stations) {
    if (error) throw error;
    stationData = stations;
    var geojson = topojson.feature(topology, topology.objects.countries);
    var tooltip = d3.select(".tooltip");
    drawTempBar();
    drawOcean();
    drawGraticule();
    gVisual.selectAll("path.land").data(geojson.features).enter().append("path").attr("class", "land").attr("d", path).style("fill", function (d) {
      return Object(_helper__WEBPACK_IMPORTED_MODULE_1__["temperatureColor"])(d.id, temperature);
    });
    var countries = gFunctional.selectAll("path.land").data(geojson.features).enter().append("path").attr("class", "land").attr("d", path).style("fill", "transparent").on("click", function (d) {
      click(d, temperature);
    });

    function click(d, temperature) {
      selectedFeature = d;
      timer.stop();
      clicked(selectedFeature);
      Object(_selected_map__WEBPACK_IMPORTED_MODULE_2__["renderSelectedCountry"])("update", selectedFeature, Object(_helper__WEBPACK_IMPORTED_MODULE_1__["temperatureColor"])(selectedFeature.id, temperature), stationData[selectedFeature.id]);
      selectedCountryName = document.querySelector("#selected-country-name");
      countryName = isoToCountryName[selectedFeature.id];
      selectedCountryTemp = temperature[selectedFeature.id].temperature;
      selectedCountryName.innerHTML = "".concat(countryName, "</br>Avg Temp. ").concat(selectedCountryTemp.toFixed(1), " &#176;F");
    }

    ;

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
        y: -r[1] / sens
      };
    }).on("drag", function () {
      console.log(path);
      timer.stop();
      var rotate = projection.rotate();
      var scaleFactor = initialScale / projection.scale();
      projection.rotate([d3.event.x * sens, -d3.event.y * sens, rotate[2]]);
      gVisual.selectAll("path").attr("d", path);
      svgFunctional.selectAll("path").attr("d", path);
      drawStations();
    }));
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

      queue().defer(d3.json, "./data/tas-2016-".concat(currentMonthString, ".json")).defer(d3.json, "./data/gsom-2016-".concat(currentMonthString, "-tavg-prcp.json")).await(handleSlider);
    });

    function handleSlider(error, temperature, stations) {
      if (error) throw error;
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
      });
      stationData = stations;
      drawStations();
      Object(_selected_map__WEBPACK_IMPORTED_MODULE_2__["renderSelectedCountry"])("update", selectedFeature, Object(_helper__WEBPACK_IMPORTED_MODULE_1__["temperatureColor"])(selectedCountry, temperature), stationData[selectedCountry]);
      selectedCountryName = document.querySelector("#selected-country-name");
      countryName = isoToCountryName[selectedFeature.id];
      selectedCountryTemp = temperature[selectedFeature.id].temperature;
      selectedCountryName.innerHTML = "".concat(countryName, "</br>Avg Temp. ").concat(selectedCountryTemp.toFixed(1), " &#176;F");
    } // zoom and pan


    var zoom = d3.zoom().scaleExtent([1, Infinity]).on('zoom', function () {
      zoomed();
    });
    svgFunctional.call(zoom);
  }

  function zoomed() {
    var previousScaleFactor = 1,
        originalScale = height / 2.1; // let dx = d3.event.sourceEvent.movementX;
    // let dy = d3.event.sourceEvent.movementY;

    var event = d3.event.sourceEvent.type;
    context.save();
    context.clearRect(0, 0, width, height);

    if (event === 'wheel') {
      var scaleFactor = d3.event.transform.k;
      scaleChange = scaleFactor - previousScaleFactor;
      scale = scale + scaleChange * originalScale;
      projection.scale(scale);
      previousScaleFactor = scaleFactor;
      console.log(path);
      gVisual.selectAll("path").attr("d", path);
      gFunctional.selectAll("path").attr("d", path);
    }

    drawStations();
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
            context.strokeStyle = 'rgba(144, 253, 222, ' + 0.9 + ')';
            var ending = projection([station.LONGITUDE, station.LATITUDE]);
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

  function drawTempBar() {
    var data = d3.range(10);
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
  }

  function drawOcean() {
    gFunctional.selectAll("path.ocean").data([{
      type: "Sphere"
    }]).enter().append("path").style("fill", "transparent");
    gVisual.selectAll("path.ocean").data([{
      type: "Sphere"
    }]).enter().append("path").attr("class", "ocean");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvamF2YXNjcmlwdHMvaGVscGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qYXZhc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvamF2YXNjcmlwdHMvbWFwLmpzIiwid2VicGFjazovLy8uL3NyYy9qYXZhc2NyaXB0cy9zZWxlY3RlZC1tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2phdmFzY3JpcHRzL3NsaWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MiXSwibmFtZXMiOlsiY29sb3IiLCJkMyIsInNjYWxlTGluZWFyIiwiZG9tYWluIiwicmFuZ2UiLCJ0ZW1wZXJhdHVyZUNvbG9yIiwiaWQiLCJjb3VudHJ5VGVtcGVyYXR1cmUiLCJ1bmRlZmluZWQiLCJqc29uQ291bnRyeVRlbXBlcmF0dXJlIiwidGVtcGVyYXR1cmUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVuZGVyTWFwIiwibW9udGgiLCJ3aWR0aCIsImhlaWdodCIsInNlbnMiLCJjZW50ZXJlZEZlYXR1cmUiLCJ0aW1lciIsInNjYWxlQ2hhbmdlIiwic2VsZWN0ZWRGZWF0dXJlIiwiY29udGV4dCIsImNhbnZhcyIsInByb2plY3Rpb24iLCJwYXRoIiwic2NhbGUiLCJvcmlnaW5hbFNjYWxlIiwic3RhdGlvbkRhdGEiLCJzdmdWaXN1YWwiLCJzdmdGdW5jdGlvbmFsIiwiZ1Zpc3VhbCIsImdGdW5jdGlvbmFsIiwiZ2xvYmVDb25maWciLCJzcGVlZCIsInZlcnRpY2FsVGlsdCIsImhvcml6b250YWxUaWx0Iiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsImdlb09ydGhvZ3JhcGhpYyIsInRyYW5zbGF0ZSIsImdlb1BhdGgiLCJzdHlsZSIsImluaXRpYWxTY2FsZSIsInF1ZXVlIiwiZGVmZXIiLCJqc29uIiwiYXdhaXQiLCJyZW5kZXJHbG9iYWxNYXAiLCJlcnJvciIsInRvcG9sb2d5IiwiaXNvVG9Db3VudHJ5TmFtZSIsInN0YXRpb25zIiwiZ2VvanNvbiIsInRvcG9qc29uIiwiZmVhdHVyZSIsIm9iamVjdHMiLCJjb3VudHJpZXMiLCJ0b29sdGlwIiwiZHJhd1RlbXBCYXIiLCJkcmF3T2NlYW4iLCJkcmF3R3JhdGljdWxlIiwic2VsZWN0QWxsIiwiZGF0YSIsImZlYXR1cmVzIiwiZW50ZXIiLCJkIiwib24iLCJjbGljayIsInN0b3AiLCJjbGlja2VkIiwicmVuZGVyU2VsZWN0ZWRDb3VudHJ5Iiwic2VsZWN0ZWRDb3VudHJ5TmFtZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvdW50cnlOYW1lIiwic2VsZWN0ZWRDb3VudHJ5VGVtcCIsImlubmVySFRNTCIsInRvRml4ZWQiLCJjZW50cm9pZCIsImludmVydGVkIiwiY3VycmVudFJvdGF0ZSIsImRlc2lyZWRSb3RhdGUiLCJyIiwiY3VycmVudFNjYWxlIiwiZGVzaXJlZFNjYWxlIiwicyIsImludmVydCIsInJvdGF0ZSIsImludGVycG9sYXRlIiwidHJhbnNpdGlvbiIsImR1cmF0aW9uIiwidHdlZW4iLCJ0IiwiZHJhd1N0YXRpb25zIiwiZW5hYmxlUm90YXRpb24iLCJpIiwidGV4dCIsImV2ZW50IiwicGFnZVkiLCJwYWdlWCIsImNhbGwiLCJkcmFnIiwic3ViamVjdCIsIngiLCJ5IiwiY29uc29sZSIsImxvZyIsInNjYWxlRmFjdG9yIiwicmVuZGVyU2xpZGVyIiwic2VsZWN0ZWRDb3VudHJ5IiwiZ2V0RWxlbWVudEJ5SWQiLCJlIiwic2xpZGVyTGFiZWwiLCJjdXJyZW50TW9udGgiLCJOdW1iZXIiLCJ0YXJnZXQiLCJ2YWx1ZSIsImN1cnJlbnRNb250aFN0cmluZyIsIm51bU1vbnRoVG9OYW1lIiwibGVuZ3RoIiwiaGFuZGxlU2xpZGVyIiwiem9vbSIsInNjYWxlRXh0ZW50IiwiSW5maW5pdHkiLCJ6b29tZWQiLCJwcmV2aW91c1NjYWxlRmFjdG9yIiwic291cmNlRXZlbnQiLCJ0eXBlIiwic2F2ZSIsImNsZWFyUmVjdCIsInRyYW5zZm9ybSIsImsiLCJub2RlIiwiZ2V0Q29udGV4dCIsInNldFRyYW5zZm9ybSIsInJlc3RvcmUiLCJwUm90YXRlIiwic2F0aW9uc1BlckNvdW50cnkiLCJqIiwic3RhdGlvbiIsImxvYyIsIkxPTkdJVFVERSIsIkxBVElUVURFIiwibG9uZ2l0dWRlIiwic3RhcnRMb25naXR1ZGUiLCJlbmRMb25naXR1ZGUiLCJzdHJva2VTdHlsZSIsImVuZGluZyIsImJlZ2luUGF0aCIsImFyYyIsIk1hdGgiLCJQSSIsInN0cm9rZSIsImZpbGxTdHlsZSIsIlRBVkciLCJmaWxsIiwic3RhcnRpbmdBbmdsZSIsImVsYXBzZWQiLCJyZWN0cyIsImh0bWwiLCJncmF0aWN1bGUiLCJnZW9HcmF0aWN1bGUiLCJzdGVwIiwiYWN0aW9uIiwiZ2VvanNvbkZlYXR1cmUiLCJjZW50ZXJlZCIsImNlbnRlclNWR1BvcyIsImdlb01lcmNhdG9yIiwiY2lyY2xlUmFkaXVzIiwic3ZnIiwiZyIsImJvdW5kcyIsImZpdFNpemUiLCJyZW1vdmUiLCJ0cmFuc2xhdGVFeHRlbnQiLCJleHRlbnQiLCJzY2FsZVhZIiwic3RhdGlvbnNWYWx1ZSIsIk5BTUUiLCJzbGlkZXIiLCJzZXRBdHRyaWJ1dGUiLCJjcmVhdGVFbGVtZW50Iiwic2xpZGVyU2V0dGluZyIsImFwcGVuZENoaWxkIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsaUJBQWlCLG1CQUFPLENBQUMsc0RBQWEsRTs7Ozs7Ozs7Ozs7O0FDQXpCOztB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bEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsU0FBUztBQUNwQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUyxHQUFHLFNBQVM7QUFDNUMsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLHVDQUF1QyxPQUFPO0FBQzlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsZ0NBQWdDO0FBQ2hDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25COzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQ3RXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUNSQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOzs7QUFHRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7O0FBRXJCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7OztBQy9NQTtBQUFBO0FBQUE7QUFBTyxJQUFNQSxLQUFLLEdBQUdDLEVBQUUsQ0FBQ0MsV0FBSCxHQUNoQkMsTUFEZ0IsQ0FDVCxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLEVBQWIsRUFBaUIsRUFBakIsRUFBcUIsRUFBckIsRUFBeUIsRUFBekIsRUFBNkIsR0FBN0IsQ0FEUyxFQUVoQkMsS0FGZ0IsQ0FFVixDQUFDLFNBQUQsRUFDSCxTQURHLEVBRUgsU0FGRyxFQUdILFNBSEcsRUFJSCxTQUpHLEVBS0gsU0FMRyxFQU1ILFNBTkcsRUFPSCxTQVBHLENBRlUsQ0FBZDtBQVdBLElBQU1DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQ0MsRUFBRCxFQUFLQyxrQkFBTCxFQUE0QjtBQUV4RCxNQUFJQSxrQkFBa0IsQ0FBQ0QsRUFBRCxDQUFsQixLQUEyQkUsU0FBL0IsRUFBMEM7QUFDdEMsUUFBTUMsc0JBQXNCLEdBQUdGLGtCQUFrQixDQUFDRCxFQUFELENBQWxCLENBQXVCSSxXQUF0RDtBQUNBLFdBQU9WLEtBQUssQ0FBQ1Msc0JBQUQsQ0FBWjtBQUNILEdBSEQsTUFHTztBQUNILFdBQU8sT0FBUDtBQUNIO0FBQ0osQ0FSTSxDOzs7Ozs7Ozs7Ozs7QUNYUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUFFLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0Isa0JBQXhCLEVBQTRDLFlBQU07QUFDOUNDLHdEQUFTLENBQUMsRUFBRCxDQUFUO0FBQ0gsQ0FGRCxFOzs7Ozs7Ozs7Ozs7QUNMQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQTtBQUtBO0FBRU8sSUFBTUEsU0FBUyxHQUFHLFNBQVpBLFNBQVksQ0FBQ0MsS0FBRCxFQUFXO0FBRWhDLE1BQUlDLEtBQUssR0FBRyxHQUFaO0FBQUEsTUFBaUJDLE1BQU0sR0FBRyxHQUExQjtBQUFBLE1BQStCQyxJQUFJLEdBQUcsSUFBdEM7QUFBQSxNQUE0Q0MsZUFBNUM7QUFBQSxNQUE2REMsS0FBN0Q7QUFBQSxNQUFvRUMsV0FBcEU7QUFBQSxNQUFpRkMsZUFBakY7QUFBQSxNQUFrR0MsT0FBbEc7QUFBQSxNQUEyR0MsTUFBM0c7QUFBQSxNQUFtSEMsVUFBbkg7QUFBQSxNQUErSEMsSUFBL0g7QUFBQSxNQUFxSUMsS0FBSyxHQUFHQyxhQUE3STtBQUFBLE1BQTRKQSxhQUFhLEdBQUdYLE1BQU0sR0FBRyxHQUFyTDtBQUFBLE1BQTBMWSxXQUFXLEdBQUcsRUFBeE07QUFBQSxNQUE0TUMsU0FBNU07QUFBQSxNQUF1TkMsYUFBdk47QUFBQSxNQUFzT0MsT0FBdE87QUFBQSxNQUErT0MsV0FBL087QUFFQSxNQUFNQyxXQUFXLEdBQUc7QUFDaEJDLFNBQUssRUFBRSxLQURTO0FBRWhCQyxnQkFBWSxFQUFFLENBQUMsSUFGQztBQUdoQkMsa0JBQWMsRUFBRTtBQUhBLEdBQXBCO0FBTUFQLFdBQVMsR0FBRzVCLEVBQUUsQ0FBQ29DLE1BQUgsQ0FBVSxNQUFWLEVBQWtCQyxNQUFsQixDQUF5QixLQUF6QixDQUFaO0FBQ0FSLGVBQWEsR0FBRzdCLEVBQUUsQ0FBQ29DLE1BQUgsQ0FBVSxpQkFBVixFQUE2QkMsTUFBN0IsQ0FBb0MsS0FBcEMsQ0FBaEI7QUFDQVAsU0FBTyxHQUFHRixTQUFTLENBQUNTLE1BQVYsQ0FBaUIsR0FBakIsQ0FBVjtBQUNBTixhQUFXLEdBQUdGLGFBQWEsQ0FBQ1EsTUFBZCxDQUFxQixHQUFyQixDQUFkO0FBRUFULFdBQVMsQ0FBQ1UsSUFBVixDQUFlLE9BQWYsRUFBd0J4QixLQUF4QixFQUErQndCLElBQS9CLENBQW9DLFFBQXBDLEVBQThDdkIsTUFBOUM7QUFDQWMsZUFBYSxDQUFDUyxJQUFkLENBQW1CLE9BQW5CLEVBQTRCeEIsS0FBNUIsRUFBbUN3QixJQUFuQyxDQUF3QyxRQUF4QyxFQUFrRHZCLE1BQWxEO0FBRUFRLFlBQVUsR0FBR3ZCLEVBQUUsQ0FBQ3VDLGVBQUgsR0FBcUJDLFNBQXJCLENBQStCLENBQUMxQixLQUFLLEdBQUcsQ0FBVCxFQUFZQyxNQUFNLEdBQUcsQ0FBckIsQ0FBL0IsQ0FBYjtBQUNBUyxNQUFJLEdBQUd4QixFQUFFLENBQUN5QyxPQUFILEdBQWFsQixVQUFiLENBQXdCQSxVQUF4QixDQUFQO0FBSUFELFFBQU0sR0FBR3RCLEVBQUUsQ0FBQ29DLE1BQUgsQ0FBVSxTQUFWLEVBQXFCQyxNQUFyQixDQUE0QixRQUE1QixDQUFUO0FBQ0FmLFFBQU0sQ0FDRGdCLElBREwsQ0FDVSxPQURWLEVBQ21CeEIsS0FEbkIsRUFFS3dCLElBRkwsQ0FFVSxRQUZWLEVBRW9CdkIsTUFGcEIsRUFHSzJCLEtBSEwsQ0FHVyxVQUhYLEVBR3VCLFVBSHZCLEVBSUtBLEtBSkwsQ0FJVyxNQUpYLEVBSW1CLEdBSm5CO0FBUUEsTUFBTUMsWUFBWSxHQUFHcEIsVUFBVSxDQUFDRSxLQUFYLEVBQXJCO0FBRUFtQixPQUFLLEdBQ0FDLEtBREwsQ0FDVzdDLEVBQUUsQ0FBQzhDLElBRGQsRUFDb0IseUJBRHBCLEVBRUtELEtBRkwsQ0FFVzdDLEVBQUUsQ0FBQzhDLElBRmQsNEJBRXVDakMsS0FGdkMsWUFHS2dDLEtBSEwsQ0FHVzdDLEVBQUUsQ0FBQzhDLElBSGQsRUFHb0IsZ0NBSHBCLEVBSUtELEtBSkwsQ0FJVzdDLEVBQUUsQ0FBQzhDLElBSmQsNkJBSXdDakMsS0FKeEMsc0JBS0trQyxLQUxMLENBS1dDLGVBTFg7O0FBT0EsV0FBU0EsZUFBVCxDQUNJQyxLQURKLEVBRUlDLFFBRkosRUFHSXpDLFdBSEosRUFJSTBDLGdCQUpKLEVBS0lDLFFBTEosRUFNRTtBQUNFLFFBQUlILEtBQUosRUFBVyxNQUFNQSxLQUFOO0FBRVh0QixlQUFXLEdBQUd5QixRQUFkO0FBRUEsUUFBTUMsT0FBTyxHQUFHQyxRQUFRLENBQUNDLE9BQVQsQ0FBaUJMLFFBQWpCLEVBQTJCQSxRQUFRLENBQUNNLE9BQVQsQ0FBaUJDLFNBQTVDLENBQWhCO0FBQ0EsUUFBTUMsT0FBTyxHQUFHMUQsRUFBRSxDQUFDb0MsTUFBSCxDQUFVLFVBQVYsQ0FBaEI7QUFFQXVCLGVBQVc7QUFDWEMsYUFBUztBQUNUQyxpQkFBYTtBQUViL0IsV0FBTyxDQUFDZ0MsU0FBUixDQUFrQixXQUFsQixFQUNLQyxJQURMLENBQ1VWLE9BQU8sQ0FBQ1csUUFEbEIsRUFFS0MsS0FGTCxHQUdLNUIsTUFITCxDQUdZLE1BSFosRUFJS0MsSUFKTCxDQUlVLE9BSlYsRUFJbUIsTUFKbkIsRUFLS0EsSUFMTCxDQUtVLEdBTFYsRUFLZWQsSUFMZixFQU1La0IsS0FOTCxDQU1XLE1BTlgsRUFNbUIsVUFBVXdCLENBQVYsRUFBYTtBQUN4QixhQUFPOUQsZ0VBQWdCLENBQUM4RCxDQUFDLENBQUM3RCxFQUFILEVBQU9JLFdBQVAsQ0FBdkI7QUFDSCxLQVJMO0FBVUEsUUFBSWdELFNBQVMsR0FBRzFCLFdBQVcsQ0FBQytCLFNBQVosQ0FBc0IsV0FBdEIsRUFDWEMsSUFEVyxDQUNOVixPQUFPLENBQUNXLFFBREYsRUFFWEMsS0FGVyxHQUdYNUIsTUFIVyxDQUdKLE1BSEksRUFJWEMsSUFKVyxDQUlOLE9BSk0sRUFJRyxNQUpILEVBS1hBLElBTFcsQ0FLTixHQUxNLEVBS0RkLElBTEMsRUFNWGtCLEtBTlcsQ0FNTCxNQU5LLEVBTUcsYUFOSCxFQU9YeUIsRUFQVyxDQU9SLE9BUFEsRUFPQyxVQUFVRCxDQUFWLEVBQWE7QUFDdEJFLFdBQUssQ0FBQ0YsQ0FBRCxFQUFJekQsV0FBSixDQUFMO0FBQ0gsS0FUVyxDQUFoQjs7QUFXQSxhQUFTMkQsS0FBVCxDQUFlRixDQUFmLEVBQWtCekQsV0FBbEIsRUFBK0I7QUFDM0JXLHFCQUFlLEdBQUc4QyxDQUFsQjtBQUNBaEQsV0FBSyxDQUFDbUQsSUFBTjtBQUNBQyxhQUFPLENBQUNsRCxlQUFELENBQVA7QUFFQW1ELGlGQUFxQixDQUNqQixRQURpQixFQUVqQm5ELGVBRmlCLEVBR2pCaEIsZ0VBQWdCLENBQUNnQixlQUFlLENBQUNmLEVBQWpCLEVBQXFCSSxXQUFyQixDQUhDLEVBSWpCa0IsV0FBVyxDQUFDUCxlQUFlLENBQUNmLEVBQWpCLENBSk0sQ0FBckI7QUFNQW1FLHlCQUFtQixHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsd0JBQXZCLENBQXRCO0FBQ0FDLGlCQUFXLEdBQUd4QixnQkFBZ0IsQ0FBQy9CLGVBQWUsQ0FBQ2YsRUFBakIsQ0FBOUI7QUFDQXVFLHlCQUFtQixHQUFHbkUsV0FBVyxDQUFDVyxlQUFlLENBQUNmLEVBQWpCLENBQVgsQ0FBZ0NJLFdBQXREO0FBRUErRCx5QkFBbUIsQ0FBQ0ssU0FBcEIsYUFBbUNGLFdBQW5DLDRCQUFnRUMsbUJBQW1CLENBQUNFLE9BQXBCLENBQTRCLENBQTVCLENBQWhFO0FBQ0g7O0FBQUE7O0FBRUQsUUFBTVIsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBQ2xELGVBQUQsRUFBcUI7QUFFakMsVUFBSTJELFFBQUosRUFBY0MsUUFBZCxFQUF3QkMsYUFBeEIsRUFBdUNDLGFBQXZDLEVBQXNEQyxDQUF0RCxFQUF5REMsWUFBekQsRUFBdUVDLFlBQXZFLEVBQXFGQyxDQUFyRjs7QUFFQSxVQUFJLENBQUNsRSxlQUFELElBQW9CSCxlQUFlLEtBQUtHLGVBQTVDLEVBQTZEO0FBQ3pESCx1QkFBZSxHQUFHLElBQWxCO0FBQ0E4RCxnQkFBUSxHQUFHdkQsSUFBSSxDQUFDdUQsUUFBTCxDQUFjM0QsZUFBZCxDQUFYO0FBQ0E0RCxnQkFBUSxHQUFHekQsVUFBVSxDQUFDZ0UsTUFBWCxDQUFrQixDQUFDUixRQUFRLENBQUMsQ0FBRCxDQUFULEVBQWNBLFFBQVEsQ0FBQyxDQUFELENBQXRCLENBQWxCLENBQVg7QUFDQUUscUJBQWEsR0FBRzFELFVBQVUsQ0FBQ2lFLE1BQVgsRUFBaEI7QUFFQUosb0JBQVksR0FBRzdELFVBQVUsQ0FBQ0UsS0FBWCxFQUFmO0FBRUEwRCxTQUFDLEdBQUduRixFQUFFLENBQUN5RixXQUFILENBQWVSLGFBQWYsRUFBOEIsQ0FBQ0EsYUFBYSxDQUFDLENBQUQsQ0FBZCxFQUFtQmpELFdBQVcsQ0FBQ0UsWUFBL0IsRUFBNkNGLFdBQVcsQ0FBQ0csY0FBekQsQ0FBOUIsQ0FBSixDQVJ5RCxDQVN6RDtBQUVILE9BWEQsTUFXTztBQUNINEMsZ0JBQVEsR0FBR3ZELElBQUksQ0FBQ3VELFFBQUwsQ0FBYzNELGVBQWQsQ0FBWDtBQUNBNEQsZ0JBQVEsR0FBR3pELFVBQVUsQ0FBQ2dFLE1BQVgsQ0FBa0IsQ0FBQ1IsUUFBUSxDQUFDLENBQUQsQ0FBVCxFQUFjQSxRQUFRLENBQUMsQ0FBRCxDQUF0QixDQUFsQixDQUFYO0FBQ0FFLHFCQUFhLEdBQUcxRCxVQUFVLENBQUNpRSxNQUFYLEVBQWhCO0FBRUFKLG9CQUFZLEdBQUc3RCxVQUFVLENBQUNFLEtBQVgsRUFBZixDQUxHLENBTUg7O0FBRUEwRCxTQUFDLEdBQUduRixFQUFFLENBQUN5RixXQUFILENBQWVSLGFBQWYsRUFBOEIsQ0FBQyxDQUFDRCxRQUFRLENBQUMsQ0FBRCxDQUFWLEVBQWUsQ0FBQ0EsUUFBUSxDQUFDLENBQUQsQ0FBeEIsQ0FBOUIsQ0FBSixDQVJHLENBU0g7O0FBQ0EvRCx1QkFBZSxHQUFHRyxlQUFsQjtBQUNIOztBQUNEVSxhQUFPLENBQUM0RCxVQUFSLEdBQ0tDLFFBREwsQ0FDYyxHQURkLEVBRUtDLEtBRkwsQ0FFVyxRQUZYLEVBRXFCLFlBQVk7QUFDekIsZUFBTyxVQUFVQyxDQUFWLEVBQWE7QUFDaEJ0RSxvQkFBVSxDQUFDaUUsTUFBWCxDQUFrQkwsQ0FBQyxDQUFDVSxDQUFELENBQW5CO0FBQ0FqRSxtQkFBUyxDQUFDa0MsU0FBVixDQUFvQixNQUFwQixFQUE0QnhCLElBQTVCLENBQWlDLEdBQWpDLEVBQXNDZCxJQUF0QztBQUNBSyx1QkFBYSxDQUFDaUMsU0FBZCxDQUF3QixNQUF4QixFQUFnQ3hCLElBQWhDLENBQXFDLEdBQXJDLEVBQTBDZCxJQUExQztBQUNBc0Usc0JBQVk7QUFDZixTQUxEO0FBTUgsT0FUTCxFQVVLM0IsRUFWTCxDQVVRLEtBVlIsRUFVZSxZQUFZO0FBQ25CLFlBQUksQ0FBQ2xELGVBQUwsRUFBc0I7QUFDbEI4RSx3QkFBYyxDQUFDZCxhQUFhLENBQUMsQ0FBRCxDQUFkLENBQWQ7QUFDSDtBQUNKLE9BZEw7QUFlQSxVQUFJVCxtQkFBbUIsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLHdCQUF2QixDQUExQjtBQUNBLFVBQUlDLFdBQVcsR0FBR3hCLGdCQUFnQixDQUFDL0IsZUFBZSxDQUFDZixFQUFqQixDQUFsQztBQUNBLFVBQUl1RSxtQkFBbUIsR0FBR25FLFdBQVcsQ0FBQ1csZUFBZSxDQUFDZixFQUFqQixDQUFYLENBQWdDSSxXQUExRDtBQUVBK0QseUJBQW1CLENBQUNLLFNBQXBCLGFBQW1DRixXQUFuQyw0QkFBZ0VDLG1CQUFtQixDQUFDRSxPQUFwQixDQUE0QixDQUE1QixDQUFoRTtBQUNILEtBL0NEOztBQWlEQXJCLGFBQVMsQ0FBQ1UsRUFBVixDQUFhLFdBQWIsRUFBMEIsVUFBVUQsQ0FBVixFQUFhOEIsQ0FBYixFQUFnQjtBQUN0Q2hHLFFBQUUsQ0FBQ29DLE1BQUgsQ0FBVSxJQUFWLEVBQ0tFLElBREwsQ0FDVSxNQURWLEVBQ2tCLE1BRGxCLEVBRUtJLEtBRkwsQ0FFVyxRQUZYLEVBRXFCLE1BRnJCLEVBR0tKLElBSEwsQ0FHVSxjQUhWLEVBRzBCLENBSDFCO0FBS0EsYUFBT29CLE9BQU8sQ0FBQ2hCLEtBQVIsQ0FBYyxTQUFkLEVBQXlCLEVBQXpCLEVBQ0Z1RCxJQURFLENBQ0c5QyxnQkFBZ0IsQ0FBQ2UsQ0FBQyxDQUFDN0QsRUFBSCxDQURuQixDQUFQO0FBRUgsS0FSRCxFQVNLOEQsRUFUTCxDQVNRLFdBVFIsRUFTcUIsVUFBVUQsQ0FBVixFQUFhO0FBQzFCUixhQUFPLENBQUNoQixLQUFSLENBQWMsU0FBZCxFQUF5QixFQUF6QixFQUNLQSxLQURMLENBQ1csS0FEWCxFQUNtQjFDLEVBQUUsQ0FBQ2tHLEtBQUgsQ0FBU0MsS0FBVixHQUFtQixJQURyQyxFQUVLekQsS0FGTCxDQUVXLE1BRlgsRUFFb0IxQyxFQUFFLENBQUNrRyxLQUFILENBQVNFLEtBQVQsR0FBaUIsRUFBbEIsR0FBd0IsSUFGM0MsRUFHS0gsSUFITCxDQUdVOUMsZ0JBQWdCLENBQUNlLENBQUMsQ0FBQzdELEVBQUgsQ0FIMUI7QUFJSCxLQWRMLEVBZUs4RCxFQWZMLENBZVEsVUFmUixFQWVvQixVQUFVRCxDQUFWLEVBQWE4QixDQUFiLEVBQWdCO0FBQzVCaEcsUUFBRSxDQUFDb0MsTUFBSCxDQUFVLElBQVYsRUFDS0UsSUFETCxDQUNVLE1BRFYsRUFDa0IsT0FEbEIsRUFFS0EsSUFGTCxDQUVVLGNBRlYsRUFFMEIsQ0FGMUI7QUFHQW9CLGFBQU8sQ0FBQ2hCLEtBQVIsQ0FBYyxTQUFkLEVBQXlCLENBQXpCLEVBQ0tBLEtBREwsQ0FDVyxLQURYLEVBQ2tCLElBQUksSUFEdEIsRUFFS0EsS0FGTCxDQUVXLE1BRlgsRUFFbUIsSUFBSSxJQUZ2QjtBQUdILEtBdEJMO0FBd0JBWCxlQUFXLENBQUNzRSxJQUFaLENBQ0lyRyxFQUFFLENBQUNzRyxJQUFILEdBQ0tDLE9BREwsQ0FDYSxZQUFZO0FBQ2pCLFVBQU1wQixDQUFDLEdBQUc1RCxVQUFVLENBQUNpRSxNQUFYLEVBQVY7QUFDQSxhQUFPO0FBQ0hnQixTQUFDLEVBQUVyQixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQU9uRSxJQURQO0FBQ2F5RixTQUFDLEVBQUUsQ0FBQ3RCLENBQUMsQ0FBQyxDQUFELENBQUYsR0FBUW5FO0FBRHhCLE9BQVA7QUFHSCxLQU5MLEVBT0ttRCxFQVBMLENBT1EsTUFQUixFQU9nQixZQUFZO0FBQ3BCdUMsYUFBTyxDQUFDQyxHQUFSLENBQVluRixJQUFaO0FBQ0FOLFdBQUssQ0FBQ21ELElBQU47QUFDQSxVQUFNbUIsTUFBTSxHQUFHakUsVUFBVSxDQUFDaUUsTUFBWCxFQUFmO0FBQ0EsVUFBSW9CLFdBQVcsR0FBR2pFLFlBQVksR0FBR3BCLFVBQVUsQ0FBQ0UsS0FBWCxFQUFqQztBQUNBRixnQkFBVSxDQUFDaUUsTUFBWCxDQUFrQixDQUFDeEYsRUFBRSxDQUFDa0csS0FBSCxDQUFTTSxDQUFULEdBQWF4RixJQUFkLEVBQW9CLENBQUNoQixFQUFFLENBQUNrRyxLQUFILENBQVNPLENBQVYsR0FBY3pGLElBQWxDLEVBQXdDd0UsTUFBTSxDQUFDLENBQUQsQ0FBOUMsQ0FBbEI7QUFDQTFELGFBQU8sQ0FBQ2dDLFNBQVIsQ0FBa0IsTUFBbEIsRUFBMEJ4QixJQUExQixDQUErQixHQUEvQixFQUFvQ2QsSUFBcEM7QUFDQUssbUJBQWEsQ0FBQ2lDLFNBQWQsQ0FBd0IsTUFBeEIsRUFBZ0N4QixJQUFoQyxDQUFxQyxHQUFyQyxFQUEwQ2QsSUFBMUM7QUFDQXNFLGtCQUFZO0FBQ2YsS0FoQkwsQ0FESjtBQXNCQUMsa0JBQWM7QUFFZGMsZ0VBQVk7QUFDWnRDLCtFQUFxQixDQUNqQixRQURpQixFQUVqQmxCLE9BQU8sQ0FBQ1csUUFBUixDQUFpQixDQUFqQixDQUZpQixFQUdqQmpFLHFEQUFLLENBQUNVLFdBQVcsQ0FBQzRDLE9BQU8sQ0FBQ1csUUFBUixDQUFpQixDQUFqQixFQUFvQjNELEVBQXJCLENBQVgsQ0FBb0NJLFdBQXJDLENBSFksRUFJakIyQyxRQUFRLENBQUNDLE9BQU8sQ0FBQ1csUUFBUixDQUFpQixDQUFqQixFQUFvQjNELEVBQXJCLENBSlMsQ0FBckI7QUFPQSxRQUFJbUUsbUJBQW1CLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1Qix3QkFBdkIsQ0FBMUI7QUFDQSxRQUFJQyxXQUFXLEdBQUd4QixnQkFBZ0IsQ0FBQ0UsT0FBTyxDQUFDVyxRQUFSLENBQWlCLENBQWpCLEVBQW9CM0QsRUFBckIsQ0FBbEM7QUFDQSxRQUFJdUUsbUJBQW1CLEdBQUduRSxXQUFXLENBQUM0QyxPQUFPLENBQUNXLFFBQVIsQ0FBaUIsQ0FBakIsRUFBb0IzRCxFQUFyQixDQUFYLENBQW9DSSxXQUE5RDtBQUVBK0QsdUJBQW1CLENBQUNLLFNBQXBCLGFBQW1DRixXQUFuQyw0QkFBZ0VDLG1CQUFtQixDQUFDRSxPQUFwQixDQUE0QixDQUE1QixDQUFoRTtBQUVBLFFBQUlnQyxlQUFKO0FBRUFyQyxZQUFRLENBQUNzQyxjQUFULENBQXdCLGNBQXhCLEVBQ0twRyxnQkFETCxDQUNzQixPQUR0QixFQUMrQixVQUFBcUcsQ0FBQyxFQUFJO0FBQzVCLFVBQU1DLFdBQVcsR0FBR3hDLFFBQVEsQ0FBQ3NDLGNBQVQsQ0FBd0Isc0JBQXhCLENBQXBCO0FBRUEsVUFBSUcsWUFBWSxHQUFHQyxNQUFNLENBQUNILENBQUMsQ0FBQ0ksTUFBRixDQUFTQyxLQUFWLENBQXpCO0FBQ0EsVUFBSUMsa0JBQWtCLEdBQUdOLENBQUMsQ0FBQ0ksTUFBRixDQUFTQyxLQUFsQztBQUVBSixpQkFBVyxDQUFDcEMsU0FBWixHQUF3QjBDLHNEQUFjLENBQUNMLFlBQUQsQ0FBdEM7O0FBRUEsVUFBSUksa0JBQWtCLENBQUNFLE1BQW5CLEtBQThCLENBQWxDLEVBQXFDO0FBQ2pDRiwwQkFBa0IsR0FBRyxNQUFNQSxrQkFBM0I7QUFDSDs7QUFFRDFFLFdBQUssR0FDQUMsS0FETCxDQUNXN0MsRUFBRSxDQUFDOEMsSUFEZCw0QkFDdUN3RSxrQkFEdkMsWUFFS3pFLEtBRkwsQ0FFVzdDLEVBQUUsQ0FBQzhDLElBRmQsNkJBRXdDd0Usa0JBRnhDLHNCQUdLdkUsS0FITCxDQUdXMEUsWUFIWDtBQUtILEtBbEJMOztBQW9CQSxhQUFTQSxZQUFULENBQ0l4RSxLQURKLEVBRUl4QyxXQUZKLEVBR0kyQyxRQUhKLEVBSUU7QUFDRSxVQUFJSCxLQUFKLEVBQVcsTUFBTUEsS0FBTjtBQUVYbkIsYUFBTyxDQUFDZ0MsU0FBUixDQUFrQixXQUFsQixFQUNLcEIsS0FETCxDQUNXLE1BRFgsRUFDbUIsVUFBVXdCLENBQVYsRUFBYTtBQUN4QixlQUFPOUQsZ0VBQWdCLENBQUM4RCxDQUFDLENBQUM3RCxFQUFILEVBQU9JLFdBQVAsQ0FBdkI7QUFDSCxPQUhMLEVBSUtpQyxLQUpMLENBSVcsUUFKWCxFQUlxQixNQUpyQjtBQU1BLFVBQUlYLFdBQVcsR0FBRy9CLEVBQUUsQ0FBQ29DLE1BQUgsQ0FBVSxtQkFBVixFQUErQkEsTUFBL0IsQ0FBc0MsR0FBdEMsQ0FBbEI7QUFFQUwsaUJBQVcsQ0FBQytCLFNBQVosQ0FBc0IsTUFBdEIsRUFDS3BCLEtBREwsQ0FDVyxNQURYLEVBQ21CLFVBQVV3QixDQUFWLEVBQWE7QUFDeEI0Qyx1QkFBZSxHQUFHNUMsQ0FBQyxDQUFDN0QsRUFBRixJQUFReUcsZUFBMUI7QUFDQSxlQUFPMUcsZ0VBQWdCLENBQUM4RCxDQUFDLENBQUM3RCxFQUFILEVBQU9JLFdBQVAsQ0FBdkI7QUFDSCxPQUpMLEVBS0tpQyxLQUxMLENBS1csUUFMWCxFQUtxQixNQUxyQjtBQU9BZSxlQUFTLENBQUNVLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLFVBQVVELENBQVYsRUFBYTtBQUMvQkUsYUFBSyxDQUFDRixDQUFELEVBQUl6RCxXQUFKLENBQUw7QUFDSCxPQUZEO0FBSUFrQixpQkFBVyxHQUFHeUIsUUFBZDtBQUNBMEMsa0JBQVk7QUFDWnZCLGlGQUFxQixDQUNqQixRQURpQixFQUVqQm5ELGVBRmlCLEVBR2pCaEIsZ0VBQWdCLENBQUMwRyxlQUFELEVBQWtCckcsV0FBbEIsQ0FIQyxFQUlqQmtCLFdBQVcsQ0FBQ21GLGVBQUQsQ0FKTSxDQUFyQjtBQU9BdEMseUJBQW1CLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1Qix3QkFBdkIsQ0FBdEI7QUFDQUMsaUJBQVcsR0FBR3hCLGdCQUFnQixDQUFDL0IsZUFBZSxDQUFDZixFQUFqQixDQUE5QjtBQUNBdUUseUJBQW1CLEdBQUduRSxXQUFXLENBQUNXLGVBQWUsQ0FBQ2YsRUFBakIsQ0FBWCxDQUFnQ0ksV0FBdEQ7QUFFQStELHlCQUFtQixDQUFDSyxTQUFwQixhQUFtQ0YsV0FBbkMsNEJBQWdFQyxtQkFBbUIsQ0FBQ0UsT0FBcEIsQ0FBNEIsQ0FBNUIsQ0FBaEU7QUFDSCxLQWhPSCxDQWtPRTs7O0FBQ0EsUUFBTTRDLElBQUksR0FBRzFILEVBQUUsQ0FBQzBILElBQUgsR0FDUkMsV0FEUSxDQUNJLENBQUMsQ0FBRCxFQUFJQyxRQUFKLENBREosRUFFUnpELEVBRlEsQ0FFTCxNQUZLLEVBRUcsWUFBTTtBQUNkMEQsWUFBTTtBQUNULEtBSlEsQ0FBYjtBQU1BaEcsaUJBQWEsQ0FBQ3dFLElBQWQsQ0FBbUJxQixJQUFuQjtBQUNIOztBQUVELFdBQVNHLE1BQVQsR0FBa0I7QUFDZCxRQUFJQyxtQkFBbUIsR0FBRyxDQUExQjtBQUFBLFFBQTZCcEcsYUFBYSxHQUFHWCxNQUFNLEdBQUcsR0FBdEQsQ0FEYyxDQUdkO0FBQ0E7O0FBRUEsUUFBSW1GLEtBQUssR0FBR2xHLEVBQUUsQ0FBQ2tHLEtBQUgsQ0FBUzZCLFdBQVQsQ0FBcUJDLElBQWpDO0FBRUEzRyxXQUFPLENBQUM0RyxJQUFSO0FBQ0E1RyxXQUFPLENBQUM2RyxTQUFSLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLEVBQXdCcEgsS0FBeEIsRUFBK0JDLE1BQS9COztBQUVBLFFBQUltRixLQUFLLEtBQUssT0FBZCxFQUF1QjtBQUNuQixVQUFJVSxXQUFXLEdBQUc1RyxFQUFFLENBQUNrRyxLQUFILENBQVNpQyxTQUFULENBQW1CQyxDQUFyQztBQUNBakgsaUJBQVcsR0FBR3lGLFdBQVcsR0FBR2tCLG1CQUE1QjtBQUNBckcsV0FBSyxHQUFHQSxLQUFLLEdBQUdOLFdBQVcsR0FBR08sYUFBOUI7QUFFQUgsZ0JBQVUsQ0FBQ0UsS0FBWCxDQUFpQkEsS0FBakI7QUFDQXFHLHlCQUFtQixHQUFHbEIsV0FBdEI7QUFFQUYsYUFBTyxDQUFDQyxHQUFSLENBQVluRixJQUFaO0FBRUFNLGFBQU8sQ0FBQ2dDLFNBQVIsQ0FBa0IsTUFBbEIsRUFBMEJ4QixJQUExQixDQUErQixHQUEvQixFQUFvQ2QsSUFBcEM7QUFDQU8saUJBQVcsQ0FBQytCLFNBQVosQ0FBc0IsTUFBdEIsRUFBOEJ4QixJQUE5QixDQUFtQyxHQUFuQyxFQUF3Q2QsSUFBeEM7QUFFSDs7QUFFRHNFLGdCQUFZO0FBQ2Y7O0FBRUQsV0FBU0EsWUFBVCxHQUF3QjtBQUNwQnpFLFdBQU8sR0FBR0MsTUFBTSxDQUFDK0csSUFBUCxHQUFjQyxVQUFkLENBQXlCLElBQXpCLENBQVY7QUFDQWpILFdBQU8sQ0FBQzRHLElBQVI7QUFDQTVHLFdBQU8sQ0FBQ2tILFlBQVIsQ0FBcUIsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixDQUFyQjtBQUNBbEgsV0FBTyxDQUFDNkcsU0FBUixDQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QnBILEtBQXhCLEVBQStCQyxNQUEvQjtBQUNBTSxXQUFPLENBQUNtSCxPQUFSO0FBRUEsUUFBTUMsT0FBTyxHQUFHbEgsVUFBVSxDQUFDaUUsTUFBWCxFQUFoQjs7QUFFQSxTQUFLLElBQUlRLENBQVQsSUFBY3JFLFdBQWQsRUFBMkI7QUFDdkIsVUFBSStHLGlCQUFpQixHQUFHL0csV0FBVyxDQUFDcUUsQ0FBRCxDQUFuQzs7QUFDQSxXQUFLLElBQUkyQyxDQUFULElBQWNELGlCQUFkLEVBQWlDO0FBQzdCLFlBQUlFLE9BQU8sR0FBR0YsaUJBQWlCLENBQUNDLENBQUQsQ0FBL0I7QUFBQSxZQUVJRSxHQUFHLEdBQUdELE9BQU8sR0FBR3JILFVBQVUsQ0FBQyxDQUFDcUgsT0FBTyxDQUFDRSxTQUFULEVBQW9CRixPQUFPLENBQUNHLFFBQTVCLENBQUQsQ0FBYixHQUF1RCxJQUZ4RTs7QUFJQSxZQUFJRixHQUFKLEVBQVM7QUFDTCxjQUFJRyxTQUFTLEdBQUc3QixNQUFNLENBQUN5QixPQUFPLENBQUNFLFNBQVQsQ0FBTixHQUE0QixHQUE1QztBQUFBLGNBQ0lHLGNBQWMsR0FBRyxNQUFPLENBQUNSLE9BQU8sQ0FBQyxDQUFELENBQVAsR0FBYSxHQUFkLElBQXFCLEdBRGpEO0FBQUEsY0FFSVMsWUFBWSxHQUFHLENBQUNELGNBQWMsR0FBRyxHQUFsQixJQUF5QixHQUY1Qzs7QUFLQSxjQUFLQSxjQUFjLEdBQUdDLFlBQWpCLElBQ0RGLFNBQVMsR0FBR0MsY0FEWCxJQUVERCxTQUFTLEdBQUdFLFlBRlosSUFHQ0QsY0FBYyxHQUFHQyxZQUFqQixLQUNJRixTQUFTLEdBQUdDLGNBQVosSUFBOEJELFNBQVMsR0FBR0UsWUFEOUMsQ0FITCxFQUltRTtBQUMvRDdILG1CQUFPLENBQUM4SCxXQUFSLEdBQXNCLHlCQUF5QixHQUF6QixHQUErQixHQUFyRDtBQUNBLGdCQUFJQyxNQUFNLEdBQUc3SCxVQUFVLENBQUMsQ0FBQ3FILE9BQU8sQ0FBQ0UsU0FBVCxFQUFvQkYsT0FBTyxDQUFDRyxRQUE1QixDQUFELENBQXZCO0FBQ0ExSCxtQkFBTyxDQUFDZ0ksU0FBUjtBQUNBaEksbUJBQU8sQ0FBQ2lJLEdBQVIsQ0FBWUYsTUFBTSxDQUFDLENBQUQsQ0FBbEIsRUFBdUJBLE1BQU0sQ0FBQyxDQUFELENBQTdCLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDRyxJQUFJLENBQUNDLEVBQUwsR0FBVSxDQUFsRDtBQUNBbkksbUJBQU8sQ0FBQ29JLE1BQVI7QUFDQXBJLG1CQUFPLENBQUNxSSxTQUFSLEdBQW9CM0oscURBQUssQ0FBQzZJLE9BQU8sQ0FBQ2UsSUFBUixJQUFnQixJQUFJLENBQXBCLElBQXlCLEVBQTFCLENBQXpCO0FBQ0F0SSxtQkFBTyxDQUFDdUksSUFBUjtBQUNIO0FBQ0o7QUFDSjtBQUNKO0FBQ0o7O0FBRUQsV0FBUzdELGNBQVQsR0FBNkM7QUFBQSxRQUFyQjhELGFBQXFCLHVFQUFMLEdBQUs7QUFDekMzSSxTQUFLLEdBQUdsQixFQUFFLENBQUNrQixLQUFILENBQVMsVUFBVTRJLE9BQVYsRUFBbUI7QUFDaEN2SSxnQkFBVSxDQUFDaUUsTUFBWCxDQUFrQixDQUFDcUUsYUFBYSxHQUFHN0gsV0FBVyxDQUFDQyxLQUFaLEdBQW9CNkgsT0FBckMsRUFBOEM5SCxXQUFXLENBQUNFLFlBQTFELEVBQXdFRixXQUFXLENBQUNHLGNBQXBGLENBQWxCO0FBQ0FQLGVBQVMsQ0FBQ2tDLFNBQVYsQ0FBb0IsTUFBcEIsRUFBNEJ4QixJQUE1QixDQUFpQyxHQUFqQyxFQUFzQ2QsSUFBdEM7QUFDQUssbUJBQWEsQ0FBQ2lDLFNBQWQsQ0FBd0IsTUFBeEIsRUFBZ0N4QixJQUFoQyxDQUFxQyxHQUFyQyxFQUEwQ2QsSUFBMUM7QUFDQXNFLGtCQUFZO0FBQ2YsS0FMTyxDQUFSO0FBTUg7O0FBRUQsV0FBU25DLFdBQVQsR0FBdUI7QUFDbkIsUUFBTUksSUFBSSxHQUFHL0QsRUFBRSxDQUFDRyxLQUFILENBQVMsRUFBVCxDQUFiO0FBRUEsUUFBTTRKLEtBQUssR0FBR25JLFNBQVMsQ0FBQ2tDLFNBQVYsQ0FBb0IsUUFBcEIsRUFDVEMsSUFEUyxDQUNKQSxJQURJLEVBRVRFLEtBRlMsR0FHVDVCLE1BSFMsQ0FHRixNQUhFLEVBSVRDLElBSlMsQ0FJSixHQUpJLEVBSUMsRUFKRCxFQUtUQSxJQUxTLENBS0osUUFMSSxFQUtNLEVBTE4sRUFNVEEsSUFOUyxDQU1KLEdBTkksRUFNQyxVQUFDNEIsQ0FBRCxFQUFJOEIsQ0FBSjtBQUFBLGFBQVUsS0FBS0EsQ0FBQyxHQUFHLENBQW5CO0FBQUEsS0FORCxFQU9UMUQsSUFQUyxDQU9KLE9BUEksRUFPSyxFQVBMLEVBUVRBLElBUlMsQ0FRSixNQVJJLEVBUUksVUFBQTRCLENBQUM7QUFBQSxhQUFJbkUscURBQUssQ0FBQyxNQUFNbUUsQ0FBQyxHQUFHLEVBQVgsQ0FBVDtBQUFBLEtBUkwsRUFTVDVCLElBVFMsQ0FTSixRQVRJLEVBU00sTUFUTixDQUFkO0FBV0FWLGFBQVMsQ0FBQ2tDLFNBQVYsQ0FBb0IsTUFBcEIsRUFDS0MsSUFETCxDQUNVQSxJQURWLEVBRUtFLEtBRkwsR0FHSzVCLE1BSEwsQ0FHWSxNQUhaLEVBSUsySCxJQUpMLENBSVUsVUFBQTlGLENBQUMsRUFBSTtBQUNQLHVCQUFXLE1BQU1BLENBQUMsR0FBRyxFQUFyQjtBQUNILEtBTkwsRUFPSzVCLElBUEwsQ0FPVSxXQVBWLEVBT3VCLFFBUHZCLEVBUUtBLElBUkwsQ0FRVSxHQVJWLEVBUWUsRUFSZixFQVNLQSxJQVRMLENBU1UsUUFUVixFQVNvQixFQVRwQixFQVVLQSxJQVZMLENBVVUsR0FWVixFQVVlLFVBQUM0QixDQUFELEVBQUk4QixDQUFKO0FBQUEsYUFBVSxLQUFLQSxDQUFDLEdBQUcsQ0FBbkI7QUFBQSxLQVZmLEVBV0sxRCxJQVhMLENBV1UsT0FYVixFQVdtQixFQVhuQixFQVlLQSxJQVpMLENBWVUsTUFaVixFQVlrQixVQUFBNEIsQ0FBQztBQUFBLGFBQUluRSxxREFBSyxDQUFDLE1BQU1tRSxDQUFDLEdBQUcsRUFBWCxDQUFUO0FBQUEsS0FabkI7QUFhSDs7QUFFRCxXQUFTTixTQUFULEdBQXFCO0FBRWpCN0IsZUFBVyxDQUFDK0IsU0FBWixDQUFzQixZQUF0QixFQUNLQyxJQURMLENBQ1UsQ0FBQztBQUFFaUUsVUFBSSxFQUFFO0FBQVIsS0FBRCxDQURWLEVBRUsvRCxLQUZMLEdBR0s1QixNQUhMLENBR1ksTUFIWixFQUlLSyxLQUpMLENBSVcsTUFKWCxFQUltQixhQUpuQjtBQU1BWixXQUFPLENBQUNnQyxTQUFSLENBQWtCLFlBQWxCLEVBQ0tDLElBREwsQ0FDVSxDQUFDO0FBQUVpRSxVQUFJLEVBQUU7QUFBUixLQUFELENBRFYsRUFFSy9ELEtBRkwsR0FHSzVCLE1BSEwsQ0FHWSxNQUhaLEVBSUtDLElBSkwsQ0FJVSxPQUpWLEVBSW1CLE9BSm5CO0FBS0g7O0FBRUQsV0FBU3VCLGFBQVQsR0FBeUI7QUFDckIsUUFBTW9HLFNBQVMsR0FBR2pLLEVBQUUsQ0FBQ2tLLFlBQUgsR0FDYkMsSUFEYSxDQUNSLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FEUSxDQUFsQjtBQUdBckksV0FBTyxDQUFDZ0MsU0FBUixDQUFrQixnQkFBbEIsRUFDS0MsSUFETCxDQUNVLENBQUNrRyxTQUFTLEVBQVYsQ0FEVixFQUVLaEcsS0FGTCxHQUdLNUIsTUFITCxDQUdZLE1BSFosRUFJS0MsSUFKTCxDQUlVLE9BSlYsRUFJbUIsV0FKbkIsRUFLS0EsSUFMTCxDQUtVLEdBTFYsRUFLZWQsSUFMZixFQU1La0IsS0FOTCxDQU1XLE1BTlgsRUFNbUIsYUFObkI7QUFPSDtBQUNKLENBamFNLEM7Ozs7Ozs7Ozs7OztBQ1pQO0FBQUE7QUFBQTtBQUFBO0FBS08sSUFBTTZCLHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBd0IsQ0FDakM2RixNQURpQyxFQUVqQ0MsY0FGaUMsRUFHakM3SixzQkFIaUMsRUFJakM0QyxRQUppQyxFQUtoQztBQUNELE1BQUl0QyxLQUFLLEdBQUcsR0FBWjtBQUFBLE1BQWlCQyxNQUFNLEdBQUcsR0FBMUI7QUFBQSxNQUErQnVKLFFBQS9CO0FBRUEsTUFBSUMsWUFBWSxHQUFHLENBQUN6SixLQUFLLEdBQUcsQ0FBVCxFQUFZQyxNQUFNLEdBQUcsQ0FBckIsQ0FBbkI7QUFFQSxNQUFJUSxVQUFVLEdBQUd2QixFQUFFLENBQUN3SyxXQUFILEVBQWpCLENBTEMsQ0FNRDtBQUNBO0FBQ0E7O0FBRUEsTUFBSWhKLElBQUksR0FBR3hCLEVBQUUsQ0FBQ3lDLE9BQUgsR0FBYWxCLFVBQWIsQ0FBd0JBLFVBQXhCLENBQVg7QUFFQSxNQUFJRCxNQUFKO0FBQUEsTUFBWUQsT0FBWjtBQUFBLE1BQXFCTSxXQUFXLEdBQUcsRUFBbkM7QUFDQSxNQUFJOEksWUFBWSxHQUFHLENBQW5CO0FBRUEsTUFBTS9HLE9BQU8sR0FBRzFELEVBQUUsQ0FBQ29DLE1BQUgsQ0FBVSxVQUFWLENBQWhCOztBQUdBLE1BQUlnSSxNQUFNLEtBQUssUUFBZixFQUF5QjtBQUNyQjtBQUNBLFFBQUlNLEdBQUcsR0FBRzFLLEVBQUUsQ0FBQ29DLE1BQUgsQ0FBVSwwQkFBVixDQUFWO0FBQ0EsUUFBSXVJLENBQUMsR0FBR0QsR0FBRyxDQUFDdEksTUFBSixDQUFXLEdBQVgsQ0FBUjtBQUNBdUksS0FBQyxDQUFDckksSUFBRixDQUFPLFdBQVAsRUFBb0IsVUFBVTRCLENBQVYsRUFBYTtBQUM3QixhQUFPLGtCQUFQO0FBQ0gsS0FGRDtBQUdBLFFBQU0wRyxNQUFNLEdBQUdwSixJQUFJLENBQUNvSixNQUFMLENBQVlQLGNBQVosQ0FBZixDQVBxQixDQVNyQjtBQUNBOztBQUVBOUksY0FBVSxDQUFDc0osT0FBWCxDQUFtQixDQUFFL0osS0FBSyxHQUFHLEdBQVYsRUFBaUJDLE1BQU0sR0FBRyxHQUExQixDQUFuQixFQUFvRHNKLGNBQXBEO0FBRUFNLEtBQUMsQ0FBQzdHLFNBQUYsQ0FBWSxNQUFaLEVBQW9CZ0gsTUFBcEI7QUFDQUgsS0FBQyxDQUFDN0csU0FBRixDQUFZLE1BQVosRUFDS0MsSUFETCxDQUNVLENBQUNzRyxjQUFELENBRFYsRUFFS3BHLEtBRkwsR0FHSzVCLE1BSEwsQ0FHWSxNQUhaLEVBSUtDLElBSkwsQ0FJVSxHQUpWLEVBSWVkLElBSmYsRUFLS2tCLEtBTEwsQ0FLVyxNQUxYLEVBS21CbEMsc0JBTG5CLEVBTUtrQyxLQU5MLENBTVcsUUFOWCxFQU1xQixNQU5yQixFQWZxQixDQXNCckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBZixlQUFXLEdBQUd5QixRQUFkLENBNUJxQixDQTZCckI7O0FBQ0EwQyxnQkFBWSxHQTlCUyxDQWdDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVILEdBN0NELE1BNkNPLElBQUlzRSxNQUFNLEtBQUssUUFBZixFQUF5QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsUUFBSU0sSUFBRyxHQUFHMUssRUFBRSxDQUFDb0MsTUFBSCxDQUFVLDBCQUFWLEVBQ0xDLE1BREssQ0FDRSxLQURGLEVBRUxDLElBRkssQ0FFQSxPQUZBLEVBRVN4QixLQUZULEVBR0x3QixJQUhLLENBR0EsUUFIQSxFQUdVdkIsTUFIVixDQUFWOztBQUlBLFFBQUk0SixFQUFDLEdBQUdELElBQUcsQ0FBQ3JJLE1BQUosQ0FBVyxHQUFYLENBQVI7O0FBQ0FzSSxNQUFDLENBQUNySSxJQUFGLENBQU8sV0FBUCxFQUFvQixVQUFVNEIsQ0FBVixFQUFhO0FBQzdCLGFBQU8sa0JBQVA7QUFDSCxLQUZEOztBQUlBM0MsY0FBVSxDQUFDc0osT0FBWCxDQUFtQixDQUFFL0osS0FBSyxHQUFHLEdBQVYsRUFBaUJDLE1BQU0sR0FBRyxHQUExQixDQUFuQixFQUFvRHNKLGNBQXBELEVBaEI0QixDQWtCNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFNdEcsSUFBSSxHQUFHL0QsRUFBRSxDQUFDRyxLQUFILENBQVMsRUFBVCxDQUFiOztBQUNBLFFBQU00SixLQUFLLEdBQUdXLElBQUcsQ0FBQzVHLFNBQUosQ0FBYyxRQUFkLEVBQ1RDLElBRFMsQ0FDSkEsSUFESSxFQUVURSxLQUZTLEdBR1Q1QixNQUhTLENBR0YsTUFIRSxFQUlUQyxJQUpTLENBSUosR0FKSSxFQUlDLEVBSkQsRUFLVEEsSUFMUyxDQUtKLFFBTEksRUFLTSxFQUxOLEVBTVRBLElBTlMsQ0FNSixHQU5JLEVBTUMsVUFBQzRCLENBQUQsRUFBSThCLENBQUo7QUFBQSxhQUFVLEtBQUtBLENBQUMsR0FBRyxDQUFuQjtBQUFBLEtBTkQsRUFPVDFELElBUFMsQ0FPSixPQVBJLEVBT0ssRUFQTCxFQVFUQSxJQVJTLENBUUosTUFSSSxFQVFJLFVBQUE0QixDQUFDO0FBQUEsYUFBSW5FLHFEQUFLLENBQUMsTUFBTW1FLENBQUMsR0FBRyxFQUFYLENBQVQ7QUFBQSxLQVJMLEVBU1Q1QixJQVRTLENBU0osUUFUSSxFQVNNLE1BVE4sQ0FBZDs7QUFXQW9JLFFBQUcsQ0FBQzVHLFNBQUosQ0FBYyxNQUFkLEVBQ0tDLElBREwsQ0FDVUEsSUFEVixFQUVLRSxLQUZMLEdBR0s1QixNQUhMLENBR1ksTUFIWixFQUlLMkgsSUFKTCxDQUlVLFVBQUE5RixDQUFDLEVBQUk7QUFDUCx1QkFBVyxNQUFNQSxDQUFDLEdBQUcsRUFBckI7QUFDSCxLQU5MLEVBT0s1QixJQVBMLENBT1UsV0FQVixFQU91QixRQVB2QixFQVFLQSxJQVJMLENBUVUsR0FSVixFQVFlLEVBUmYsRUFTS0EsSUFUTCxDQVNVLFFBVFYsRUFTb0IsRUFUcEIsRUFVS0EsSUFWTCxDQVVVLEdBVlYsRUFVZSxVQUFDNEIsQ0FBRCxFQUFJOEIsQ0FBSjtBQUFBLGFBQVUsS0FBS0EsQ0FBQyxHQUFHLENBQW5CO0FBQUEsS0FWZixFQVdLMUQsSUFYTCxDQVdVLE9BWFYsRUFXbUIsRUFYbkIsRUFZS0EsSUFaTCxDQVlVLE1BWlYsRUFZa0IsVUFBQTRCLENBQUM7QUFBQSxhQUFJbkUscURBQUssQ0FBQyxNQUFNbUUsQ0FBQyxHQUFHLEVBQVgsQ0FBVDtBQUFBLEtBWm5CLEVBcEM0QixDQWlENUI7OztBQUVBeUcsTUFBQyxDQUFDN0csU0FBRixDQUFZLE1BQVosRUFDS0MsSUFETCxDQUNVLENBQUNzRyxjQUFELENBRFYsRUFFS3BHLEtBRkwsR0FHSzVCLE1BSEwsQ0FHWSxNQUhaLEVBSUtDLElBSkwsQ0FJVSxHQUpWLEVBSWVkLElBSmYsRUFLS2tCLEtBTEwsQ0FLVyxNQUxYLEVBS21CbEMsc0JBTG5CLEVBTUtrQyxLQU5MLENBTVcsUUFOWCxFQU1xQixNQU5yQixFQW5ENEIsQ0EwRDVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUFmLGVBQVcsR0FBR3lCLFFBQWQsQ0FqRTRCLENBa0U1Qjs7QUFDQTBDLGdCQUFZO0FBRVosUUFBTTRCLElBQUksR0FBRzFILEVBQUUsQ0FBQzBILElBQUgsR0FDUkMsV0FEUSxDQUNJLENBQUMsQ0FBRCxFQUFJQyxRQUFKLENBREosRUFFUm1ELGVBRlEsQ0FFUSxDQUFDLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBRCxFQUFTLENBQUNqSyxLQUFELEVBQVFDLE1BQVIsQ0FBVCxDQUZSLEVBR1JpSyxNQUhRLENBR0QsQ0FBQyxDQUFDLENBQUQsRUFBSSxDQUFKLENBQUQsRUFBUyxDQUFDbEssS0FBRCxFQUFRQyxNQUFSLENBQVQsQ0FIQyxFQUlSb0QsRUFKUSxDQUlMLE1BSkssRUFJRyxZQUFNO0FBQ2QsVUFBSThHLE9BQU8sR0FBR2pMLEVBQUUsQ0FBQ2tHLEtBQUgsQ0FBU2lDLFNBQXZCOztBQUNBd0MsUUFBQyxDQUFDckksSUFBRixDQUFPLFdBQVAsRUFBb0IsWUFBTTtBQUN0QixlQUFPLGdCQUFnQjJJLE9BQU8sQ0FBQ3pFLENBQVIsR0FBWSxFQUE1QixJQUFrQyxHQUFsQyxJQUF5Q3lFLE9BQU8sQ0FBQ3hFLENBQVIsR0FBWSxFQUFyRCxJQUEyRCxVQUEzRCxHQUF3RXdFLE9BQU8sQ0FBQzdDLENBQWhGLEdBQW9GLEdBQTNGO0FBQ0gsT0FGRDs7QUFHQXVDLFFBQUMsQ0FBQzdHLFNBQUYsQ0FBWSxRQUFaLEVBQXNCeEIsSUFBdEIsQ0FBMkIsR0FBM0IsRUFBZ0MsWUFBTTtBQUNsQztBQUNBLFlBQUkySSxPQUFPLEdBQUdqTCxFQUFFLENBQUNrRyxLQUFILENBQVNpQyxTQUF2QjtBQUNBLGVBQVFzQyxZQUFZLEdBQUdRLE9BQU8sQ0FBQzdDLENBQS9CO0FBQ0gsT0FKRDtBQUtILEtBZFEsQ0FBYjs7QUFnQkFzQyxRQUFHLENBQUNyRSxJQUFKLENBQVNxQixJQUFUO0FBR0g7O0FBRUQsV0FBUzVCLFlBQVQsR0FBd0I7QUFDcEIsUUFBSTZFLENBQUMsR0FBRzNLLEVBQUUsQ0FBQ29DLE1BQUgsQ0FBVSwwQkFBVixFQUFzQ0EsTUFBdEMsQ0FBNkMsS0FBN0MsRUFBb0RBLE1BQXBELENBQTJELEdBQTNELENBQVIsQ0FEb0IsQ0FFcEI7O0FBRUEsUUFBSVQsV0FBSixFQUFpQjtBQUNiZ0osT0FBQyxDQUFDN0csU0FBRixDQUFZLFFBQVosRUFDSTtBQURKLE9BRUtnSCxNQUZMO0FBSUEsVUFBSUksYUFBYSxHQUFHUCxDQUFDLENBQUM3RyxTQUFGLENBQVksUUFBWixFQUNoQjtBQURnQixPQUVmQyxJQUZlLENBRVZwQyxXQUZVLEVBR2ZzQyxLQUhlLEdBSWY1QixNQUplLENBSVIsUUFKUSxFQUtoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVhnQixPQVlmQyxJQVplLENBWVYsV0FaVSxFQVlHLFVBQUE0QixDQUFDLEVBQUk7QUFDcEIsbUNBQW9CM0MsVUFBVSxDQUFDLENBQUMyQyxDQUFDLENBQUM0RSxTQUFILEVBQWM1RSxDQUFDLENBQUM2RSxRQUFoQixDQUFELENBQVYsQ0FBc0MsQ0FBdEMsQ0FBcEIsd0NBQ014SCxVQUFVLENBQUMsQ0FBQzJDLENBQUMsQ0FBQzRFLFNBQUgsRUFBYzVFLENBQUMsQ0FBQzZFLFFBQWhCLENBQUQsQ0FBVixDQUFzQyxDQUF0QyxDQUROO0FBRUgsT0FmZSxFQWdCZnJHLEtBaEJlLENBZ0JULFFBaEJTLEVBZ0JDLE1BaEJELEVBaUJmSixJQWpCZSxDQWlCVixjQWpCVSxFQWlCTSxHQWpCTixFQWtCaEI7QUFsQmdCLE9BbUJmQSxJQW5CZSxDQW1CVixNQW5CVSxFQW1CRixVQUFDNEIsQ0FBRCxFQUFPO0FBQ2pCLGVBQU9uRSxxREFBSyxDQUFDbUUsQ0FBQyxDQUFDeUYsSUFBRixJQUFVLElBQUksQ0FBZCxJQUFtQixFQUFwQixDQUFaO0FBQ0gsT0FyQmUsRUFzQmZySCxJQXRCZSxDQXNCVixHQXRCVSxFQXNCTG1JLFlBdEJLLENBQXBCO0FBd0JBUyxtQkFBYSxDQUFDL0csRUFBZCxDQUFpQixXQUFqQixFQUE4QixVQUFVRCxDQUFWLEVBQWE4QixDQUFiLEVBQWdCO0FBQzFDaEcsVUFBRSxDQUFDb0MsTUFBSCxDQUFVLElBQVYsRUFDS00sS0FETCxDQUNXLFFBRFgsRUFDcUIsTUFEckIsRUFFS0osSUFGTCxDQUVVLGNBRlYsRUFFMEIsR0FGMUI7QUFJQSxlQUFPb0IsT0FBTyxDQUFDaEIsS0FBUixDQUFjLFNBQWQsRUFBeUIsRUFBekIsRUFDRnNILElBREUsQ0FFQyxRQUNBOUYsQ0FBQyxDQUFDaUgsSUFERixHQUNTLE9BRFQsR0FFQSxnQkFGQSxHQUVtQixDQUFDakgsQ0FBQyxDQUFDeUYsSUFBRixJQUFVLElBQUksQ0FBZCxJQUFtQixFQUFwQixFQUF3QjdFLE9BQXhCLENBQWdDLENBQWhDLENBRm5CLEdBRXdELGdCQUZ4RCxHQUdBLE1BTEQsQ0FBUCxDQUwwQyxDQVkxQztBQUNILE9BYkQsRUFjS1gsRUFkTCxDQWNRLFdBZFIsRUFjcUIsVUFBVUQsQ0FBVixFQUFhO0FBQzFCUixlQUFPLENBQUNoQixLQUFSLENBQWMsU0FBZCxFQUF5QixFQUF6QixFQUNLQSxLQURMLENBQ1csS0FEWCxFQUNtQjFDLEVBQUUsQ0FBQ2tHLEtBQUgsQ0FBU0MsS0FBVixHQUFtQixJQURyQyxFQUVLekQsS0FGTCxDQUVXLE1BRlgsRUFFb0IxQyxFQUFFLENBQUNrRyxLQUFILENBQVNFLEtBQVQsR0FBaUIsRUFBbEIsR0FBd0IsSUFGM0MsRUFEMEIsQ0FJMUI7QUFDSCxPQW5CTCxFQW9CS2pDLEVBcEJMLENBb0JRLFVBcEJSLEVBb0JvQixVQUFVRCxDQUFWLEVBQWE4QixDQUFiLEVBQWdCO0FBQzVCaEcsVUFBRSxDQUFDb0MsTUFBSCxDQUFVLElBQVYsRUFDS00sS0FETCxDQUNXLFFBRFgsRUFDcUIsTUFEckIsRUFFS0osSUFGTCxDQUVVLGNBRlYsRUFFMEIsR0FGMUI7QUFHQW9CLGVBQU8sQ0FBQ2hCLEtBQVIsQ0FBYyxTQUFkLEVBQXlCLENBQXpCLEVBQ0tBLEtBREwsQ0FDVyxLQURYLEVBQ2tCLElBQUksSUFEdEIsRUFFS0EsS0FGTCxDQUVXLE1BRlgsRUFFbUIsSUFBSSxJQUZ2QjtBQUdILE9BM0JMO0FBNEJILEtBekRELE1BeURPO0FBQ0hpSSxPQUFDLENBQUM3RyxTQUFGLENBQVksUUFBWixFQUNJO0FBREosT0FFS2dILE1BRkw7QUFHSDtBQUdKLEdBN05BLENBK05EO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFDSCxDQXJRTSxDOzs7Ozs7Ozs7Ozs7QUNMUDtBQUFBO0FBQUE7QUFBTyxJQUFNdkQsY0FBYyxHQUFHO0FBQzFCLEtBQUcsU0FEdUI7QUFFMUIsS0FBRyxVQUZ1QjtBQUcxQixLQUFHLE9BSHVCO0FBSTFCLEtBQUcsT0FKdUI7QUFLMUIsS0FBRyxLQUx1QjtBQU0xQixLQUFHLE1BTnVCO0FBTzFCLEtBQUcsTUFQdUI7QUFRMUIsS0FBRyxRQVJ1QjtBQVMxQixLQUFHLFdBVHVCO0FBVTFCLE1BQUksU0FWc0I7QUFXMUIsTUFBSSxVQVhzQjtBQVkxQixNQUFJO0FBWnNCLENBQXZCO0FBa0JBLElBQU1WLFlBQVksR0FBRyxTQUFmQSxZQUFlLEdBQU07QUFDOUIsTUFBTXVFLE1BQU0sR0FBRzNHLFFBQVEsQ0FBQ3NDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBZjtBQUNBcUUsUUFBTSxDQUFDQyxZQUFQLENBQW9CLElBQXBCLEVBQTBCLGtCQUExQjtBQUVBLE1BQU1wRSxXQUFXLEdBQUd4QyxRQUFRLENBQUM2RyxhQUFULENBQXVCLEtBQXZCLENBQXBCO0FBQ0FyRSxhQUFXLENBQUNvRSxZQUFaLENBQXlCLElBQXpCLEVBQStCLHNCQUEvQjtBQUNBcEUsYUFBVyxDQUFDcEMsU0FBWixHQUF3QjBDLGNBQWMsQ0FBQyxFQUFELENBQXRDO0FBRUEsTUFBTWdFLGFBQWEsR0FBRzlHLFFBQVEsQ0FBQzZHLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBdEI7QUFDQUMsZUFBYSxDQUFDRixZQUFkLENBQTJCLElBQTNCLEVBQWlDLGNBQWpDO0FBQ0FFLGVBQWEsQ0FBQ0YsWUFBZCxDQUEyQixNQUEzQixFQUFtQyxPQUFuQztBQUNBRSxlQUFhLENBQUNGLFlBQWQsQ0FBMkIsS0FBM0IsRUFBa0MsR0FBbEM7QUFDQUUsZUFBYSxDQUFDRixZQUFkLENBQTJCLEtBQTNCLEVBQWtDLElBQWxDO0FBQ0FFLGVBQWEsQ0FBQ0YsWUFBZCxDQUEyQixPQUEzQixFQUFvQyxJQUFwQztBQUNBRSxlQUFhLENBQUNGLFlBQWQsQ0FBMkIsTUFBM0IsRUFBbUMsR0FBbkM7QUFFQUQsUUFBTSxDQUFDSSxXQUFQLENBQW1CRCxhQUFuQjtBQUNBSCxRQUFNLENBQUNJLFdBQVAsQ0FBbUJ2RSxXQUFuQjtBQUNILENBbEJNLEM7Ozs7Ozs7Ozs7O0FDbEJQLHVDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qYXZhc2NyaXB0cy9pbmRleC5qc1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcblxudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG5cbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG5cbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkIHx8ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpOyAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7IC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcblxuICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuXG5cbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG5cblxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7IC8vIENsZWFuIHVwIHJlcXVlc3RcblxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTsgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuXG5cbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJywgcmVxdWVzdCkpOyAvLyBDbGVhbiB1cCByZXF1ZXN0XG5cbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07IC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcblxuXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7IC8vIENsZWFuIHVwIHJlcXVlc3RcblxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTsgLy8gSGFuZGxlIHRpbWVvdXRcblxuXG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTsgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuXG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9OyAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuXG5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgdmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpOyAvLyBBZGQgeHNyZiBoZWFkZXJcblxuXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgPyBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH0gLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcblxuXG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuXG5cbiAgICBpZiAoY29uZmlnLndpdGhDcmVkZW50aWFscykge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIH0gLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuXG5cbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG5cblxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH0gLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcblxuXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpOyAvLyBDbGVhbiB1cCByZXF1ZXN0XG5cbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH0gLy8gU2VuZCB0aGUgcmVxdWVzdFxuXG5cbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcblxudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG5cbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29yZS9tZXJnZUNvbmZpZycpO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpOyAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTsgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG5cbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcbiAgcmV0dXJuIGluc3RhbmNlO1xufSAvLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcblxuXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7IC8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuXG5heGlvcy5BeGlvcyA9IEF4aW9zOyAvLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG5cbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoYXhpb3MuZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59OyAvLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cblxuXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTsgLy8gRXhwb3NlIGFsbC9zcHJlYWRcblxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuXG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zOyAvLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcblxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zOyIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cblxuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5cblxuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cblxuXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5cblxuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjsiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9idWlsZFVSTCcpO1xuXG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcblxudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG5cbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vbWVyZ2VDb25maWcnKTtcbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cblxuXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5cblxuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSBhcmd1bWVudHNbMV0gfHwge307XG4gICAgY29uZmlnLnVybCA9IGFyZ3VtZW50c1swXTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gIH1cblxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZCA/IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKSA6ICdnZXQnOyAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG5cbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbkF4aW9zLnByb3RvdHlwZS5nZXRVcmkgPSBmdW5jdGlvbiBnZXRVcmkoY29uZmlnKSB7XG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIHJldHVybiBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcikucmVwbGFjZSgvXlxcPy8sICcnKTtcbn07IC8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xuXG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uICh1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uICh1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBBeGlvczsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuXG5cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cblxuXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5cblxuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcblxudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG5cbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcblxudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cblxuXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpOyAvLyBTdXBwb3J0IGJhc2VVUkwgY29uZmlnXG5cbiAgaWYgKGNvbmZpZy5iYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKGNvbmZpZy51cmwpKSB7XG4gICAgY29uZmlnLnVybCA9IGNvbWJpbmVVUkxzKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgfSAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuXG5cbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTsgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShjb25maWcuZGF0YSwgY29uZmlnLmhlYWRlcnMsIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0KTsgLy8gRmxhdHRlbiBoZWFkZXJzXG5cbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LCBjb25maWcuaGVhZGVycyB8fCB7fSk7XG4gIHV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICB9KTtcbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTsgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcblxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKHJlc3BvbnNlLmRhdGEsIHJlc3BvbnNlLmhlYWRlcnMsIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7IC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG5cbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShyZWFzb24ucmVzcG9uc2UuZGF0YSwgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTsiLCIndXNlIHN0cmljdCc7XG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuXG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cblxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgZXJyb3IuaXNBeGlvc0Vycm9yID0gdHJ1ZTtcblxuICBlcnJvci50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICBjb2RlOiB0aGlzLmNvZGVcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBlcnJvcjtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuLyoqXG4gKiBDb25maWctc3BlY2lmaWMgbWVyZ2UtZnVuY3Rpb24gd2hpY2ggY3JlYXRlcyBhIG5ldyBjb25maWctb2JqZWN0XG4gKiBieSBtZXJnaW5nIHR3byBjb25maWd1cmF0aW9uIG9iamVjdHMgdG9nZXRoZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzFcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICB2YXIgY29uZmlnID0ge307XG4gIHV0aWxzLmZvckVhY2goWyd1cmwnLCAnbWV0aG9kJywgJ3BhcmFtcycsICdkYXRhJ10sIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIocHJvcCkge1xuICAgIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfVxuICB9KTtcbiAgdXRpbHMuZm9yRWFjaChbJ2hlYWRlcnMnLCAnYXV0aCcsICdwcm94eSddLCBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKHByb3ApIHtcbiAgICBpZiAodXRpbHMuaXNPYmplY3QoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IHV0aWxzLmRlZXBNZXJnZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSB1dGlscy5kZWVwTWVyZ2UoY29uZmlnMVtwcm9wXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMVtwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzFbcHJvcF07XG4gICAgfVxuICB9KTtcbiAgdXRpbHMuZm9yRWFjaChbJ2Jhc2VVUkwnLCAndHJhbnNmb3JtUmVxdWVzdCcsICd0cmFuc2Zvcm1SZXNwb25zZScsICdwYXJhbXNTZXJpYWxpemVyJywgJ3RpbWVvdXQnLCAnd2l0aENyZWRlbnRpYWxzJywgJ2FkYXB0ZXInLCAncmVzcG9uc2VUeXBlJywgJ3hzcmZDb29raWVOYW1lJywgJ3hzcmZIZWFkZXJOYW1lJywgJ29uVXBsb2FkUHJvZ3Jlc3MnLCAnb25Eb3dubG9hZFByb2dyZXNzJywgJ21heENvbnRlbnRMZW5ndGgnLCAndmFsaWRhdGVTdGF0dXMnLCAnbWF4UmVkaXJlY3RzJywgJ2h0dHBBZ2VudCcsICdodHRwc0FnZW50JywgJ2NhbmNlbFRva2VuJywgJ3NvY2tldFBhdGgnXSwgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcxW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gY29uZmlnO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcblxuICBpZiAoIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuY29uZmlnLCBudWxsLCByZXNwb25zZS5yZXF1ZXN0LCByZXNwb25zZSkpO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG4gIHJldHVybiBkYXRhO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7IC8vIE9ubHkgTm9kZS5KUyBoYXMgYSBwcm9jZXNzIHZhcmlhYmxlIHRoYXQgaXMgb2YgW1tDbGFzc11dIHByb2Nlc3NcblxuICBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9XG5cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHwgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fCB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fCB1dGlscy5pc1N0cmVhbShkYXRhKSB8fCB1dGlscy5pc0ZpbGUoZGF0YSkgfHwgdXRpbHMuaXNCbG9iKGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8qIElnbm9yZSAqL1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkucmVwbGFjZSgvJTQwL2dpLCAnQCcpLnJlcGxhY2UoLyUzQS9naSwgJzonKS5yZXBsYWNlKC8lMjQvZywgJyQnKS5yZXBsYWNlKC8lMkMvZ2ksICcsJykucmVwbGFjZSgvJTIwL2csICcrJykucmVwbGFjZSgvJTVCL2dpLCAnWycpLnJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuXG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuXG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuXG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpIDogYmFzZVVSTDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/IC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICByZXR1cm4ge1xuICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgIH0sXG4gICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgcmV0dXJuIG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGw7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgIH1cbiAgfTtcbn0oKSA6IC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbmZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgcmV0dXJuIHtcbiAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gIH07XG59KCk7IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/IC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG5mdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICB2YXIgb3JpZ2luVVJMO1xuICAvKipcbiAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgKlxuICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAqL1xuXG4gIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICBpZiAobXNpZSkge1xuICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICB9XG5cbiAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTsgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgcGF0aG5hbWU6IHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nID8gdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOiAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgIH07XG4gIH1cblxuICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgLyoqXG4gICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgKlxuICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgKi9cblxuICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICB2YXIgcGFyc2VkID0gdXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICByZXR1cm4gcGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiYgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0O1xuICB9O1xufSgpIDogLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbmZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbn0oKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7IC8vIEhlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG5cblxudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gWydhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJywgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLCAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J107XG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHtcbiAgICByZXR1cm4gcGFyc2VkO1xuICB9XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cigwLCBpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2YuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcGFyc2VkO1xufTsiLCIndXNlIHN0cmljdCc7XG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG5cbnZhciBpc0J1ZmZlciA9IHJlcXVpcmUoJ2lzLWJ1ZmZlcicpO1xuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIHZhciByZXN1bHQ7XG5cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgQXJyYXlCdWZmZXIuaXNWaWV3KSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gdmFsICYmIHZhbC5idWZmZXIgJiYgdmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5cblxuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICovXG5cblxuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAobmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScgfHwgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOYXRpdmVTY3JpcHQnIHx8IG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTlMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xufVxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5cblxuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9IC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuXG5cbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cblxuXG5mdW5jdGlvbiBtZXJnZSgpXG4vKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi9cbntcbiAgdmFyIHJlc3VsdCA9IHt9O1xuXG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBGdW5jdGlvbiBlcXVhbCB0byBtZXJnZSB3aXRoIHRoZSBkaWZmZXJlbmNlIGJlaW5nIHRoYXQgbm8gcmVmZXJlbmNlXG4gKiB0byBvcmlnaW5hbCBvYmplY3RzIGlzIGtlcHQuXG4gKlxuICogQHNlZSBtZXJnZVxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuXG5cbmZ1bmN0aW9uIGRlZXBNZXJnZSgpXG4vKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi9cbntcbiAgdmFyIHJlc3VsdCA9IHt9O1xuXG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5cblxuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBkZWVwTWVyZ2U6IGRlZXBNZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW1cbn07IiwiLyohXG4gKiBEZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgQnVmZmVyXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0J1ZmZlcihvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIG9iai5jb25zdHJ1Y3RvciAhPSBudWxsICYmIHR5cGVvZiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iaik7XG59OyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9OyAvLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cblxuKGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgfVxuXG4gIHRyeSB7XG4gICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICB9XG59KSgpO1xuXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gIH0gLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcblxuXG4gIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gIH1cblxuICB0cnkge1xuICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICB9IC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcblxuXG4gIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gIH1cblxuICB0cnkge1xuICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0cnkge1xuICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGRyYWluaW5nID0gZmFsc2U7XG5cbiAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICB9IGVsc2Uge1xuICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgfVxuXG4gIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICBkcmFpblF1ZXVlKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgaWYgKGRyYWluaW5nKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gIGRyYWluaW5nID0gdHJ1ZTtcbiAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcblxuICB3aGlsZSAobGVuKSB7XG4gICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgcXVldWUgPSBbXTtcblxuICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gIH1cblxuICBjdXJyZW50UXVldWUgPSBudWxsO1xuICBkcmFpbmluZyA9IGZhbHNlO1xuICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICB9XG5cbiAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcblxuICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gIH1cbn07IC8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcblxuXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgdGhpcy5mdW4gPSBmdW47XG4gIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cblxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5cbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gW107XG59O1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICcvJztcbn07XG5cbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gMDtcbn07IiwiZXhwb3J0IGNvbnN0IGNvbG9yID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oWzIwLCA0MCwgNTAsIDY1LCA3NSwgODUsIDkwLCAxMDBdKVxuICAgIC5yYW5nZShbXCIjZmZmYWZhXCIsXG4gICAgICAgIFwiIzAwYTZjYVwiLFxuICAgICAgICBcIiMwMGNjYmNcIixcbiAgICAgICAgXCIjOTBlYjlkXCIsXG4gICAgICAgIFwiI2ZmZmY4Y1wiLFxuICAgICAgICBcIiNmOWQwNTdcIixcbiAgICAgICAgXCIjZjI5ZTJlXCIsXG4gICAgICAgIFwiI2Q3MTkxY1wiXSk7XG5cbmV4cG9ydCBjb25zdCB0ZW1wZXJhdHVyZUNvbG9yID0gKGlkLCBjb3VudHJ5VGVtcGVyYXR1cmUpID0+IHtcblxuICAgIGlmIChjb3VudHJ5VGVtcGVyYXR1cmVbaWRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QganNvbkNvdW50cnlUZW1wZXJhdHVyZSA9IGNvdW50cnlUZW1wZXJhdHVyZVtpZF0udGVtcGVyYXR1cmU7XG4gICAgICAgIHJldHVybiBjb2xvcihqc29uQ291bnRyeVRlbXBlcmF0dXJlKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcImJsYWNrXCJcbiAgICB9XG59XG4iLCJpbXBvcnQgXCIuLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuaW1wb3J0IHsgcmVuZGVyTWFwIH0gZnJvbSBcIi4vbWFwXCI7XG5pbXBvcnQgeyByZW5kZXJTbGlkZXIgfSBmcm9tIFwiLi9zbGlkZXJcIjtcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICByZW5kZXJNYXAoMTApO1xufSk7IiwiaW1wb3J0IHtcbiAgICByZW5kZXJTbGlkZXIsXG4gICAgbnVtTW9udGhUb05hbWVcbn0gZnJvbSBcIi4vc2xpZGVyXCI7XG5cbmltcG9ydCB7XG4gICAgY29sb3IsXG4gICAgdGVtcGVyYXR1cmVDb2xvcixcbn0gZnJvbSBcIi4vaGVscGVyXCJcblxuaW1wb3J0IHsgcmVuZGVyU2VsZWN0ZWRDb3VudHJ5IH0gZnJvbSBcIi4vc2VsZWN0ZWQtbWFwXCI7XG5cbmV4cG9ydCBjb25zdCByZW5kZXJNYXAgPSAobW9udGgpID0+IHtcblxuICAgIGxldCB3aWR0aCA9IDUwMCwgaGVpZ2h0ID0gNTAwLCBzZW5zID0gMC4yNSwgY2VudGVyZWRGZWF0dXJlLCB0aW1lciwgc2NhbGVDaGFuZ2UsIHNlbGVjdGVkRmVhdHVyZSwgY29udGV4dCwgY2FudmFzLCBwcm9qZWN0aW9uLCBwYXRoLCBzY2FsZSA9IG9yaWdpbmFsU2NhbGUsIG9yaWdpbmFsU2NhbGUgPSBoZWlnaHQgLyAyLjEsIHN0YXRpb25EYXRhID0gW10sIHN2Z1Zpc3VhbCwgc3ZnRnVuY3Rpb25hbCwgZ1Zpc3VhbCwgZ0Z1bmN0aW9uYWw7XG5cbiAgICBjb25zdCBnbG9iZUNvbmZpZyA9IHtcbiAgICAgICAgc3BlZWQ6IDAuMDA1LFxuICAgICAgICB2ZXJ0aWNhbFRpbHQ6IC0yMy41LFxuICAgICAgICBob3Jpem9udGFsVGlsdDogMFxuICAgIH1cblxuICAgIHN2Z1Zpc3VhbCA9IGQzLnNlbGVjdChcIiNtYXBcIikuYXBwZW5kKFwic3ZnXCIpO1xuICAgIHN2Z0Z1bmN0aW9uYWwgPSBkMy5zZWxlY3QoXCIjZnVuY3Rpb25hbC1tYXBcIikuYXBwZW5kKFwic3ZnXCIpO1xuICAgIGdWaXN1YWwgPSBzdmdWaXN1YWwuYXBwZW5kKCdnJyk7XG4gICAgZ0Z1bmN0aW9uYWwgPSBzdmdGdW5jdGlvbmFsLmFwcGVuZCgnZycpO1xuXG4gICAgc3ZnVmlzdWFsLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCkuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpO1xuICAgIHN2Z0Z1bmN0aW9uYWwuYXR0cihcIndpZHRoXCIsIHdpZHRoKS5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG5cbiAgICBwcm9qZWN0aW9uID0gZDMuZ2VvT3J0aG9ncmFwaGljKCkudHJhbnNsYXRlKFt3aWR0aCAvIDIsIGhlaWdodCAvIDJdKTtcbiAgICBwYXRoID0gZDMuZ2VvUGF0aCgpLnByb2plY3Rpb24ocHJvamVjdGlvbik7XG5cblxuXG4gICAgY2FudmFzID0gZDMuc2VsZWN0KFwiI2NhbnZhc1wiKS5hcHBlbmQoXCJjYW52YXNcIik7XG4gICAgY2FudmFzXG4gICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAgICAgLnN0eWxlKCdwb3NpdGlvbicsICdhYnNvbHV0ZScpXG4gICAgICAgIC5zdHlsZSgnbGVmdCcsICcwJyk7XG5cblxuXG4gICAgY29uc3QgaW5pdGlhbFNjYWxlID0gcHJvamVjdGlvbi5zY2FsZSgpO1xuXG4gICAgcXVldWUoKVxuICAgICAgICAuZGVmZXIoZDMuanNvbiwgXCIuL2RhdGEvd29ybGQtMTEwbTIuanNvblwiKVxuICAgICAgICAuZGVmZXIoZDMuanNvbiwgYC4vZGF0YS90YXMtMjAxNi0ke21vbnRofS5qc29uYClcbiAgICAgICAgLmRlZmVyKGQzLmpzb24sIFwiLi9kYXRhL2lzby1udW0tdG8tY291bnRyeS5qc29uXCIpXG4gICAgICAgIC5kZWZlcihkMy5qc29uLCBgLi9kYXRhL2dzb20tMjAxNi0ke21vbnRofS10YXZnLXByY3AuanNvbmApXG4gICAgICAgIC5hd2FpdChyZW5kZXJHbG9iYWxNYXApO1xuXG4gICAgZnVuY3Rpb24gcmVuZGVyR2xvYmFsTWFwKFxuICAgICAgICBlcnJvcixcbiAgICAgICAgdG9wb2xvZ3ksXG4gICAgICAgIHRlbXBlcmF0dXJlLFxuICAgICAgICBpc29Ub0NvdW50cnlOYW1lLFxuICAgICAgICBzdGF0aW9ucyxcbiAgICApIHtcbiAgICAgICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcblxuICAgICAgICBzdGF0aW9uRGF0YSA9IHN0YXRpb25zO1xuXG4gICAgICAgIGNvbnN0IGdlb2pzb24gPSB0b3BvanNvbi5mZWF0dXJlKHRvcG9sb2d5LCB0b3BvbG9neS5vYmplY3RzLmNvdW50cmllcyk7XG4gICAgICAgIGNvbnN0IHRvb2x0aXAgPSBkMy5zZWxlY3QoXCIudG9vbHRpcFwiKTtcblxuICAgICAgICBkcmF3VGVtcEJhcigpO1xuICAgICAgICBkcmF3T2NlYW4oKTtcbiAgICAgICAgZHJhd0dyYXRpY3VsZSgpO1xuXG4gICAgICAgIGdWaXN1YWwuc2VsZWN0QWxsKFwicGF0aC5sYW5kXCIpXG4gICAgICAgICAgICAuZGF0YShnZW9qc29uLmZlYXR1cmVzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwibGFuZFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJkXCIsIHBhdGgpXG4gICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlbXBlcmF0dXJlQ29sb3IoZC5pZCwgdGVtcGVyYXR1cmUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGNvdW50cmllcyA9IGdGdW5jdGlvbmFsLnNlbGVjdEFsbChcInBhdGgubGFuZFwiKVxuICAgICAgICAgICAgLmRhdGEoZ2VvanNvbi5mZWF0dXJlcylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImxhbmRcIilcbiAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBwYXRoKVxuICAgICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBcInRyYW5zcGFyZW50XCIpXG4gICAgICAgICAgICAub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNsaWNrKGQsIHRlbXBlcmF0dXJlKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gY2xpY2soZCwgdGVtcGVyYXR1cmUpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkRmVhdHVyZSA9IGQ7XG4gICAgICAgICAgICB0aW1lci5zdG9wKCk7XG4gICAgICAgICAgICBjbGlja2VkKHNlbGVjdGVkRmVhdHVyZSk7XG5cbiAgICAgICAgICAgIHJlbmRlclNlbGVjdGVkQ291bnRyeShcbiAgICAgICAgICAgICAgICBcInVwZGF0ZVwiLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRmVhdHVyZSxcbiAgICAgICAgICAgICAgICB0ZW1wZXJhdHVyZUNvbG9yKHNlbGVjdGVkRmVhdHVyZS5pZCwgdGVtcGVyYXR1cmUpLFxuICAgICAgICAgICAgICAgIHN0YXRpb25EYXRhW3NlbGVjdGVkRmVhdHVyZS5pZF0pO1xuXG4gICAgICAgICAgICBzZWxlY3RlZENvdW50cnlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWxlY3RlZC1jb3VudHJ5LW5hbWVcIik7XG4gICAgICAgICAgICBjb3VudHJ5TmFtZSA9IGlzb1RvQ291bnRyeU5hbWVbc2VsZWN0ZWRGZWF0dXJlLmlkXTtcbiAgICAgICAgICAgIHNlbGVjdGVkQ291bnRyeVRlbXAgPSB0ZW1wZXJhdHVyZVtzZWxlY3RlZEZlYXR1cmUuaWRdLnRlbXBlcmF0dXJlO1xuXG4gICAgICAgICAgICBzZWxlY3RlZENvdW50cnlOYW1lLmlubmVySFRNTCA9IGAke2NvdW50cnlOYW1lfTwvYnI+QXZnIFRlbXAuICR7c2VsZWN0ZWRDb3VudHJ5VGVtcC50b0ZpeGVkKDEpfSAmIzE3NjtGYDtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjbGlja2VkID0gKHNlbGVjdGVkRmVhdHVyZSkgPT4ge1xuXG4gICAgICAgICAgICBsZXQgY2VudHJvaWQsIGludmVydGVkLCBjdXJyZW50Um90YXRlLCBkZXNpcmVkUm90YXRlLCByLCBjdXJyZW50U2NhbGUsIGRlc2lyZWRTY2FsZSwgcztcblxuICAgICAgICAgICAgaWYgKCFzZWxlY3RlZEZlYXR1cmUgfHwgY2VudGVyZWRGZWF0dXJlID09PSBzZWxlY3RlZEZlYXR1cmUpIHtcbiAgICAgICAgICAgICAgICBjZW50ZXJlZEZlYXR1cmUgPSBudWxsO1xuICAgICAgICAgICAgICAgIGNlbnRyb2lkID0gcGF0aC5jZW50cm9pZChzZWxlY3RlZEZlYXR1cmUpO1xuICAgICAgICAgICAgICAgIGludmVydGVkID0gcHJvamVjdGlvbi5pbnZlcnQoW2NlbnRyb2lkWzBdLCBjZW50cm9pZFsxXV0pO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRSb3RhdGUgPSBwcm9qZWN0aW9uLnJvdGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgY3VycmVudFNjYWxlID0gcHJvamVjdGlvbi5zY2FsZSgpO1xuXG4gICAgICAgICAgICAgICAgciA9IGQzLmludGVycG9sYXRlKGN1cnJlbnRSb3RhdGUsIFtjdXJyZW50Um90YXRlWzBdLCBnbG9iZUNvbmZpZy52ZXJ0aWNhbFRpbHQsIGdsb2JlQ29uZmlnLmhvcml6b250YWxUaWx0XSk7XG4gICAgICAgICAgICAgICAgLy8gcyA9IGQzLmludGVycG9sYXRlKGN1cnJlbnRTY2FsZSwgaW5pdGlhbFNjYWxlKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjZW50cm9pZCA9IHBhdGguY2VudHJvaWQoc2VsZWN0ZWRGZWF0dXJlKTtcbiAgICAgICAgICAgICAgICBpbnZlcnRlZCA9IHByb2plY3Rpb24uaW52ZXJ0KFtjZW50cm9pZFswXSwgY2VudHJvaWRbMV1dKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50Um90YXRlID0gcHJvamVjdGlvbi5yb3RhdGUoKTtcblxuICAgICAgICAgICAgICAgIGN1cnJlbnRTY2FsZSA9IHByb2plY3Rpb24uc2NhbGUoKTtcbiAgICAgICAgICAgICAgICAvLyBkZXNpcmVkU2NhbGUgPSBwcm9qZWN0aW9uLnNjYWxlKCk7XG5cbiAgICAgICAgICAgICAgICByID0gZDMuaW50ZXJwb2xhdGUoY3VycmVudFJvdGF0ZSwgWy1pbnZlcnRlZFswXSwgLWludmVydGVkWzFdXSk7XG4gICAgICAgICAgICAgICAgLy8gcyA9IGQzLmludGVycG9sYXRlKGN1cnJlbnRTY2FsZSwgMjAwKTtcbiAgICAgICAgICAgICAgICBjZW50ZXJlZEZlYXR1cmUgPSBzZWxlY3RlZEZlYXR1cmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnVmlzdWFsLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgIC5kdXJhdGlvbig3NTApXG4gICAgICAgICAgICAgICAgLnR3ZWVuKFwicm90YXRlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0aW9uLnJvdGF0ZShyKHQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN2Z1Zpc3VhbC5zZWxlY3RBbGwoXCJwYXRoXCIpLmF0dHIoXCJkXCIsIHBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ZnRnVuY3Rpb25hbC5zZWxlY3RBbGwoXCJwYXRoXCIpLmF0dHIoXCJkXCIsIHBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJhd1N0YXRpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5vbihcImVuZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2VudGVyZWRGZWF0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVSb3RhdGlvbihjdXJyZW50Um90YXRlWzBdKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRDb3VudHJ5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VsZWN0ZWQtY291bnRyeS1uYW1lXCIpO1xuICAgICAgICAgICAgbGV0IGNvdW50cnlOYW1lID0gaXNvVG9Db3VudHJ5TmFtZVtzZWxlY3RlZEZlYXR1cmUuaWRdO1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkQ291bnRyeVRlbXAgPSB0ZW1wZXJhdHVyZVtzZWxlY3RlZEZlYXR1cmUuaWRdLnRlbXBlcmF0dXJlO1xuXG4gICAgICAgICAgICBzZWxlY3RlZENvdW50cnlOYW1lLmlubmVySFRNTCA9IGAke2NvdW50cnlOYW1lfTwvYnI+QXZnIFRlbXAuICR7c2VsZWN0ZWRDb3VudHJ5VGVtcC50b0ZpeGVkKDEpfSAmIzE3NjtGYDtcbiAgICAgICAgfTtcblxuICAgICAgICBjb3VudHJpZXMub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiZmlsbFwiLCBcImdyZXlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJzdHJva2VcIiwgXCIjZWVlXCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgMyk7XG5cbiAgICAgICAgICAgIHJldHVybiB0b29sdGlwLnN0eWxlKFwib3BhY2l0eVwiLCAuOSlcbiAgICAgICAgICAgICAgICAudGV4dChpc29Ub0NvdW50cnlOYW1lW2QuaWRdKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHRvb2x0aXAuc3R5bGUoXCJvcGFjaXR5XCIsIC45KVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgKGQzLmV2ZW50LnBhZ2VZKSArIFwicHhcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCAoZDMuZXZlbnQucGFnZVggKyAxMCkgKyBcInB4XCIpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KGlzb1RvQ291bnRyeU5hbWVbZC5pZF0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwiZmlsbFwiLCBcIndoaXRlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIDEpO1xuICAgICAgICAgICAgICAgIHRvb2x0aXAuc3R5bGUoXCJvcGFjaXR5XCIsIDApXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCAwICsgXCJweFwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIDAgKyBcInB4XCIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgZ0Z1bmN0aW9uYWwuY2FsbChcbiAgICAgICAgICAgIGQzLmRyYWcoKVxuICAgICAgICAgICAgICAgIC5zdWJqZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgciA9IHByb2plY3Rpb24ucm90YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiByWzBdIC8gc2VucywgeTogLXJbMV0gLyBzZW5zXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oXCJkcmFnXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVyLnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm90YXRlID0gcHJvamVjdGlvbi5yb3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlRmFjdG9yID0gaW5pdGlhbFNjYWxlIC8gcHJvamVjdGlvbi5zY2FsZSgpO1xuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0aW9uLnJvdGF0ZShbZDMuZXZlbnQueCAqIHNlbnMsIC1kMy5ldmVudC55ICogc2Vucywgcm90YXRlWzJdXSk7XG4gICAgICAgICAgICAgICAgICAgIGdWaXN1YWwuc2VsZWN0QWxsKFwicGF0aFwiKS5hdHRyKFwiZFwiLCBwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgc3ZnRnVuY3Rpb25hbC5zZWxlY3RBbGwoXCJwYXRoXCIpLmF0dHIoXCJkXCIsIHBhdGgpO1xuICAgICAgICAgICAgICAgICAgICBkcmF3U3RhdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICApO1xuXG5cblxuICAgICAgICBlbmFibGVSb3RhdGlvbigpO1xuXG4gICAgICAgIHJlbmRlclNsaWRlcigpO1xuICAgICAgICByZW5kZXJTZWxlY3RlZENvdW50cnkoXG4gICAgICAgICAgICBcImNyZWF0ZVwiLFxuICAgICAgICAgICAgZ2VvanNvbi5mZWF0dXJlc1s1XSxcbiAgICAgICAgICAgIGNvbG9yKHRlbXBlcmF0dXJlW2dlb2pzb24uZmVhdHVyZXNbNV0uaWRdLnRlbXBlcmF0dXJlKSxcbiAgICAgICAgICAgIHN0YXRpb25zW2dlb2pzb24uZmVhdHVyZXNbNV0uaWRdLFxuICAgICAgICApO1xuXG4gICAgICAgIGxldCBzZWxlY3RlZENvdW50cnlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWxlY3RlZC1jb3VudHJ5LW5hbWVcIik7XG4gICAgICAgIGxldCBjb3VudHJ5TmFtZSA9IGlzb1RvQ291bnRyeU5hbWVbZ2VvanNvbi5mZWF0dXJlc1s1XS5pZF07XG4gICAgICAgIGxldCBzZWxlY3RlZENvdW50cnlUZW1wID0gdGVtcGVyYXR1cmVbZ2VvanNvbi5mZWF0dXJlc1s1XS5pZF0udGVtcGVyYXR1cmU7XG5cbiAgICAgICAgc2VsZWN0ZWRDb3VudHJ5TmFtZS5pbm5lckhUTUwgPSBgJHtjb3VudHJ5TmFtZX08L2JyPkF2ZyBUZW1wLiAke3NlbGVjdGVkQ291bnRyeVRlbXAudG9GaXhlZCgxKX0gJiMxNzY7RmA7XG5cbiAgICAgICAgbGV0IHNlbGVjdGVkQ291bnRyeTtcblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vbnRoLXNsaWRlclwiKVxuICAgICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzbGlkZXJMYWJlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2xpZGVyLWN1cnJlbnQtbW9udGhcIik7XG5cbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudE1vbnRoID0gTnVtYmVyKGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudE1vbnRoU3RyaW5nID0gZS50YXJnZXQudmFsdWU7XG5cbiAgICAgICAgICAgICAgICBzbGlkZXJMYWJlbC5pbm5lckhUTUwgPSBudW1Nb250aFRvTmFtZVtjdXJyZW50TW9udGhdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRNb250aFN0cmluZy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE1vbnRoU3RyaW5nID0gXCIwXCIgKyBjdXJyZW50TW9udGhTdHJpbmc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcXVldWUoKVxuICAgICAgICAgICAgICAgICAgICAuZGVmZXIoZDMuanNvbiwgYC4vZGF0YS90YXMtMjAxNi0ke2N1cnJlbnRNb250aFN0cmluZ30uanNvbmApXG4gICAgICAgICAgICAgICAgICAgIC5kZWZlcihkMy5qc29uLCBgLi9kYXRhL2dzb20tMjAxNi0ke2N1cnJlbnRNb250aFN0cmluZ30tdGF2Zy1wcmNwLmpzb25gKVxuICAgICAgICAgICAgICAgICAgICAuYXdhaXQoaGFuZGxlU2xpZGVyKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlU2xpZGVyKFxuICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICB0ZW1wZXJhdHVyZSxcbiAgICAgICAgICAgIHN0YXRpb25zXG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcblxuICAgICAgICAgICAgZ1Zpc3VhbC5zZWxlY3RBbGwoXCJwYXRoLmxhbmRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZW1wZXJhdHVyZUNvbG9yKGQuaWQsIHRlbXBlcmF0dXJlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInN0cm9rZVwiLCBcIiNlZWVcIik7XG5cbiAgICAgICAgICAgIGxldCBnRnVuY3Rpb25hbCA9IGQzLnNlbGVjdChcIiNzZWxlY3RlZC1jb3VudHJ5XCIpLnNlbGVjdCgnZycpO1xuXG4gICAgICAgICAgICBnRnVuY3Rpb25hbC5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENvdW50cnkgPSBkLmlkIHx8IHNlbGVjdGVkQ291bnRyeTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlbXBlcmF0dXJlQ29sb3IoZC5pZCwgdGVtcGVyYXR1cmUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwic3Ryb2tlXCIsIFwiI2VlZVwiKTtcblxuICAgICAgICAgICAgY291bnRyaWVzLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBjbGljayhkLCB0ZW1wZXJhdHVyZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc3RhdGlvbkRhdGEgPSBzdGF0aW9ucztcbiAgICAgICAgICAgIGRyYXdTdGF0aW9ucygpO1xuICAgICAgICAgICAgcmVuZGVyU2VsZWN0ZWRDb3VudHJ5KFxuICAgICAgICAgICAgICAgIFwidXBkYXRlXCIsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRGZWF0dXJlLFxuICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlQ29sb3Ioc2VsZWN0ZWRDb3VudHJ5LCB0ZW1wZXJhdHVyZSksXG4gICAgICAgICAgICAgICAgc3RhdGlvbkRhdGFbc2VsZWN0ZWRDb3VudHJ5XVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgc2VsZWN0ZWRDb3VudHJ5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VsZWN0ZWQtY291bnRyeS1uYW1lXCIpO1xuICAgICAgICAgICAgY291bnRyeU5hbWUgPSBpc29Ub0NvdW50cnlOYW1lW3NlbGVjdGVkRmVhdHVyZS5pZF07XG4gICAgICAgICAgICBzZWxlY3RlZENvdW50cnlUZW1wID0gdGVtcGVyYXR1cmVbc2VsZWN0ZWRGZWF0dXJlLmlkXS50ZW1wZXJhdHVyZTtcblxuICAgICAgICAgICAgc2VsZWN0ZWRDb3VudHJ5TmFtZS5pbm5lckhUTUwgPSBgJHtjb3VudHJ5TmFtZX08L2JyPkF2ZyBUZW1wLiAke3NlbGVjdGVkQ291bnRyeVRlbXAudG9GaXhlZCgxKX0gJiMxNzY7RmA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB6b29tIGFuZCBwYW5cbiAgICAgICAgY29uc3Qgem9vbSA9IGQzLnpvb20oKVxuICAgICAgICAgICAgLnNjYWxlRXh0ZW50KFsxLCBJbmZpbml0eV0pXG4gICAgICAgICAgICAub24oJ3pvb20nLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgem9vbWVkKCk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIHN2Z0Z1bmN0aW9uYWwuY2FsbCh6b29tKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB6b29tZWQoKSB7XG4gICAgICAgIGxldCBwcmV2aW91c1NjYWxlRmFjdG9yID0gMSwgb3JpZ2luYWxTY2FsZSA9IGhlaWdodCAvIDIuMTtcblxuICAgICAgICAvLyBsZXQgZHggPSBkMy5ldmVudC5zb3VyY2VFdmVudC5tb3ZlbWVudFg7XG4gICAgICAgIC8vIGxldCBkeSA9IGQzLmV2ZW50LnNvdXJjZUV2ZW50Lm1vdmVtZW50WTtcblxuICAgICAgICBsZXQgZXZlbnQgPSBkMy5ldmVudC5zb3VyY2VFdmVudC50eXBlO1xuXG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICBpZiAoZXZlbnQgPT09ICd3aGVlbCcpIHtcbiAgICAgICAgICAgIGxldCBzY2FsZUZhY3RvciA9IGQzLmV2ZW50LnRyYW5zZm9ybS5rO1xuICAgICAgICAgICAgc2NhbGVDaGFuZ2UgPSBzY2FsZUZhY3RvciAtIHByZXZpb3VzU2NhbGVGYWN0b3I7XG4gICAgICAgICAgICBzY2FsZSA9IHNjYWxlICsgc2NhbGVDaGFuZ2UgKiBvcmlnaW5hbFNjYWxlO1xuXG4gICAgICAgICAgICBwcm9qZWN0aW9uLnNjYWxlKHNjYWxlKTtcbiAgICAgICAgICAgIHByZXZpb3VzU2NhbGVGYWN0b3IgPSBzY2FsZUZhY3RvcjtcblxuICAgICAgICAgICAgY29uc29sZS5sb2cocGF0aCk7XG5cbiAgICAgICAgICAgIGdWaXN1YWwuc2VsZWN0QWxsKFwicGF0aFwiKS5hdHRyKFwiZFwiLCBwYXRoKTtcbiAgICAgICAgICAgIGdGdW5jdGlvbmFsLnNlbGVjdEFsbChcInBhdGhcIikuYXR0cihcImRcIiwgcGF0aCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGRyYXdTdGF0aW9ucygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYXdTdGF0aW9ucygpIHtcbiAgICAgICAgY29udGV4dCA9IGNhbnZhcy5ub2RlKCkuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgIGNvbnRleHQuc2V0VHJhbnNmb3JtKFsxLCAwLCAwLCAxLCAwLCAwXSk7XG4gICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcblxuICAgICAgICBjb25zdCBwUm90YXRlID0gcHJvamVjdGlvbi5yb3RhdGUoKTtcblxuICAgICAgICBmb3IgKGxldCBpIGluIHN0YXRpb25EYXRhKSB7XG4gICAgICAgICAgICBsZXQgc2F0aW9uc1BlckNvdW50cnkgPSBzdGF0aW9uRGF0YVtpXTtcbiAgICAgICAgICAgIGZvciAobGV0IGogaW4gc2F0aW9uc1BlckNvdW50cnkpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3RhdGlvbiA9IHNhdGlvbnNQZXJDb3VudHJ5W2pdLFxuXG4gICAgICAgICAgICAgICAgICAgIGxvYyA9IHN0YXRpb24gPyBwcm9qZWN0aW9uKFtzdGF0aW9uLkxPTkdJVFVERSwgc3RhdGlvbi5MQVRJVFVERV0pIDogbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmIChsb2MpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvbmdpdHVkZSA9IE51bWJlcihzdGF0aW9uLkxPTkdJVFVERSkgKyAxODAsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydExvbmdpdHVkZSA9IDM2MCAtICgocFJvdGF0ZVswXSArIDI3MCkgJSAzNjApLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kTG9uZ2l0dWRlID0gKHN0YXJ0TG9uZ2l0dWRlICsgMTgwKSAlIDM2MDtcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmICgoc3RhcnRMb25naXR1ZGUgPCBlbmRMb25naXR1ZGUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvbmdpdHVkZSA+IHN0YXJ0TG9uZ2l0dWRlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBsb25naXR1ZGUgPCBlbmRMb25naXR1ZGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAoc3RhcnRMb25naXR1ZGUgPiBlbmRMb25naXR1ZGUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobG9uZ2l0dWRlID4gc3RhcnRMb25naXR1ZGUgfHwgbG9uZ2l0dWRlIDwgZW5kTG9uZ2l0dWRlKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAncmdiYSgxNDQsIDI1MywgMjIyLCAnICsgMC45ICsgJyknO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVuZGluZyA9IHByb2plY3Rpb24oW3N0YXRpb24uTE9OR0lUVURFLCBzdGF0aW9uLkxBVElUVURFXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5hcmMoZW5kaW5nWzBdLCBlbmRpbmdbMV0sIDIsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yKHN0YXRpb24uVEFWRyAqICg5IC8gNSkgKyAzMik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGwoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5hYmxlUm90YXRpb24oc3RhcnRpbmdBbmdsZSA9IDMwMCkge1xuICAgICAgICB0aW1lciA9IGQzLnRpbWVyKGZ1bmN0aW9uIChlbGFwc2VkKSB7XG4gICAgICAgICAgICBwcm9qZWN0aW9uLnJvdGF0ZShbc3RhcnRpbmdBbmdsZSArIGdsb2JlQ29uZmlnLnNwZWVkICogZWxhcHNlZCwgZ2xvYmVDb25maWcudmVydGljYWxUaWx0LCBnbG9iZUNvbmZpZy5ob3Jpem9udGFsVGlsdF0pO1xuICAgICAgICAgICAgc3ZnVmlzdWFsLnNlbGVjdEFsbChcInBhdGhcIikuYXR0cihcImRcIiwgcGF0aCk7XG4gICAgICAgICAgICBzdmdGdW5jdGlvbmFsLnNlbGVjdEFsbChcInBhdGhcIikuYXR0cihcImRcIiwgcGF0aCk7XG4gICAgICAgICAgICBkcmF3U3RhdGlvbnMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhd1RlbXBCYXIoKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBkMy5yYW5nZSgxMCk7XG5cbiAgICAgICAgY29uc3QgcmVjdHMgPSBzdmdWaXN1YWwuc2VsZWN0QWxsKFwiLnJlY3RzXCIpXG4gICAgICAgICAgICAuZGF0YShkYXRhKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAgICAgICAuYXR0cihcInhcIiwgMTApXG4gICAgICAgICAgICAuYXR0cihcImhlaWdodFwiLCAxMClcbiAgICAgICAgICAgIC5hdHRyKFwieVwiLCAoZCwgaSkgPT4gMTAgKyBpICogOSlcbiAgICAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgMTApXG4gICAgICAgICAgICAuYXR0cihcImZpbGxcIiwgZCA9PiBjb2xvcigxMDAgLSBkICogMTApKVxuICAgICAgICAgICAgLmF0dHIoXCJzdHJva2VcIiwgXCJncmF5XCIpO1xuXG4gICAgICAgIHN2Z1Zpc3VhbC5zZWxlY3RBbGwoXCJ0ZXh0XCIpXG4gICAgICAgICAgICAuZGF0YShkYXRhKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAgICAgICAuaHRtbChkID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7KDEwMCAtIGQgKiAxMCl9JiMxNzY7RmA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoXCJmb250LXNpemVcIiwgXCIwLjMyZW1cIilcbiAgICAgICAgICAgIC5hdHRyKFwieFwiLCAyMylcbiAgICAgICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIDIwKVxuICAgICAgICAgICAgLmF0dHIoXCJ5XCIsIChkLCBpKSA9PiAyMCArIGkgKiA5KVxuICAgICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCAxMClcbiAgICAgICAgICAgIC5hdHRyKFwiZmlsbFwiLCBkID0+IGNvbG9yKDEwMCAtIGQgKiAxMCkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhd09jZWFuKCkge1xuXG4gICAgICAgIGdGdW5jdGlvbmFsLnNlbGVjdEFsbChcInBhdGgub2NlYW5cIilcbiAgICAgICAgICAgIC5kYXRhKFt7IHR5cGU6IFwiU3BoZXJlXCIgfV0pXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZChcInBhdGhcIilcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgXCJ0cmFuc3BhcmVudFwiKVxuXG4gICAgICAgIGdWaXN1YWwuc2VsZWN0QWxsKFwicGF0aC5vY2VhblwiKVxuICAgICAgICAgICAgLmRhdGEoW3sgdHlwZTogXCJTcGhlcmVcIiB9XSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcIm9jZWFuXCIpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhd0dyYXRpY3VsZSgpIHtcbiAgICAgICAgY29uc3QgZ3JhdGljdWxlID0gZDMuZ2VvR3JhdGljdWxlKClcbiAgICAgICAgICAgIC5zdGVwKFsxMCwgMTBdKTtcblxuICAgICAgICBnVmlzdWFsLnNlbGVjdEFsbChcInBhdGguZ3JhdGljdWxlXCIpXG4gICAgICAgICAgICAuZGF0YShbZ3JhdGljdWxlKCldKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiZ3JhdGljdWxlXCIpXG4gICAgICAgICAgICAuYXR0cihcImRcIiwgcGF0aClcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgXCJ0cmFuc3BhcmVudFwiKVxuICAgIH1cbn1cblxuIiwiaW1wb3J0IHtcbiAgICBjb2xvcixcbiAgICB0ZW1wZXJhdHVyZUNvbG9yLFxufSBmcm9tIFwiLi9oZWxwZXJcIlxuXG5leHBvcnQgY29uc3QgcmVuZGVyU2VsZWN0ZWRDb3VudHJ5ID0gKFxuICAgIGFjdGlvbixcbiAgICBnZW9qc29uRmVhdHVyZSxcbiAgICBqc29uQ291bnRyeVRlbXBlcmF0dXJlLFxuICAgIHN0YXRpb25zXG4pID0+IHtcbiAgICBsZXQgd2lkdGggPSA1MDAsIGhlaWdodCA9IDQwMCwgY2VudGVyZWQ7XG5cbiAgICBsZXQgY2VudGVyU1ZHUG9zID0gW3dpZHRoIC8gMiwgaGVpZ2h0IC8gMl07XG5cbiAgICBsZXQgcHJvamVjdGlvbiA9IGQzLmdlb01lcmNhdG9yKCk7XG4gICAgLy8gLmNlbnRlcihbNTAsIDUwXSlcbiAgICAvLyAuc2NhbGUoMTUwKVxuICAgIC8vIC5yb3RhdGUoWzAsIDBdKTtcblxuICAgIGxldCBwYXRoID0gZDMuZ2VvUGF0aCgpLnByb2plY3Rpb24ocHJvamVjdGlvbik7XG5cbiAgICBsZXQgY2FudmFzLCBjb250ZXh0LCBzdGF0aW9uRGF0YSA9IFtdO1xuICAgIGxldCBjaXJjbGVSYWRpdXMgPSA0O1xuXG4gICAgY29uc3QgdG9vbHRpcCA9IGQzLnNlbGVjdChcIi50b29sdGlwXCIpO1xuXG5cbiAgICBpZiAoYWN0aW9uID09PSBcInVwZGF0ZVwiKSB7XG4gICAgICAgIC8vIGNhbnZhcyA9IGQzLnNlbGVjdChcIiNzZWxlY3RlZC1jYW52YXNcIikuc2VsZWN0KFwiY2FudmFzXCIpO1xuICAgICAgICBsZXQgc3ZnID0gZDMuc2VsZWN0KFwiI3NlbGVjdGVkLWZ1bmN0aW9uYWwtbWFwXCIpO1xuICAgICAgICBsZXQgZyA9IHN2Zy5zZWxlY3QoJ2cnKTtcbiAgICAgICAgZy5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJ0cmFuc2xhdGUoNTAsNTApXCJcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGJvdW5kcyA9IHBhdGguYm91bmRzKGdlb2pzb25GZWF0dXJlKTtcblxuICAgICAgICAvLyBzdmcuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgICAvLyAgICAgLnRleHQoXCJoZWxsb1wiKTtcblxuICAgICAgICBwcm9qZWN0aW9uLmZpdFNpemUoWyh3aWR0aCAtIDEwMCksIChoZWlnaHQgLSAxMDApXSwgZ2VvanNvbkZlYXR1cmUpXG5cbiAgICAgICAgZy5zZWxlY3RBbGwoXCJwYXRoXCIpLnJlbW92ZSgpO1xuICAgICAgICBnLnNlbGVjdEFsbChcInBhdGhcIilcbiAgICAgICAgICAgIC5kYXRhKFtnZW9qc29uRmVhdHVyZV0pXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZChcInBhdGhcIilcbiAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBwYXRoKVxuICAgICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBqc29uQ291bnRyeVRlbXBlcmF0dXJlKVxuICAgICAgICAgICAgLnN0eWxlKFwic3Ryb2tlXCIsIFwiI2VlZVwiKVxuICAgICAgICAvLyAuYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAvLyAgICAgLy8gICAgIGNvbnN0IGNlbnRyb2lkID0gcGF0aC5jZW50cm9pZChkKTtcbiAgICAgICAgLy8gICAgIC8vICAgICBjb25zdCB4ID0gd2lkdGggLyAyIC0gY2VudHJvaWRbMF07XG4gICAgICAgIC8vICAgICAvLyAgICAgY29uc3QgeSA9IGhlaWdodCAvIDIgLSBjZW50cm9pZFsxXTtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gXCJ0cmFuc2xhdGUoXCIgKyBwcm9qZWN0aW9uKFtkLmxvbmcsIGQubGF0XSkgKyBcIilcIlxuICAgICAgICAvLyB9KTtcbiAgICAgICAgc3RhdGlvbkRhdGEgPSBzdGF0aW9ucztcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJzZWxlY3RlZC1tYXBcIiwgc3RhdGlvbkRhdGEpO1xuICAgICAgICBkcmF3U3RhdGlvbnMoKTtcblxuICAgICAgICAvLyBjb25zdCB6b29tID0gZDMuem9vbSgpXG4gICAgICAgIC8vICAgICAuc2NhbGVFeHRlbnQoWzEsIEluZmluaXR5XSlcbiAgICAgICAgLy8gICAgIC50cmFuc2xhdGVFeHRlbnQoW1swLCAwXSwgW3dpZHRoLCBoZWlnaHRdXSlcbiAgICAgICAgLy8gICAgIC5leHRlbnQoW1swLCAwXSwgW3dpZHRoLCBoZWlnaHRdXSlcbiAgICAgICAgLy8gICAgIC5vbignem9vbScsICgpID0+IHtcbiAgICAgICAgLy8gICAgICAgICBnLnN0eWxlKCdzdHJva2Utd2lkdGgnLCBgJHsxLjUgLyBkMy5ldmVudC50cmFuc2Zvcm0ua31weGApXG4gICAgICAgIC8vICAgICAgICAgZy5hdHRyKCd0cmFuc2Zvcm0nLCBkMy5ldmVudC50cmFuc2Zvcm0pO1xuICAgICAgICAvLyAgICAgICAgIC8vIGcuc2VsZWN0QWxsKFwiY2lyY2xlXCIpLmF0dHIoJ3RyYW5zZm9ybScsIGQzLmV2ZW50LnRyYW5zZm9ybSk7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZDMuZXZlbnQudHJhbnNmb3JtKTtcbiAgICAgICAgLy8gICAgIH0pXG5cbiAgICAgICAgLy8gZy5jYWxsKHpvb20pO1xuXG4gICAgfSBlbHNlIGlmIChhY3Rpb24gPT09IFwiY3JlYXRlXCIpIHtcbiAgICAgICAgLy8gY2FudmFzID0gZDMuc2VsZWN0KFwiI3NlbGVjdGVkLWNhbnZhc1wiKS5hcHBlbmQoXCJjYW52YXNcIilcbiAgICAgICAgLy8gICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gICAgICAgIC8vICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG4gICAgICAgIC8vICAgICAuc3R5bGUoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJylcbiAgICAgICAgLy8gICAgIC5zdHlsZSgnbGVmdCcsICcwJyk7XG5cbiAgICAgICAgbGV0IHN2ZyA9IGQzLnNlbGVjdChcIiNzZWxlY3RlZC1mdW5jdGlvbmFsLW1hcFwiKVxuICAgICAgICAgICAgLmFwcGVuZChcInN2Z1wiKVxuICAgICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG4gICAgICAgIGxldCBnID0gc3ZnLmFwcGVuZChcImdcIik7XG4gICAgICAgIGcuYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgcmV0dXJuIFwidHJhbnNsYXRlKDUwLDUwKVwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHByb2plY3Rpb24uZml0U2l6ZShbKHdpZHRoIC0gMTAwKSwgKGhlaWdodCAtIDEwMCldLCBnZW9qc29uRmVhdHVyZSk7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJjZW50cm9pZFwiLCBwYXRoLmNlbnRyb2lkKGdlb2pzb25GZWF0dXJlKSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2plY3Rpb24udHJhbnNsYXRlKFswLCAwXSkpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNlbnRyb2lkMlwiLCBwYXRoLmNlbnRyb2lkKGdlb2pzb25GZWF0dXJlKSk7XG4gICAgICAgIC8vIHByb2plY3Rpb24udHJhbnNsYXRlKFsxMDAsMTAwXSk7XG4gICAgICAgIC8vIHByb2plY3Rpb24uY2VudGVyKFt3aWR0aC8yLCBoZWlnaHQvMl0pO1xuXG4gICAgICAgIGNvbnN0IGRhdGEgPSBkMy5yYW5nZSgxMCk7XG4gICAgICAgIGNvbnN0IHJlY3RzID0gc3ZnLnNlbGVjdEFsbChcIi5yZWN0c1wiKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJ4XCIsIDEwKVxuICAgICAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgMTApXG4gICAgICAgICAgICAuYXR0cihcInlcIiwgKGQsIGkpID0+IDEwICsgaSAqIDkpXG4gICAgICAgICAgICAuYXR0cihcIndpZHRoXCIsIDEwKVxuICAgICAgICAgICAgLmF0dHIoXCJmaWxsXCIsIGQgPT4gY29sb3IoMTAwIC0gZCAqIDEwKSlcbiAgICAgICAgICAgIC5hdHRyKFwic3Ryb2tlXCIsIFwiZ3JheVwiKTtcblxuICAgICAgICBzdmcuc2VsZWN0QWxsKFwidGV4dFwiKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgICAgICAgLmh0bWwoZCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAkeygxMDAgLSBkICogMTApfSYjMTc2O0ZgO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKFwiZm9udC1zaXplXCIsIFwiMC4zMmVtXCIpXG4gICAgICAgICAgICAuYXR0cihcInhcIiwgMjMpXG4gICAgICAgICAgICAuYXR0cihcImhlaWdodFwiLCAyMClcbiAgICAgICAgICAgIC5hdHRyKFwieVwiLCAoZCwgaSkgPT4gMjAgKyBpICogOSlcbiAgICAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgMTApXG4gICAgICAgICAgICAuYXR0cihcImZpbGxcIiwgZCA9PiBjb2xvcigxMDAgLSBkICogMTApKVxuICAgICAgICAvLyAuYXR0cihcInN0cm9rZVwiLCBcImdyYXlcIik7XG5cbiAgICAgICAgZy5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gICAgICAgICAgICAuZGF0YShbZ2VvanNvbkZlYXR1cmVdKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImRcIiwgcGF0aClcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwganNvbkNvdW50cnlUZW1wZXJhdHVyZSlcbiAgICAgICAgICAgIC5zdHlsZShcInN0cm9rZVwiLCBcIiNlZWVcIilcbiAgICAgICAgLy8gLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgLy8gICAgIGNvbnN0IGNlbnRyb2lkID0gcGF0aC5jZW50cm9pZChkKTtcbiAgICAgICAgLy8gICAgIGNvbnN0IHggPSB3aWR0aCAvIDIgLSBjZW50cm9pZFswXTtcbiAgICAgICAgLy8gICAgIGNvbnN0IHkgPSBoZWlnaHQgLyAyIC0gY2VudHJvaWRbMV07XG4gICAgICAgIC8vICAgICByZXR1cm4gXCJ0cmFuc2xhdGUoXCIgKyB4ICsgXCIsXCIgKyB5ICsgXCIpXCJcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgc3RhdGlvbkRhdGEgPSBzdGF0aW9ucztcbiAgICAgICAgLy8gY29uc29sZS5sb2coc3RhdGlvbkRhdGEpO1xuICAgICAgICBkcmF3U3RhdGlvbnMoKTtcblxuICAgICAgICBjb25zdCB6b29tID0gZDMuem9vbSgpXG4gICAgICAgICAgICAuc2NhbGVFeHRlbnQoWzEsIEluZmluaXR5XSlcbiAgICAgICAgICAgIC50cmFuc2xhdGVFeHRlbnQoW1swLCAwXSwgW3dpZHRoLCBoZWlnaHRdXSlcbiAgICAgICAgICAgIC5leHRlbnQoW1swLCAwXSwgW3dpZHRoLCBoZWlnaHRdXSlcbiAgICAgICAgICAgIC5vbignem9vbScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc2NhbGVYWSA9IGQzLmV2ZW50LnRyYW5zZm9ybTtcbiAgICAgICAgICAgICAgICBnLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ0cmFuc2xhdGUoXCIgKyAoc2NhbGVYWS54ICsgNTApICsgXCIsXCIgKyAoc2NhbGVYWS55ICsgNTApICsgXCIpIHNjYWxlKFwiICsgc2NhbGVYWS5rICsgXCIpXCI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZy5zZWxlY3RBbGwoXCJjaXJjbGVcIikuYXR0cihcInJcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkMy5ldmVudC50cmFuc2Zvcm0pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGVYWSA9IGQzLmV2ZW50LnRyYW5zZm9ybTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChjaXJjbGVSYWRpdXMgLyBzY2FsZVhZLmspO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICBzdmcuY2FsbCh6b29tKTtcblxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhd1N0YXRpb25zKCkge1xuICAgICAgICBsZXQgZyA9IGQzLnNlbGVjdChcIiNzZWxlY3RlZC1mdW5jdGlvbmFsLW1hcFwiKS5zZWxlY3QoXCJzdmdcIikuc2VsZWN0KFwiZ1wiKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coc3RhdGlvbkRhdGEpXG5cbiAgICAgICAgaWYgKHN0YXRpb25EYXRhKSB7XG4gICAgICAgICAgICBnLnNlbGVjdEFsbCgnY2lyY2xlJylcbiAgICAgICAgICAgICAgICAvLyBnLnNlbGVjdEFsbCgndGV4dCcpXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICBsZXQgc3RhdGlvbnNWYWx1ZSA9IGcuc2VsZWN0QWxsKCdjaXJjbGUnKVxuICAgICAgICAgICAgICAgIC8vIGxldCBzdGF0aW9uc1ZhbHVlID0gZy5zZWxlY3RBbGwoJ3RleHQnKVxuICAgICAgICAgICAgICAgIC5kYXRhKHN0YXRpb25EYXRhKVxuICAgICAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgICAgICAgICAgICAvLyAuYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgICAgICAgICAvLyAuYXR0cignY2xhc3MnLCAndGVtcC10ZXh0JylcbiAgICAgICAgICAgICAgICAvLyAudGV4dChkID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHJldHVybiAoZC5UQVZHICogKDkgLyA1KSArIDMyKS50b0ZpeGVkKDApO1xuICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgLy8gLmF0dHIoJ2N4JywgZCA9PiBwcm9qZWN0aW9uKFtkLkxPTkdJVFVERSwgZC5MQVRJVFVERV0pWzBdKVxuICAgICAgICAgICAgICAgIC8vIC5hdHRyKCdjeScsIGQgPT4gcHJvamVjdGlvbihbZC5MT05HSVRVREUsIGQuTEFUSVRVREVdKVsxXSlcbiAgICAgICAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGB0cmFuc2xhdGUoJHtwcm9qZWN0aW9uKFtkLkxPTkdJVFVERSwgZC5MQVRJVFVERV0pWzBdfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICR7cHJvamVjdGlvbihbZC5MT05HSVRVREUsIGQuTEFUSVRVREVdKVsxXX0pYFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwic3Ryb2tlXCIsIFwiIzExMVwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIDAuMSlcbiAgICAgICAgICAgICAgICAvLyAuc3R5bGUoXCJzdG9ya2VcIiwgXCJyZ2JhKDE0NCwgMjUzLCAyMjIsIDEpXCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCAoZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29sb3IoZC5UQVZHICogKDkgLyA1KSArIDMyKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3InLCBjaXJjbGVSYWRpdXMpO1xuXG4gICAgICAgICAgICBzdGF0aW9uc1ZhbHVlLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInN0cm9rZVwiLCBcIiNlZWVcIilcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgMC4yKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0b29sdGlwLnN0eWxlKFwib3BhY2l0eVwiLCAuOSlcbiAgICAgICAgICAgICAgICAgICAgLmh0bWwoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxwPlwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGQuTkFNRSArIFwiPGJyLz5cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkF2ZXJhZ2UgVGVtcDogXCIgKyAoZC5UQVZHICogKDkgLyA1KSArIDMyKS50b0ZpeGVkKDEpICsgXCImIzE3NjtGIDxiciAvPlwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPC9wPlwiXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgLy8gLnRleHQoYCR7ZC5OQU1FfWApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcC5zdHlsZShcIm9wYWNpdHlcIiwgLjkpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgKGQzLmV2ZW50LnBhZ2VZKSArIFwicHhcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgKGQzLmV2ZW50LnBhZ2VYICsgMTApICsgXCJweFwiKVxuICAgICAgICAgICAgICAgICAgICAvLyAudGV4dChkLk5BTUUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJzdHJva2VcIiwgXCIjMTExXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cihcInN0cm9rZS13aWR0aFwiLCAwLjEpXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXAuc3R5bGUoXCJvcGFjaXR5XCIsIDApXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgMCArIFwicHhcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgMCArIFwicHhcIik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnLnNlbGVjdEFsbCgnY2lyY2xlJylcbiAgICAgICAgICAgICAgICAvLyBnLnNlbGVjdEFsbCgndGV4dCcpXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIC8vIGZ1bmN0aW9uIGRyYXdTdGF0aW9ucygpIHtcbiAgICAvLyAgICAgY29udGV4dCA9IGNhbnZhcy5ub2RlKCkuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAvLyAgICAgY29udGV4dC5zYXZlKCk7XG5cbiAgICAvLyAgICAgY29udGV4dC5zZXRUcmFuc2Zvcm0oWzEsIDAsIDAsIDEsIDAsIDBdKTtcblxuICAgIC8vICAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIC8vICAgICBjb250ZXh0LnJlc3RvcmUoKTtcblxuICAgIC8vICAgICBjb25zdCBwUm90YXRlID0gcHJvamVjdGlvbi5yb3RhdGUoKTtcblxuICAgIC8vICAgICBmb3IgKGxldCBpIGluIHN0YXRpb25EYXRhKSB7XG5cbiAgICAvLyAgICAgICAgIGxldCBzdGF0aW9uID0gc3RhdGlvbkRhdGFbaV0sXG4gICAgLy8gICAgICAgICAgICAgbG9jID0gc3RhdGlvbiA/IHByb2plY3Rpb24oW3N0YXRpb24uTE9OR0lUVURFLCBzdGF0aW9uLkxBVElUVURFXSkgOiBudWxsO1xuXG4gICAgLy8gICAgICAgICBpZiAobG9jKSB7XG4gICAgLy8gICAgICAgICAgICAgbGV0IGxvbmdpdHVkZSA9IE51bWJlcihzdGF0aW9uLkxPTkdJVFVERSkgKyAxODAsXG4gICAgLy8gICAgICAgICAgICAgICAgIHN0YXJ0TG9uZ2l0dWRlID0gMzYwIC0gKChwUm90YXRlWzBdICsgMjcwKSAlIDM2MCksXG4gICAgLy8gICAgICAgICAgICAgICAgIGVuZExvbmdpdHVkZSA9IChzdGFydExvbmdpdHVkZSArIDE4MCkgJSAzNjAsXG4gICAgLy8gICAgICAgICAgICAgICAgIGVuZGluZyA9IHByb2plY3Rpb24oW3N0YXRpb24uTE9OR0lUVURFLCBzdGF0aW9uLkxBVElUVURFXSk7XG5cbiAgICAvLyAgICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIC8vICAgICAgICAgICAgIGNvbnRleHQuYXJjKGVuZGluZ1swXSwgZW5kaW5nWzFdLCA2LCAwLCBNYXRoLlBJICogMik7XG4gICAgLy8gICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9ICdyZ2JhKDE0NCwgMjUzLCAyMjIsICcgKyAwLjkgKyAnKSc7XG4gICAgLy8gICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAvLyAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yKHN0YXRpb24uVEFWRyAqICg5IC8gNSkgKyAzMik7XG4gICAgLy8gICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cblxuICAgIC8vIH1cbn0iLCJleHBvcnQgY29uc3QgbnVtTW9udGhUb05hbWUgPSB7XG4gICAgMTogXCJKYW51YXJ5XCIsXG4gICAgMjogXCJGZWJydWFyeVwiLFxuICAgIDM6IFwiTWFyY2hcIixcbiAgICA0OiBcIkFwcmlsXCIsXG4gICAgNTogXCJNYXlcIixcbiAgICA2OiBcIkp1bmVcIixcbiAgICA3OiBcIkp1bHlcIixcbiAgICA4OiBcIkF1Z3VzdFwiLFxuICAgIDk6IFwiU2VwdGVtYmVyXCIsXG4gICAgMTA6IFwiT2N0b2JlclwiLFxuICAgIDExOiBcIk5vdmVtYmVyXCIsXG4gICAgMTI6IFwiRGVjZW1iZXJcIixcbn1cblxuXG5cblxuZXhwb3J0IGNvbnN0IHJlbmRlclNsaWRlciA9ICgpID0+IHtcbiAgICBjb25zdCBzbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNsaWRlclwiKTtcbiAgICBzbGlkZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzbGlkZXItY29udGFpbmVyXCIpO1xuXG4gICAgY29uc3Qgc2xpZGVyTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNsaWRlckxhYmVsLnNldEF0dHJpYnV0ZShcImlkXCIsIFwic2xpZGVyLWN1cnJlbnQtbW9udGhcIik7XG4gICAgc2xpZGVyTGFiZWwuaW5uZXJIVE1MID0gbnVtTW9udGhUb05hbWVbMTBdO1xuXG4gICAgY29uc3Qgc2xpZGVyU2V0dGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBzbGlkZXJTZXR0aW5nLnNldEF0dHJpYnV0ZShcImlkXCIsIFwibW9udGgtc2xpZGVyXCIpO1xuICAgIHNsaWRlclNldHRpbmcuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInJhbmdlXCIpO1xuICAgIHNsaWRlclNldHRpbmcuc2V0QXR0cmlidXRlKFwibWluXCIsIFwiMVwiKTtcbiAgICBzbGlkZXJTZXR0aW5nLnNldEF0dHJpYnV0ZShcIm1heFwiLCBcIjEyXCIpO1xuICAgIHNsaWRlclNldHRpbmcuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCIxMFwiKTtcbiAgICBzbGlkZXJTZXR0aW5nLnNldEF0dHJpYnV0ZShcInN0ZXBcIiwgXCIxXCIpO1xuXG4gICAgc2xpZGVyLmFwcGVuZENoaWxkKHNsaWRlclNldHRpbmcpO1xuICAgIHNsaWRlci5hcHBlbmRDaGlsZChzbGlkZXJMYWJlbCk7XG59XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9