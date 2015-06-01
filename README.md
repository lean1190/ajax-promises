# ajax-promises
A simple Javascript library to perform AJAX requests returning promises.

#### No jquery required!!

The source includes an example with an index.html and a server.php to perform some simple requests and see how easy to use is the library

Example:

```javascript
ajaxp.get('server/server.php', {
    paramone: 'get param one',
    paramtwo: 'nice param two here'
}).then(function (response) {
    console.log("Get with params here!", response);
}).catch(function (error) {
    console.log("FAILED GET", error);
});
