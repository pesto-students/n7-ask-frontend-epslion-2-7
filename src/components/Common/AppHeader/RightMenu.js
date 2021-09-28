import React from 'react';
import {Link} from 'react-router-dom'
import './RightMenu.css'
import { Menu, Grid, Button } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const RightMenu = () => {
  const { md } = useBreakpoint();
  return (
    <Menu mode={md ? "horizontal" : "inline"}>
      <Menu.Item key="mail">
       <Button shape="round" className="rightMenuBtn"><Link to="/login">Log In</Link></Button>
      </Menu.Item>
      <Menu.Item key="app">
      <Button shape="round" className="rightMenuBtn"><Link to="/signup">Sign up</Link></Button>
      </Menu.Item>
    </Menu>
  );
}

export default RightMenu;