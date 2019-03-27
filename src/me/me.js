// src/me/me.js



var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: null,
    userInfo: {},
    //分别为天数，次数，和金额
    days: null,
    times: null,
    money: null,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取微信头像
    // app.globalData.userInfo;
    var that = this;
    wx.getUserInfo({
      success(res) {
        that.setData({
          userInfo: {
            avatarUrl: res.userInfo.avatarUrl,
            nickName: res.userInfo.nickName
          }
        })
      }
    })
    this.setData({
      user_id: app.globalData.user_id,
    })

    //获取用户购物信息
    this.usergetData();
  },

  showGoodsInfo: function(){
    /**
     * 此处的操作：
     * 跳转到我的喜欢的商品页面
     */
    wx.navigateTo({
      url: '../recommend/recommend'
    })
  },

  usergetData: function () {
    /**
     * 此处的操作：
     * 获取数据json
     */
    var t = this;
    wx: wx.request({
      url: 'http://noob.chinanorth.cloudapp.chinacloudapi.cn:5000/get_general_consumption_info',
      data: {
        user_id: this.data.user_id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        // console.log(res.data)
        var req_data = res.data
        t.setData({
          days: req_data['days'],
          times: req_data['times'],
          money:req_data['money']
        })

      },
      fail: function (res) {
        console.log(res.data)
      },
      // complete: function(res) {},
    })



  },

  logoutConfirm: function() {
    // 提示确认退出对话框
    wx.showModal({
      title: '提示',
      content: '确认退出登录吗？',
      success: function(res) {
        if (res.confirm) {
          //确认退出切换页面到主页
          wx.reLaunch({
            url: '../login/login'
          })
        } else {
          // console.log('弹框后点取消')
        }
      }
    })
  },


  shareBtnPressed: function() {
    // 用户点击分享按钮
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  showUserInfo: function(){
    // 切换到完善信息页面
    wx.navigateTo({
      url: '../perfectInfo/perfectInfo'
    })
  },

  showShoppingHistory: function () {
    // 切换到历史记录页面
    wx.navigateTo({
      url: '../history/history'
    })
  }
})