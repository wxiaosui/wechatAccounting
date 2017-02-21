// pages/budget/budget.js
Page({
  data:{
    Number:0
  },
  getnumber:function(event){
    this.setData({
      Number:event.detail.value
    })
  },
  budget:function(){
    wx.setStorage({
      key:"Number",
      data:this.data.Number,
      success:function(){
        wx.showToast({
              title:'添加成功',
              icon: 'success',
              duration: 2000,
              mask:true,
              complete:function(){
                wx.navigateBack({
                  url:'../index/index'
                })
              }
        })
      }
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})