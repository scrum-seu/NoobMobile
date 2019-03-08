//获取应用实例
import chartWrap from '../canvas/chartWrap'
import getConfig from './getConfig'
var app = getApp()


var thisYear;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: 2012,
    btnLeftPath: "../images/btnLeft.png",
    btnRightPath: '../images/btnRightDisabled.png'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取当前时间戳  
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    //获取当前时间  
    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    thisYear=Y;
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时  
    var h = date.getHours();
    //分  
    var m = date.getMinutes();
    //秒  
    var s = date.getSeconds();

    console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s);
    this.setData({
      year: Y
    });

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


  yearBtnLeft: function () {




    // 设置仅能查看5年以内的消费记录
    if (this.data.year == thisYear-5){
      wx.showToast({
        title: '仅能查看5年以内的消费记录',
        icon: 'none',
        duration: 2000
      })
    }else{
      if (this.data.year == thisYear - 4){
        this.setData({
          year: this.data.year - 1,
          btnLeftPath:'../images/btnLeftDisabled.png'
        });
      }else{
        this.setData({
          year: this.data.year - 1,
        });
      }

      if (this.data.year < thisYear) {
        this.setData({
          btnRightPath: '../images/btnRight.png'
        });
      }

      wx.showToast({
        title: this.data.year + '年',
        icon: 'none',
        duration: 2000
      })

    }


  },

  yearBtnRight: function () {
    if (this.data.year==thisYear){
        // 无法查看未来的消费记录

    }else{
      if (this.data.year == thisYear-1){
        this.setData({
          btnRightPath: '../images/btnRightDisabled.png',
          year: this.data.year + 1
        });
      }else{
        this.setData({
          btnRightPath: '../images/btnRight.png',
          year: this.data.year + 1
        });
      }

      if (this.data.year > thisYear - 5) {
        this.setData({
          btnLeftPath: '../images/btnLeft.png',
        });
      }

      wx.showToast({
        title: this.data.year + '年',
        icon: 'none',
        duration: 2000
      });
    }

  }

})