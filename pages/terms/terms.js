//index.js
//获取应用实例
const app = getApp()
const idiomList = require('../../utils/terms');
Page({
  data: {
    wellFlag: false,
    errFlag: false,
    ok: '', //正确的答案
    options: '', //备选
    word: '', //点击的答案
    x: '',
    y: '',
    x_top: 0,
    y_left: 0,
    num: 0,
    showNum: true
  },
  onLoad: function() {
    const index = app.globalData.index
    const num = wx.getStorageSync('num') || 0
    var idiom = idiomList.data[index]; //展示哪道题
    console.log(num)
    this.setData({
      num,
      x: idiom.x,
      y: idiom.y,
      ok: idiom.ok,
      options: idiom.options
    })
    let x_index, y_index;
    for (var k in this.data.x) {
      if (this.data.x[k] == '*') {
        x_index = k
      }
    }
    for (var k in this.data.y) {
      if (this.data.y[k] == '*') {
        y_index = k
      }
    }
    this.setData({
      x: this.data.x.replace('*', " "),
      y: this.data.y.replace('*', " "),
      x_top: y_index * 120 + 'rpx',
      y_left: x_index * 120 + 'rpx',
    })
  },
  saveIndex() {
    app.globalData.index = app.globalData.index + 1 //下道题
    if (app.globalData.index >= idiomList.length) { //       
      app.globalData.index = 0
    }
    wx.setStorageSync('index', app.globalData.index) //存储当前的题，下次进来直接答这道题
  },
  next() {

    this.setData({
      wellFlag: false,
      word: '',

    }) //先置空答案
    this.saveIndex()
    this.onLoad()
  },
  repeat() {
    this.setData({
      word: '',
      errFlag: false,
      wellFlag: false,
    })
  },
  answer(e) {
    console.log(e)
    let word = e.currentTarget.dataset.word;
    console.log(word)
    this.setData({
      word
    })
    if (word == this.data.ok) {
      wx.setStorageSync('num', this.data.num + 1) //存储当前分数
      setTimeout(() => {
        this.setData({
          wellFlag: true,
          num: this.data.num + 1
        })
      },500)
    } else {
      setTimeout(() => {
        this.setData({
          errFlag: true
        })
      }, 500)
    }
  },
  onShareAppMessage(res) {
    if (res.from == 'button') {
      this.setData({
        word: '',
        errFlag: false,
        wellFlag: false
      })
      this.saveIndex()
      this.onLoad()
    }
    return {
      title: '朕！得了' + this.data.num + '分，快来参加吧',
      complete: () => {

      }
    }
  }
})