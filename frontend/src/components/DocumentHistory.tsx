import React from 'react';
import { FileText, Clock } from 'lucide-react';
import { Document } from '../types';

interface DocumentHistoryProps {
  documents: Document[];
  onSelect: (doc: Document) => void;
}

export function DocumentHistory({ documents, onSelect }: DocumentHistoryProps) {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Clock className="w-6 h-6 text-indigo-500" />
        <h2 className="text-xl font-bold text-indigo-400">Document History</h2>
      </div>
      
      {documents.length === 0 ? (
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No documents analyzed yet</p>
          <p className="text-sm text-gray-500">Upload a document to get started</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => onSelect(doc)}
              className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer border border-gray-600"
            >
              <div className="flex items-start space-x-3">
                <FileText className="w-6 h-6 text-indigo-500 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-200">{doc.title}</h3>
                  <p className="text-sm text-gray-400">
                    {new Date(doc.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-300 mt-2 line-clamp-3">
                    {doc.summary}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}