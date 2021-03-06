//获取应用实例
const app = getApp()


Page({
  /**
    * 页面的初始数据
    */
  data: {
    windowHeight: wx.getSystemInfoSync().windowHeight,  // 获取当前窗口的高度
    nickname: "ren",
    gender: 0,
    proList: [
      {
        proUrl: "https://github.com/scrum-seu/NoobMobile/blob/master/src/images/home_ico.jpg?raw=true",
        proTitle: "麦糯糯浓醇巧克力味蛋糕卷",
        proDec: "麦糯糯浓醇巧克力味蛋糕卷",
        proPrice: "26.80",
      },
      {
        proUrl: "https://github.com/scrum-seu/NoobMobile/blob/master/src/images/plus_ico.png?raw=true",
        proTitle: "巧克力味蛋糕卷",
        proDec: "巧克力味蛋糕卷",
        proPrice: "6.80",
      },
      {
        proUrl: "https://github.com/andelf/fuck12306/blob/master/screenshots/pic1.jpg?raw=true",
        proTitle: "巧克力",
        proDec: "巧克力",
        proPrice: "3.80",
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userinfo)
    var userinfo = JSON.parse(app.globalData.userinfo)
    this.setData({ nickname: userinfo["name"], gender: userinfo["gender"] })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  //滑动获取选中商品
  getSelectItem: function (e) {
    var that = this;
    var itemWidth = e.detail.scrollWidth / that.data.proList.length /*每个商品的宽度*/
    var scrollLeft = e.detail.scrollLeft //滚动宽度
    /*通过Math.round方法对滚动大于一半的位置进行进位*/
    var curIndex = Math.round(scrollLeft / itemWidth) 
    for (var i = 0, len = that.data.proList.length; i < len; ++i) {
      that.data.proList[i].selected = false
    }
    that.data.proList[curIndex].selected = true
    that.setData({
      proList: that.data.proList,
      giftNo: this.data.proList[curIndex].id
    })
  },

})