import React from "react";
import { Link } from "react-router-dom";
import "./RightMenu.css";
import { Menu, Grid, Button } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const RightMenu = ({ user, logOut, setUser }) => {
  const { md } = useBreakpoint();

  const UserNotLoggedIn = (
    <Menu mode={md ? "horizontal" : "inline"}>
    
        <Button shape="round" className="rightMenuBtn">
          <Link to="/login">Log In</Link>
        </Button>

        <br/>
      
        <Button shape="round" className="rightMenuBtn">
          <Link to="/signup">Sign up</Link>
        </Button>
      
    </Menu>
  );

  const UserLoggedIn = (
    <Menu >
      <Menu.Item key="mail">
        <Link to="/userProfile">My Profile</Link>
      </Menu.Item>
      <Menu.Item key="app">
        <Button className="rightMenuBtn" onClick={() => logOut(setUser)}>LogOut</Button>
      </Menu.Item>
    </Menu>
  );
  return <>{user ? UserLoggedIn : UserNotLoggedIn}</>;
};

export default RightMenu;
