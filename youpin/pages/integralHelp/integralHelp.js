// pages/integralHelp/integralHelp.js
Page({
  data: {
    topTitle: `为了更好的回馈用户，增加了更多积分发放任务和更多积分使用场景。
    以下是本小程序的积分规则：`,
    bodyData: [{
      title: `一、获取积分：`,
      text: `目前获取积分的方式如下
      • 首次使用本小程序即可获取200积分
      • 每日连续签到，每天最高获取7积分
      • 领取优惠券购买商品，可以获取商品对应的积分
      • 邀请好友使用本小程序，每次可以获取10积分;请使用（我的->我的工具->邀请好友）`
    }, {
      title: `二、使用积分：`,
      text: `• 积分兑换本小程序上任何展示的商品(限于600积分以上且包邮的商品,高级会员无限制)
      • 积分兑换充值卡（后期添加）
      • 积分兑换超值权益等等`
    }, {
      title: `三、积分有效期：`,
      text: `积分有效期最短1年，最长一年半。例如：2017年1月1日6月30日获取得到的积分在2018年6月30统一到期。每半年做一次积分到期清理`
    }, {
      title: `四、积分规则限定：`,
      text: `• 积分使用范围：只能在本小程序中使用，不能在其它平台使用
      • 交易产生的积分：只针对已订单支付成功及订单状态已经完成，且实付金额>0
      • 积分兑换超值权益等等`}, {
      title: `五、会员等级规则：`,
      text: `• 用户连续签到100天即可升级到高级会员
      • 高级会员享受积分兑换商品的优惠券后价
      • 高级会员享受签到所得最高7积分升级为签到所得最高10积分`}]
  },
  onLoad: function (options) {

  }
})