//引入 es6-promise
const promise = require("es6-promise");
// 注册es6-promise 注意：es6-promise,一定要在 axios 之前注册
promise.polyfill();

//引入jsdom
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jQuery')(window);
// console.log($);

//引入 axios
const axios = require("axios");
const Qs = require("qs");　　//qs是一个url参数转化（parse/stringify）的js库
const qz = require("./js/quzou.js");　　//qz趣走定制js

var header = {
    "minitype": "QUZOUMINI",
    "source": "2001",
    "appname": "MINI",
    "cache-control": "no-cache",
    "appversion": "3.3.0",
    "content-type": "application/x-www-form-urlencoded",
    "appid": "QUZUOO2C01YTQYOH9Q100207N063H7ES2Z43",
    "appmuid": "00000000-0974-ac6b-0000-00004eae1b41",
    "referer": "https://servicewechat.com/wx9681faeb5e00cdf0/38/page-frame.html",
    "appbundleid": "QUZOU_MINI",
    "accesstoken": "+NEflO3uj02MBMS5Y1lDrWp6h2nk+NkrJvSsGhwGPyfs4wcVLp9cgApfWcz6kQlck+vttQl74CMPo9HibM6F9tPtHGhWTxf0SgaTS0fuBntA0NzEEDZJbQWwD57Capn1p9ey43QoDRqJEhPWJSynhlBINYoWs0Sw9ABu0ZMUSJVatUNmk8Gu7Q==",
    "appmode": "PROD"
};
var url = "https://mini1.91quzou.com/activity/inviteVideo/receive.do";
var param = "ic=KXR64";

async function testPOST() {
    await axios({
        method: "POST",
        headers: header,
        url: url,
        data: Qs.parse(param),
    }).then(function (response) {
        console.log(response.data.msg);
    });
}

testPOST();