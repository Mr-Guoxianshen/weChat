//index.js
//获取应用实例
const app = getApp()

var timer
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    camareImg: '',
    imgText: '',
    showText: '',
    _time: 0,
    singStatus: 1, // 1: 录音结束  2: 录音状态  3: 录音失败  4: 播放录音
    singUrl: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  countAdd: function () {
    var _this = this
    timer = setInterval(function () {
      _this.setData({
        _time: ++_this.data._time
      })
    }, 1000)
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        // console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  startRecord: function () {
    this.countAdd()
    this.setData({
      showText: 'sing',
      singStatus: 2
    })
    wx.startRecord({
      success: res => {
        this.setData({
          singUrl: res.tempFilePath
        })
      },
      fail: res => {
        if (app.globalData.userInfo.gender === 1) {
          this.setData({
            showText: 'sing',
            singStatus: 3,
            _time: '鉴于你的歌声到了鬼哭狼嚎的程度,服务器选择了罢工!'
          })
        } else {
          this.setData({
            showText: 'sing',
            singStatus: 3,
            _time: '再美的语言都无法形容你动听的声音,服务器都在为你着迷!'
          })
        }
      }
    })
    setTimeout(function () {
      // 结束录音
      clearInterval(timer)
      wx.stopRecord()
    }, 6000)
  },
  stopRecord: function () {
    clearInterval(timer)
    wx.stopRecord()
  },
  playVoice: function (path) {
    this.setData({
      singStatus: 4
    })
    wx.playVoice({
      filePath: path,
      success: res => {
        this.setData({
          singStatus: 1
        })
      },
      fail: res => {
        if (app.globalData.userInfo.gender === 1) {
          this.setData({
            singStatus: 3,
            _time: '鉴于你的歌声到了鬼哭狼嚎的程度,服务器选择了罢工!'
          })
        } else {
          this.setData({
            singStatus: 3,
            _time: '再美的语言都无法形容你动听的声音,服务器都在为你着迷!'
          })
        }
      }
    })
    setTimeout(function () {
      wx.stopVoice()
    }, 6000)
  },
  opera: function (e) {
    var status = e.currentTarget.dataset.singstatus
    if (status === 1) {
      this.playVoice(this.data.singUrl)
    } else if (status === 2) {
      this.stopRecord()
      this.setData({
        singStatus: 1
      })
    } else if (status === 3) {
      // console.log(3)
    } else if (status === 4) {
      wx.stopVoice()
      this.setData({
        singStatus: 1
      })
    }
  },
  chooseImage: function () {
    wx.chooseImage({
      count: 1,
      sourceType: ['camera'],
      success: res => {
        if (app.globalData.userInfo.gender === 1) {
          this.setData({
            camareImg: res.tempFilePaths[0],
            showText: 'camera',
            imgText: app.globalData.imgTexts.boy[parseInt(Math.random() * 3)]
          })
        } else {
          this.setData({
            camareImg: res.tempFilePaths[0],
            showText: 'camera',
            imgText: app.globalData.imgTexts.girl[parseInt(Math.random() * 9)]
          })
        }
      },
      fail: res => {
        if (app.globalData.userInfo.gender === 1) {
          this.setData({
            showText: 'camera',
            imgText: '鉴于你丑到了惊天地泣鬼神的程度,服务器选择了罢工!'
          })
        } else {
          this.setData({
            showText: 'camera',
            imgText: '语言已经无法形容你的美,服务器都在为你着迷!'
          })
        }
      }
    })
  }
})
