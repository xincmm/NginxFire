const { EventEmitter } = require('events')

const Nginx = require('./core/nginx')

class Application extends EventEmitter {
  constructor() {
    super()
    this.nginx = new Nginx()
  }

  getAppInfo() {
    let nginxVersion = ''
    const nginxStatus = this.nginx.getStatus()
    if (nginxStatus === 'running') {
      nginxVersion = this.nginx.getVersion()
    }
    return {
      nginx: {
        status: nginxStatus,
        version: nginxVersion,
      },
    }
  }
}

module.exports = Application
