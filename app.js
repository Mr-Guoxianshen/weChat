//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    imgTexts: {
      boy: ['如果美丽是时间的话，你就是刹那!', '丑的想整容!', 'Welcome to Korea!'],
      girl: ['聘聘袅袅十三余,豆蔻梢头二月初.春风十里扬州路,卷上珠帘总不如.', '媚眼含羞合，丹唇逐笑开。风卷葡萄带，日照石榴裙', '清水出芙蓉，天然去雕饰', '回眸一笑百魅生，六宫粉黛无颜色', '轻罗小扇白兰花,纤腰玉带舞天纱.疑是仙女下凡来,回眸一笑胜星华', '脸若银盘,眼似水杏,唇不点而红,眉不画而翠', '芙蓉不及美人妆,水殿风来珠翠香', '最是那一低头的温柔,象一朵水莲花不胜凉风的娇羞', '如果美丽是时间的话，你就是永恒']
    }
  }
})