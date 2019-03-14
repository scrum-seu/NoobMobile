// src/history/history.js

var app = getApp()
var thisYear;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerMonth: '九',
    pickerYear: '2016',
    startDate: "2012-01-01",
    endDate: "2012-01-01",
    datePickerPath: "../images/datePicker.png",
    listData: [{
        "time": "13号18:31",
        "name": "丹顿公子正装西裤男士直筒修身商务休闲裤",
        "num": "1",
        "count": "139¥"
      },
      {
        "time": "13号18:31",
        "name": "丹顿公子正装西裤男士直筒修身商务休闲裤",
        "num": "1",
        "count": "139¥"
      }, {
        "time": "13号18:31",
        "name": "丹顿公子正装西裤男士直筒修身商务休闲裤",
        "num": "1",
        "count": "139¥"
      }, {
        "time": "13号18:31",
        "name": "丹顿公子正装西裤男士直筒修身商务休闲裤",
        "num": "1",
        "count": "139¥"
      }, {
        "time": "13号18:31",
        "name": "丹顿公子正装西裤男士直筒修身商务休闲裤",
        "num": "1",
        "count": "139¥"
      }, {
        "time": "13号18:31",
        "name": "丹顿公子正装西裤男士直筒修身商务休闲裤",
        "num": "1",
        "count": "139¥"
      }, {
        "time": "13号18:31",
        "name": "丹顿公子正装西裤男士直筒修身商务休闲裤",
        "num": "1",
        "count": "139¥"
      }, {
        "time": "13号18:31",
        "name": "丹顿公子正装西裤男士直筒修身商务休闲裤",
        "num": "1",
        "count": "139¥"
      }, {
        "time": "13号18:31",
        "name": "丹顿公子正装西裤男士直筒修身商务休闲裤",
        "num": "1",
        "count": "139¥"
      }, {
        "time": "13号18:31",
        "name": "丹顿公子正装西裤男士直筒修身商务休闲裤",
        "num": "1",
        "count": "139¥"
      }, {
        "time": "13号18:31",
        "name": "丹顿公子正装西裤男士直筒修身商务休闲裤",
        "num": "1",
        "count": "139¥"
      }, {
        "time": "13号18:31",
        "name": "丹顿公子正装西裤男士直筒修身商务休闲裤",
        "num": "1",
        "count": "139¥"
      }, {
        "time": "13号18:31",
        "name": "丹顿公子正装西裤男士直筒修身商务休闲裤",
        "num": "1",
        "count": "139¥"
      }, {
        "time": "13号18:31",
        "name": "丹顿公子正装西裤男士直筒修身商务休闲裤",
        "num": "1",
        "count": "139¥"
      }, {
        "time": "13号18:31",
        "name": "丹顿公子正装西裤男士直筒修身商务休闲裤",
        "num": "1",
        "count": "139¥"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取当前时间戳  
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    //获取当前时间 ，设置日期选择器的开始和结束日期
    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    thisYear = Y;
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
    console.log((Y - 5).toString() + "-01-01");
    console.log(Y.toString() + "-12-01");

    this.setData({
      year: Y,
      pickerYear: Y,
      pickerMonth: parseInt(M.toString()),
      startDate: (Y - 5).toString() + "-01-01",
      endDate: Y.toString() + "-12-01",
    });
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


  bindDateChange(e) {

    console.log('picker发送选择改变，携带值为', e.detail.value.substr(0, 4));

    // var date = new Date(e.detail.value);     
    this.setData({
      date: e.detail.value,
      pickerYear: parseInt(e.detail.value.substr(0, 4)),
      pickerMonth: parseInt(e.detail.value.substr(5, 7))
    })
    // 向服务器发送请求获取购买历史记录

  }
})