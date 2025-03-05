import { FileText, Clock } from 'lucide-react';

export function DocumentHistory() {
  return (
    <div className="min-h-screen bg-gray-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Clock className="h-6 w-6 text-indigo-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Document History</h2>
          </div>
          
          <div className="space-y-4">
            {/* Placeholder for document history items */}
            <div className="bg-gray-700 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-indigo-400 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-medium">Sample Document.pdf</h3>
                  <p className="text-gray-400 text-sm">Uploaded on March 15, 2024</p>
                </div>
              </div>
              <button className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                View Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}