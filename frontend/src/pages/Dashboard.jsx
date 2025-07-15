import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="text-2xl font-bold text-gray-800 min-h-screen flex items-center justify-center flex-col">
      <h1>Dashboard</h1>
      <div className="mt-4 space-x-4">
        <Link
          to="/login"
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
        >
          Login
        </Link>
        <Link
          to="/login"
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/login"; // Triggers register mode manually
          }}
        >
          Register
        </Link>
      </div>
    </div>
  );
}
export default Dashboard;