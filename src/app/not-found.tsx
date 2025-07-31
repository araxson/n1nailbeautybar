import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-light tracking-[0.2em] text-gray-900 mb-4">
          404
        </h1>
        <h2 className="text-xl font-light text-gray-600 mb-8">
          Page Not Found
        </h2>
        <Link
          href="/"
          className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-light tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
