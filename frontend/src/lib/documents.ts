import { Document } from '../types';

const STORAGE_KEY = 'user_documents';

export const documents = {
  getAll: (): Document[] => {
    const docs = localStorage.getItem(STORAGE_KEY);
    return docs ? JSON.parse(docs) : [];
  },

  add: (title: string, summary: string, originalText: string): Document => {
    const docs = documents.getAll();
    const newDoc: Document = {
      id: crypto.randomUUID(),
      user_id: 'demo-user',
      title,
      summary,
      original_text: originalText,
      created_at: new Date().toISOString(),
    };
    
    docs.push(newDoc);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
    return newDoc;
  },
};