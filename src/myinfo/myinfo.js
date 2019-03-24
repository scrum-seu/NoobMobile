//获取应用实例
import * as echarts from '../utils/echarts'; //引入echarts.js

var linedataList = []
var linedataListAVG = []

// 雷达图类别展示列表
var raderdataCategory = ['食品', '日用品', '服饰', '玩具', '保健品', '书籍']

var i = 0;//记录当前图标显示年份的变量
var cateList = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

var k = 0;
var max_scale = 0.4;
var Chart = null;

var app = getApp()
var thisYear;
var w,h;



Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: null,
    currentTab: 0,
    // date:'2016-09',
    pickerMonth: '9',
    pickerYear: '2016',
    startDate: "2012-01-01",
    endDate: "2012-01-01",
    // 雷达图的数据初始化
    raderdataList: [0, 0, 0, 0, 0, 0],
    raderdataListAVG: [0, 0, 0, 0, 0, 0],

    datePickerPath:"../images/datePicker.png",
    ec1: {
      lazyLoad: true // 延迟加载
    },
    ec2: {
      lazyLoad: true, // 延迟加载
      // onInit: initRaderChart
    },
    canvasWidth: 0,
    canvasHeight: 0,
    year: 2012,
    month:0,
    btnLeftPath: "../images/btnLeft.png",
    btnRightPath: '../images/btnRightDisabled.png'

  },

  intervalChange(e) {
    if (e.detail['current']==0){
      //重新绘制折线图
      this.echartsComponnet = this.selectComponent('#userLineChart');
      // this.linegetData(); //一开始绘制折线图
      this.init_line_echarts();
    } else{
      //重新绘制雷达图
      this.echartsComponnet = this.selectComponent('#userRaderChart');
      this.init_rader_echarts();
    }

  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user_id: app.globalData.user_id,
    })
    this.echartsComponnet = this.selectComponent('#userLineChart');
    this.linegetData(); //一开始绘制折线图
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

    //发送请求获取当前时间的消费构成数据

  },

  bindDateChange(e) {

    console.log('picker发送选择改变，携带值为', e.detail.value.substr(0, 4));

    // var date = new Date(e.detail.value);     
    this.setData({
      date: e.detail.value,
      pickerYear: parseInt(e.detail.value.substr(0, 4)),
      pickerMonth: parseInt(e.detail.value.substr(5, 7))
    })

    // 通过获取的数据重新绘制雷达图
    this.echartsComponnet = this.selectComponent('#userRaderChart');
    this.init_rader_echarts();
  },

  linegetData: function () {
    /**
     * 此处的操作：
     * 获取数据json
     */
    var t = this;
    wx:wx.request({
      url: 'http://noob.chinanorth.cloudapp.chinacloudapi.cn:5000/get_consumption_data_info',
      data: {
        user_id: this.data.user_id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        // console.log(res.data)
        var req_data = res.data
        for (var j = 0; j < 5; ++j)
        {
          linedataList.push(req_data[thisYear - j])
        }
        linedataListAVG = req_data["average"]  // 加入平均数据
        for (var i in linedataListAVG)
        {
          linedataListAVG[i] = Math.floor(linedataListAVG[i])
        }

        //如果是第一次绘制
        if (!Chart) {
          t.init_line_echarts(); //初始化图表
        } else {
          t.linesetOption(Chart); //更新数据
        }
      },
      fail: function(res) {
        console.log(res.data)
      },
      // complete: function(res) {},
    })



  },


  //初始化图表
  init_line_echarts: function () {
    var that = this;
    //获取设备长和宽
    wx.getSystemInfo({
      success: function (res) {
        w = res.windowWidth;
        h = res.windowHeight;
        
        that.setData({
          canvasWidth: w,
          canvasHeight: h * 0.57
        })
      }
    })



    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      Chart = echarts.init(canvas, null, {
        width: w,
        height: h * 0.65
      });
      // Chart.setOption(this.getOption());
      this.linesetOption(Chart);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },


  init_rader_echarts: function () {
    var that = this;
    //获取设备长和宽
    wx.getSystemInfo({
      success: function (res) {
        w = res.windowWidth;
        h = res.windowHeight;

        // that.setData({
        //   canvasWidth: w,
        //   // canvasHeight: h * 0.57
        //   canvasHeight: h
        // })
      }
    })

    // 向服务器发送请求获取数据
    wx: wx.request({
      url: 'http://noob.chinanorth.cloudapp.chinacloudapi.cn:5000/get_consumption_category_info',
      data: {
        user_id: that.data.user_id,
        year: that.data.pickerYear,
        month: that.data.pickerMonth,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        // console.log(res)
        var req_data = res.data
        var temp_raderdataList = []
        var max = 0  // 记录最大值，进行自适应改变max_scale显示规模
        for (var i = 0; i < raderdataCategory.length; ++i) {
          temp_raderdataList.push(req_data[raderdataCategory[i]])
          if (temp_raderdataList[i] > max)
          {
            max = temp_raderdataList[i]
          }
        }
        // 获取商品种类平均比重
        that.setData({
          raderdataList: temp_raderdataList,
          raderdataListAVG: req_data["average"],
        })
        // 遍历所有的类别占比，寻找最大的占比，实现自适应雷达图规模
        for (var i = 0; i < that.data.raderdataListAVG.length; ++i)
        {
          if (that.data.raderdataListAVG[i] > max)
          {
            max = that.data.raderdataListAVG[i]
          }
        }
        max_scale = max + 0.1  // 自适应
      },
      fail: function (res) {
        var temp_raderdataList = []
        var temp_raderdataListAVG = []
        for (var i = 0; i < raderdataCategory.length; ++i) {
          temp_raderdataList.push(0)
          temp_raderdataListAVG.push(0)
        }
        // 获取商品种类失败，全展示为0
        that.setData({
          raderdataList: temp_raderdataList,
          raderdataListAVG: temp_raderdataListAVG,
        })
        console.log("获取数据失败!")
      },
      complete: function(res) {
        that.echartsComponnet.init((canvas, width, height) => {
          // 初始化图表
          Chart = echarts.init(canvas, null, {
            width: w,
            height: h * 0.54
            // height: h
          });
          // Chart.setOption(this.getOption());
          that.radersetOption(Chart);
          // 注意这里一定要返回 chart 实例，否则会影响事件处理等
          return Chart;
        });
      },
    })
  },

  linesetOption: function (Chart) {
    Chart.clear(); // 清除
    Chart.setOption(this.linegetOption()); //获取新数据
  },

  radersetOption: function (Chart) {
    Chart.clear(); // 清除
    Chart.setOption(this.radergetOption()); //获取新数据
  },


  linegetOption: function () {
    // 指定图表的配置项和数据
    var option = {
      xAxis: {
        type: 'category',
        data: cateList,
        boundaryGap: false,
        axisLabel: {
          fontSize: 11
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLabel: {
          fontSize: 11,
          inside: true, //使标签值默认朝内，突出图像主体
          rotate: 30,
          color: function (value, index) {
            return 'grey';
          }

        }
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      legend: {
        data: ['今年', '总平均'],
        top: 30,
        right: 50,
        backgroundColor: 'lightblue',
      },
      grid: {
        containLabel: true,
        left: 30,
        right: 30
      },
      series: [{
        name: '今年',
        type: 'line',
        smooth: false,
        data: linedataList[i]
      }, {
        name: '总平均',
        type: 'line',
        smooth: false,
        data: linedataListAVG
      }],
    }
    return option;
  },

  radergetOption: function () {

    // 指定图表的配置项和数据
    var option = {
      backgroundColor: "#ffffff",
      color: ["#37A2DA", "#FF9F7F"],
      tooltip: {},
      xAxis: {
        show: false
      },
      yAxis: {
        show: false
      },
      legend: {
        data: ['当月', '总平均'],
        top: 30,
        right: 25,
        backgroundColor: 'lightblue',
      },
      tooltip: {
        show: false,
        // trigger: 'axis'
      },
      radar: {
        // shape: 'circle',
        indicator: [{
          name: raderdataCategory[0],
          max: max_scale
        },
        {
          name: raderdataCategory[1],
          max: max_scale
        },
        {
          name: raderdataCategory[2],
          max: max_scale
        },
        {
          name: raderdataCategory[3],
          max: max_scale
        },
        {
          name: raderdataCategory[4],
          max: max_scale
        },
        {
          name: raderdataCategory[5],
          max: max_scale
        }
        ]
      },
      series: [{
        type: 'radar',
        data: [{
          value: this.data.raderdataList,
          // value: [0.123, 0.435, 0.12, 0.257, 0.62, 0.45],
          name: '当月'
        },
        {
          // value: raderdataListAVG[this.data.pickerMonth-1],
          value: this.data.raderdataListAVG,
          // value: [0.123, 0.435, 0.12, 0.257, 0.62, 0.45],
          name: '总平均'
        }
        ]
      }]
    };

    return option;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

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
    if (this.data.year == thisYear - 5) {
      wx.showToast({
        title: '仅能查看5年以内的消费记录',
        icon: 'none',
        duration: 2000
      })
    } else {
      i++;

      this.init_line_echarts(); //初始化图表

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

  yearBtnRight: function () {
    if (this.data.year == thisYear) {
      // 无法查看未来的消费记录

    } else {
      i--;

      this.init_line_echarts(); //初始化图表

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