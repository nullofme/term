// pages/turn/turn.js
const app = getApp()
const turnList = require('../../utils/turn');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        num: wx.getStorageSync('turn_num') || 0,
        index: wx.getStorageSync('turn_index') || 0,
        title: '',
        ok: '',
        ok_show: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var obj = turnList.data[this.data.index];
        // console.log(this.turnList)
        this.setData({
            title: obj.title,
            ok: obj.ok
        })
    },
    show() {
        this.setData({
            ok_show: this.data.ok
        })
    },
    next() { //下一题
        wx.setStorageSync('turn_index', this.data.index + 1)
        this.repeat();
    },
    repeat() {
        this.setData({
            num: wx.getStorageSync('turn_num') || 0,
            index: wx.getStorageSync('turn_index') || 0,
            title: '',
            ok: '',
            ok_show: ''
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
    onShareAppMessage: function() {
        return {
            title: '来刷刷脑筋急转弯吧',
            complete: () => {

            }
        }
    }
})