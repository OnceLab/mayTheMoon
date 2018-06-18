

var geolocation = navigator.geolocation.getCurrentPosition(successCB, errorCB)
var LAT;
var JSON,Location;

function NS(a,b) {
    if (a > 0) {
        LAT = 1
    } else {
        LAT = 0
    }

    b();

}

function successCB(position) {
    //console.info(position);
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    // 禁用异步以给变量赋值
    $.ajaxSetup({async:false});
    $.get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + lng + "&key=4dc6e5713a2a4ff487166b5fed13bfd6&language=en&pretty=1", function(data) {
        JSON = data;

    })

    Location = JSON.results[0].formatted

    // 使用回调函数等待地理位置信息返回，确定南北半球，显示图片
    NS(lat,get_moon_image_address);



    // 写入时间
    document.getElementById("date").innerHTML = Date();

    // 写入经纬度地点
    document.getElementById("latlng").innerHTML = "Latitude:" +  lat.toFixed(2) + ", " + "Longitude:" + lng.toFixed(2) + ". ";

    // 写入地点
    document.getElementById("location").innerHTML = Location;




}


function errorCB(error) {
    console.error(error);
    var msg='';
    switch (error.code) {
        case error.PERMISSION_DENIED:
            msg = "用户拒绝对获取地理位置的请求。";
            break;
        case error.POSITION_UNAVAILABLE:
            msg = "位置信息是不可用的。";
            break;
        case error.TIMEOUT:
            msg = "请求用户地理位置超时。";
            break;
        case error.UNKNOWN_ERROR:
            msg = "未知错误。";
            break;
    }
    console.error(msg);
}

/*
    Based on NASA SVS script: https://svs.gsfc.nasa.gov/vis/a000000/a004600/a004604/current_moon.js
 */

/*
======================================================================
get_moon_imagenum()

Initialize the frame number.  If the current date is within the year
2018, the frame number is the (rounded) number of hours since the
start of the year.  Otherwise it's 1.
====================================================================== */


var moon_imagenum;

function get_moon_imagenum()
{
    var now = new Date();
    var year = now.getUTCFullYear();
    if ( year != 2018 ) {
        moon_imagenum = 1;
        return false;
    }
    var janone = Date.UTC( year, 0, 1, 0, 0, 0 );
    moon_imagenum = 1 + Math.round(( now.getTime() - janone ) / 3600000.0 );
    if ( moon_imagenum > 8760 ) moon_imagenum = 8760;
    return false;
}

get_moon_imagenum()


/*
======================================================================
show_moon_image()

Write the img tag that displays the current Moon image defined by
moon_imagenum.  Called from the body at the point where the image
should appear.

This is called when the page is first loaded.  When the image needs to
be replaced later, use replace_moon_image().
====================================================================== */

var address;

function get_moon_image_address()
{
    var fn = "000" + moon_imagenum;
    fn = fn.slice( fn.length - 4 );

    /* prepend this path to the filename, if needed */
    var domain = "http://svs.gsfc.nasa.gov"
    // 根据纬度显示正确月相图
    if (LAT = 1) {
        var path = "/vis/a000000/a004600/a004604/";
    } else {
        var path = "/vis/a000000/a004600/a004605/"
    }


    address = domain + path + "frames/730x730_1x1_30p/moon." + fn + ".jpg";

    var img = document.getElementById("moon_image");
    img.src = address;
}





