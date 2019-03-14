//获取应用实例
const app = getApp()

var bool_detected = 0;
// var bool_login = 0;
var new_face = "";


Page({
  data: {
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
  showAgreement: function () {
    wx.showToast({
      title: '显示用户协议',
      icon: 'none',
      duration: 4000
    })
  },

  getUserInfo: function (e) {
    console.log(e.detail.errMsg);
    //如果已经识别了人脸则点击登录进行跳转
    if(bool_detected==1){
      wx.switchTab({
        url: '/src/recommend/recommend'
      })
    }


    // 判断用户是否同意授权
    if (e.detail.errMsg == 'getUserInfo:fail auth deny'){
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
    }else{
      this.showCam();
    }
  },

  //同意用户协议方法
  checkboxChange(e) {
    if(e.detail.value.length==1){
      this.setData({
        ifLoginDisable: false
      })
    }else{
      this.setData({
        ifLoginDisable: true
      })
    }
  },



  //拍照上传函数
  showCam: function () {
    var that = this
    if (bool_detected == 1) {
      // 已经检测过人脸并且获取了微信权限，点击直接跳转  

    } else {
      wx.chooseImage({
        count: 1, // 最多可以选择的图片张数，默认9
        sourceType: ['camera'], // album 从相册选图，camera 使用相机，默认二者都有，改为只能拍照取人脸
        success: function (res) {
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
            duration: 2000
          })

          wx.uploadFile({
            url: 'https://api-cn.faceplusplus.com/facepp/v3/detect', //仅为示例，非真实的接口地址
            header: {
              'content-type': 'multipart/form-data'
            },
            filePath: tempFilePaths[0],
            name: 'image_file',
            formData: {
              'api_key': 'OCfvZCSf72p8WPptTdW_nv2rwQa10i_x',
              'api_secret': 'TATBECgI3LMRuPVLLB15GtTvpqc3pbOY',
              'return_attributes': "gender,age,ethnicity,beauty,skinstatus"
            },
            success: function (res) {
              console.log(res.data);
              wx.hideToast();// 隐藏Toast窗口
              var data = JSON.parse(res.data);
              //未检测到人脸
              if (data.faces.length == 0) {
                // console.log("执行到这")
                that.setData({
                  userRealInfo: {
                    //填充人脸识别界面的图片
                    imageUrl: tempFilePaths[0],
                    msg: '未检测到人脸!请重新拍摄！'
                  }
                }, function () {
                  console.log("未检测到人脸，不做跳转");
                })
                // return
              }
              else {
                //如果检测到人脸
                bool_detected = 1;
                that.setData({
                  ifCheckDisable: true,
                  ifFillDisable: false,
                  btnText: '登录'
                }, function () {
                })

                var face_token = data.faces[0].face_token;
                new_face = face_token;//保存新face_token，以创建新用户
                console.log(face_token);
                wx.request({
                  url: "https://api-cn.faceplusplus.com/facepp/v3/search", //仅为示例，并非真实的接口地址
                  data: {
                    'api_key': 'OCfvZCSf72p8WPptTdW_nv2rwQa10i_x',
                    'api_secret': 'TATBECgI3LMRuPVLLB15GtTvpqc3pbOY',
                    "face_token": face_token,
                    "faceset_token": "a95b184fd0011a44b3c18d553ff677f5"
                  },
                  dataType: "json",
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  method: "POST",
                  success: function (res) {
                    console.log(res.data);
                    var data1 = res.data;
                    //console.log("原来的face_token" + JSON.stringify(data1));
                    var confidence = data1.results[0].confidence;
                    // console.log(data1.thresholds.1e-4);

                    if (confidence > 80) {
                      // bool_login = 1;
                      //同一个人
                      console.log("是同一个人");
                      // var bool_login = 1;
                      var face_token_new = data1.results[0].face_token;
                      console.log("最新的" + face_token_new);

                      if (face_token_new == '2a1904c4c99dfaa37b0ea51aa975fcd9') {
                        // //更新人脸检测数据
                        // app.globalData.username = names[face_token_new];
                        // //发送短信
                        // var returnMsg = util.sendMsg(names[face_token_new], "18810388284");
                        //刷新页面
                        that.setData({
                          userRealInfo: {
                            imageUrl: tempFilePaths[0],
                            msg: '欢迎回来，叶帅'
                          }
                        }, function () {
                          // //页面跳转
                          // setTimeout(function () {
                          //   wx.reLaunch({
                          //     url: '../pic/pic'
                          //   })
                          // }, 500)
                        });
                      }



                    } else {
                      console.log("新用户");
                      // //更新人脸检测数据
                      // app.globalData.username = "";

                      // //发送短信
                      // var returnMsg = util.sendMsg("您", "18810388284");
                      //刷新页面
                      that.setData({
                        userRealInfo: {
                          imageUrl: tempFilePaths[0],
                          //tips: '一位' + data.faces[0].attributes.age.value + '岁的' + genders[data.faces[0].attributes.gender.value]
                          msg: '未搜索到匹配人脸\n新用户，欢迎您'
                        }
                      }, function () {
                        // //页面跳转
                        // setTimeout(function () {
                        //   wx.reLaunch({
                        //     url: '../pic/pic'
                        //   })
                        // }, 500)
                      });
                    }
                    /*that.setData({
                      userInfo: {
                        imageUrl: tempFilePaths[0],
                        tips: '一位' + data.faces[0].attributes.age.value + '岁的' + genders[data.faces[0].attributes.gender.value]
                      }
                    })*/
                  }


                })
              // 获取微信授权保存头像和信息
              



              }

            },

          })
        },
      })
    }
  },


  // 同意用户协议
  showAgreement: function () {
    wx.showToast({
      title: '显示用户协议...',
      icon: 'success',
      duration: 2000
    })
  },

})
