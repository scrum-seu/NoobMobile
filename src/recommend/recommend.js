//获取应用实例
const app = getApp()

var image_url = "http://images.chinanorth.cloudapp.chinacloudapi.cn:8088/"
var image_url_suffix = ".jpg"

Page({
  /**
    * 页面的初始数据
    */
  data: {
    windowHeight: wx.getSystemInfoSync().windowHeight,  // 获取当前窗口的高度
    nickname: "ren",
    gender: 0,
    proList: [
      // {
      //   proUrl: "https://github.com/scrum-seu/NoobMobile/blob/master/src/images/home_ico.jpg?raw=true",
      //   proTitle: "麦糯糯浓醇巧克力味蛋糕卷",
      //   proDec: "麦糯糯浓醇巧克力味蛋糕卷",
      //   proPrice: "26.80",
      // },
      // {
      //   proUrl: "https://github.com/scrum-seu/NoobMobile/blob/master/src/images/plus_ico.png?raw=true",
      //   proTitle: "巧克力味蛋糕卷",
      //   proDec: "巧克力味蛋糕卷",
      //   proPrice: "6.80",
      // },
      // {
      //   proUrl: "https://github.com/andelf/fuck12306/blob/master/screenshots/pic1.jpg?raw=true",
      //   proTitle: "巧克力",
      //   proDec: "巧克力",
      //   proPrice: "3.80",
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx:wx.request({
      url: 'http://noob.chinanorth.cloudapp.chinacloudapi.cn:5000/recommend',
      data: {
        user_id: app.globalData.user_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        // console.log(res.data["recommends"])
        var data_list = res.data["recommends"]
        var res_list = []
        for (var i = 0; i <data_list.length; ++i)
        {
          var temp_dict = {}
          temp_dict["proUrl"] = image_url + data_list[i]["good_id"] + image_url_suffix
          console.log(temp_dict["proUrl"])
          temp_dict["proTitle"] = data_list[i]["name"]
          temp_dict["proDec"] = data_list[i]["name"]
          temp_dict["proPrice"] = data_list[i]["price"]
          res_list.push(temp_dict)
        }
        that.setData({
          proList: res_list,
        })
      },
      fail: function(res) {},
      complete: function(res) {

      },
    })
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
      // giftNo: this.data.proList[curIndex].id
    })
  },

})