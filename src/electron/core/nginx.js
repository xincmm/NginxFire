const fs = require('fs')
const path = require('path')
const { NGINX_ROOT_PATH, NGINX_CONF_PATH } = require('../utils/paths')

class Nginx {
  getMainConf() {
    return fs.readFileSync(path.join(NGINX_ROOT_PATH, 'nginx.conf')).toString()
  }

  getServers() {
    return fs.readdirSync(NGINX_CONF_PATH)
  }

  getConfByPath(path) {
    return fs.readFileSync(path)
  }
}

module.exports = Nginx
