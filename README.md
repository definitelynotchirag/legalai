# LegalAI

LegalAI is a web application designed to provide intelligent analysis and summaries of legal documents. It leverages AI to help users quickly understand the key points of their documents and interact with them through a chatbot interface.

## Features

- **Document Upload**: Upload legal documents in various formats (PDF, PNG, JPG, DOCX) for analysis.
- **AI-Powered Analysis**: Get instant, AI-generated summaries of key points in your documents.
- **Interactive Chat**: Ask questions about your documents and receive intelligent, context-aware responses.
- **Document History**: View the history of uploaded documents and their analyses.
- **Secure & Private**: Your documents are processed securely and privately, with user-specific access control.

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Zustand, React Router, Swiper
- **Backend**: Node.js, Express, Multer, Axios, FormData
- **Authentication**: Mock authentication using local storage
- **State Management**: Zustand
- **API Integration**: Supabase

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/legalai.git
   cd legalai
   ```

2. Install the dependencies for the frontend:

   ```sh
   cd frontend
   npm install
   ```

3. Install the dependencies for the backend:

   ```sh
   cd ../backend
   npm install
   ```

### Running the Application

1. Start the backend server:

   ```sh
   cd backend
   node server.js
   ```

2. Start the frontend development server:

   ```sh
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

1. **Sign In / Sign Up**: Create an account or sign in to your existing account.
2. **Upload Document**: Navigate to the "Document Upload" page and upload a legal document.
3. **Analyze Document**: Click the "Analyze Document" button to get an AI-generated summary.
4. **View History**: Navigate to the "Document History" page to view previously uploaded documents and their analyses.
5. **Interactive Chat**: Use the chatbot to ask questions about your documents and get intelligent responses.

## Environment Variables

Create a .env file in the frontend directory and add the following environment variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.io/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Swiper](https://swiperjs.com/)
- [Lucide Icons](https://lucide.dev/)

---

Thank you for using LegalAI! If you have any questions or feedback, please feel free to reach out.