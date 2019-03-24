// 完善信息
var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  /**
   * 页面的初始数据
   */
  data: {
    show: false,  //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: [
      "教师",
      "IT",
      "医生",
      "销售",
      "其他",
    ],  //下拉列表的数据
    // index: 0,  //选择的下拉列表下标
    userInfo: {},
    name: app.globalData.user_info["name"],
    age: app.globalData.user_info["age"],
    phone: app.globalData.user_info["phone"],
    occupation: app.globalData.user_info["occupation"],

    verified_name: null,
    verified_age: null,
    verified_phone: null,
    verified_all: null,

    name_judge: false,
    age_judeg: false,
    phone_judge: false,
  },

  /**
   * name获取
   */
  listenName: function (e) {
    var tmp_name = e.detail.value
    if (tmp_name == null || tmp_name == "") {
      this.setData({
        name: app.globalData.user_info["name"],
        verified_name: "名字不能为空，请重新输入！"
      })
    }
    else {
      this.setData({
        verified_name: null,
        name: tmp_name,
        name_judge: true,
      })
    }
  },


  /**
   * age获取
   */
  listenAge: function (e) {
    var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
    var tmp_age = e.detail.value
    if (!re.test(tmp_age) || tmp_age < 1 || tmp_age > 120) {
      this.setData({
        age: app.globalData.user_info["age"],
        verified_age: "年龄输入不正确，请重新输入！"
      })
    }
    else {
      this.setData({
        verified_age: null,
        age: tmp_age,
        age_judge: true,
      })
    }
  },


  /**
  * phone获取
  */
  listenPhone: function (e) {
    var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
    var tmp_phone = e.detail.value
    if (!re.test(tmp_phone)) {
      this.setData({
        phone: app.globalData.user_info["phone"],
        verified_phone: "手机号输入不正确，请重新输入！"
      })
    }
    else {
      this.setData({
        verified_phone: null,
        phone: tmp_phone,
        phone_judge: true,
      })
    }
  },


  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },

  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      occupation: this.data.selectData[Index],
      show: !this.data.show
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户信息
    this.setData({
      name: app.globalData.user_info["name"],
      age: app.globalData.user_info["age"],
      phone: app.globalData.user_info["phone"],
      occupation: app.globalData.user_info["occupation"],
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

  /**
  * 提交完善信息
  */
  logoutConfirm: function () {
    var that = this
    if (that.data.age_judeg && that.data.name_judge && that.data.phone_judge ||
      that.data.name || that.data.age || that.data.phone) {
      app.globalData.user_info["name"] = that.data.name
      app.globalData.user_info["age"] = that.data.age
      app.globalData.user_info["phone"] = that.data.phone
      app.globalData.user_info["occupation"] = that.data.occupation
      wx: wx.request({
        url: 'http://noob.chinanorth.cloudapp.chinacloudapi.cn:5000/perfect_info',
        data: {
          user_id: app.globalData.user_id,
          name: app.globalData.user_info["name"],
          age: app.globalData.user_info["age"],
          occupation: app.globalData.user_info["occupation"],
          phone_num: app.globalData.user_info["phone"],
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          if (res.data["success"]) {
            that.setData({
              verified_all: "完善成功！"
            })
          }
          else {
            that.setData({
              verified_all: "网络错误，完善失败！"
            })
          }
        },
        fail: function (res) {
          that.setData({
            verified_all: "网络错误，完善失败！"
          })
        },
        complete: function (res) { },
      })
    }
    else {
      that.setData({
        verified_all: "请重新检查录入信息！"
      })
    }
  }
})