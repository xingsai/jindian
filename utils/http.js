//显示提示框
function showToast(text) {
 wx.showToast({
      title: text,
      icon: 'none',
     duration: 1000
    })
}
//loading 显示
function showLoading() {
   wx.showLoading()
}
//loading 隐藏
function hideLoading() {
    wx.hideLoading()
}
//封装 ajax
module.exports =  {
  ajax:function(url, data, loading, success) {
    console.log("请求参数:\n" + data);
    //如果需要loading则显示
    if (loading) {
      showLoading();
    }
    let self = this;
      console.log('envVersion', __wxConfig.envVersion);
      let requestUrl=''
       let version = __wxConfig.envVersion;
       switch (version)
       {
           case 'develop':
               console.log('https://测试版环境域名')
               requestUrl='https://test.unitepoints.com:1028/PS'
               break;
           case 'trial':
               console.log('https://体验版环境域名')
               requestUrl='https://test.unitepoints.com:1028/PS'
               break;
           case 'release':
               console.log('https://线上环境域名')
               requestUrl='https://ccbapi.unitepoints.com:444/PS'
               break;
           default:
               console.log('https://测试版环境域名')
               requestUrl='https://ccbapi.unitepoints.com:444/PS'
       }


    return  wx.request({
      /*url: 'https://test.unitepoints.com:1028/PS',// https://test.unitepoints.com:444/PS
      url: 'https://test.unitepoints.com:1028/PS',// https://test.unitepoints.com:444/PS
      url: 'https://test.unitepoints.com:1028/PS',// https://api.unitepoints.com/PS*/
      url: requestUrl,// https://test.unitepoints.com:444/PS http://test.unitepoints.com
      data:data,
      method:'POST',
      success: function (res) {
          //如果需要loading则显示
          if (loading) {
              hideLoading();
          }
        console.log("返回数据,成功:\n" + JSON.stringify(res.data));
        let data=res.data
        if (data.return.head.result === 'failure') {
          var errCode = data.return.head.error_code;
          if (errCode === '0010016' || errCode === '0010017' || errCode === '0010018' || errCode === '0010019' || errCode === '0010020') {
            showToast("登录过期,请重新登录");
          } else {
            showToast(data.return.head.error_reason);
            if (data.return.head.error_code === '0020004') {
              //用户已注册
              success("0020004");
            } else if (data.return.head.error_code === '0010004') {
              //用户未注册
              success("0010004");
            }
          }
        } else {
          //token可用,返回数据
          success(data.return.data);
        }
      },
      fail: function (err) {
        console.log("返回数据,失败:\n" + JSON.stringify(err));
        showToast('网络异常');
        hideLoading();
      }
  })
 }
}
