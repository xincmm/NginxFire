import React from 'react'
import { SettingOutlined } from '@ant-design/icons'

import styles from './sidebar.module.scss'

const Sidebar = () => {

  return (
    <div className={styles.sidebar}>
      <div className={styles.nginx}>
        <SettingOutlined />
        <span>main config</span>
      </div>
    </div>
  )
}

export default Sidebar
