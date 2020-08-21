import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from 'antd'
import { UnControlled as CodeMirror } from 'react-codemirror2'

import { channels } from '../../../../../shared/constants'
import styles from './editor.module.scss'
require('codemirror/mode/nginx/nginx')

const { application, ipcRenderer } = window

const Editor = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const server = query.get('server')
  const editorRef = useRef({})

  const [value, setValue] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [notSaved, setNotSaved] = useState(false)

  const getConfigByServer = useCallback((server) => {
    if (server) {
      return application.nginx.getConfByFile(server)
    } else {
      return application.nginx.getMainConf()
    }
  }, [])

  useEffect(() => {
    setValue(getConfigByServer(server))
    setNotSaved(false)
  }, [server, getConfigByServer])

  const handleEditorChange = (editor, data, value) => {
    if (value !== getConfigByServer(server)) {
      setNotSaved(true)
    } else {
      setNotSaved(false)
    }
  }

  const handleReload = () => {
    setLoading(true)
    ipcRenderer.send(channels.NGINX_RELOAD)
    ipcRenderer.on(channels.NGINX_RELOAD, () => {
      ipcRenderer.removeAllListeners(channels.NGINX_RELOAD)
      setLoading(false)
    })
  }

  const handleSave = () => {
    setSaveLoading(true)
    ipcRenderer.send(channels.NGINX_SAVE, {
      server,
      value: editorRef.current.doc.getValue(),
    })
    ipcRenderer.on(channels.NGINX_SAVE, () => {
      ipcRenderer.removeAllListeners(channels.NGINX_SAVE)
      setSaveLoading(false)
      setNotSaved(false)
    })
  }

  return (
    <div className={styles.editor}>
      <div className={styles.header}>
        <div className={styles.info}>
          <span>last modified: 2020-08-10 12:12:12</span>
          <span>modifier: chenyuming</span>
          {notSaved && <span className={styles.save}>Not Saved</span>}
        </div>
        <div className={styles.action}>
          {notSaved && (
            <Button
              loading={saveLoading}
              className='margin-right-sm'
              onClick={handleSave}
            >
              Save
            </Button>
          )}
          <Button className='margin-right-sm'>Test</Button>
          <Button loading={loading} type='primary' onClick={handleReload}>
            Reload
          </Button>
        </div>
      </div>
      <CodeMirror
        value={value}
        options={{
          mode: 'nginx',
          theme: 'base16-light',
          lineNumbers: true,
          indentUnit: 4,
          indentWithTabs: false,
          extraKeys: {
            'Ctrl-S': () => handleSave(),
            'Cmd-S': () => handleSave(),
            Tab: function (cm) {
              if (cm.somethingSelected()) {
                cm.indentSelection('add')
              } else {
                cm.replaceSelection(
                  cm.getOption('indentWithTabs')
                    ? '\t'
                    : Array(cm.getOption('indentUnit') + 1).join(' '),
                  'end',
                  '+input',
                )
              }
            },
          },
        }}
        onChange={handleEditorChange}
        editorDidMount={(editor) => (editorRef.current = editor)}
      />
    </div>
  )
}

export default Editor
