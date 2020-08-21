const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const sudo = require('sudo-prompt')
const { NGINX_ROOT_PATH, NGINX_CONF_PATH } = require('../utils/paths')

shell.config.execPath = shell.which('node').toString()
const platform = process.platform

const sudoOptions = {
  name: 'NginxFire',
}

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

  reload() {
    return new Promise((resolve, reject) => {
      sudo.exec('nginx -s reload', sudoOptions, async function (error) {
        if (error) {
          console.log('执行！')
          reject(error)
        }
        resolve(true)
      })
    })
  }

  saveFile(server, value) {
    const serverPath = path.join(NGINX_CONF_PATH, server)
    return new Promise((resolve, reject) => {
      sudo.exec(`echo "${value}" > ${serverPath}`, sudoOptions, function (
        error,
      ) {
        if (error) {
          reject(error)
        }
        resolve(true)
      })
    })
  }
}

module.exports = Nginx
