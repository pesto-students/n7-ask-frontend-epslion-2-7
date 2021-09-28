import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Button } from "antd";
import "./App.css";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Interests from "./components/Interests/Interests";
import Dashboard from "./components/Dashboard/Dashboard";
import UserProfile from "./components/UserProfile/UserProfile";
import { userContext } from "./components/userContext/userContext";
import AppHeader from "./components/Common/AppHeader/AppHeader";
import ResetPassword from "./components/Login/ResetPassword";


const App = () => {
  const [whatToShow, setWhatToShow] = useState("feed");
  const [showDetailFeed, setShowDetailFeed] = useState(false);
  const [user, setUser] = useState(null);
  const [sort, toSort]= useState(false);
  const[showInterestPage, setShowInterestPage]= useState(false);
  return (
    <>
    
      <userContext.Provider value={{user,setUser, toSort, sort} }>
      
        <BrowserRouter>
       
          <Switch>
            <Route exact path="/">
              <Dashboard user={user} whatToShow={whatToShow} setWhatToShow={setWhatToShow} showDetailFeed={showDetailFeed} setShowDetailFeed={setShowDetailFeed} />
            </Route>
            <Route path="/reset">
             <ResetPassword/>
            </Route>
            <Route path="/login">
             <Login/>
            </Route>
            <Route path="/signup">
              <Registration setShowInterestPage={setShowInterestPage} />
            </Route>
            <Route path="/interests">
              {showInterestPage ?<Interests /> : <Redirect to='/'/>}
             
              
            </Route>
            <Route path="/userProfile">
            <AppHeader   setWhatToShow={setWhatToShow} setShowDetailFeed={setShowDetailFeed}/>
              {/* //Check if the user is logged In  */}
              {user!=null ? <UserProfile user={user}/> : <Redirect to='/login'/> }
              
            </Route>
          </Switch>
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
};

export default App ;

