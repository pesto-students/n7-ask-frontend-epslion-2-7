import React, { useState } from "react";
import "./AppHeader.css";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Drawer, Button, Input, Menu, Affix, Grid } from "antd";
import { userContext } from "../../userContext/userContext";
import Avatar from "antd/lib/avatar/avatar";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
const { Search } = Input;
const { useBreakpoint } = Grid;

function AppHeader({ setWhatToShow, setShowDetailFeed }) {
  const history = useHistory();
  const { md } = useBreakpoint();
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

  const onSearchClick =()=>{
    
    history.push('/')
    setWhatToShow("search")

  }
  return (
    <>
      <Affix className="testingAffix">
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
            <userContext.Consumer>
              {({ searchQuery, setSearchQuery }) => {
                return (
                  <Input
                    className="searchBarField"
                    placeholder="Search"
                    value={searchQuery}
                    prefix={<SearchOutlined />}
                    onClick={()=>onSearchClick()}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                    onPressEnter={console.log("msg" + searchQuery)}
                  />
                );
              }}
            </userContext.Consumer>

            <userContext.Consumer>
              {({ user, setUser }) => {
                if (user) {
                  return (
                    <>
                      <Avatar
                        className="barsMenu"
                        className="userIcon  "
                        size={{
                          lg: 80,
                          md: 100,
                          sm: 50,
                          xs: 50,
                          xl: 50,
                          xxl: 50,
                        }}
                        src={
                          user.profilePic ? user.profilePic : "./logo192.png"
                        }
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
                        <RightMenu
                          user={user}
                          logOut={logOut}
                          setUser={setUser}
                        />
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
                        <RightMenu
                          user={user}
                          logOut={logOut}
                          setUser={setUser}
                        />
                      </Drawer>
                    </>
                  );
                }
              }}
            </userContext.Consumer>
          </div>
        </nav>
      </Affix>
    </>
  );
}

export default AppHeader;
