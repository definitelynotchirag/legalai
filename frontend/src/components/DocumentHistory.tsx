import { FileText, Clock } from 'lucide-react';
import { Document } from '../types';

interface DocumentHistoryProps {
  documents: Document[];
  onSelect: (doc: Document) => void;
}

export function DocumentHistory({ documents, onSelect }: DocumentHistoryProps) {
  return (
    <section id="document-history" className="scroll-mt-20">
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-xl font-bold text-indigo-400 flex items-center space-x-3">
          <Clock className="w-6 h-6 text-indigo-500" />
          <span>Document History</span>
        </h2>
        {/* Render documents here */}
      </div>
    </section>
  );
}
