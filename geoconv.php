<?php

$lng = $_GET['lng'];
$lat = $_GET['lat'];

$url = "http://api.map.baidu.com/geoconv/v1/?coords=$lng,$lat&ak=XDturpjygy6R024uiNbNUBOa&output=json";
$res = httpGet($url);
$data = json_decode(res);

return $data;

function httpGet($url) {
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_TIMEOUT, 500);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($curl, CURLOPT_URL, $url);

    $res = curl_exec($curl);
    curl_close($curl);

    return $res;
}