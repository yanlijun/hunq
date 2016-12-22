<?php

class INFO {
  private $appId;
  private $appSecret;
  private $appCode;

  public function __construct($appId, $appSecret, $appCode) {
    $this->appId = $appId;
    $this->appSecret = $appSecret;
    $this->appCode = $appCode;
  }

  public function getBaseInfo() {
    $userinfo = $this->getUserinfo();
	$isEmpty = empty($userinfo->nickname);
	//$type = gettype($userinfo->nickname);
	
	if (!isset($_SESSION)) session_start();
	
	if ($isEmpty) {
		$userinfo = $_SESSION['userinfo'];
	} else {
	    $_SESSION['userinfo'] = $userinfo;
	}
	
    $baseinfo = array(
      "name"     => $userinfo->nickname,
      //"sex"      => $userinfo->sex,
      //"province" => $userinfo->province,
      //"city"     => $userinfo->city,
      "avatar"   => $userinfo->headimgurl,
	  //"empty"    => $isEmpty,
	  //"type"     => $type
    );
    return $baseinfo;
  }
  
  private function getTokenAndOpenId() {
	$url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=$this->appId&secret=$this->appSecret&code=$this->appCode&grant_type=authorization_code";
    $res = json_decode($this->httpGet($url));
    //$openid = $res->openid;
    return $res;
  }

  private function getUserinfo() {
	$tokenAndOpenId = $this->getTokenAndOpenId();
    $token  = $tokenAndOpenId->access_token;
    $openid = $tokenAndOpenId->openid;
	//$url = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=$token&openid=$openid";
	$url = "https://api.weixin.qq.com/sns/userinfo?access_token=$token&openid=$openid&lang=zh_CN";
    $res = json_decode($this->httpGet($url));
    //$name = $res->nickname;
    return $res;
  }

  private function httpGet($url) {
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
}


if (isset($_GET['get'])) {
	$info = new INFO("wxbf8ab4a69259b47f", "d2f7a4f197bd19d2e7caab29a380fb26", $_GET['code']);
	echo json_encode($info->GetBaseInfo());
}


if (isset($_GET['save'])) {
	
	try {
		$db = new PDO("sqlite:mydb.dat");
		if(!$db){
			echo "资料库读取失败";
		} else {
			
			$name = $_GET['name'];
			$addr = $_GET['addr'];
			
			if (!empty($name) && !empty($addr)) {
				date_default_timezone_set(PRC);
				$modified = date("Y-m-d H:i:s");
				$db->exec("insert into address(name, addr, modified) values('$name', '$addr', '$modified')");
				
				echo json_encode(array('success' => 1, 'name' => $name, 'addr' => $addr, 'modified' => $modified));
			}
			
		}
		$db = null;
	} catch (PDOException $e) {
		echo "Error!: ", $e->getMessage();
	}

}

