window.Zepto = window.Zepto || {};

(function($) {
    "use strict";

    // if no Zepto library, then quit
    if (typeof $ !== 'function') return;

    // some constant variables
    var MOBILE_REG = /(Android|iPhone|iPod|iPad|Windows Phone|SymbianOS|AppleWebKit.*Mobile.*)/i;
    var IS_MOBILE = navigator.userAgent.match(MOBILE_REG) !== null;
    // var IS_MOBILE = 'createTouch' in document;
    var IS_WECHAT = navigator.userAgent.match(/(MicroMessenger)/i) !== null;

    var EVENT_TOUCH_START = IS_MOBILE ? 'touchstart' : 'mousedown'; // MSPointerDown pointerdown
    var EVENT_TOUCH_MOVE = IS_MOBILE ? 'touchmove' : 'mousemove'; // MSPointerMove pointermove
    var EVENT_TOUCH_END = IS_MOBILE ? 'touchend' : 'mouseup'; // MSPointerUp pointerup
    var TAP_CLICK_EVENT = IS_MOBILE ? 'tap' : 'click';

    $.extend($.fn, {
        setCookie: function(name, value, expire) {
            var exp  = new Date();
            exp.setTime(exp.getTime() + (expire > 0 ? expire: 30) * 24 * 3600 * 1000);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        },
        getCookie: function(name) {
            var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (arr !== null) return unescape(arr[2]); return null;
        },
        delCookie: function(name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            document.cookie = name + "=a;expires=" + exp.toGMTString();
        }
    });

    $.fn.carousel = function(opts) {
        var defaults = {
                classes: {
                    curr: 'current',  // the css class name of current page
                    next: 'next'      // the css class name of next page
                },
                percent: .28,         // the condition of sliding
                dynamic: false,       // the inner item is dynamic
                autoSlip: false,      // auto slip the item
                beforehand: function() {},
                callback: function() {}
            },
            o = $.extend({}, defaults, opts || {});

        return this.each(function() {
            // global variables
            var $indicators = $(this).find('.carousel-indicators');
            var $control = $(this).find('.carousel-control');
            var $inner = $(this).find('.carousel-inner');
            var $items, settings = {};

            function getItems() {
                $items = $inner.children();
            }

            function getCurrIndex() {
                return $inner.find('.' + o.classes.curr).index();
            }

            function getNextIndex() {
                var i = getCurrIndex();
                var n = 0;  // next index
                // direction is 1 or -1
                if (typeof settings.direction === 'number') {
                    n = i - settings.direction;
                    if (n === $items.length) n = 0;
                    if (n < 0) n = $items.length - 1;
                }
                return n;
            }

            function setCurrNextItems() {
                settings.$curr = $items.eq(getCurrIndex());
                settings.$next = $items.eq(getNextIndex());
            }

            function moveItem(diff) {
                // set the global variables
                settings.distance = diff / $inner.width();
                settings.direction = Math.abs(diff) / diff;

                setCurrNextItems();

                settings.$curr.css('margin-left', settings.distance * 100 + '%');
                settings.$next.css('margin-left', (settings.distance - settings.direction) * 100 + '%')
                    .addClass(o.classes.next).siblings().removeClass(o.classes.next);  // mark the next page immediately
            }

            function slipItem(callback, auto) {
                var isSlide = settings.distance * settings.direction > o.percent;
                var nextStartPosition = -settings.direction * 100 + '%';
                var speed ='fast', currPosition, nextPosition;

                if (typeof settings.direction !== 'number') return;

                // moving
                $inner.data('isMoving', true);

                // auto move, initial the next position and isSide
                if (typeof auto === 'boolean' && auto) {
                    settings.$next.css('margin-left', nextStartPosition).addClass(o.classes.next);

                    isSlide = true;
                    speed = 'slow';
                }

                // if condition is ok, then slip
                if (isSlide) {
                    // curr continue move
                    currPosition = settings.direction * 100 + '%';
                    // next back to the origin
                    nextPosition = 0;
                } else {
                    // curr back to the origin
                    currPosition = 0;
                    // next back to it's original position
                    nextPosition = nextStartPosition;
                }

                settings.$curr.animate({'margin-left': currPosition}, speed, 'ease-out');
                settings.$next.animate({'margin-left': nextPosition}, speed, 'ease-out', function() {
                    $(this).removeClass(o.classes.next);
                    // if slip
                    if (isSlide) {
                        $(this).addClass(o.classes.curr).siblings().removeClass(o.classes.curr);
                        // set the indicator current
                        if ($indicators.length) setIndicators();
                        // global callback
                        typeof o.callback === 'function' && o.callback();
                    }
                    // private callback
                    typeof callback === 'function' && callback();
                    // move over
                    $inner.data('isMoving', false);
                });
            }

            function bindControl(callback) {
                $control.on(TAP_CLICK_EVENT, function() {
                    if (!$inner.data('isMoving')) {
                        if ($(this).is('.left')) settings.direction = 1;
                        if ($(this).is('.right')) settings.direction = -1;
                        typeof callback === 'function' && callback();
                    }
                });
            }

            function buildIndicators() {
                for (var i = 0; i < $items.length; i++) {
                    $indicators.append('<li>');
                }
                setIndicators();
            }

            function setIndicators() {
                $indicators.children().eq(getCurrIndex())
                    .addClass(o.classes.curr).siblings().removeClass(o.classes.curr);
            }

            function init() {
                var innerLeft = $inner.offset().left;
                var interval, time = 3000;
                var isTouching, isMoving, x1, x2;

                function autoSlip() {
                    clearInterval(interval);
                    setCurrNextItems();
                    slipItem(function() {
                        interval = setInterval(autoSlip, time);
                    }, true);
                }

                // set items
                getItems();
                // if empty and  not dynamic, jump out;
                if (!$items.length && !o.dynamic) return;
                // set the closure
                if (o.dynamic) $.fn.carousel.items = getItems;

                // if beforehand
                typeof o.beforehand === 'function' && o.beforehand();

                if (o.autoSlip) {
                    settings.direction = -1;
                    interval = setInterval(autoSlip, time);
                }
                // bind control buttons tap or click event
                if ($control.length) bindControl(function() {
                    if (o.autoSlip) autoSlip();
                    else slipItem('', true);
                });
                // add indicators children
                if ($indicators.length) buildIndicators();

                $inner
                    .on(EVENT_TOUCH_START, function(e) {
                        e.preventDefault();
                        e.stopPropagation();

                        if (!$inner.data('isMoving')) isTouching = true;
                        x1 = (e.touches ? e.touches[0].pageX : e.pageX) - innerLeft;
                    })
                    .on(EVENT_TOUCH_MOVE, function(e) {
                        if (isTouching) {
                            isMoving = true;
                            // clear interval
                            clearInterval(interval);
                            x2 = (e.touches ? e.touches[0].pageX : e.pageX) - innerLeft;
                            moveItem(x2 - x1);
                        }
                    });
                $(document).on(EVENT_TOUCH_END, function() {
                    isTouching = false;
                    if (isMoving) {
                        isMoving = false;
                        slipItem(function() {
                            // reset interval
                            if (o.autoSlip) interval = setInterval(autoSlip, time);
                        });
                    }
                });
            }

            // run the initial program
            init();
        });
    };
    //$('[class$=carousel]').carousel();

    $.fn.multimedia = function(opts) {
        var defaults = {
                classes: {
                    controls: 'controls',
                    title: 'title',
                    timeLine: 'time-line',
                    progress: 'progress',
                    dot: 'dot',
                    currTime: 'curr-time',
                    totalTime: 'total-time',
                    button: 'button',
                    play: 'play',
                    pause: 'pause',
                    reset: 'reset'
                },
                beforehand: function() {},
                callback: function() {}
            },
            o = $.extend({}, defaults, opts || {});

        return this.each(function() {
            var multimedia = this;
            var $controls, $playPause, duration, hasHour;

            function init() {
                // hide the media default ui
                if (multimedia.controls) multimedia.controls = false;
                // multimedia.autoplay for iOS9 safari is hard to solve
                // only tap event for document is effective
                // build ui
                buildUI();
                // get the global element object
                $controls = $(multimedia).next();
                $playPause = $controls.find('.play-pause');

                // bind media loadeddata event
                $(multimedia).on('loadeddata', loadedData);
                // bind media timeupdate event
                $(multimedia).on('timeupdate', timeUpdate);
                // bind media play event
                $(multimedia).on('play', playCallback);
                // bind media pause event
                $(multimedia).on('pause', pauseCallback);

                // play or pause button bind tap or click event
                $playPause.on(TAP_CLICK_EVENT, playPause);
                // reset button bind tap or click event
                $controls.find('.' + o.classes.reset).on(TAP_CLICK_EVENT, function() {
                    multimedia.load();
                    multimedia.play();
                });
            }
            function buildUI() {
                var controls = '';
                controls += '<div class="' + o.classes.controls + '">';
                controls += '  <h3 class="' + o.classes.title + '">' + multimedia.title + '</h3>';
                controls += '  <div class="' + o.classes.timeLine + '">';
                controls += '    <div class="' + o.classes.progress + '"></div>';
                controls += '    <div class="' + o.classes.dot + '"></div>';
                controls += '    <span class="' + o.classes.currTime + '"></span>';
                controls += '    <span class="' + o.classes.totalTime + '"></span>';
                controls += '  </div>';
                controls += '  <span class="' + o.classes.button + ' play-pause ' + o.classes.play + '"></span>';
                controls += '  <span class="' + o.classes.button + ' ' + o.classes.reset + '"></span>';
                controls += '</div>';
                $(multimedia).after(controls);
            }
            function getTime(t) {
                var time = Math.floor(t);
                var hour, minute, second, timeTxt;
                if (hasHour) {
                    hour = Math.floor(time / 3600);
                    minute = Math.floor(time % 3600 / 60);
                    second = time % 3600 % 60;
                    timeTxt = hour + ':' + minute + ':' + second;
                } else {
                    minute = Math.floor(time / 60);
                    second = time % 60;
                    timeTxt = minute + ':' + second;
                }
                return timeTxt;
            }
            function loadedData() {
                // set the global variables
                duration = multimedia.duration;
                hasHour = duration >= 3600;
                // set time element content
                $controls.find('.' + o.classes.currTime).text(hasHour ? '0:0:0' : '0:0');
                $controls.find('.' + o.classes.totalTime).text(getTime(duration));
                //alert('msoVerticalAlignAlt');
            }
            function timeUpdate() {
                var currTime = multimedia.currentTime;
                var percent = currTime / duration * 100 + '%';
                // set current time element content
                $controls.find('.' + o.classes.currTime).text(getTime(currTime));
                // set the progress
                $controls.find('.' + o.classes.progress).width(percent);
                $controls.find('.' + o.classes.dot).css('left', percent);
            }
            function playPause() {
                if (multimedia.paused) {
                    multimedia.play();
                } else {
                    multimedia.pause();
                }
            }
            function playCallback() {
                $playPause.removeClass(o.classes.play).addClass(o.classes.pause);
            }
            function pauseCallback() {
                $playPause.removeClass(o.classes.pause).addClass(o.classes.play);
            }

            init();
        });
    };
    $('.multimedia audio, .multimedia video').multimedia();

    // wedding countdown
    $.fn.countdown = function() {
        return this.each(function() {
            var $this = $(this);
            var expired = $this.data('date');
            var diff = (new Date(expired)) - (new Date());
            // iOS9 safari not support new Date('2016-12-02 20:08:08');
            function setTime() {
                var date = getTime(diff);

                $this.find('.countdown-days').text(date[0]);
                $this.find('.countdown-hours').text(date[1]);
                $this.find('.countdown-minutes').text(date[2]);
                $this.find('.countdown-seconds').text(date[3]);

                diff -= 1000;
            }

            function getTime(t) {
                var date = [];

                date[0] = fillZero(parseInt(t / 1000 / 60 / 60 / 24));
                date[1] = fillZero(parseInt(t / 1000 / 60 / 60 % 24));
                date[2] = fillZero(parseInt(t / 1000 / 60 % 60));
                date[3] = fillZero(parseInt(t / 1000 % 60));

                return date;
            }

            function fillZero(n) {
                if (n < 10) n = '0' + n;
                return n;
            }

            setTime();
            setInterval(setTime, 1000);
        });
    };
    $('.countdown').countdown();

    // upload function
    function uploadFile(files, $progress, done, fail) {
        var formData = new FormData();

        $.each(files, function(key, value) {
            formData.append(key, value);
        });

        $.ajax({
            url: 'upload.php?upload',
            type: 'POST',
            data: formData,
            dataType: 'json',
            cache: false,
            processData: false,  // Don't process the files
            contentType: false,  // Set content type to false as jQuery will tell the server its a query string request
            success: function(data, textStatus, jqXHR) {
                // the errors
                if ($.isArray(data.errors) && data.errors.length) {
                    var errorInfo = '错误信息：';
                    $.each(data.errors, function(key, value) {
                        errorInfo += ' ' + value;
                    });
                    if (typeof fail === 'function') fail();
                    alert(errorInfo);
                }
                // the urls
                if ($.isArray(data.urls) && data.urls.length) {
                    // save the path to the database
                    if (typeof done === 'function') done(data.urls);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (typeof fail === 'function') fail();
                alert(textStatus);  //textStatus - > parseerror
            },
            xhr: function(){
                var xhr = $.ajaxSettings.xhr();
                xhr.upload.onprogress = function(e) {
                    var percentage = Math.floor(e.loaded / e.total * 100);
                    if (e.lengthComputable) $progress.width(percentage + '%');
                };
                xhr.upload.onload = function() {
                    //$progress.width(0);
                };
                return xhr;
            }
        });
    }

    // page jump
    function pageJump($el) {
        var url = $el.data('link');
        if (url) {
            window.location.href = url;
        }
    }

    // operate the invitation
    // click the block and jump to the link
    function deleteInvitation($item) {
        var id = $item.data('id');
        // ajax, then put the below in the callback
        $item.fadeOut('fast', function() {
            $item.remove();
        });
    }
    $('.invitation-list-operate>li:not([disabled])').on(TAP_CLICK_EVENT, function() {
        var $this = $(this), $item;
        if ($this.is('[deleter]')) {
            $item = $this.parents('.invitation-list-item');
            deleteInvitation($item);
        } else {
            pageJump($this);
        }
    });
    // operate the guide page
    $('.guide-items>li:not([disabled])').each(function(i) {
        var $this = $(this);

        if ($.fn.getCookie('guidestep') == i) {
            $this.addClass('selected').find('.guide-icon').removeClass('icon-color');
        }
        $this.on(TAP_CLICK_EVENT, function() {
            $.fn.setCookie('guidestep', $this.index(), 1);
            pageJump($this);
        });
    });

    // operate the package page
    $('.package-optional').on(TAP_CLICK_EVENT, function() {
        var $this = $(this);
        var $icon = $this.toggleClass('selected').find('.icon');
        if ($icon.is('.icon-add')) {
            $icon.removeClass('icon-add').addClass('icon-del');
        } else {
            $icon.removeClass('icon-del').addClass('icon-add');
        }
    });

    // bind the event of the add button and the file input
    $('.picture-add').each(function() {
        var $this = $(this);
        var $file = $this.next('input');
        var $img = $file.next('.picture-img');
        var $loading = $img.next('.picture-loading');
        var pid = $this.parent('.picture-unit').data('id');

        $this.on(TAP_CLICK_EVENT, function() {
		    if (!$this.data('uploading')) {
				$file.trigger('click');
			}
        });

        $file.on('change', function() {
            var files = this.files;
            if (typeof files === 'undefined') {
                alert('不支持HTML5上传');
                return;
            }
            if (files.length) {
                $this.data('uploading', true);
                $img.attr('src', 'images/empty.gif');
                uploadFile(files, $img, function(urls) {
                    $.get('upload.php?update', {pid: pid, urls: urls}, function(data){
                        if (data.success === 1) {
                            $.each(urls, function(key, value) {
                                $loading.show();
                                // there is only one pic
                                $img[0].onload = function() {
                                    $this.data('uploading', false);
                                    $img.addClass('uploaded');
                                    $loading.hide();
                                };
                                $img[0].src = value;
                            });
                        }
                    }, 'json');
                }, function() {
                    $this.data('uploading', false);
					$img.width(0);
                });
            }
        });
    });


    // operate the picture album
    var $pictures = $('.picture-carousel');
    var $album = $('.picture-album');
    if ($pictures.length && $album.length) {
        $pictures.carousel({
            dynamic: true
        });
        var closeEvent = TAP_CLICK_EVENT === 'click' ? 'dblclick' : 'tap';
        alert(TAP_CLICK_EVENT + ' ' + closeEvent);
        $pictures.live(closeEvent, albumHide);
    }
    // build album
    function buildAlbum(curr) {
        var $img = $('.picture-img.uploaded');
        var $lis = '';
        // remove child
        $album.children().remove();
        // produce child
        $img.each(function() {
            $lis += '<li' + (this === curr ? ' class="current"' : '') + '>';
            $lis += '<p><img src="' + this.src + '" alt=""></p>';
            $lis += '</li>';
        });
        $album.append($lis);
    }
    function albumShow() {
        $album.addClass('picture-album-show');
        $('.picture-delete').show();
    }
    function albumHide(e) {
        alert(e.type);
        $album.removeClass('picture-album-show');
        $('.picture-delete').hide();
    }
    $('.picture-img').on(TAP_CLICK_EVENT, function(e) {
        if ($album.length && $(this).is('.uploaded')) {
            alert(e.type);
            buildAlbum(this);
            albumShow();
            // reset the carousel items
            $.fn.carousel.items();
        }
    });
    $('.picture-delete').on(TAP_CLICK_EVENT, function() {
        if ($album.length) {
            var currIndex = $album.children('.current').index();
            $('.picture-img.uploaded').each(function(i) {
                if (i === currIndex) {
                    var $this = $(this);
                    var $file = $this.prev('input');
                    var pid = $this.parent('.picture-unit').data('id');

                    $.get('upload.php?delete', {pid: pid}, function(data){
                        if (data.success === 1) {
                            $file[0].value = '';
                            //$file.replaceWith($file.val('').clone(true));  //notwork in IE10-
                            //console.log($file[0].files);
                            $this.removeClass('uploaded').width(0);
                            // hide album
                            albumHide();
                        }
                    }, 'json');
                }
            });
        }
    });


    // multimedia-play
    $('.multimedia-play').each(function() {
        var $btn = $(this);
        var $icon = $btn.find('.icon');
        var $media = $btn.parent().find('video, audio');
        var isVideo = $media.is('video');

        if (!$media.length) return;

        $media.on('play', function() {
            if (isVideo) {
                $media[0].controls = true;
                $btn.hide();
            } else {
                $icon.removeClass('icon-play')
                    .addClass('icon-pause');
            }
        });
        $media.on('pause', function() {
            if (isVideo) {
                $media[0].controls = false;
                $btn.show();
            } else {
                $icon.removeClass('icon-pause')
                    .addClass('icon-play');
            }
        });

        // iOS9 safari need to tap two times
        // TAP_CLICK_EVENT
        $btn.on('click', function() {
            if ($media[0].paused) {
                $media[0].play();
            } else {
                $media[0].pause();
            }
        });
    });


    // graphs slide bar
    var $graphs = $('.graphs-carousel');
    if ($graphs.length) {
        $graphs.carousel({
            autoSlip: true
        });
    }


    function setSenderInfo(addr) {
        var $send = $('.wishes-send');
        var $avatar = $('.wishes-send-avatar');
        var $name = $send.find('input[type=text]');
        var code = $send.data('code');

		if (typeof code === 'string' && code) {
			$.get('userinfo.php?get', {code: code}, function(data) {
                if (data) {
					data.avatar && $avatar.css('background-image', 'url(' + data.avatar + ')');
					data.name && $name.val(data.name);
					saveSenderInfo(data.name, addr);
				}
			}, 'json');
		}
    }
    function saveSenderInfo(name, addr) {
        $.get('userinfo.php?save', {name: name, addr: addr}, function(data) {
            //ajaxDebug(data);
        }, 'json');
    }
    function ajaxDebug(obj) {
        var str = '';
        for (var k in obj) {
            str += k + ':' + obj[k] + '; ';
        }
        alert(str);
    }


    // set wedding address map image
    function getMapImg($m, w, h, addr, call) {
        if (typeof call === 'function')
            var src = call(w, h, addr);

        typeof src === 'string' && $m.attr('src', src);
        //window.open(src, '_blank');  // debug, get the error info on mobile
    }
    function setMap(coords, callback, isBaidu) {
        var $map = $(this);
        var width = parseInt($map.width());
        var height = parseInt(width * 2/3);
        var address = $map.data('address');

        if (!$map.is('img')) return;

        function getBaiduMapImg(data) {
            if (!data.status) {
                var lng = data.result[0].x;
                var lat = data.result[0].y;
                // static img format, baidu: lng<经度>, lat<纬度>
                address = lng + ',' + lat;

                // coords to address format, baidu: lat<纬度>, lng<经度>
                geoCoderUrl = 'http://api.map.baidu.com/geocoder/v2/?';
                geoCoderUrl += 'location=' + lat + ',' + lng + '&output=json&pois=1';
                geoCoderUrl += '&ak=XDturpjygy6R024uiNbNUBOa&callback=$.fn.getBaiduMapAddr';
                $.fn.getBaiduMapAddr = getBaiduMapAddr;
                $head.append($('<script>', {'src': geoCoderUrl}));
            }
            getMapImg($map, width, height, address, callback);
        }

        function getBaiduMapAddr(data) {
            if (!data.status) {
                var address = data.result.business + ':' + data.result.formatted_address;
                $map.next('.wedding-map-tip').find('p').text(address);
                setSenderInfo(address);
            }
        }
        window.getTencentMapAddr = function(data) {
            if (!data.status) {
                var address = data.result.formatted_addresses.recommend + ':' + data.result.address;
                $map.next('.wedding-map-tip').find('p').text(address);
                setSenderInfo(address);
            }
        };

        if ($.isPlainObject(coords)) {
            var $head = $('head');
            var geoConvUrl = '';
            var geoCoderUrl = '';
            if (isBaidu) {
                // convert GCJ02 to BD09 format, baidu: lng<经度>, lat<纬度>
                geoConvUrl = 'http://api.map.baidu.com/geoconv/v1/?';
                geoConvUrl  += 'coords=' + coords.lng + ',' + coords.lat + '&from=3&to=5';
                geoConvUrl  += '&ak=XDturpjygy6R024uiNbNUBOa&callback=$.fn.getBaiduMapImg';
                $.fn.getBaiduMapImg = getBaiduMapImg;
                $head.append($('<script>', {'src': geoConvUrl}));

                // jump out
                return;
            } else {
                // static img format, tencent: lat<纬度>, lng<经度>
                address = coords.lat + ',' + coords.lng;

                // coords to address format, tencent: lat<纬度>, lng<经度>
                // output should be jsonp type
                // callback not support $.fn
                geoCoderUrl = 'http://apis.map.qq.com/ws/geocoder/v1/?';
                geoCoderUrl += 'location=' + address + '&output=jsonp&get_poi=1';
                geoCoderUrl += '&key=4UGBZ-JH23O-RZMWY-SUM73-4TE6J-JFFH3&callback=getTencentMapAddr';
                $head.append($('<script>', {'src': geoCoderUrl}));
            }
        }
        getMapImg($map, width, height, address, callback);
    }
    function setBaiduMap(coords) {
        var src = 'http://api.map.baidu.com/staticimage?';
        // static img format: lng<经度>, lat<纬度>
        setMap.call(this, coords, function(w, h, addr) {
            src += 'width=' + w + '&height=' + h;
            src += '&center=' + addr + '&markers=' + addr;
            src += '&zoom=13&markerStyles=l,A,0xff0000';
            return src;
        }, true);
    }
    function setTencentMap(coords) {
        var src = 'http://apis.map.qq.com/ws/staticmap/v2/?';
        // static img format: lat<纬度>, lng<经度>
        setMap.call(this, coords, function(w, h, addr) {
            src += 'size=' + w + '*' + h;
            src += '&center=' + addr + '&markers=color:blue|label:A|' + addr;
            src += '&zoom=13&maptype=roadmap&key=4UGBZ-JH23O-RZMWY-SUM73-4TE6J-JFFH3';
            return src;
        });
    }
    function getWeddingMap() {
        var that = this;
        return function(coords) {
            // get the coords from wechat map api
            setTencentMap.call(that, coords);
            $(window).resize(function() {setTencentMap.call(that, coords)});
        }
    }
    var $weddingMap = $('#wedding-map');
    if ($weddingMap.length) {
        if (IS_WECHAT) {
            signature([wxMenu, wxMap(getWeddingMap.call($weddingMap))]);
        } else {
            getWeddingMap.call($weddingMap)();
        }
    }

    // wechat develop
    // get the signature
    function signature(callback) {
        $.ajax({
            type: 'GET',
            url: 'signature.php',
            data: {curUrl: window.location.href.split('#')[0]},
            dataType: 'json',
            success: function(data) {
                if (data) {
                    wx.config({
                        debug: true,
                        appId: data.appId,
                        timestamp: data.timestamp,
                        nonceStr: data.nonceStr,
                        signature: data.signature,
                        jsApiList: [
                            'translateVoice',
                            'startRecord',
                            'stopRecord',
                            'onVoiceRecordEnd',
                            'playVoice',
                            'onVoicePlayEnd',
                            'pauseVoice',
                            'stopVoice',
                            'uploadVoice',
                            'downloadVoice',
                            'getLocation',
                            //'hideMenuItems',
                            'hideAllNonBaseMenuItem'
                        ]
                    });

                    wx.ready(function() {
                        if ($.isArray(callback) && callback.length) {
                            $.each(callback, function(key, value) {
                                typeof callback[key] === 'function' && value();
                            });
                        } else {
                            typeof callback === 'function' && callback();
                        }
                    });

                    wx.error(function(res) {
                        alert(res.errMsg);
                    });
                }
            },
            error: function(xhr) {
                alert(xhr.status + ',' + xhr.statusText);
            }
        });
    }
    // wechat menuItems api
    function wxMenu() {
        wx.hideAllNonBaseMenuItem({
            success: function () {
                //alert('已隐藏所有非基本菜单项');
            }
        });
        /*
        wx.hideMenuItems({
            menuList: [
                'menuItem:readMode', // 阅读模式
                'menuItem:share:timeline', // 分享到朋友圈
                'menuItem:copyUrl' // 复制链接
            ],
            success: function (res) {
                alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
        */
    }
    // wechat map api
    function wxMap(callback) {
        return function() {
            wx.getLocation({
                type: 'gcj02',  // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'(谷歌、腾讯、高德)
                success: function(res) {
                    var latitude = res.latitude;   // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    //var speed = res.speed;         // 速度，以米/每秒计
                    //var accuracy = res.accuracy;   // 位置精度
                    var location = {};

                    location.lng = longitude;
                    location.lat = latitude;
                    typeof callback === 'function' && callback(location);
                },
                cancel: function(res) {
                    typeof callback === 'function' && callback();
                    setSenderInfo('用户拒绝授权获取地理位置');
                }
            });
        }
    }

    // wechat record voice api
    function wxVoice() {
        // 3 智能接口
        var voice = {
            localId: '',
            serverId: ''
        };
        /*
        // 3.1 识别音频并返回识别结果
        document.querySelector('#translateVoice').onclick = function () {
            if (voice.localId == '') {
                alert('请先使用 startRecord 接口录制一段声音');
                return;
            }
            wx.translateVoice({
                localId: voice.localId,
                complete: function (res) {
                    if (res.hasOwnProperty('translateResult')) {
                        alert('识别结果：' + res.translateResult);
                    } else {
                        alert('无法识别');
                    }
                }
            });
        };
        */
        // 4 音频接口
        // 4.2 开始录音
        $('.record-start').on(TAP_CLICK_EVENT, function() {
            wx.startRecord({
                success: function(res) {
                    //alert(JSON.stringify(res));
                    $('.record').addClass('recording');
                },
                cancel: function(res) {
                    alert('用户拒绝授权录音'+res);
                }
            });
        });
        // 4.3 停止录音
        $('.record-stop').on(TAP_CLICK_EVENT, function() {
            wx.stopRecord({
                success: function(res) {
                    voice.localId = res.localId;
                    $('.record').removeClass('recording').addClass('recorded');
                },
                fail: function(res) {
                    alert(JSON.stringify(res));
                }
            });
        });
        // 4.4 监听录音自动停止
        wx.onVoiceRecordEnd({
            complete: function(res) {
                voice.localId = res.localId;
                $('.record').removeClass('recording').addClass('recorded');
                alert('录音时间已超过一分钟');
            }
        });
        // 4.5 播放音频
        $('.record-btn-play').on(TAP_CLICK_EVENT, function() {
            if (voice.localId == '') {
                alert('请先使用 startRecord 接口录制一段声音');
                return;
            }
            wx.playVoice({
                localId: voice.localId
            });
        });
        // 4.6 暂停播放音频
        $('.record-btn-pause').on(TAP_CLICK_EVENT, function() {
            wx.pauseVoice({
                localId: voice.localId
            });
        });
        /*
        // 4.7 停止播放音频
        $('.record-btn-stop').on(TAP_CLICK_EVENT, function() {
            wx.stopVoice({
                localId: voice.localId
            });
        });
        */
        // 4.8 监听录音播放停止
        wx.onVoicePlayEnd({
            complete: function (res) {
                //alert('录音（' + res.localId + '）播放结束');
            }
        });
        // 删除录音
        $('.record-btn-delete').on(TAP_CLICK_EVENT, function() {
            //voice.localId = '';
            wx.stopVoice({
                localId: voice.localId
            });
            $('.record').removeClass('recorded');
        });
        /*
        // 4.8 上传语音
        document.querySelector('#uploadVoice').onclick = function() {
            if (voice.localId == '') {
                alert('请先使用 startRecord 接口录制一段声音');
                return;
            }
            wx.uploadVoice({
                localId: voice.localId,
                success: function (res) {
                    alert('上传语音成功，serverId 为' + res.serverId);
                    voice.serverId = res.serverId;
                }
            });
        };
        // 4.9 下载语音
        document.querySelector('#downloadVoice').onclick = function() {
            if (voice.serverId == '') {
                alert('请先使用 uploadVoice 上传声音');
                return;
            }
            wx.downloadVoice({
                serverId: voice.serverId,
                success: function (res) {
                    alert('下载语音成功，localId 为' + res.localId);
                    voice.localId = res.localId;
                }
            });
        };
        */
    }
    if ($('.record').length) signature(wxVoice);

})(Zepto);


