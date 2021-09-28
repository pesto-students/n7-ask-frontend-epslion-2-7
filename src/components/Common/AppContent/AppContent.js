import React from "react";
import AskQuestion from "../../AskQuestion/AskQuestion";
import Feed from "../../Feed/Feed";
import { userContext } from "../../userContext/userContext";

function AppContent({ whatToShow, onFeedClick }) {
  return (
    <>
      <userContext.Consumer>
        {({user, setUser ,sort}) => {
          return (
            <>

              {user ? <AskQuestion  /> : null}
              <Feed whatToShow={whatToShow} onFeedClick={onFeedClick} user={user} sort={sort}  />
            </>
          );
        }}
      </userContext.Consumer>
    </>
  );
}

export default AppContent;
