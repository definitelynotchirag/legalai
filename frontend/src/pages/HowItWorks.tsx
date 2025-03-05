import { Upload, Search, MessageSquare, CheckCircle } from 'lucide-react';

export function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h1>
          <p className="text-base sm:text-lg text-gray-400">Understanding our document analysis process</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {[
            {
              icon: <Upload className="h-8 w-8 text-indigo-500" />,
              title: "Upload Document",
              description: "Upload your legal document in PDF, DOCX, or TXT format"
            },
            {
              icon: <Search className="h-8 w-8 text-indigo-500" />,
              title: "AI Analysis",
              description: "Our AI analyzes the document content and structure"
            },
            {
              icon: <MessageSquare className="h-8 w-8 text-indigo-500" />,
              title: "Interactive Chat",
              description: "Ask questions about your document and get instant answers"
            },
            {
              icon: <CheckCircle className="h-8 w-8 text-indigo-500" />,
              title: "Get Insights",
              description: "Receive detailed insights and summaries of your document"
            }
          ].map((step, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4 sm:p-6">
              <div className="flex flex-col items-center text-center">
                {step.icon}
                <h3 className="text-lg sm:text-xl font-semibold text-white mt-4 mb-2">{step.title}</h3>
                <p className="text-sm sm:text-base text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}