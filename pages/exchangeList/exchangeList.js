

Page({
  data:{
    orderList: [
     /* {
        timeOOO:'2019-12-11 12:12:12',
        nameooo:'商超卡',
        companyooo:'物美',
        statusooo:'1',
        prizeooo:'100元',
        backprizeoo:'100元',
        id000:'100元',
      },
      {
        timeOOO:'2019-12-11 12:12:12',
        nameooo:'商超卡',
        companyooo:'物美',
        statusooo:'3',
        prizeooo:'100元',
        backprizeoo:'100元',
        id000:'100元',
      },
      {
        timeOOO:'2019-12-11 12:12:12',
        nameooo:'商超卡',
        companyooo:'物美',
        statusooo:'2',
        prizeooo:'100元',
        backprizeoo:'100元',
        id000:'100元',
      }*/
    ],
    person_history: [],
    tabsList: [
      {id:0,name:'全部'},
      {id:1,name:'处理中'},
      {id:2,name:'成功'},
      {id:3,name:'失败'},
    ],
    show: 0,
    nullTip: {tipText:'暂时没有订单'}
  },
  onLoad:function(options){
    var that = this

    wx.getStorage({
      key: 'person_history',
      success: function(res){

        that.setData({
          person_history: res.data
        })
      }
    })
    wx.stopPullDownRefresh()
  },
  onPullDownRefresh: function() {
    this.setData({
      orderList: [],
      person_history: []
    })
    this.onLoad()
  },
  //tab切换
  changeViewType: function(e) {
    var data = e.currentTarget.dataset
    this.setData({
      show: data.type,
    })
  },
  //去订单详情
  goOrderDetail: function(e) {
    var data = e.currentTarget.dataset
    wx.redirectTo({
      url: "../orderDetail/orderDetail?id=" + data.id
    })
  },
})