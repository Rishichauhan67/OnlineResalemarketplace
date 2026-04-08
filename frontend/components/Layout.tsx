import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      
      {/* Main Content */}
      <main className="w-full p-6 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
}