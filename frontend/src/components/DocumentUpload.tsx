import React, { useState } from 'react';
import { Upload, FileText } from 'lucide-react';

interface DocumentUploadProps {
  onUpload: (file: File) => void;
  onSummarize: () => void;
  loading: boolean;
}

export function DocumentUpload({ onUpload, onSummarize, loading }: DocumentUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onUpload(file);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="h-6 w-6 text-indigo-500" />
          <h2 className="text-xl font-bold text-indigo-400">Document Analysis</h2>
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-full">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 mb-4 text-indigo-500" />
                <p className="mb-2 text-sm text-gray-300">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400">PDF, PNG, JPG or DOCX (MAX. 10MB)</p>
              </div>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg,.docx"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {selectedFile && (
            <div className="w-full">
              <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-300 flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-indigo-500" />
                  {selectedFile.name}
                </p>
              </div>
              <button
                onClick={onSummarize}
                disabled={loading}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Analyzing Document...' : 'Analyze Document'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}