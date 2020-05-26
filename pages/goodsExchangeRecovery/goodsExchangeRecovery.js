let wxparse = require("../../lib/wxParse/wxParse.js");
Page({
    data: {
        orderInfo: {
            timeOOO: '2019-12-11 12:12:12',
            nameooo: '商超卡',
            companyooo: '物美',
            statusooo: '1',
            prizeooo: '100元',
            backprizeoo: '10元',
            id000: '100',

            imgUrls: [
                'https://oimagec3.ydstatic.com/image?id=1298949196441763131&product=xue',
                'http://static.fdc.com.cn/avatar/usercenter/5996999fa093c04d4b4dbaf1_162.jpg']
        },
        bandan:false,
        checkedType:1,
        images:[],
        sss: "你好<br/>nihao, <br/><br/><br/><br/><br/><br/><br/>这个是测试<br/><br/>你同意了吗<br/><br/><br/>hehe<b>n你好啊，我加粗了kk</b >",
    },
    onLoad: function (options) {
        var that = this
        wxparse.wxParse('dddd', 'html', this.data.sss, this, 5);
    },

    chooseImage(e) {
        let that=this
        wx.chooseImage({
            sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
            sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
            success: res => {
                console.log(res.tempFilePaths)
                console.log(that.data)
                const images = that.data.images.concat(res.tempFilePaths)
                // 限制最多只能留下3张照片
                const images1 = images.length <= 3 ? images : images.slice(0, 3)
                this.setData({
                    images: images1
                })
            }
        })
    },
    removeImage(e) {
        var that = this;
        var images = that.data.images;
        // 获取要删除的第几张图片的下标
        const idx = e.currentTarget.dataset.idx
        // splice  第一个参数是下表值  第二个参数是删除的数量
        images.splice(idx,1)
        this.setData({
            images: images
        })
    },

    handleImagePreview(e) {
        const idx = e.target.dataset.idx
        const images = this.data.images
        wx.previewImage({
            current: images[idx],  //当前预览的图片
            urls: images,  //所有要预览的图片
        })

    },
    //马上兑换
    goExchange: function () {

    },
    //报单
    gobaodan: function () {

    },
    radioChange:function(e){
        console.log('radio发生change事件，携带value值为：', e.detail.value)
        this.setData({
            checkedType: e.detail.value
        })
    }

})