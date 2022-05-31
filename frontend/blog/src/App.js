import MainView from "./views/MainView/MainView";
import FullPageNews from "./views/FullPageNews/FullPageNews";
import { Route, Routes } from 'react-router-dom';
import WriteNews from "./components/WriteNews/WriteNews";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<MainView/>}/>
          <Route path="/news/:id_news" element={<FullPageNews/>}/>
          <Route path="/write/" element={<WriteNews/>}/>
          <Route path="/login/" element={<Login/>}/>
          <Route path="/register/" element={<Register/>}/>
      </Routes>
    </>
  );
}

export default App;
