import React, { useState } from "react";
import "./Dashboard.css";
import { Layout, Divider,Affix } from "antd";
import { Route, Switch } from "react-router-dom";

import AppHeader from "../Common/AppHeader/AppHeader";
import AppContent from "../Common/AppContent/AppContent";
import AppSider from "../Common/AppSider/AppSider";
import UserProfile from "../UserProfile/UserProfile";
import FeedDetail from "../Common/FeedDetail/FeedDetail";
import { userContext } from "../userContext/userContext";

const { Header, Content, Sider } = Layout;

function Dashboard({
  user,
  setWhatToShow,
  setShowDetailFeed,
  whatToShow,
  showDetailFeed,
}) {
  const [feedContent, setFeedContent] = useState();

  const onFeedClick = (FeedDetails) => {
    setFeedContent(FeedDetails);
    setShowDetailFeed(true);
    console.log(FeedDetails);
  };
  return (
    <userContext.Consumer>
      {({ toSort,setSelectedInterests, selectedInterests }) => (
        <>
          <AppHeader
            setWhatToShow={setWhatToShow}
            setShowDetailFeed={setShowDetailFeed}
          />
          {!showDetailFeed && (
            
            <Layout>
              <Affix   offsetTop={70.5} >
              
              <Sider
             
                className="sider"
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                  console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                  console.log(collapsed, type);
                }}
              >
                
                <AppSider whatToShow={whatToShow} setWhatToShow={setWhatToShow} toSort={toSort} setSelectedInterests={setSelectedInterests} selectedInterests={selectedInterests}/>
              </Sider>
              </Affix>

              <Content className="mainContentShow" >
                <br/>
                <br/>
                <AppContent id="mainAskContent" whatToShow={whatToShow} onFeedClick={onFeedClick} />
              </Content>
            </Layout>
            
          )}
          
          
        </>
      )}
    </userContext.Consumer>
  );
}

export default Dashboard;
