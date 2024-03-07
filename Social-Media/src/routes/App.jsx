// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
// import CreatePost from "../components/CreatePost";
// import PostList from "../components/PostList";
import { Outlet } from "react-router-dom";
import PostListProvider from "../store/Posts-List-Store";

function App() {
  // const [count, setCount] = useState(0);
  // const [selectedTab, setSelectedTab] = useState("Home");
  return (
    <PostListProvider>
      <div className="appCnt">
        <Sidebar></Sidebar>
        <div className="content">
          <Header></Header>
          <Outlet />
          <Footer></Footer>
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
