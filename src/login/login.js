//获取应用实例
const app = getApp()

var bool_detected = 0;
// var bool_login = 0;
var new_face = "";


Page({
  data: {
    // 弹出用户协议动画
    chooseSize: false,
    animationData: {},

    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    motto: 'Welcome to Noob',
    ifLoginDisable: true,
    ifFillDisable: true,
    ifCheckDisable: false,
    btnText: '识别',
    userRealInfo: {
      imageUrl: '../images/face_pic.png',
      msg: "请识别脸部！"
    },
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

  },

  // // 完善信息按钮函数
  // fill_info: function () {
  //   //判断用户是否已经扫描
  //   if (bool_detected == 1) {
  //     wx.showToast({
  //       title: '请完善/修改个人信息',
  //       icon: 'none',
  //       duration: 4000
  //     })
  //   } else {
  //     wx.showToast({
  //       title: '请先识别脸部',
  //       icon: 'none',
  //       duration: 4000
  //     })
  //   }
  // },

  //显示用户协议方法
  showAgreement: function() {
    wx.showToast({
      title: '显示用户协议',
      icon: 'none',
      duration: 4000
    })
  },

  getUserInfo: function(e) {
    console.log(e.detail.errMsg);
    // 如果已经识别了人脸则点击登录进行跳转
    if (bool_detected == 1) {
      wx.switchTab({
        url: '/src/recommend/recommend'
      })
    }


    // 判断用户是否同意授权
    if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
      // 用户同意了再进行人脸识别

      wx.showToast({
        title: '请进行微信授权！',
        icon: 'none',
        duration: 4000
      })
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        hasUserInfo: false
      })
    } else {
      this.showCam();
    }
  },

  //同意用户协议方法
  checkboxChange(e) {
    if (e.detail.value.length == 1) {
      this.setData({
        ifLoginDisable: false
      })
    } else {
      this.setData({
        ifLoginDisable: true
      })
    }
  },



  //拍照上传函数
  showCam: function() {
    var that = this
    if (bool_detected == 1) {
      // 已经跳转过，什么也不做。为退出登录清空数据
      bool_detected = 0;
    } else {
      wx.chooseImage({
        count: 1, // 最多可以选择的图片张数，默认9
        sourceType: ['camera'], // album 从相册选图，camera 使用相机，默认二者都有，改为只能拍照取人脸
        success: function(res) {
          //console.log(res);
          var tempFilePaths = res.tempFilePaths // 图片的本地临时文件路径列表
          // app.globalData.userImage = tempFilePaths[0];//-------------------------
          that.setData({
            userRealInfo: {
              //填充人脸识别界面的图片
              imageUrl: tempFilePaths[0],
              msg: '人脸识别中...'
            }
          })
          wx.showToast({
            title: '识别中，请稍候',
            icon: 'loading',
            duration: 5000
          })

          wx.uploadFile({
            url: 'http://noob.chinanorth.cloudapp.chinacloudapi.cn:5000/face_login', //仅为示例，非真实的接口地址
            // header: {
            //   'content-type': 'multipart/form-data'
            // },
            filePath: tempFilePaths[0],
            name: 'image_file',
            success: function(res) {
              console.log(res.data);
              wx.hideToast(); // 隐藏Toast窗口
              var data = JSON.parse(res.data);

              if (data.count == 0) {
                that.setData({
                  userRealInfo: {
                    //填充人脸识别界面的图片
                    imageUrl: tempFilePaths[0],
                    msg: '未检测到人脸，请重新拍摄！'
                  }
                })
              }

              if (data.count == 1) {
                // 设置全局的userInfo和user_id
                app.globalData.user_info = data.user_info;
                app.globalData.user_id = data.user_id;

                if (data.is_new == 1) {
                  that.setData({
                    userRealInfo: {
                      //填充人脸识别界面的图片
                      imageUrl: tempFilePaths[0],
                      msg: '欢迎您，新用户！'
                    }
                  })
                } else {
                  that.setData({
                    userRealInfo: {
                      //填充人脸识别界面的图片
                      imageUrl: tempFilePaths[0],
                      msg: '欢迎回来，用户' + data.user_id + '号'
                    }
                  })
                }
                that.setData({
                  ifCheckDisable: true,
                  ifFillDisable: false,
                  btnText: '登录'
                }, function() {})
                bool_detected = 1
              }

              if (data.count == 2) {
                that.setData({
                  userRealInfo: {
                    //填充人脸识别界面的图片
                    imageUrl: tempFilePaths[0],
                    msg: '检测到多张人脸，请重新拍摄！'
                  }
                })
              }
            },
            fail: function(e) {
              wx.showToast({
                title: '人脸识别失败！请检查网络连接！',
                icon: 'loading',
                duration: 4000
              })
            }

          })
        },
      })
    }
  },


  // 同意用户协议
  showAgreement: function() {
    // wx.showToast({
    //   title: '显示用户协议...',
    //   icon: 'success',
    //   duration: 2000
    // })

    var that = this;
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(500).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)

  },

  hideModal: function(e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(10).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 200)
  }

})