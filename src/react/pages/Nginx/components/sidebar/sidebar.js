import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import classnames from 'classnames'
import { Button } from 'antd'
import { SettingOutlined, FileTextOutlined } from '@ant-design/icons'

import styles from './sidebar.module.scss'
const { application } = window

const Sidebar = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const currentServer = query.get('server')

  const [servers, setServers] = useState([])

  useEffect(() => {
    setServers(application.nginx.getServers())
  }, [])

  return (
    <div className={styles.sidebar}>
      <div className={styles.nginx}>
        <Link to='/nginx'>
          <SettingOutlined />
          <span>main config</span>
        </Link>
      </div>
      <div className={styles.servers}>
        <div className={styles.new}>
          <Link to='/nginx/new'>
            <Button type='primary'>new server</Button>
          </Link>
        </div>
        {servers.map((server) => (
          <div
            key={server}
            className={classnames({
              [styles.server]: true,
              [styles.active]: currentServer === server,
            })}
          >
            <Link
              to={{
                pathname: '/nginx',
                search: `?server=${server}`,
              }}
            >
              <FileTextOutlined />
              <span>{server}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
