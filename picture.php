<?php
try {
	$db = new PDO("sqlite:mydb.dat");
	if(!$db){
		echo "资料库读取失败";
	} else {
		$sql = "select * from pics";
		$result = $db->query($sql);
		$data = $result->fetchAll(PDO::FETCH_ASSOC);
	}
	$db = null;
} catch (PDOException $e) {
	echo "Error!: ", $e->getMessage();
	die("<script>location.href = './';</script>");
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>上传图片</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimal-ui">
    <!--<meta name="format-detection" content="telephone=no">-->
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="container">
    <div class="picture">
	    <?php
		for ($i = 0; $i < 2; $i++) {
		?>
			<div class="picture-item">
				<p class="picture-title"><?=$i ? '婚纱照' : '头像照'?></p>
				<ul class="clear-fix">
					<?php
					foreach($data as $row):
					    $pid = $row['id'];
						if ($i ? ($pid > 2) : ($pid < 3)) {
						    $purls = json_decode($row['urls']);
					?>
						<li>
							<div class="picture-unit" data-id="<?=$pid?>">
								<a class="icon icon-add picture-add" href="javascript:"></a>
								<input type="file"><!--multiple-->
								<?php
								if (is_array($purls) && count($purls)) {
								?>
								<img class="picture-img uploaded" src="<?=$purls[0]?>" alt="">
								<?php
								} else {
								?>
								<img class="picture-img" src="images/empty.gif" alt="">
								<?php
								}
								?>
								<span class="loading picture-loading"></span>
							</div>
						</li>
					<?php
						}
					endforeach;
					?>
				</ul>
			</div>
		<?php
		}
		?>
		
		<!--
        <div class="picture-item">
            <p class="picture-title">婚纱照</p>
            <ul class="clear-fix">
                <li>
                    <div class="picture-unit" data-id="14">
                        <a class="icon icon-add picture-add" href="javascript:"></a>
                        <input type="file">
                        <img class="picture-img" src="images/empty.gif" alt="">
						<span class="loading picture-loading"></span>
                    </div>
                </li>
            </ul>
        </div>
		-->
        <a class="picture-delete" href="javascript:"><i class="icon icon-del"></i></a>
        <p class="txt-center txt-gary">支持： jpg png gif 格式</p>
    </div>
</div>
<div class="picture-carousel">
    <ul class="carousel-inner picture-album"></ul>
</div>

<script type="text/javascript" src="js/zepto.min.js"></script>
<script type="text/javascript" src="js/main.js"></script>
</body>
</html>
