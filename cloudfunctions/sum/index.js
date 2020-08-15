// 云函数入口函数
// event 指的是触发云函数的事件，当小程序端调用云函数时，event 就是小程序端调用云函数时传入的参数，外加后端自动注入的小程序用户的 openid 和小程序的 appid。
// context 对象包含了此处调用的调用信息和运行状态，可以用它来了解服务运行的情况。

exports.main = async (event, context) => {
  return {
    sum: event.a + event.b
  }
}