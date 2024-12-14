// pages/index.tsx
import Link from 'next/link';  // Import Next.js Link

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Welcome to the Invoice System</h1>
      <div className="space-y-4">
        <Link
          href="/manually"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >

          Create Manually

        </Link>
        <Link
          href="/auto"
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
        >

          Upload Excel File

        </Link>
      </div>
    </div>
  );
};

export default Home;
