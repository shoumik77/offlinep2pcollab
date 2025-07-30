import { IndexeddbPersistence } from 'y-indexeddb'
import { CRDTDocument } from './CRDTDocument'

export class CRDTPersistence {
  private persistence: IndexeddbPersistence

  constructor(docId: string, crdt: CRDTDocument) {
    const ydoc = crdt.getDocument()
    this.persistence = new IndexeddbPersistence(docId, ydoc)

    this.persistence.once('synced', () => {
      console.log(`[IndexedDB] Document '${docId}' synced from local storage.`)
    })
  }

  /**
   * Optional: manually clear persisted data (for testing/reset)
   */
  async clearStorage(): Promise<void> {
    await this.persistence.clearData()
    console.log('[IndexedDB] Local storage cleared.')
  }
}
