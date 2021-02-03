// 开发
var startup = {
  sn: 'test',

  // 初始化 建立桥接
  initialize: function() {
    startup.sn = 'test'
  },

  // 监控nfc读取卡号
  readingCardNo: function(callback) {
    console.log('开始监听nfc')
    // callback(cardno) 读卡触发回调
  },

  // 监控测温
  readingTemperature: function(callback) {
    console.log('开始监听测温')
    // callback(temperature) 测温触发回调
  },

  // 监控联网状态
  internetListener: function(callback) {
    var status = true
    callback(status)
  },

  // 语音提示
  read: function(content) {
    window.alert('测温语音提示：{0}'.format(content))
  },

  // 弹窗提示
  toast: function(content) {
    window.alert(content)
  }
}

// // 浏览器
// var startup = {
//   sn: 'test',

//   // 初始化 建立桥接
//   initialize: function() {
//     startup.sn = device.uuid
//   },

//   // 监控nfc读取卡号
//   readingCardNo: function(callback) {
//     callback('2312323221')
//   },

//   // 监控测温
//   readingTemperature: function(callback) {
//     var temperature =  0
//     callback(temperature)
//   },

// // 监控联网状态
// internetListener: function(callback) {
//   document.addEventListener("online", callback(true), false);
//   document.addEventListener("offline", callback(false), false);
// },

//   // 语音提示
//   read: function(content) {
//     TTS.speak(content)
//   },

//   // 弹窗提示
//   toast: function(content) {
//     window.plugins.toast.showShortTop(content)
//   }
// }

// // 安卓
// var startup = {
//   sn: 'test',

//   // 初始化 建立桥接
//   initialize: function() {
//     startup.sn = device.uuid
//   },

//   // 监控nfc读取卡号
//   readingCardNo: function(callback) {
//     if (typeof nfc === 'undefined') {
//       window.plugins.toast.showShortTop('nfc未启动')
//     } else {
//       nfc.addTagDiscoveredListener(
//         getCardNo,
//         function() {
//         },
//         function() {
//         }
//       )
//     }
//     function getCardNo(nfcEvent) {
//       var tag = nfcEvent.tag
//       var o_rfid = nfc.bytesToHexString(tag.id)
//       var rfid = o_rfid.toUpperCase()
//       callback(rfid)
//     }
//   },

//   // 监控测温
//   readingTemperature: function(callback) {
//     var temperature = 0
//     callback(temperature)
//   },

// // 监控联网状态
// internetListener: function(callback) {
//   document.addEventListener("online", callback(true), false);
//   document.addEventListener("offline", callback(false), false);
// },

//   // 语音提示
//   read: function(content) {
//     TTS.speak(content)
//   },

//   // 弹窗提示
//   toast: function(content) {
//     window.plugins.toast.showShortTop(content)
//   }
// }
