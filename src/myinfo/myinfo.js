//获取应用实例
import * as echarts from '../utils/echarts'; //引入echarts.js


var dataList = [350,600,120,800,33,500,450,500,200,1200,99,300];
var dataListAVG = [123, 435, 12, 257, 62, 45, 4657, 36, 524, 25, 99, 300];
var cateList = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

var k = 0;
var Chart = null;

var app = getApp()
var thisYear;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      lazyLoad: true // 延迟加载
    },
    canvasWidth:0,
    canvasHeight:0,
    year: 2012,
    btnLeftPath: "../images/btnLeft.png",
    btnRightPath: '../images/btnRightDisabled.png'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.echartsComponnet = this.selectComponent('#userLineChart');
    this.getData(); //获取数据

    //获取当前时间戳  
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    //获取当前时间  
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
    this.setData({
      year: Y
    });

  },

  getData: function() {
    /**
     * 此处的操作：
     * 获取数据json
     */
    //如果是第一次绘制
    if (!Chart) {
      this.init_echarts(); //初始化图表
    } else {
      this.setOption(Chart); //更新数据
    }
    /*  wx.request({
        url: url, //仅为示例，并非真实的接口地址
        data: data,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: (res) => {
          dataList = res.data;
          this.init_echarts();//初始化图表
        }
      });  */
  },


  //初始化图表
  init_echarts: function() {
    var that=this;

    // 获取设备的长宽
    let w, h;
    wx.getSystemInfo({
      success: function(res) {
        w = res.windowWidth;
        h = res.windowHeight;

        that.setData({
          canvasWidth: w*0.9,
          canvasHeight: h*0.7
        });
      },
    })


    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      Chart = echarts.init(canvas, null, {
        width: w*0.9,
        height: h*0.65
      });
      // Chart.setOption(this.getOption());
      this.setOption(Chart);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },


  setOption: function(Chart) {
    Chart.clear(); // 清除
    Chart.setOption(this.getOption()); //获取新数据
  },


  getOption: function() {
    // 指定图表的配置项和数据
    var option = {
      xAxis: {
        type: 'category',
        data: cateList,
      },
      yAxis: {
        type: 'value'
      },
      series: [{
          data: dataList,
          type: 'line'
        },
        {
          data: dataListAVG,
          type: 'line'
        }
      ]
    }
    return option;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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


  yearBtnLeft: function() {




    // 设置仅能查看5年以内的消费记录
    if (this.data.year == thisYear - 5) {
      wx.showToast({
        title: '仅能查看5年以内的消费记录',
        icon: 'none',
        duration: 2000
      })
    } else {
      if (this.data.year == thisYear - 4) {
        this.setData({
          year: this.data.year - 1,
          btnLeftPath: '../images/btnLeftDisabled.png'
        });
      } else {
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

  yearBtnRight: function() {
    if (this.data.year == thisYear) {
      // 无法查看未来的消费记录

    } else {
      if (this.data.year == thisYear - 1) {
        this.setData({
          btnRightPath: '../images/btnRightDisabled.png',
          year: this.data.year + 1
        });
      } else {
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