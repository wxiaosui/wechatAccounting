// pages/add/add.js
Page({
  data:{
    time:'',
    index:'',
    btnL:'收入',
    btnR:'支出',
    btnOFF:' ',
    btnNO:'btnActive',
    AddSub:'-',
    accountData:[],
    accountTotal:0
  },
  btnL:function(){
    this.setData({
      btnOFF:'btnActive',
      btnNO:' ',
      AddSub:'+'
    })
  },
  btnR:function(){
    this.setData({
      btnOFF:' ',
      btnNO:'btnActive',
      AddSub:'-',
      buttonLoading: false
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  
  formSubmit:function(e){
      this.setData({
        buttonLoading: true
      });
      var that = this;
      setTimeout(function(){
          var inDetail = e.detail.value.inputdetail;
          var inAmount = e.detail.value.inputamount;
          var z = that.data.AddSub;
          var inTime = that.data.time+'';
          var inIndex = inTime.replace(/[\-]/g,'');

          if(inDetail.toString().length <= 0 || inAmount.toString().length <= 0){
              
              wx.showModal({
                title: '提示',
                content: '提交信息不完整'
              })
              that.setData({
                buttonLoading: false
              });
              return false;
          }else{
            //新增记录
            var tempAccountData = wx.getStorageSync("accountData") || [];
            tempAccountData.unshift({detail:inDetail,amount:z+inAmount,time:inTime,index:inIndex});
            wx.setStorageSync("accountData",tempAccountData);
            that.setData({
                accountData: tempAccountData,
                buttonLoading: false
            });
            wx.showToast({
              title:'添加成功',
              icon: 'success',
              duration: 1500,
              mask:true,
              complete:function(){
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          }
      },500);
  },
  bindDateChange:function(e){
    this.setData({
      time: e.detail.value
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    var Data = new Date;
    var year = Data.getFullYear();
    var Month = Data.getMonth()+1;
    var Day = Data.getDate();
    if(Month<10){
      Month = '0'+Month;
      this.setData({
        time:year+'-'+Month+'-'+Day
      })
    }
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})