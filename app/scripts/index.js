console.log("Hello World!");

var $ = require('jquery');
var _ = require('underscore');
var handlebars = require('handlebars');


//w34fd7mc3m6lqlgrpjqz6yjs api key
//wtyzcns6zf shared secret

var url = "https://api.etsy.com/v2/listings/active.js?api_key=w34fd7mc3m6lqlgrpjqz6yjs&keywords=beer&includes=Images";

function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);

}

function logData(data){
  console.log(data);
  buildTemplates(data);
}
fetchJSONP(url, logData);



function buildTemplates(data) {

var resultsArray = data["results"];
var source   = $("#top-catagories").html();
var template = handlebars.compile(source);
var html = template({resultsArray});

$('#top-results').html(html);

}
