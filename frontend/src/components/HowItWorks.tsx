const HowItWorks = () => {
  return (
    <section id="how-it-works" className="scroll-mt-20">
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
        <h2 className="text-xl font-bold mb-4 text-indigo-400">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "1", title: "Upload Document", desc: "Upload any legal document in supported formats." },
            { step: "2", title: "Get Summary", desc: "Receive an AI-generated summary of key points." },
            { step: "3", title: "Ask Questions", desc: "Use the chat to get detailed answers about the document." },
          ].map((item) => (
            <div key={item.step} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                {item.step}
              </div>
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
