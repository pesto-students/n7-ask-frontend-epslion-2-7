import React, { useState } from "react";
import "./AppHeader.css";

import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Drawer, Button, Input,Menu } from "antd";
import { userContext } from "../../userContext/userContext";
import Avatar from "antd/lib/avatar/avatar";
import { Link } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
const { Search } = Input;

function AppHeader({ setWhatToShow, setShowDetailFeed }) {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const logOut = (setUser) => {
    setVisible(false);
    setUser(null);
  };
  return (
    <>
      <nav className="menuBar">
        <div className="logo">
          <h2>ASK</h2>
        </div>
        <div className="menuCon">
          <div className="leftMenu">
            <LeftMenu
              setWhatToShow={setWhatToShow}
              setShowDetailFeed={setShowDetailFeed}
            />
          </div>
         
          <Input  className="searchBarField"placeholder="default size"  prefix={<SearchOutlined />} />
     
          
          <userContext.Consumer>
            {({ user, setUser }) => {
              if (user) {
                return (
                  <>
                    <Avatar
                      className="barsMenu"
                      className="userIcon  "
                      size={{ lg: 50, md: 50, sm: 50, xs: 50, xl: 50, xxl: 50 }}
                      src={user}
                      onClick={showDrawer}
                    />
                    <Drawer
                      title="Menu"
                      placement="right"
                      closable={false}
                      onClose={onClose}
                      visible={visible}
                    >
                      <LeftMenu
                        setWhatToShow={setWhatToShow}
                        setShowDetailFeed={setShowDetailFeed}
                      />
                      <div className="menuDrawer">
                        <Link to="/userProfile">My Profile</Link>
                        <Button onClick={() => logOut(setUser)}>LogOut</Button>
                      </div>
                    </Drawer>
                  </>
                );
              } else {
                return (
                  <>
                    <div className="rightMenu">
                      <RightMenu />
                    </div>
                    <Button
                      className="barsMenu"
                      type="primary"
                      onClick={showDrawer}
                    >
                      <span className="barsBtn"></span>
                    </Button>
                    <Drawer
                      title="Menu"
                      placement="right"
                      closable={false}
                      onClose={onClose}
                      visible={visible}
                    >
                      <LeftMenu
                        setWhatToShow={setWhatToShow}
                        setShowDetailFeed={setShowDetailFeed}
                      />
                      <RightMenu />
                    </Drawer>
                  </>
                );
              }
            }}
          </userContext.Consumer>
        </div>
      </nav>
    </>
  );
}

export default AppHeader;
