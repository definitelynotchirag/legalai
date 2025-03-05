import { FileText, Brain, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <FileText className="h-8 w-8 text-indigo-500 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Smart Document Analysis</h3>
        <p className="text-gray-400">Upload any legal document and get instant, AI-powered analysis and summaries.</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <Brain className="h-8 w-8 text-indigo-500 mb-4" />
        <h3 className="text-lg font-semibold mb-2">AI-Powered Chat</h3>
        <p className="text-gray-400">Ask questions about your documents and get intelligent, context-aware responses.</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <Users className="h-8 w-8 text-indigo-500 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
        <p className="text-gray-400">Your documents are processed securely and privately, with user-specific access control.</p>
      </div>
    </div>
  );
};

export default HeroSection;
