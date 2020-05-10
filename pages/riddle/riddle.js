// pages/riddle/riddle.js
const rid_data = require('../../utils/riddle.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: wx.getStorageSync('rid_num') || 0,
    index: wx.getStorageSync('rid_index') || 0,
    title_top: '',
    title_bot: '',
    options: '',
    choose: [],
    ok: '',
    answer_num: -1,
    errFlag: false,
    wellFlag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let data = rid_data.data[this.data.index]
    //获取题目，拆分标题
    var {
      title,
      options,
      ok
    } = data
    let sub = title.indexOf('(')
    let title_top = title.slice(0, sub)
    let title_bot = title.slice(sub)
    let choose = Array(ok.length).fill(''); //按答案的字数设置对应字数的数组，每一项为空
    this.setData({
      title_top,
      title_bot,
      options,
      ok,
      choose
    })
  },
  next() { //下一题
    wx.setStorageSync('rid_index', this.data.index + 1)
    this.repeat();
  },
  //查看结果
  see() {
    this.setData({
      choose: this.data.ok
    })
    setTimeout(() => {
      wx.setStorageSync('rid_index', this.data.index + 1)
      this.repeat();
    }, 5000)
  },
  //判断对错
  isTure() {
    var choose = this.data.choose.join('');
    console.log(1, choose)
    if (choose == this.data.ok) {
      setTimeout(() => {
        this.setData({
          wellFlag: true
        })
      }, 500)
      wx.setStorageSync('rid_num', this.data.num + 1) //存储当前分数
      wx.setStorageSync('rid_index', this.data.index + 1)
      // this.repeat()
    } else {
      setTimeout(() => {
        this.setData({
          errFlag: true
        })
      }, 500)
    }

  },
  answer(e) {

    if (typeof(e) == "number" && (e <= this.data.answer_num + 1)) { //验证是否正确 
      console.log(-1)
      this.isTure()
    } else if (typeof(e) == "number") {

    } else {
      let word = e.currentTarget ? e.currentTarget.dataset.word : ''
      this.setData({
        answer_num: this.data.answer_num + 1
      })
      var answer_num = this.data.answer_num
      console.log(answer_num)
      if (answer_num < this.data.ok.length) {
        var data = 'choose[' + answer_num + ']'
        this.setData({
          [data]: word
        })
        this.answer(this.data.ok.length)
      } else {
        this.isTure()
      }
    }

  },
  repeat() {
    this.setData({
      num: wx.getStorageSync('rid_num') || 0,
      index: wx.getStorageSync('rid_index') || 0,
      title_top: '',
      title_bot: '',
      options: '',
      choose: [],
      ok: '',
      answer_num: -1,
      errFlag: false,
      wellFlag: false
    })
    this.onLoad()
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
  onShareAppMessage(res) {
    console.log(res)

    if (res.from == 'menu') {
      wx.setStorageSync('rid_index', this.data.index + 1)
      this.setData({
        index: this.data.index + 1
      })
      this.repeat()
      return {
        title: '朕！得了' + this.data.num + '分，快来参加吧',
        complete: () => {

        }
      }
    } else {
      this.repeat()
      return {
        title: '考验你实力啦，我来考考你',
        complete: () => {

        }
      }
    }



  }
})