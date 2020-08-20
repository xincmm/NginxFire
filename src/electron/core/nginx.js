const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const { NGINX_ROOT_PATH, NGINX_CONF_PATH } = require('../utils/paths')

shell.config.execPath = shell.which('node').toString()
const platform = process.platform

class Nginx {
  getStatus() {
    const nginxPidPath =
      platform === 'darwin'
        ? '/usr/local/var/run/nginx.pid'
        : '/var/run/nginx.pid'

    try {
      if (fs.existsSync(nginxPidPath)) {
        return 'running'
      }
    } catch (err) {
      console.log('err =>', err)
      return 'inactive'
    }
  }

  getVersion() {
    const version = shell.exec('nginx -v', { silent: true }).stderr
    return version.match(/\d.+/)[0] || ''
  }

  getMainConf() {
    return fs.readFileSync(path.join(NGINX_ROOT_PATH, 'nginx.conf')).toString()
  }

  getServers() {
    return fs.readdirSync(NGINX_CONF_PATH)
  }

  getConfByFile(file) {
    return fs.readFileSync(path.join(NGINX_CONF_PATH, file)).toString()
  }
}

module.exports = Nginx
