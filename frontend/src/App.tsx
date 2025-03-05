import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { Auth } from './components/Auth';
import { DocumentUpload } from './components/DocumentUpload';
import { ChatWidget } from './components/ChatWidget';
import { DocumentHistory } from './components/DocumentHistory';
import { Document } from './types';
import { documents } from './lib/documents';
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import { Scale, FileText, Users, Brain } from 'lucide-react';

function App() {
  const { user, setUser } = useAuthStore();
  const [userDocuments, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (user) {
      setDocuments(documents.getAll());
    }
  }, [user]);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      console.log('File content:', text);
    };
    reader.readAsText(file);
  };

  const handleSummarize = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const newDoc = documents.add(
        'Sample Document',
        'This is a mock summary of the document.',
        'Original text would go here.'
      );
      setDocuments(documents.getAll());
      setShowChat(true);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Auth />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Navbar user={user} />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="space-y-12">
                  <HeroSection />
                  <HowItWorks />
                  <DocumentUpload onUpload={handleFileUpload} onSummarize={handleSummarize} loading={loading} />
                  <DocumentHistory documents={userDocuments} onSelect={() => {}} />
                </div>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {true && <ChatWidget />} {/* Change this to a state variable if needed */}
      </div>
    </Router>
  );
}

export default App;