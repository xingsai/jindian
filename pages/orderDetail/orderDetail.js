

Page({
  data:{
    orderInfo:  {
        timeOOO:'2019-12-11 12:12:12',
        nameooo:'商超卡',
        companyooo:'物美',
        statusooo:'1',
        prizeooo:'100元',
        backprizeoo:'10元',
        id000:'100',
        imgUrls:'https://oimagec3.ydstatic.com/image?id=1298949196441763131&product=xue '
      },
  },
  onLoad:function(options){
    console.log(11111)
    console.log(options)
    var that = this


  },

  previewImage: function (e) {
    var current = e.target.dataset.src;
    console.log(current)
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: [current] // 需要预览的图片http链接列表
    })
  } ,


})