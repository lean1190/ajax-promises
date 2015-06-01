/* globals Promise, XMLHttpRequest, console */

/* Thanks to and inspired by http://www.html5rocks.com/en/tutorials/es6/promises/ */

// Declare the module
var ajaxp = ajaxp || (function () {
    'use strict';

    // Create the main object that will be imported
    var trueajaxp = trueajaxp || {};

    // Create a helper object to work with strings mainly
    var helper = {};

    // Check if the object has a property, if so returns true
    helper.isEmptyObject = function (object) {
        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                return false;
            }
        }

        return true;
    };

    // Check if a variable is empty, null, undefined or blank .
    helper.isEmpty = function (variable) {
        return (variable === null || typeof variable === "undefined" || variable === {} || this.isEmptyObject(variable) || variable === "");
    };

    // Check if 2 strings are equals
    helper.isStringEquals = function (firstString, secondString) {
        return firstString.toUpperCase() === secondString.toUpperCase();
    };

    // Cut the last character from a string
    helper.cutLastChar = function (string) {
        return string.slice(0, -1);
    };

    // Transform a request parameter json object to string
    helper.paramsToString = function (paramsObject) {
        var stringParams = "";
        for (var property in paramsObject) {
            if (paramsObject.hasOwnProperty(property)) {
                stringParams += property + "=" + paramsObject[property] + "&";
            }
        }

        // Cut last & character
        return (this.cutLastChar(stringParams)).trim();
    };

    // AJAX generic JSON parsed request
    function _doAjaxJSON(url, params, method, async) {
        return _doAjax(url, params, method, async).then(JSON.parse).catch(function (err) {
            console.log("JSON parsing failed for", url, err);
            throw err;
        });
    }

    // AJAX generic request
    function _doAjax(url, params, method, async) {
        return new Promise(function (resolve, reject) {
            var stringParams = "";

            // Set the params to empty if nothing there
            params = params || {};

            // Default value true, so it's not required
            async = async || true;

            // If there are params, then transform them
            if (!helper.isEmpty(params)) {
                stringParams = helper.paramsToString(params);

                // If GET, must attach the params to the url
                if (helper.isStringEquals(method, "GET")) {
                    url += "?" + stringParams;
                }
            }

            // Do the usual XHR stuff
            var req = new XMLHttpRequest();
            req.open(method, url, async);

            // If not a GET request, set the proper header
            if (!helper.isStringEquals(method, "GET")) {
                // Send the proper header information along with the request
                req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            }

            req.onload = function () {
                // This is called even on 404 etc
                // so check the status
                if (req.status == 200) {
                    // Resolve the promise with the response text
                    resolve(req.response);
                } else {
                    // Otherwise reject with the status text
                    // which will hopefully be a meaningful error
                    reject(Error(req.statusText));
                }
            };

            // Handle network errors
            req.onerror = function () {
                reject(Error("Network Error"));
            };

            // Make the request
            req.send(stringParams);
        });
    }

    trueajaxp.ajax = function (url, params, method, async) {
        return _doAjax(url, params, method, async);
    };

    // GET request
    trueajaxp.get = function (url, params) {
        return _doAjax(url, params, 'GET', true);
    };

    // POST request
    trueajaxp.post = function (url, params) {
        return _doAjax(url, params, 'POST', true);
    };

    // PUT request
    trueajaxp.put = function (url, params) {
        return _doAjax(url, params, 'PUT', true);
    };

    // DELETE request
    trueajaxp.delete = function (url, params) {
        return _doAjax(url, params, 'DELETE', true);
    };

    // GET JSON parsed request
    trueajaxp.getJSON = function (url, params) {
        return _doAjaxJSON(url, params, 'GET', true);
    };

    // POST JSON parsed request
    trueajaxp.postJSON = function (url, params) {
        return _doAjaxJSON(url, params, 'POST', true);
    };

    // PUT JSON parsed request
    trueajaxp.putJSON = function (url, params) {
        return _doAjaxJSON(url, params, 'PUT', true);
    };

    // DELETE JSON parsed request
    trueajaxp.deleteJSON = function (url, params) {
        return _doAjaxJSON(url, params, 'DELETE', true);
    };

    // Return the fulfilled object
    return trueajaxp;

}());
