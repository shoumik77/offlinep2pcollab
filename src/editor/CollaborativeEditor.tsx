import React, { useEffect, useRef } from 'react'
import * as Y from 'yjs'
import * as awarenessProtocol from 'y-protocols/awareness'
import { WebrtcProvider } from 'y-webrtc'
import { EditorView, keymap } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { javascript } from '@codemirror/lang-javascript'
import { yCollab } from 'y-codemirror.next'
import './CollaborativeEditor.css'

interface CollaborativeEditorProps {
  doc: Y.Doc
  roomName: string
}

const CollaborativeEditor: React.FC<CollaborativeEditorProps> = ({ doc, roomName }) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const providerRef = useRef<WebrtcProvider | null>(null)

  useEffect(() => {
    const ytext = doc.getText('codemirror')

    if (!providerRef.current) {
        providerRef.current = new WebrtcProvider(roomName, doc, {
            signaling: ['ws://localhost:4444'],
            awareness: new awarenessProtocol.Awareness(doc)
          })
    }

    const view = new EditorView({
      state: EditorState.create({
        doc: ytext.toString(),
        extensions: [
          javascript(),
          history(),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          yCollab(ytext, providerRef.current.awareness)
        ]
      }),
      parent: editorRef.current!
    })

    return () => view.destroy()
  }, [doc, roomName])

  return <div ref={editorRef} className="editor" />
}

export default CollaborativeEditor
