/* globals Promise, XMLHttpRequest, console */

/* Inspired by http://www.html5rocks.com/en/tutorials/es6/promises/ */

// Declare the module
var ajaxp = ajaxp || (function () {
    'use strict';

    // Create the object
    var trueajaxp = trueajaxp || {};

    // GET Request
    function _doGet(url) {
        return _doAjax(url, {}, 'GET', true);
        /*new Promise(function (resolve, reject) {
            // Do the usual XHR stuff
            var req = new XMLHttpRequest();
            req.open('GET', url, true);

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
            req.send();
        });*/
    }

    // GET Request JSON parsed
    function _doGetJSON(url) {
        return _doGet(url).then(JSON.parse).catch(function (err) {
            console.log("getJSON failed for", url, err);
            throw err;
        });
    }

    // POST Request
    function _doPost(url, params) {
        return _doAjax(url, params, 'POST', true);
        /*new Promise(function (resolve, reject) {
            // Do the usual XHR stuff
            var req = new XMLHttpRequest();
            req.open('POST', url, true);

            //Send the proper header information along with the request
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            //req.setRequestHeader("Content-length", params.length);
            //req.setRequestHeader("Connection", "close");

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
            req.send(params);
        });*/
    }

    // POST Request JSON parsed
    function _doPostJSON(url, params) {
        return _doPost(url, params).then(JSON.parse).catch(function (err) {
            console.log("postJSON failed for", url, err);
            throw err;
        });
    }

    // PUT Request
    function _doPut(url, params) {
        return _doAjax(url, params, 'PUT', true);
    }

    // DELETE Request
    function _doDelete(url, params) {
        return _doAjax(url, params, 'DELETE', true);
    }

    // AJAX Generic Request
    function _doAjax(url, params, method, async) {
        return new Promise(function (resolve, reject) {

            // Default value true
            async = async || true;

            // Do the usual XHR stuff
            var req = new XMLHttpRequest();
            req.open(method, url, async);

            if (method.toUpperCase() === "POST") {
                //Send the proper header information along with the request
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
            req.send(params);
        });
    }

    trueajaxp.ajax = function (url, params, method, async) {
        return _doAjax(url, params, method, async);
    };

    trueajaxp.get = function (url) {
        return _doGet(url);
    };

    trueajaxp.getJSON = function (url) {
        return _doGetJSON(url);
    };

    trueajaxp.post = function (url, params) {
        return _doPost(url, params);
    };

    trueajaxp.postJSON = function (url, params) {
        return _doPostJSON(url, params);
    };

    trueajaxp.put = function (url, params) {
        return _doPut(url, params);
    };

    trueajaxp.delete = function (url, params) {
        return _doDelete(url, params);
    };

    return trueajaxp;

}());
