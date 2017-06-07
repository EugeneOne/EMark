<style lang="scss">
    #headOut {
        top: 0;
        width: 100%;
        background: #505050;
        z-index: 11;
    }

    #header {
        height: 60px;
        width: 1000px;
        margin: 0 auto;
        background: #505050;
        li {
            height: 100%;
            display: box;
            /* OLD - Android 4.4- */
            display: -webkit-box;
            /* OLD - iOS 6-, Safari 3.1-6 */
            display: -moz-box;
            /* OLD - Firefox 19- (buggy but mostly works) */
            display: -ms-flexbox;
            /* TWEENER - IE 10 */
            display: -webkit-flex;
            /* NEW - Chrome */
            display: flex;
            /*垂直居中*/
            -webkit-box-align: center;
            /* 12版 */
            -webkit-align-items: center;
            -moz-align-items: center;
            -ms-align-items: center;
            -o-align-items: center;
            align-items: center;
        }
        li:nth-child(1) {
            width: 60px;
            padding-right: 15px;
            img {
                height: 100%;
                display: block;
                height: 100%;
            }
        }
        li:nth-child(2) {
            img {
                height: 25px;
                width: 82px;
                display: block;
            }
        }
        .signin {
            cursor: pointer;
            position: relative;
            i {
                color: #ffffff;
                font-size: 12px;
            }
            #signinPic {
                display: block;
                height: 28px;
                width: 28px;
                border-radius: 100%;
                background-repeat: no-repeat;
                background-position: center center;
                ;
                background-size: cover;
            }
            #signinName {
                padding: 0 5px;
                font-size: 14px;
                color: #ffffff;
            }
            #headNewsOut {
                position: absolute;
                width: 100px;
                background: #333333;
                bottom: -62px;
                right: 0;
                z-index: 10;
                p {
                    height: 7px;
                    width: 100%;
                    background-color: #ffffff;
                    // background-image: url(../../inc/img/triangle.png);
                    background-position: center center;
                    background-repeat: no-repeat;
                }
                div {
                    height: 100%;
                    width: 100%;
                    padding: 5px;
                    box-sizing: border-box;
                    a {
                        cursor: pointer;
                        display: block;
                        background: #505050;
                        text-align: center;
                        line-height: 24px;
                        color: #ffffff;
                        width: 100%;
                        font-size: 14px;
                        height: 24px;
                    }
                    a:nth-child(1) {
                        margin-bottom: 5px;
                    }
                    a:nth-child(2) {
                        color: #999999;
                    }
                }
            }
            small {
                height: 10px;
                width: 10px;
                background: #f85959;
                border-radius: 100%;
                position: absolute;
                right: -5px;
                top: 18px;
            }
        }
        .noSignin {
            cursor: pointer;
            position: relative;
            i {
                color: #ffffff;
                font-size: 12px;
            }
            #signinPic {
                display: block;
                height: 28px;
                width: 28px;
                border-radius: 100%;
                background-repeat: no-repeat;
                background-position: center center;
                ;
                background-size: cover;
            }
            #signinName {
                padding: 0 5px;
                font-size: 14px;
                color: #ffffff;
            }
            #headNewsOut {
                position: absolute;
                width: 100px;
                background: #333333;
                bottom: -34px;
                right: 0;
                z-index: 10;
                div {
                    height: 100%;
                    width: 100%;
                    padding: 5px;
                    box-sizing: border-box;
                    a {
                        cursor: pointer;
                        display: block;
                        background: #505050;
                        text-align: center;
                        line-height: 24px;
                        color: #ffffff;
                        width: 100%;
                        font-size: 14px;
                        height: 24px;
                    }
                }
            }
            small {
                height: 10px;
                width: 10px;
                background: #f85959;
                border-radius: 100%;
                position: absolute;
                right: -5px;
                top: 18px;
            }
        }
    }
</style>
<template>
    <div id="headOut">
        <ul id="header">
            <!--<li class="f-l"><img src="../../inc/img/ic_logo-s@2x.png"></li>
            <li class="f-l"><img src="../../inc/img/ic_xuexihao@2x.png"></li>-->
            <li v-if="showLogin" class="signin f-r" @mouseenter="news()" @mouseleave="nonews()">
                <span id="signinPic" v-bind:style="{ backgroundImage : 'url(' + authorPic + ')'}"></span>
                <span id="signinName">{{authorName}}</span>
                <i class="xxicon">&#xe61d;</i>
                <div v-if="isNews" id="headNewsOut">
                    <div>
                        <a id="headNewsBtn" @click="newsBtn($event)">消息</a>
                        <a @click="loginOut()">退出</a>
                    </div>
                </div>
                <small v-if="circle"></small>
            </li>
            <!-- @mouseenter="news()" @mouseleave="nonews()" -->
            <li v-if="!showLogin" class="noSignin f-r" @mouseenter="news()" @mouseleave="nonews()">
                <span id="signinPic" v-bind:style="{ backgroundImage : 'url(/app/zimeiti/src/inc/img/ic_logo-r@2x.png)'}"></span>
                <span id="signinName">未激活用户</span>
                <div v-if="isNews" id="headNewsOut">
                    <div>
                        <a @click="loginOut()">退出</a>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props: {
            showLogin: {
                type: Boolean,
                default: false,
                twoways: true
            }
        },
        data() {
            return {
                url: "",

                authorName: "",
                authorPic: "",
                isNews: false,
                circle: false,
            }
        },
        methods: {
            news: function() {
                let self = this;
                self.isNews = true;
            },
            nonews: function(event) {
                let self = this;
                self.isNews = false;
            },
            newsBtn: function(event) {
                let self = this;
                event.preventDefault();
                event.stopPropagation();
                self.$route.router.push({
                    path: "/index/notice/list"
                })
                self.circle = false;
                // self.isNews = false;
            },
            loginOut: function() {
                let self = this;
                // let data = {
                //     userId: self.token
                // }

                localStorage.removeItem("expires_in")
                localStorage.removeItem("myaccessToken")
                localStorage.removeItem("myoppenId")

                self.clearCookie("xxuser");
                self.clearCookie("isLogin");

                localStorage['QQout'] = "true";
                localStorage['SINAout'] = "true";

                //退出接口
                $.ajax({
                        url: self.url + "/access/logout",
                        success: function(e) {
                            if (e.status.code == 0) {
                                self.clearCookie("xxuser");
                                self.clearCookie("isLogin");
                                self.clearCookie("secretKey");
                                localStorage['QQout'] = "true";
                                localStorage['SINAout'] = "true";
                                self.$route.router.push({
                                    path: "/sign/identifyLogin"
                                })
                            } else if(e.status.code == 100002){
                                self.checkCookie(self);
                            }
                        }
                    })
            }
        },
        mounted() {
            let self = this;
            //utf-8编码
            function encodeUTF8(str) {
                var temp = "",
                    rs = "";
                for (var i = 0, len = str.length; i < len; i++) {
                    temp = str.charCodeAt(i).toString(16);
                    rs += "\\u" + new Array(5 - temp.length).join("0") + temp;
                }
                return rs;
            }
            if (self.showLogin) {
                // $.ajax({
                //     url: self.url + '/source/detail',
                //     type: 'get',
                //     dataType: "json",
                //     success: function(e, textStatus, jqXHR) {
                //         if (jqXHR.status == 200) {
                //             self.authorName = e.data.name;
                //             self.authorPic = e.data.icon;
                //             self.setCookie('userName',encodeUTF8(e.data.name,7));
                //             self.setCookie('userIcon', e.data.icon, 7)
                //         }
                //     }
                // });
            }
        },

    }
</script>
