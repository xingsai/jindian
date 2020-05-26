import util from "./util";

module.exports =  {
  getJsonParamsBeforeLogin: function (addr, param) {
    let obj = {
      "request": {
        "call_uuid": "",
        "back": "j",
        "client": {
          "remote": {
            "name": "",
            "date": ""
          },
          "route": {
            "code": "",
            "note": "",
            "ip": "",
            "date": ""
          }
        },
        "security": {
          "session": {
            "authorize_object_cv": "23",
            "tz_id": ''//util.getFormatTimeZone()
          }
        },
        "service": {
          "bl": addr.bl,
          "function": addr.func
        },
        "parameters": {
          "parameter": param
        }
      }
    };
    return JSON.stringify(obj);
  },
  getJsonParams: function (addr, param) {
    let obj = {
      "request": {
        "call_uuid":'',// util.getUUID(),
        "back": "j",
        "client": {
          "remote": {
            "name": "",
            "date": ""
          },
          "route": {
            "code": "",
            "note": "",
            "ip": "",
            "date": ""
          }
        },
        "security": {
          "session": {
            "token":wx.getStorageSync('token')?wx.getStorageSync('token'):'',
            "authorize_object_cv": "23",
            "dev_unique":'',
            "tz_id":  '',
          }
        },
        "service": {
          "bl": addr.bl,
          "function": addr.func
        },
        "parameters": {
          "parameter": param
        }
      }
    };
    return JSON.stringify(obj);
  },
   //注册发送验证码
    Register_SendCode: {
      bl: "gp.user.bl.RegisterBL",
      func: "send_reg_sms"
    },
    //注册--注册之后免登录
    Register: {
      bl: "gp.user.bl.RegisterBL",
      func: "user_register2"
    },
    //获取推荐商家
    RecommendMerchant: {
      bl: "gp.jd.bl.HDProgramBL",
      func: "queryCooperationSeller"
    },
    //获取信息（注册，登录 中的平台码，国家编码，登录方式码,等数据）
    getRegisterAndLoginInfo:{
        bl: "gp.apiserver.bl.ApiServerBL",
        func: "getAllAppCode"
    },



    //获取积分管家列表
    getIntegralManageList:{
        bl: "gp.jd.bl.HDProgramBL",
        func: "queryUserPointsList"
    },
    //获取积分数量
    queryUserPointAmount:{
        bl: "gp.jd.bl.HDProgramBL",
        func: "queryUserPointAmount"
    },
    //发送验证码（最新）
    newSendSms:{
        bl: "gp.jd.bl.HDProgramBL",
        func: "sendSms"
    },
    //用户登录（微信和账号绑定）
    userLogingo:{
        bl: "gp.jd.bl.HDProgramBL",
        func: "userLogin"
    },
    //验证code 判断是否登录
    checkTokenJudge:{
        bl: "gp.jd.bl.HDProgramBL",
        func: "checkToken"
    },
    //code 和用户绑定
    localBind:{
        bl: "gp.jd.bl.BaseDispatcherBL",
        func: "receive"
    },

}



