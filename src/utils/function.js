import Vue from 'vue'

const openApiUrl = 'http://api.apps.cloudschools.cn'
const testHosts = ['localhost', '192.168']
const currentHost = window.location.host.toLowerCase()

Vue.prototype.getFileUrl = function(tenantId, id) {
  if (Number(id)) {
    for (let i = 0; i < testHosts.length; i++) {
      const host = testHosts[i]
      if (currentHost.indexOf(host) > -1) {
        return 'http://{0}/api/PubFile/{1}/Avatar/{2}'.format(currentHost, tenantId, id)
      }
    }
    return '{0}/api/PubFile/{1}/Avatar/{2}'.format(openApiUrl, tenantId, id)
  }
}
