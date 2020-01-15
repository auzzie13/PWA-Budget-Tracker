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
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/src/app.js":
/*!***************************!*\
  !*** ./public/src/app.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _indexdb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./indexdb.js */ \"./public/src/indexdb.js\");\n  \n\n\nconst priceEl = document.getElementById(\"price\");\nconst balanceEl = document.getElementById(\"balance\");\nconst expenseEl = document.getElementById(\"expense\");\nconst expensesListEl = document.getElementById(\"expenses-list\");\nconst submitBtn = document.getElementById(\"submit\");\nconst resetBtn = document.getElementById(\"reset\");\nconst depositBtn = document.getElementById(\"deposit\");\n\n\nfunction addToList(name, price) {\n  expensesListEl.innerHTML += `<li class=\"list-group-item\">Name: ${name}\n    <span class=\"ml-4\">Price: ${price}</span></li>`;\n}\n\nfunction subtract(a, b) {\n  return parseInt(a) - parseInt(b);\n}\n\nfunction add(a, b) {\n  return parseInt(a) + parseInt(b);\n}\n\nfunction getTransactions() {\n  $.ajax({\n    url: \"/api/transaction\", \n    method: \"GET\",\n  }).then(function(results) {\n    console.log(\"working\");\n    results.forEach(item => addToList(item.name, item.value));\n  })\n}\n\nfunction submit(e) {\n  e.preventDefault();\n  const total = subtract(balanceEl.innerHTML, priceEl.value);\n  console.log(expenseEl.value);\n  console.log(priceEl.value);\n  balanceEl.innerHTML = total;\n  addToList(expenseEl.value, priceEl.value);\n\n  const transaction = {\n    name: expenseEl.value,\n    value: priceEl.value,\n    date: new Date().toISOString()\n  };\n\n  $.ajax({\n    url: \"/api/transaction\", \n    method: \"POST\",\n    data: transaction\n  }).then(function() {\n    console.log(\"working\");\n  })\n\n  Object(_indexdb_js__WEBPACK_IMPORTED_MODULE_0__[\"useIndexedDb\"])(\"budget\", \"budgetStore\", \"put\", {\n    name: expenseEl.value,\n    value: priceEl.value,\n  })\n\n};\n\nfunction deposit(e) {\n  e.preventDefault();\n  const total = add(balanceEl.innerHTML, priceEl.value);\n  console.log(expenseEl.value);\n  console.log(priceEl.value);\n  balanceEl.innerHTML = total;\n  addToList(expenseEl.value, priceEl.value);\n\n  const transaction = {\n    name: expenseEl.value,\n    value: priceEl.value,\n    date: new Date().toISOString()\n  };\n\n  $.ajax({\n    url: \"/api/transaction\", \n    method: \"POST\",\n    data: transaction\n  }).then(function() {\n    console.log(\"working\");\n  })\n\n  Object(_indexdb_js__WEBPACK_IMPORTED_MODULE_0__[\"useIndexedDb\"])(\"budget\", \"budgetStore\", \"put\", {\n    name: expenseEl.value,\n    value: priceEl.value,\n  })\n\n};\n\nfunction reset(e) {\n  e.preventDefault();\n  const total = 2000;\n  balanceEl.innerText = total;\n  expensesListEl.innerHTML = \"\";\n\n  Object(_indexdb_js__WEBPACK_IMPORTED_MODULE_0__[\"useIndexedDb\"])(\"budget\", \"budgetStore\", \"clear\")\n  location.reload();\n}\n\nsubmitBtn.onclick = submit;\ndepositBtn.onclick = deposit;\nresetBtn.onclick = reset;\n\ngetTransactions();\n\n\n\n//# sourceURL=webpack:///./public/src/app.js?");

/***/ }),

/***/ "./public/src/indexdb.js":
/*!*******************************!*\
  !*** ./public/src/indexdb.js ***!
  \*******************************/
/*! exports provided: useIndexedDb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useIndexedDb\", function() { return useIndexedDb; });\nfunction useIndexedDb(databaseName, storeName, method, object) {\r\n    return new Promise((resolve, reject) => {\r\n      const request = window.indexedDB.open(databaseName, 1);\r\n      let db,\r\n        tx,\r\n        store;\r\n      request.onupgradeneeded = function(e) {\r\n        const db = request.result;\r\n        db.createObjectStore(storeName, { keyPath: \"id\", autoIncrement:true});\r\n      };\r\n      request.onerror = function(e) {\r\n        console.log(\"There was an error\");\r\n      };\r\n      request.onsuccess = function(e) {\r\n        db = request.result;\r\n        tx = db.transaction(storeName, \"readwrite\");\r\n        store = tx.objectStore(storeName);\r\n        db.onerror = function(e) {\r\n          console.log(\"error\");\r\n        };\r\n        if (method === \"put\") {\r\n          store.put(object);\r\n        }\r\n        if (method === \"clear\") {\r\n          store.clear();\r\n        }\r\n        if (method === \"get\") {\r\n          const all = store.getAll();\r\n          all.onsuccess = function() {\r\n            resolve(all.result);\r\n          };\r\n        }\r\n        tx.oncomplete = function() {\r\n          db.close();\r\n        };\r\n      };\r\n    });\r\n  }\n\n//# sourceURL=webpack:///./public/src/indexdb.js?");

/***/ })

/******/ });