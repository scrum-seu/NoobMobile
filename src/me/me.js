// src/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    user_id: "10",
    //分别为天数，次数，和金额
    days: 256,
    times: 13,
    money: 1366.8
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

    //获取用户购物信息
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
          console.log('弹框后点取消')
        }
      }
    })
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

  },

  showShoppingHistory: function () {
    // 切换到历史记录页面
    wx.navigateTo({
      url: '../history/history'
    })
  }
})