//获取应用实例
const app = getApp()

// src/new_recommend/new_recommend.js
var util = require('../utils/util.js');

var image_url = "http://images.chinanorth.cloudapp.chinacloudapi.cn:8088/"
var image_url_suffix = ".jpg"
var list = new Array()

// let l = [
//   {
//     goods_id: 29,
//     category: '书籍',
//     tag: { tag1: "个性推荐", tag2: "常规推荐" },
//     cover: "29.jpg",
//     sub_title: "影响孩子一生的读物",
//     title: "许马体检，你必须知道的那些事儿",
//     agree: true,
//     price: 45,
//     agreeNum: 293,
//     commentNum: 56,
//     comment: [
//       {
//         logo: '../images/male_pic.png',
//         name: '刘昕1',
//         txt: 'good',
//         fromNow: '2天前'
//       }, {
//         logo: 'http://thirdwx.qlogo.cn/mmopen/PDS4yGhkWYlEPmXoZW82KTj7U8HTURpVP7eh5DOibW3hGgFLJK4C5YGK13vYO5JhibevicDMdeysHQce4dSEKUAcIRSAicCS06qV/132',
//         name: '刘昕2',
//         txt: '待期,期,待期,期待,期待,期期待期,期待期期,待期期',
//         fromNow: '3天前'
//       }, {
//         logo: 'http://thirdwx.qlogo.cn/mmopen/PDS4yGhkWYlEPmXoZW82KTj7U8HTURpVP7eh5DOibW3hGgFLJK4C5YGK13vYO5JhibevicDMdeysHQce4dSEKUAcIRSAicCS06qV/132',
//         name: '刘昕2',
//         txt: '待期,期,待期,期待,期期待期,期待期期,待期期',
//         fromNow: '3天前'
//       }, {
//         logo: 'http://thirdwx.qlogo.cn/mmopen/PDS4yGhkWYlEPmXoZW82KTj7U8HTURpVP7eh5DOibW3hGgFLJK4C5YGK13vYO5JhibevicDMdeysHQce4dSEKUAcIRSAicCS06qV/132',
//         name: '刘昕2',
//         txt: '期待,待期,待期,期,待期,期待,期待,期期待期,期待期期,待期期',
//         fromNow: '3天前'
//       }]
//   },
//   {
//     goods_id: 32,
//     category: '食品',
//     tag: "热销推荐",
//     sub_title: "正宗酱板鸭",
//     title: "安乡杨矮子酱板鸭",
//     price: 58,
//     cover: "32.jpg",
//     agree: false,
//     agreeNum: 525,
//     commentNum: 16,
//     comment: [
//       {
//         logo: 'http://thirdwx.qlogo.cn/mmopen/PDS4yGhkWYlEPmXoZW82KTj7U8HTURpVP7eh5DOibW3hGgFLJK4C5YGK13vYO5JhibevicDMdeysHQce4dSEKUAcIRSAicCS06qV/132',
//         name: '刘昕2',
//         txt: '期待,待期,待期,期,待期,期待,期待,期期待期,期待期期,待期期',
//         fromNow: '3天前'
//       }, {
//         logo: 'http://thirdwx.qlogo.cn/mmopen/PDS4yGhkWYlEPmXoZW82KTj7U8HTURpVP7eh5DOibW3hGgFLJK4C5YGK13vYO5JhibevicDMdeysHQce4dSEKUAcIRSAicCS06qV/132',
//         name: '刘昕2',
//         txt: '期待,待期,待期,期,待期,期待,期待,期期待期,期待期期,待期期',
//         fromNow: '3天前'
//       }]
//   },
//   {
//     _id: "zHNuZ6cqq6D8XN6nT",
//     tag: '日程',
//     author: "智慧体育",
//     cover: "40.jpg",
//     createtime: 1521872204815,
//     link: "https://xidong360.com/newInfo/365fe48f923c4ba7a343448f8a4bfbd7",
//     time: "2018年03月24日",
//     title: "首届许昌马拉松4月29日开跑",
//     agree: false,
//     agreeNum: 93,
//     commentNum: 0
//   }
// ]


Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputCmt: null,
    focusInput: false,
    showInput: false,
    data_list: null,
    currentIndex: 0,
    cardRightIn: false,
    cardLeftIn: false
  },

  set_local_goods_info: function () {
    var that = this;
    wx: wx.request({
      url: 'http://noob.chinanorth.cloudapp.chinacloudapi.cn:5000/get_like_and_comments',
      data: {
        user_id: app.globalData.user_id,
        goods_id: list[that.data.currentIndex].goods_id
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

        if (req_data['like'] == 1) {
          list[that.data.currentIndex].agree = true;
        } else {
          list[that.data.currentIndex].agree = false;
        }
        list[that.data.currentIndex].agreeNum = req_data['likecount'];
        list[that.data.currentIndex].commentNum = req_data['commentcount'];
        // 设置评论
        var cmt_tmp = new Array();
        for (var i = 0; i < req_data['comments'].length; ++i) {
          var cmt_item = {}; //定义一个字典
          // console.log(req_data['comments'][i]);
          if (req_data['comments'][i]['gender'] == 1) {
            cmt_item['logo'] = '../images/male_pic.png'
          } else {
            cmt_item['logo'] = '../images/female_pic.png'
          }
          cmt_item['name'] = req_data['comments'][i]["name"]
          cmt_item['txt'] = req_data['comments'][i]["txt"]
          cmt_item['fromNow'] = req_data['comments'][i]["time"]
          cmt_tmp.push(cmt_item);
        }
        //设置list数据
        list[that.data.currentIndex].comment = cmt_tmp;
        // console.log('当前商品'+list[that.data.currentIndex].goods_id+'的信息:\n'+list[that.data.currentIndex]);
        that.setData({
          data_list: list
        })
      },
      fail: function (res) {
        console.log(res.data)
      },
      // complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取用户推荐商品信息，初始化list
    var that = this;
    wx.showToast({
      title: '正在加载商品',
      icon: 'loading',
      duration: 5000
    })
    wx: wx.request({
      url: 'http://noob.chinanorth.cloudapp.chinacloudapi.cn:5000/get_recommend_info',
      data: {
        user_id: app.globalData.user_id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        wx.showToast({
          title: '左右滑动浏览',
          icon: 'success',
          duration: 2000
        })
        // :return: res_dict = {"data": [{good_id:
        // 'name': self.name,
        // 'price': self.price,
        // 'category': self.category,
        // 'other2': self.other2
        //                                 recommend: ["个性推荐"， "常规推荐"]},...]}
        // console.log(res.data)
        var req_data = res.data
        // 初始化list
        var goods_list = req_data['data'];
        for (var i = 0; i < goods_list.length; ++i) {
          var goods = {};
          goods['goods_id'] = goods_list[i]['good_id'];
          goods['title'] = goods_list[i]['name'];
          goods['price'] = goods_list[i]['price'];
          goods['category'] = goods_list[i]['category'];
          goods['sub_title'] = goods_list[i]['name'];
          // goods['sub_title']=goods_list[i]['other2'];
          goods['agree'] = false;
          goods['agreeNum'] = 0;
          goods['commentNum'] = 0;
          goods['comment'] = [];
          goods["cover"] = image_url + goods_list[i]['good_id'] + image_url_suffix
          if (goods_list[i]['recommend'].length == 1) {
            goods['tag'] = { tag1: goods_list[i]['recommend'][0] };
          } else {
            goods['tag'] = { tag1: goods_list[i]['recommend'][0], tag2: goods_list[i]['recommend'][1 + Math.floor(Math.random() * (goods_list[i]['recommend'].length - 1))] };
            // 最多显示两个标签，随机显示一个
          }
          list.push(goods);
        }
        // console.log(list);
        //设置list数据
        that.setData({
          data_list: list
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '请检查网络连接',
          icon: 'none',
          duration: 4000
        })
      },
      // complete: function(res) {},
    })


  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.showToast({
    //   title: '在卡片上左右滑动浏览推荐商品',
    //   icon: 'none',
    //   duration: 4000
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  loseInputFocus: function () {
    this.setData({
      showInput: false,
      focusInput: false
    })

  },

  submitBtn: function () {
    var that = this;
    // 判断用户输入是否为空
    if (this.data.inputCmt == null) {
      // console.log("为空");
      wx.showToast({
        title: '评论内容不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      // console.log(this.data.inputCmt);
      // 发送插入评论请求============================
      //获取当前时间戳  
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000;
      //获取当前时间 ，设置日期选择器的开始和结束日期
      var n = timestamp * 1000;
      var date = new Date(n);
      //年  
      var Y = date.getFullYear();
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
      var t = Y + '-' + M + '-' + D + ' ' + h + ":" + m + ":" + s;
      // console.log(t);
      wx: wx.request({
        url: 'http://noob.chinanorth.cloudapp.chinacloudapi.cn:5000/insert_comment',
        data: {
          // user_id = req_data["user_id"]
          // good_id = req_data["good_id"]
          // txt = req_data["content"]
          // gender = req_data["gender"]
          // time = req_data["time"]
          // name = req_data["name"]
          user_id: app.globalData.user_id,
          good_id: list[that.data.currentIndex].goods_id,
          content: that.data.inputCmt,
          gender: app.globalData.userInfo.gender,
          time: t,
          name: app.globalData.userInfo.nickName
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          // console.log('插入新评论成功！');
          // console.log(res.data);
          // 刷新页面
          that.set_local_goods_info();
        },
        fail: function (res) {
          console.log(res.data)
        },
        // complete: function(res) {},
      })

      // 清空评论槽
      this.setData({
        inputCmt: null
      })
    }
  },

  userCmtInput: function (e) {
    this.setData({
      inputCmt: e.detail.value
    })
  },

  toAgree: function (e) {
    // console.log(list[this.data.currentIndex].goods_id);
    var that = this;
    let i = this.data.data_list[this.data.currentIndex]
    i.agree = !i.agree
    if (i.agree) {
      i.agreeNum = i.agreeNum + 1
      // console.log(i.agree);
      //发送用户喜欢该商品的命令
      wx: wx.request({
        url: 'http://noob.chinanorth.cloudapp.chinacloudapi.cn:5000/insert_like_info',
        data: {
          user_id: app.globalData.user_id,
          good_id: list[that.data.currentIndex].goods_id
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          // console.log(res.data)
        },
        fail: function (res) {
          console.log(res.data)
        },
        // complete: function(res) {},
      })
    } else if (!i.agree) {
      i.agreeNum = i.agreeNum - 1
      //发送用户不喜欢该商品的命令
      // console.log(i.agree);
      wx: wx.request({
        url: 'http://noob.chinanorth.cloudapp.chinacloudapi.cn:5000/delete_like_info',
        data: {
          user_id: app.globalData.user_id,
          good_id: list[that.data.currentIndex].goods_id
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          // console.log(res.data)
        },
        fail: function (res) {
          console.log(res.data)
        },
        // complete: function(res) {},
      })
    }
    that.setData({
      data_list: list
    })
  },

  toComment: function () {
    // console.log('comment')
    //评论页面
    this.setData({
      showInput: true,
      focusInput: true
    })

  },

  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    let tag = this.data.currentIndex;
    let idx = e.currentTarget.dataset.index;
    let startX = this.data.startX, //开始X坐标
      startY = this.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = this.angle({
        X: startX,
        Y: startY
      }, {
          X: touchMoveX,
          Y: touchMoveY
        });

    //滑动超过45度角 return
    if (Math.abs(angle) > 45) return;

    if (touchMoveX > startX) { //右滑
      this.setData({
        currentIndex: idx == 0 ? 0 : idx - 1,
        cardRightIn: false,
        cardLeftIn: true
      })
    } else {
      this.setData({
        currentIndex: idx == this.data.data_list.length - 1 ? idx : idx + 1,
        cardRightIn: true,
        cardLeftIn: false
      })
    }
    wx.pageScrollTo({
      scrollTop: 0
    })
    if (this.data.currentIndex != tag) {
      // console.log("tag changed!")
      //滑动获取当前good_id对应的信息
      this.set_local_goods_info();
    }

  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI)
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

  }
})