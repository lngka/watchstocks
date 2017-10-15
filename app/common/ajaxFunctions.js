"use strict";
/* eslint-disable no-unused-vars*/

function ajaxRequest(method, url, requestObj, callback) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            callback(xmlhttp.response);
        }
    };
    // XMLHttpRequest.open(method, url, async)
    xmlhttp.open(method, url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xmlhttp.send(JSON.stringify(requestObj));
}
