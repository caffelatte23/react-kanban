import "./App.css";
import { SideBar, SideBarItem } from "./components/sideBar";
import RouterView from "./router";

function App() {
  return (
    <div className="body">
      <div className="header">header</div>
      <SideBar>
        <SideBarItem label="Project1" to="/" />
        <SideBarItem label="List" to="/list" />
        <SideBarItem label="item" />
      </SideBar>
      <RouterView />
    </div>
  );
}

export default App;
