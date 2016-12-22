<?php
if (isset($_GET['code'])) {
	$code = $_GET['code'];
} else {
    //echo "NO CODE";
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>模板</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimal-ui">
    <!--<meta name="format-detection" content="telephone=no">-->
    <link rel="stylesheet" href="css/templet.css">
</head>
<body>
<div class="templet templet01">
    <div class="container bk-black">

        <div class="cover"><img src="images/templet/t1/cover.jpg" alt=""></div>

        <div class="countdown" data-date="2016/12/02 20:08:08">
            <div class="plate-title">
                <img src="images/templet/t1/countdown-title.png" alt="">
                <p class="plate-title-sub">- 离我们的婚礼开始还有<span class="countdown-days">00</span>天<span class="countdown-hours">00</span>小时<span class="countdown-minutes">00</span>分<span class="countdown-seconds">00</span>秒 -</p>
            </div>
            <div class="plate-content">
                <ul class="countdown-times">
                    <li>
                        <span class="countdown-times-name">DAYS</span>
                        <span class="countdown-times-number countdown-days">00</span>
                    </li>
                    <li>
                        <span class="countdown-times-name">HOURS</span>
                        <span class="countdown-times-number countdown-hours">00</span>
                    </li>
                    <li>
                        <span class="countdown-times-name">MINUTES</span>
                        <span class="countdown-times-number countdown-minutes">00</span>
                    </li>
                    <li>
                        <span class="countdown-times-name">SECONDS</span>
                        <span class="countdown-times-number countdown-seconds">00</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="basic-info">
            <img src="images/templet/t1/basic-info.jpg" alt="">
            <img src="images/templet/t1/stories-01.jpg" alt="">
            <img src="images/templet/t1/stories-02.jpg" alt="">
            <img src="images/templet/t1/stories-03.jpg" alt="">
            <img src="images/templet/t1/stories-04.jpg" alt="">
            <img src="images/templet/t1/stories-bottom.jpg" alt="">
            <div class="stories-video">
                <video src="http://7xu8zs.com1.z0.glb.clouddn.com/50.mp4" poster="video/50.png"><p>您的浏览器不支持HTML5视频标签。</p></video>
                <span class="multimedia-play"><i class="icon icon-play"></i></span>
            </div>
        </div>

        <div class="graphs">
            <div class="plate-title"><img src="images/templet/t1/graphs-title.png" alt=""></div>
            <div class="plate-content carousel graphs-carousel">
                <ul class="carousel-indicators"></ul>
                <div class="carousel-inner">
                    <div class="item"><img src="images/templet/t1/graphs-01.jpg" alt=""></div>
                    <div class="item current"><img src="images/templet/t1/graphs-02.jpg" alt=""></div>
                    <div class="item"><img src="images/templet/t1/graphs-03.jpg" alt=""></div>
                </div>
                <a class="carousel-control left" href="javascript:"></a>
                <a class="carousel-control right" href="javascript:"></a>
            </div>
        </div>

        <div class="wall">
            <div class="plate-title"><img src="images/templet/t1/wall-title.png" alt=""></div>
            <div class="plate-content">
                <div class="wall-cover bk-cover" style="background-image:url('images/templet/t1/graphs-03.jpg')">
                    <img src="images/templet/t1/wall-cover.png" alt="">
                </div>
            </div>
        </div>

        <div class="big-day">
            <div class="plate-title"><img src="images/templet/t1/big-day-title.png" alt=""></div>
            <div class="plate-content">
                <div class="big-day-frame">
                    <div class="big-day-main bk-cover" style="background-image:url('images/templet/t1/big-day-main.jpg')"></div>
                    <img class="big-day-cover" src="images/templet/t1/big-day-cover.png" alt="">
                </div>
            </div>
        </div>

        <div class="wedding">
            <div class="plate-title"><img src="images/templet/t1/wedding-title.png" alt=""></div>
            <div class="plate-content">
                <div class="wedding-map">
                    <img id="wedding-map" src="images/empty.gif" data-address="上海市浦东新区国展路489号" alt="">
                    <div class="wedding-map-tip">
                        <p>2015年7月15日  花嫁丽舍私人婚礼会所（世博店）地址：上海市浦东新区国展路489号。</p>
                    </div>
                </div>
                <div class="wedding-intro">
                    <div class="wedding-intro-title">
                        <i class="icon icon-foot"></i>
                        <img src="images/templet/t1/wedding-intro-title.png" alt="">
                    </div>
                    <ul class="wedding-intro-text">
                        <li>如果你乘坐地铁，我们的接驳车将在16:00-18:00间，于轨交七/八号线耀华路站4号口，恭候大驾光临。</li>
                        <li>如果你驱车而来，请在打浦路隧道出口至长清北路左转，沿长清北路至国展路左转，行700米到达；或在南北高架过卢浦大桥济阳路口下，至耀华路左转至长清北路左转，至国展路左转，行700米到达。</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="wishes">
            <div class="plate-title"><img src="images/templet/t1/wishes-title.png" alt=""></div>
            <div class="plate-content">
                <div class="wishes-picture txt-center"><img src="images/templet/t1/wishes-picture.jpg" alt=""></div>
                <div class="wishes-intro clear-fix">
                    <dl class="wishes-voice clear-fix">
                        <dt class="bk-cover" style="background-image:url('images/templet/t1/wishes-voice-avatar.jpg')">
                            <audio src="http://7xu8zs.com1.z0.glb.clouddn.com/music.mp3"><p>您的浏览器不支持HTML5音频标签。</p></audio>
                            <span class="multimedia-play"><i class="icon icon-play"></i></span>
                        </dt>
                        <dd><i class="icon icon-love fr"></i>The couple's thank</dd>
                        <dd>新人的感谢</dd>
                    </dl>
                    <p>如果你是他们的微信好友，人人好友，微博好友，还愣着干什么，赶紧发个祝福呗。<br>这场完美的婚礼，没有二维码，也没有手机应用。</p>
                    <p>首先感谢父母，将我们养大成人。<br>再次感谢长辈们在我们成长过程中的关心和关怀。</p>
                    <p>感谢我们人生路上一路遇到的同学、朋友，是你们让我们的人生之路充满精彩。<br>感谢能到场和不能到场的人。<br>感谢能一直看到最后的你。THANK YOU!</p>
                </div>
                <ul class="wishes-list">
                    <li>
                        <div class="wishes-content">
                            <div class="wishes-avatar">
                                <div class="wishes-avatar-back">
                                    <div class="wishes-avatar-front">
                                        <p class="wishes-avatar-img bk-cover" style="background-image:url('images/avatar/1.jpg')"></p>
                                    </div>
                                </div>
                            </div>
                            <div class="wishes-greetings">
                                <div class="wishes-greetings-cell">
                                    <p>Would you tell me, please, which way I ought to go from here?</p>
                                </div>
                            </div>
                        </div>
                        <p class="wishes-from">2015-07-31-18:54  by Marry</p>
                    </li>
                    <li>
                        <div class="wishes-content">
                            <div class="wishes-avatar">
                                <div class="wishes-avatar-back">
                                    <div class="wishes-avatar-front">
                                        <p class="wishes-avatar-img bk-cover" style="background-image:url('images/avatar/2.jpg')"></p>
                                    </div>
                                </div>
                            </div>
                            <div class="wishes-greetings">
                                <div class="wishes-greetings-cell">
                                    <p>再次感谢长辈们在我们成长过程中的关心和关怀。</p>
                                </div>
                            </div>
                        </div>
                        <p class="wishes-from">2015-07-31-18:54  by Marry</p>
                    </li>
                    <li>
                        <div class="wishes-content">
                            <div class="wishes-avatar">
                                <div class="wishes-avatar-back">
                                    <div class="wishes-avatar-front">
                                        <p class="wishes-avatar-img bk-cover" style="background-image:url('images/avatar/3.jpg')"></p>
                                    </div>
                                </div>
                            </div>
                            <div class="wishes-greetings">
                                <div class="wishes-greetings-cell">
                                    <p>Would you tell me, please, which way I ought to go from here?</p>
                                </div>
                            </div>
                        </div>
                        <p class="wishes-from">2015-07-31-18:54  by Marry</p>
                    </li>
                    <li>
                        <div class="wishes-content">
                            <div class="wishes-avatar">
                                <div class="wishes-avatar-back">
                                    <div class="wishes-avatar-front">
                                        <p class="wishes-avatar-img bk-cover" style="background-image:url('images/avatar/4.jpg')"></p>
                                    </div>
                                </div>
                            </div>
                            <div class="wishes-greetings">
                                <div class="wishes-greetings-cell">
                                    <p>感谢我们人生路上一路遇到的同学、朋友，是你们让我们的人生之路充满精彩。</p>
                                </div>
                            </div>
                        </div>
                        <p class="wishes-from">2015-07-31-18:54  by Marry</p>
                    </li>
                    <li>
                        <div class="wishes-content">
                            <div class="wishes-avatar">
                                <div class="wishes-avatar-back">
                                    <div class="wishes-avatar-front">
                                        <p class="wishes-avatar-img bk-cover" style="background-image:url('images/avatar/5.jpg')"></p>
                                    </div>
                                </div>
                            </div>
                            <div class="wishes-greetings">
                                <div class="wishes-greetings-cell">
                                    <p>Would you tell me, please, which way I ought to go from here?</p>
                                </div>
                            </div>
                        </div>
                        <p class="wishes-from">2015-07-31-18:54  by Marry</p>
                    </li>
                    <li>
                        <div class="wishes-content">
                            <div class="wishes-avatar">
                                <div class="wishes-avatar-back">
                                    <div class="wishes-avatar-front">
                                        <p class="wishes-avatar-img bk-cover" style="background-image:url('images/avatar/6.jpg')"></p>
                                    </div>
                                </div>
                            </div>
                            <div class="wishes-greetings">
                                <div class="wishes-greetings-cell">
                                    <p>感谢能到场和不能到场的人。</p>
                                </div>
                            </div>
                        </div>
                        <p class="wishes-from">2015-07-31-18:54  by Marry</p>
                    </li>
                    <li>
                        <div class="wishes-content">
                            <div class="wishes-avatar">
                                <div class="wishes-avatar-back">
                                    <div class="wishes-avatar-front">
                                        <p class="wishes-avatar-img bk-cover" style="background-image:url('images/avatar/7.jpg')"></p>
                                    </div>
                                </div>
                            </div>
                            <div class="wishes-greetings">
                                <div class="wishes-greetings-cell">
                                    <p>如果你是他们的微信好友，人人好友，微博好友，还愣着干什么，赶紧发个祝福呗。
                                    这场完美的婚礼，没有二维码，也没有手机应用。

                                    首先感谢父母，将我们养大成人。
                                    再次感谢长辈们在我们成长过程中的关心和关怀。

                                    感谢我们人生路上一路遇到的同学、朋友，是你们让我们的人生之路充满精彩。
                                    感谢能到场和不能到场的人。
                                    感谢能一直看到最后的你。THANK YOU!</p>
                                </div>
                            </div>
                        </div>
                        <p class="wishes-from">2015-07-31-18:54  by Marry</p>
                    </li>
                </ul>
                <div class="wishes-send" data-code="<?=$code?>">
                    <div class="wishes-send-avatar bk-cover" style="background-image:url('images/avatar/8.jpg')"></div>
                    <textarea placeholder="写下你祝福的话语......"></textarea>
                    <input class="btn bk-gary" type="button" value="发送">
                    <input type="text" placeholder="你的姓名" value="老K">
                </div>
            </div>
        </div>

        <div class="footer txt-center">
            <div class="footer-slogan bk-cover" style="background-image:url('images/templet/t1/footer-slogan.jpg')">
                <p>Thank you!</p>
                <p>Made By <b><i>致爱丽丝</i></b></p>
            </div>
        </div>

        <a class="btn btn-large btn-welt" href="javascript:">选用模板</a>
    </div>
</div>
<script type="text/javascript" src="js/zepto.min.js"></script>
<!-- http://res.wx.qq.com/open/js/jweixin-1.0.0.js -->
<script type="text/javascript" src="js/jweixin-1.0.0.js"></script>
<script type="text/javascript" src="js/main.js"></script>
</body>
</html>
