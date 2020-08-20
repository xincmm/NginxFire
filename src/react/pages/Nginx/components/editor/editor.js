import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from 'antd'
import { UnControlled as CodeMirror } from 'react-codemirror2'

import styles from './editor.module.scss'
require('codemirror/mode/nginx/nginx')

const { application } = window

const Editor = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const server = query.get('server')

  const [value, setValue] = useState('')

  useEffect(() => {
    if (server) {
      setValue(application.nginx.getConfByFile(server))
    } else {
      setValue(application.nginx.getMainConf())
    }
  }, [server])

  const handleEditorChange = (editor, data, value) => {
    // console.log('editor =>', editor)
    // console.log('data =>', data)
    // console.log('value =>', value)
  }

  return (
    <div className={styles.editor}>
      <div className={styles.header}>
        <div className={styles.info}>
          <span>last modified: 2020-08-10 12:12:12</span>
          <span>modifier: chenyuming</span>
        </div>
        <div className={styles.action}>
          <Button className='margin-right-sm'>Test</Button>
          <Button type='primary'>Reload</Button>
        </div>
      </div>
      <CodeMirror
        value={value}
        options={{
          mode: 'nginx',
          theme: 'base16-light',
          lineNumbers: true,
          indentUnit: 4,
        }}
        onChange={handleEditorChange}
      />
    </div>
  )
}

export default Editor