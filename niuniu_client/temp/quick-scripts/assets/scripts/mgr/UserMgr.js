(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/mgr/UserMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e9915y0tNZBhqvASxLrrpS2', 'UserMgr', __filename);
// scripts/mgr/UserMgr.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        account: null,
        userid: null,
        avatar: null,
        userName: null,
        roomid: null,
        ip: null,
        sign: 0,
        isSitDown: false
    },

    login: function login() {
        cc.vv.socket.addHandler('welcome', function (msg) {
            var roomNum = cc.args["roomNum"];
            if (roomNum == null) {
                roomNum = 1;
            }
            cc.vv.userMgr.enterRoom(roomNum);
        });
        cc.vv.socket.addHandler('joinRoom', function (msg) {
            if (cc.director.getScene().name == "game12" || cc.director.getScene().name == "game6" || cc.director.getScene().name == "game9") {} else {
                cc.director.loadScene("game" + cc.args["ext_json"]['playerNum']);
            }
        });
        cc.vv.socket.addHandler('joinRoom_error', function (msg) {
            cc.vv.uitools.ShowAlert(cc.director.getScene(), msg, function () {
                if (!cc.LOCALHOST) {
                    cc.vv.hallSDK.goHall();
                } else {
                    window.parent.location = "/";
                }
            }, false);
        });

        var self = this;
        var onLogin = function onLogin(ret) {
            if (ret.errcode !== 0) {} else {
                var data = {
                    ip: ret.clientip,
                    port: ret.clientport
                };
                cc.vv.gameNetMgr.connectGameServer(data);
            }
        };
        cc.vv.http.sendRequest("/login", { account: self.account, gameId: cc.args['gameId'], roomNum: cc.args['roomNum'], sign: self.sign }, onLogin);
    },

    enterRoom: function enterRoom(roomid) {
        if (cc.args["ext"] == undefined) {
            var str = "{\"niu7\":\"bei2\",\"teshu\":\"dayu3\",\"zhuangType\":\"turn\",\"playType\":\"see\",\"difen\":\"5\",\"playerNum\":\"9\"}";
            cc.args["ext"] = encodeURIComponent(str);
        }
        if (cc.args["inningsNum"] == undefined) {
            cc.args["inningsNum"] = 4;
        }
        var json = decodeURIComponent(cc.args["ext"]);
        cc.args["ext_json"] = JSON.parse(json);
        if (cc.args["ext_json"]['playerNum'] == undefined) {
            cc.args["ext_json"]['playerNum'] = 6;
        }
        cc.director.preloadScene("game" + cc.args["ext_json"]['playerNum']);
        Grobal.roomNum = roomid;
        cc.vv.gameNetMgr.onRoomJoin();
        var data = {
            uid: Grobal.uid,
            userName: cc.args["userName"],
            avatar: cc.args["avatar"],
            roomNum: Grobal.roomNum,
            conf: cc.args["ext"],
            inningsNum: cc.args["inningsNum"]
        };
        cc.vv.socket.send('joinRoom', data);
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=UserMgr.js.map
        