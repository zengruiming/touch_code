var hasBitPrice = 1;

function jingPai() {
    var priceCus = 1;
    var priceCusMax = 6000; //心里价位，超过不竞拍
    var currentCusPrice = 0;

    var paimaiId = $("#paimaiId").val();
    var url = "//bid.jd.com/json/current/englishquery?paimaiId=" + paimaiId + "&skuId=0&t=" + getRamdomNumber() +
        "&start=" + queryStart + "&end=" + queryEnd;
    $.ajax({
        url: url,
        dataType: "jsonp",
        success: function (response) {
            console.log(response);
            console.log("当前最新价格" + response.currentPrice);
            currentCusPrice = Number(response.currentPrice);
            if (hasBitPrice == currentCusPrice) {
                console.log("价格相同，不需出价" + "hasBitPrice:" + hasBitPrice + "currentCusPrice:" + currentCusPrice);
                jingPai();
                return;
            }
            priceCus = currentCusPrice + 1;
            if (priceCus < priceCusMax) {
                console.log("正在出价");
                var url = "/services/bid.action?t=" + getRamdomNumber();
                var data = {
                    paimaiId: paimaiId,
                    price: priceCus,
                    proxyFlag: 0,
                    bidSource: 0
                };
                jQuery.getJSON(url, data, function (jqXHR) {
                    if (jqXHR != undefined) {
                        console.log(jqXHR);
                        if (jqXHR.result == '200') {
                            hasBitPrice = priceCus;
                        }
                        if (jqXHR.result == '517') {//频率过快
                            setTimeout("jingPai()", 1600);
                            console.log("延迟请求2秒");
                        } else if (jqXHR.result == '516') {//拍卖结束
                            return;
                        } else {
                            setTimeout("jingPai()", 1000);
                        }

                    }
                });
            } else {
                console.log("当前价格已经大于你设定的最高价格，出价失败");
            }
        }
    });
};
jingPai();


var hasBitPrice = 1;
function jingPai() {
    var priceCus = 1;
    var priceCusMax = 100; //心里价位，超过不竞拍
    var currentCusPrice = 0;
    var remainTime = 0;
    var paimaiId = $("#paimaiId").val();
    var url = "//bid.jd.com/json/current/englishquery?paimaiId=" + paimaiId + "&skuId=0&t=" + getRamdomNumber() +
        "&start=" + queryStart + "&end=" + queryEnd;
    $.ajax({
        url: url,
        dataType: "jsonp",
        success: function (response) {
            console.log(response);
            console.log(response.remainTime);
            currentCusPrice = Number(response.currentPrice);
            remainTime = response.remainTime;
            if (remainTime > 2000) {
                return;
            }
            priceCus = currentCusPrice + 1;
            if (priceCus < priceCusMax) {
                console.log("正在出价");
                var url = "/services/bid.action?t=" + getRamdomNumber();
                var data = {
                    paimaiId: paimaiId,
                    price: priceCus,
                    proxyFlag: 0,
                    bidSource: 0
                };
                jQuery.getJSON(url, data, function (jqXHR) {
                    if (jqXHR != undefined) {
                        console.log(jqXHR);
                        if (jqXHR.result == '200') {
                            hasBitPrice = priceCus;
                        }
                    }
                });
            } else {
                console.log("当前价格已经大于你设定的最高价格，出价失败");
            }
        }
    });
};
setInterval("jingPai()", 300);