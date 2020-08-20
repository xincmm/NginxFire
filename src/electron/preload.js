const { ipcRenderer, remote } = require('electron')
const application = remote.getGlobal('application')

window.ipcRenderer = ipcRenderer
window.application = application
