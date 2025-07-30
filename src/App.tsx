import React from 'react'
import CollaborativeEditor from './editor/CollaborativeEditor'
import * as Y from 'yjs'
import './App.css'
const doc = new Y.Doc()

function App() {
  return <CollaborativeEditor doc={doc} roomName="peerpad-room" />
}

export default App
