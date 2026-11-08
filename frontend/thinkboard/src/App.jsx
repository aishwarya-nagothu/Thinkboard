import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import NoteDetailpage from "./pages/NoteDetailpage";
import Createpage from "./pages/Createpage";

const App = () => {
  return (
    <>
    <div className = "relative h-full w-full">
      <div className = "absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%}]" />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/note/:id" element={<NoteDetailpage />} />
        <Route path="/create" element={<Createpage />} />
      </Routes>
      </div>
    </>
  );
};

export default App;