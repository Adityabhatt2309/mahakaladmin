// components/Layout.js
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6 bg-gray-100">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
