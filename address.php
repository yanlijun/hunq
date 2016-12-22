<?php
try {
	$db = new PDO("sqlite:mydb.dat");
	if(!$db){
		echo "资料库读取失败";
	} else {
		$sql = "select * from address";
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
	<style>
	body {
		font-size: 12px;
		background-color: #22292c;
		color: #dadada;
	}
	table {
		width: 100%;
	}
	table th, table td {
		padding: 4px;
		white-space: normal;
		word-wrap: break-word;
		word-break: break-all;
	}
	</style>
</head>
<body>
<table>
	<tr>
		<th width="14">ID</th>
		<th width="50">名称</th>
		<th>地址</th>
		<th width="60">时间</th>
	</tr>
    <?php foreach($data as $row): ?>
	<tr>
		<td align="center"><?=$row['id']?></td>
		<td align="center"><?=$row['name']?></td>
		<td><?=$row['addr']?></td>
		<td align="center"><?=$row['modified']?></td>
	</tr>
    <?php endforeach; ?>
</table>
</body>
</html>
