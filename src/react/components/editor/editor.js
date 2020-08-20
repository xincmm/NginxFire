import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { UnControlled as CodeMirror } from 'react-codemirror2'

import styles from './editor.module.scss'
require('codemirror/mode/nginx/nginx')

const { application } = window

const Editor = () => {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(application.nginx.getMainConf())
  }, [])

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
        onChange={(editor, data, value) => {}}
      />
    </div>
  )
}

export default Editor
