import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home/Home";
import CreateRoom from "./components/pages/create-room/create-room";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/createroom" element={<CreateRoom />} />
    </Routes>
  );
}
