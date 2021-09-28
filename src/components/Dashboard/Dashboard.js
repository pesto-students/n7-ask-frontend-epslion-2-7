import React, { useState } from "react";
import "./Dashboard.css";
import { Layout, Divider } from "antd";
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
      {({ toSort }) => (
        <>
          <AppHeader
            setWhatToShow={setWhatToShow}
            setShowDetailFeed={setShowDetailFeed}
          />
          {!showDetailFeed && (
            <Layout>
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
                <AppSider setWhatToShow={setWhatToShow} toSort={toSort}/>
              </Sider>

              <Content>
                <AppContent whatToShow={whatToShow} onFeedClick={onFeedClick} />
              </Content>
            </Layout>
          )}
          {/* SHow Feed Details */}
          {showDetailFeed && (
            <FeedDetail
              setShowDetailFeed={setShowDetailFeed}
              feedContent={feedContent}
              user={user}
            />
          )}
        </>
      )}
    </userContext.Consumer>
  );
}

export default Dashboard;
