//index.js
Page({
  data: {
    time: 'time',
    num: 0,
    budget: '本月预算',
    currency: '元',
    proportion: 0,
    times: '时间',
    details: '详情',
    amount: '金额',
    accountData: [],
    accountTotal: 0,
    chang: 1
  },
  add: function () {
    wx.navigateTo({
      url: '../add/add',
    })
  },
  setting: function () {
    wx.navigateTo({
      url: '../budget/budget'
    })
  },
  deleteRow: function (e) {
    var that = this;
    var index = e.target.dataset.indexKey;
    var tempAccountData = wx.getStorageSync("accountData") || [];
    tempAccountData.splice(index, 1);
    wx.setStorageSync("accountData", tempAccountData);
    that.caculateTotal(tempAccountData);
    that.setData({
      accountData: tempAccountData,
    });
  },
  //获取number预算
  getNumber() {
    var that = this;
    wx.getStorage({
      key: 'Number',
      success: function (res) {
        var num = 0;
        num = res.data;
        that.setData({
          num: num
        })
      }
    })
  },
  //显示比例比例
  porpro() {
    var that = this;
    wx.getStorage({
      key: 'Number',
      success: function (res) {
        var num = 0;
        num = res.data;
        var acc = that.data.accountTotal;
        var p = acc / num * 100;
        var n = that.changeZeroInt(-p);
        that.setData({
          proportion: n
        })
      }
    })
  },

  //事件处理函数
  onLoad: function () {
    
  },

  checkTime:function(){
    var Data = new Date;
    var year = Data.getFullYear();
    var Month = Data.getMonth()+1;
    var tempAccountData = wx.getStorageSync("accountData") || [];
    for(i in tempAccountData){
      var id = tempAccountData[i].index;
      if(id.substring(0,4) == year){
        if(id.substring(4,6) < Month){
          tempAccountData.splice(i, 1);
        }
      }else{
        tempAccountData.splice(i, 1);
      }
    }
    var that = this;
    wx.setStorageSync("accountData", tempAccountData);
    that.caculateTotal(tempAccountData);
    that.setData({
      accountData: tempAccountData,
    });
  },

  // 计算总额
  caculateTotal: function (data) {
    var tempTotal = 0;
    for (var x in data) {
      tempTotal += parseFloat(data[x].amount);
    }
    this.setData({
      accountTotal: tempTotal
    });
    return tempTotal;
  },

  //  取整
  changeZeroInt: function (x) {
    var r = "";
    var v1 = 0;
    r = x.toString();
    var p = r.indexOf('.', 0);
    if (p != -1)
      v1 = r.substring(0, p) * 1;
    else
      v1 = r * 1;
    if (v1 > x)
      return v1;
    else {
      if (p != -1)
        return v1 + 1;
      else
        return v1;
    }
  },
  onShow: function () {
    this.checkTime();
    this.getNumber();
    this.porpro();


    var tempAccountData = wx.getStorageSync("accountData") || [];
    this.caculateTotal(tempAccountData);

    function sortB(data){
      return function(a,b){
        return b[data]-a[data];
      }
    }

    tempAccountData.sort(sortB("index"));
    
    this.setData({
      accountData: tempAccountData
    });
  }

})
