import React from 'react'
import { Menu } from 'antd'
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons'
import styles from './navbar.module.scss'

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img
          src='https://img.icons8.com/color/512/000000/nginx.png'
          title='logo'
          alt='logo'
        />
        <div className={styles.name}>
          <span>NginxFire</span>
          <span>V1.0.1</span>
        </div>
      </div>
      <Menu onClick={() => {}} selectedKeys={['mail']} mode='horizontal'>
        <Menu.Item key='mail' icon={<MailOutlined />}>
          Nginx
        </Menu.Item>
        <Menu.Item key='app' icon={<AppstoreOutlined />}>
          Cert
        </Menu.Item>
        <Menu.Item key='alipay'>Host</Menu.Item>
      </Menu>

      <div className={styles.status}>
        <span>nginx status：</span>
        <span className={styles.active}>running</span>
      </div>
    </div>
  )
}

export default Navbar
