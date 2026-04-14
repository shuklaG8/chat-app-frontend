import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-7xl h-[90vh] flex rounded-3xl overflow-hidden border border-pink-500/20 bg-[#1b0b2e]/60 backdrop-blur-2xl shadow-[0_0_60px_rgba(236,72,153,0.12)]">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default HomePage;