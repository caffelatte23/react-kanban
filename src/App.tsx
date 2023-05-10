import "./App.css";
import { SideBar, SideBarItem } from "./components/sideBar";
import Main from "./pages/kanban/index";

function App() {
  return (
    <div className="body">
      <div className="header">header</div>
      <SideBar>
        <SideBarItem label="Project1" onClick={() => console.log("called")} />
        <SideBarItem label="item" />
        <SideBarItem label="item" />
      </SideBar>
      <Main />
    </div>
  );
}

export default App;
