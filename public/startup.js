// 开发
var developmentStartup = {
  sn: 'test',

  // 初始化 建立桥接
  initialize: function() {
    developmentStartup.sn = 'test'
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
    window.alert(content)
  },

  // 弹窗提示
  toast: function(content) {
    window.alert(content)
  }
}

// 安卓
var startup = {
  sn: 'test',

  // 初始化 建立桥接
  initialize: function() {
    startup.sn = device.uuid
  },

  // 监控nfc读取卡号
  readingCardNo: function(callback) {
    if (typeof nfc === 'undefined') {
      window.plugins.toast.showShortTop('nfc未启动')
    } else {
      nfc.addTagDiscoveredListener(
        getCardNo,
        function() {},
        function() {}
      )
    }
    function getCardNo(nfcEvent) {
      var tag = nfcEvent.tag
      var o_rfid = nfc.bytesToHexString(tag.id)
      var rfid = o_rfid.toUpperCase()
      callback(rfid)
    }
  },

  // 监控测温
  readingTemperature: function(callback) {
    var temperature = 0
    callback(temperature)
  },

  // 监控联网状态
  internetListener: function(callback) {
    document.addEventListener('online', callback(true), false)
    document.addEventListener('offline', callback(false), false)
  },

  // 语音提示
  read: function(str) {
    if (!str) {
      return
    }
    var unicode = ''
    for (var i = 0; i < str.length; i++) {
      var temp = str.charCodeAt(i).toString(16)
      if (temp.length > 2) {
        unicode += '\\u' + temp.substring(2, 4) + temp.substring(0, 2)
      } else {
        unicode += '\\u' + temp + '00'
      }
    }
    var result = unescape(unicode.replace(/\\/g, '%'))
    TTS.speak(result)
  },

  // 弹窗提示
  toast: function(content) {
    window.plugins.toast.showShortTop(content)
  }
}

function TtsUnicode(str) {}
