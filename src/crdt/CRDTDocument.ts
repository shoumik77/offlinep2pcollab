import * as Y from 'yjs'

export class CRDTDocument {
  private ydoc: Y.Doc
  private ytext: Y.Text

  constructor(docId: string = 'main') {
    this.ydoc = new Y.Doc({ guid: docId })
    this.ytext = this.ydoc.getText('editor')
  }

  /**
   * Returns the Y.Doc instance (for awareness or syncing)
   */
  getDocument(): Y.Doc {
    return this.ydoc
  }

  /**
   * Returns the Y.Text object used for collaborative text editing
   */
  getText(): Y.Text {
    return this.ydoc.getText('editor')
  }
  
  /**
   * Register a callback to run on every CRDT update
   */
  onUpdate(callback: (update: Uint8Array) => void): void {
    this.ydoc.on('update', callback)
  }

  /**
   * Apply an incoming CRDT update (e.g. from WebRTC)
   */
  applyUpdate(update: Uint8Array): void {
    Y.applyUpdate(this.ydoc, update)
  }

  /**
   * Encode the current document state to send to new peers
   */
  encodeState(): Uint8Array {
    return Y.encodeStateAsUpdate(this.ydoc)
  }

  /**
   * Destroy the document and clean up memory
   */
  destroy(): void {
    this.ydoc.destroy()
  }
}
