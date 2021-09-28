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
    if (location.pathname == "/userProfile") {
      console.log(location.pathname);
      setWhatToShow(type);
      setShowDetailFeed(false);

      history.push("/");
    }
    else{

    setWhatToShow(type);
    setShowDetailFeed(false);
    }
  };
  const { md } = useBreakpoint();
  return (
    <Menu mode={md ? "horizontal" : "inline"}>
      <Menu.Item key="home" className="leftMenuOptions">
        <a onClick={() => onMenuClick("feed")}>Home</a>
      </Menu.Item>
      <Menu.Item key="questions"  className="leftMenuOptions">
        <a
          onClick={() => {
            onMenuClick("questions");
          }}
        >
          Questions
        </a>
      </Menu.Item>
      <Menu.Item key="answers"  className="leftMenuOptions">
        <a onClick={() => onMenuClick("answers")}>Answers</a>
      </Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
