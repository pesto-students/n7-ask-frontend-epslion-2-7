import React from "react";
import { Menu, Grid } from "antd";
import { Redirect, useLocation, useHistory } from "react-router-dom";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const LeftMenu = ({ setWhatToShow, setShowDetailFeed }) => {
  const location = useLocation();
  const history = useHistory();
  const onMenuClick = (type) => {
    setWhatToShow(type);
    setShowDetailFeed(false);

    if (location.pathname !== "/") {
      console.log(location.pathname);
      history.push("/");
      setWhatToShow(type);
      setShowDetailFeed(false);
    }
   
  
  };
  const { md } = useBreakpoint();
  return (
    <Menu mode={md ? "horizontal" : "inline"} selectedKeys={[location.pathname]}>
      <Menu.Item key="/" className="leftMenuOptions">
        <a onClick={() => onMenuClick("home")}>Home</a>
      </Menu.Item>
      {/* <Menu.Item key="questions"  className="leftMenuOptions">
        <a
          onClick={() => {
            onMenuClick("home");
          }}
        >
          Questions
        </a>
        
      </Menu.Item> */}
      {/* <Menu.Item key="answers"  className="leftMenuOptions">
        <a
          onClick={() => {
            onMenuClick("answers");
          }}
        >
          Answers
        </a>
        
      </Menu.Item> */}
      {/* <Menu.Item key="answers"  className="leftMenuOptions">
        <a onClick={() => onMenuClick("answers")}>Answers</a>
      </Menu.Item> */}
    </Menu>
  );
};

export default LeftMenu;
