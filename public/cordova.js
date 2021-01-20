// 监听设备是否准备
document.addEventListener('deviceready', onDeviceReady, false)

// 设置准备监听钩子函数 初始化
function onDeviceReady() {
  // 控制台输出cordova 平台Id 版本号
  console.log('Running cordova-' + cordova.platformId + '@' + cordova.version)

  document.getElementById('deviceready').classList.add('ready')
}
