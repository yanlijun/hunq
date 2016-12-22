<?php

if (strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false) {
    $appid = 'wxbf8ab4a69259b47f';
    $uri = 'http://yanlijun.com/client/hunq/templet1.php';
    $url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=$appid&redirect_uri=$uri&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
} else {
	$url = 'templet1.php';
}

header("Location: $url");