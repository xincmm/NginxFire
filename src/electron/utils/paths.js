const platform = process.platform

// nginx root dir
const NGINX_ROOT_PATH =
  platform === 'darwin' ? '/usr/local/etc/nginx' : '/etc/nginx'

// nginx config dir
const NGINX_CONF_PATH =
  platform === 'darwin' ? '/usr/local/etc/nginx/servers' : '/etc/nginx/conf.d'

module.exports = {
  NGINX_ROOT_PATH,
  NGINX_CONF_PATH,
}
