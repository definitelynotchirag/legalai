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
            <div className="w-full bg-gray-700 p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-indigo-500" />
                <p className="text-sm text-gray-300">{selectedFile.name}</p>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-gray-400 hover:text-red-500 text-xs"
              >
                Remove
              </button>
            </div>
          )}
          {selectedFile && (
            <button
              onClick={onSummarize}
              disabled={loading}
              className="w-full py-3 px-6 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 flex justify-center items-center transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                'Analyze Document'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}