<?php
try {
	$db = new PDO("sqlite:mydb.dat");
	if(!$db){
		echo "资料库读取失败";
	} else {
		
		if (isset($_GET['update'])) {
			$pid = $_GET['pid'];
			$urls = $_GET['urls'];
			$dataurls = json_encode($urls);
			
			if (!empty($pid) && !empty($urls)) {
				date_default_timezone_set(PRC);
				$modified = date("Y-m-d H:i:s");
				$db->exec("update pics set urls = '$dataurls', modified = '$modified' where id = '$pid'");
				//$db->exec("insert into pics(urls, modified) values('$dataurls', '$modified')");
				
				echo json_encode(array('success' => 1, 'value' => $urls));
			}
		}

		if (isset($_GET['delete'])) {
			$pid = $_GET['pid'];
			
			$sql = "select * from pics where id = '$pid'";
			$result = $db->query($sql);
			$data = $result->fetch(PDO::FETCH_ASSOC);
			
			if (!empty($data)) {
				$urls = json_decode($data['urls']);
				foreach($urls as $i => $row):
				    unset($urls[$i]);
					@unlink($row);
				endforeach;
			    $dataurls = json_encode($urls);
				
				date_default_timezone_set(PRC);
				$modified = date("Y-m-d H:i:s");
				$db->exec("update pics set urls = '$dataurls', modified = '$modified' where id = '$pid'");
				
				echo json_encode(array('success' => 1, 'id' => $pid));
			}
		}

		if (isset($_GET['upload'])) {
			if (!empty($_FILES)) {
				$path = 'images/pic/';
				$format = array('jpg', 'jpeg', 'gif', 'png');
				$data = uploadfiles($_FILES, $path, $format);
				echo json_encode($data);
			}
		}
		
	}
	$db = null;
} catch (PDOException $e) {
	echo "Error!: ", $e->getMessage();
}

function uploadfiles($files, $dir, $types) {
	foreach ($files as $file) {
		$fileinfo = pathinfo($file['name']);
		$filename = $fileinfo['basename'];
		$filetype = strtolower($fileinfo['extension']);
		
		if (in_array($filetype, $types)) {
			$newname = date("YmdHis") . rand(10, 99);  // . time()
			$newfile = $newname . '.' . $filetype;
			
			if(move_uploaded_file($file['tmp_name'], $dir . $newfile)) {
				$urls[] = $dir . $newfile;
			} else {
				$errors[] = '“' . $filename . '”在上传过程中出现错误！';
			}
		} else {
			$errors[] = '“' . $filename . '”格式错误！';
		}
	}
	
	$data = array('errors' => $errors, 'urls' => $urls);
	return $data;
}

?>
