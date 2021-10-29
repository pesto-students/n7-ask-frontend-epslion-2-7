import React from "react";
import AskQuestion from "../../AskQuestion/AskQuestion";
import Feed from "../../Feed/Feed";
import { userContext } from "../../userContext/userContext";

function AppContent({ whatToShow, onFeedClick }) {
  return (
    <>
      <userContext.Consumer>
        {({user, setUser ,sort, searchQuery, toSort,selectedInterests}) => {
          return (
            
              <div id="mainAskContent">
              {user ? <AskQuestion  user={user}/> : null}
              <Feed whatToShow={whatToShow} onFeedClick={onFeedClick} user={user} sort={sort} searchQuery={searchQuery} toSort={toSort} selectedInterests={selectedInterests} />
              </div>
            
          );
        }}
      </userContext.Consumer>
    </>
  );
}

export default AppContent;
