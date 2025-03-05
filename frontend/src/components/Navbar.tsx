import { Scale } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const Navbar = ({ user }: { user: { email: string } }) => {
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-3">
            <Scale className="h-8 w-8 text-indigo-500" />
            <h1 className="text-xl font-bold text-indigo-400">Legal AI</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">{user.email}</span>
            <button
              onClick={() => {
                useAuthStore.getState().setUser(null);
                window.location.href = "/";
              }}
              className="text-gray-300 hover:text-white bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
