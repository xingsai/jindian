var app = getApp()
var http = require('../../utils/http.js')
var protocol = require('../../utils/protocol.js')
Page({
  data:{ 
    hideHeader: true,
    hideBottom: true,
    refreshTime: '', // 刷新的时间 
    contentlist: [], // 列表显示的数据源
    allPages: '',    // 总页数
    currentPage: 1,  // 当前页数  默认是1
    loadMoreData: '加载更多……' ,
    statusType: ["未完成", "已完成"],
    currentType:0,
    curPage:1,
    pageSize:20,
    hasData:false,
    appId:'',
    scrollHeight:'100px',
    imgUrls:'./../../static/images/eta-exch.png'//'./../../image/banner.png',
  },
  gotonewsdetail : function (e) {
    var orderId = e.currentTarget.dataset.taskmessid;
    wx.navigateTo({
      url: "/pages/orderdetail/index?id=" + orderId
    })
  },
  onLoad:function(data){
  console.log(app)
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成

  },
 
  onShow:function(){
    // 获取订单列表
    wx.showLoading();
    var that = this;

     this.getData();
      //获取页面信息   重新设置宽高；  120是屏幕高度减固定的120rpx  之后获取的高度
    wx.getSystemInfo({
         success: function(res) {
         that.setData({
             scrollHeight:(res.windowHeight - res.windowWidth / 750 * 276)+"px"
         })
       }
     })    
  },
    modelHide:function(){
        this.setData({
            hasData:false
        })
    },
    gominiProgram:function(){
      if(this.data.appId==''){
          this.modelHide()
      }else{
          this.openMiniProgram(this.data.appId);
      }
    },
    //根据appId唤起小程序
    openMiniProgram: function (appId) {
        this.setData({
            hasData:false
        })
        let self = this;
        wx.navigateToMiniProgram({
            appId: appId,
            path: 'pages/index/index',
            extraData: {},
            envVersion: 'release',
            success(res) {
                // 打开成功
                
            },
            fail(res){
              //打开失败

            }
        })
    },
     // 上拉加载更多
  loadMore: function(){
    var self = this;
    // 当前页是最后一页
    if (self.data.currentPage == self.data.allPages){
      self.setData({
        loadMoreData: '已经到顶'
      })
      return;
    }
    setTimeout(function(){
        // 显示加载图标  
      wx.showLoading({  
        title: '玩命加载中',  
      })  
      var tempCurrentPage = self.data.currentPage;
      tempCurrentPage = tempCurrentPage + 1;
      self.setData({
        currentPage: tempCurrentPage,
        hideBottom: false  
      })
      self.getData();  
    },100);
  },
  // 下拉刷新
  refresh: function(e){
    var self = this;
    setTimeout(function(){
      // 显示加载图标  
    wx.showLoading({  
      title: '玩命加载中',  
    })  
      var date = new Date();
      self.setData({        
        currentPage: 1,
        refreshTime: date.toLocaleTimeString(),
        hideHeader: false
      })
      self.getData();
    },100);
  },
    // 获取数据  pageIndex：页码参数
  getData: function(){
    var self = this;
    var pageIndex = self.data.currentPage;
     var param = new Object();
        // param["user_seq"] = AppConst.getUserSeq();
        param["query_type"] = "List";
        param["pPage"] = 1;
        param["pSize"] = 80;

       /* param["pPage"] = self.data.currentPage;
        param["pSize"] = 8;*/
        let jsonData = protocol.getJsonParams(protocol.RecommendMerchant, param);
        http.ajax('', jsonData, true, (data) => {
          //this.merchantLists = data.CooperationSeller;
          var dataModel = data.CooperationSeller;
            if(pageIndex == 1){ // 下拉刷新
              self.setData({
                allPages: '',
                orderList:dataModel,
                hideHeader: true
              })
            }else{ // 加载更多
              var order = self.data.orderList;
              order = order.concat(dataModel);
              self.setData({
                allPages: '',
                orderList:order,
                hideBottom: true
              })

            }
        })
/*    wx.request({
       url: 'https://api.it120.cc/tz/shop/goods/list',
      data: {
        categoryId: 0,
        nameLike: '',
        page: this.data.curPage,
        pageSize: this.data.pageSize
      },
      success: function(res){
         // 隐藏加载框  
        wx.hideLoading();  
        console.log(res.data.data)
          var dataModel = res.data.data;
            if(pageIndex == 1){ // 下拉刷新
              self.setData({
                allPages: '',
                orderList:dataModel,
                hideHeader: true
              })
            }else{ // 加载更多
              var order = self.data.orderList;
              order = order.concat(res.data.data);
              self.setData({
                allPages: '',
                orderList:order,
                hideBottom: true
              })

            }
          
      },
      fail: function(){

      }
    })*/
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
 
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
 
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
   
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  
  }
})