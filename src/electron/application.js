const { EventEmitter } = require('events')

const Nginx = require('./core/nginx')

class Application extends EventEmitter {
  constructor() {
    super()

    this.nginx = new Nginx()
  }
}

module.exports = Application
