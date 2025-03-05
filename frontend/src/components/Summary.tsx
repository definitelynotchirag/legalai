import React from 'react';
import { FileText, Loader2, CheckCircle, XCircle } from 'lucide-react';

interface SummaryProps {
  summary: string | null;
  loading: boolean;
  onReset: () => void;
}

export function Summary({ summary, loading, onReset }: SummaryProps) {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="h-6 w-6 text-indigo-500" />
          <h2 className="text-xl font-bold text-indigo-400">Analysis Summary</h2>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4">
          {loading ? (
            <div className="flex items-center space-x-2 text-gray-300">
              <Loader2 className="w-5 h-5 animate-spin" />
              <p>Analyzing document...</p>
            </div>
          ) : summary ? (
            <div className="w-full bg-gray-700 p-4 rounded-lg flex flex-col space-y-2">
              <div className="flex items-center text-green-400">
                <CheckCircle className="w-5 h-5 mr-2" />
                <p className="font-medium">Analysis Complete</p>
              </div>
              <p className="text-sm text-gray-300">{summary}</p>
            </div>
          ) : (
            <div className="text-gray-400 text-sm italic">No summary available.</div>
          )}

          <button
            onClick={onReset}
            className="w-full py-3 px-6 rounded-lg text-white font-medium bg-red-600 hover:bg-red-700 disabled:bg-red-400 flex justify-center items-center transition-all"
          >
            <XCircle className="w-5 h-5 mr-2" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
