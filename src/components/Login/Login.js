import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect, useHistory, Link } from "react-router-dom";
import "./Login.css";
import { Card, Input, Tooltip, Form, Button, Typography } from "antd";
import {
  InfoCircleOutlined,
  UserOutlined,
  GoogleOutlined,
  FacebookOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Divider } from "antd";
import { userContext } from "../userContext/userContext";
import axios from "axios";

const { Text, Title } = Typography;
const errorValue = {
  email: <span style={{color:"red"}}>Enter a valid email</span>,
  password: <span style={{color:"red"}}>Enter a valid password</span>,
};
const Regex = {
  Email:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  Password:  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i
};
export default function Login() {
  const [Email, setEmail] = useState({
    firstClick: false,
    title: "",
  });
  const [Password, setPassword] = useState({
    firstClick: false,
    title: "",
  });
  const [InvalidUser, setInvalidUserError]=useState('');
  const [submitClicked, setSubmitClicked] = useState(false);
  let  history = useHistory();

  
   
    
  
  const handleSubmit = async (e,setUser) => {
    setSubmitClicked(true);
    
    if(Regex.Email.test(Email.title) &&
    Regex.Password.test(Password.title)){

      const response = await axios.post(`https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/login`, {email:Email.title, password:Password.title}).catch(err=>{
        if(err.response.status==401){
          setInvalidUserError("Invalid User Credentials")
         // throw new Error('Invalid Credentials')
        }
      })
       console.log(response)

       if(response && response.status==200){
         setInvalidUserError('')
         console.log("userData==="+ response.data.data)
        setUser(response.data.data);
        history.push('/');
       }
      

    }
    
   // setUser("./logo512.png");
    //history.push('/');
   
    //e.preventDefault();

    //send the post request with the email and password and get a response
   
    
    //console.log(response)
    //routeChange();
    
    
    // if response is validated and user exists , then re route to the dashboard page and set user to true
  };

  const handleChange = (type, event) => {
    if (type === "Email") {
      setEmail({ ...Email, title: event.target.value });
    } else if (type === "Password") {
      setPassword({ ...Password, title: event.target.value });
    }
  };
  return (
    <div className="container2 ">
      <Card
        className="formLogin"
        title={
          <Title  level={2}  > SIGN IN
          </Title>
        }
      >
        <Form.Item className="textDesign">
          Email
          <Input
            onClick={() => {
              setEmail({ ...Email, firstClick: true });
            }}
            onChange={(e) => {
              handleChange("Email", e);
            }}
            placeholder="Enter your email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Extra information">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
          {Email.firstClick || submitClicked
            ? Regex.Email.test(Email.title)
              ? null
              : errorValue.email
            : null}
        </Form.Item>
        <Form.Item className="textDesign">
          Password
          <Input.Password
            onClick={() => {
              setPassword({ ...Password, firstClick: true });
            }}
            onChange={(e) => {
              handleChange("Password", e);
            }}
            placeholder="Enter your password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          {Password.firstClick || submitClicked
            ? Regex.Password.test(Password.title)
              ? null
              : errorValue.password
            : null}
         
          <span style={{color:"red"}}>{InvalidUser}</span>
           
            </Form.Item>
            
            <Link className="createAccountLink" style={{color:"gray", textDecoration: "underline",float:"left"}} to="/reset">Forgot Password ?</Link>
            <Link className="createAccountLink" style={{color:"gray", textDecoration: "underline",float:"right"}} to="/signup">Create Account.</Link>
            
            
            {/*ForgotPassword*/}
            
          

          <userContext.Consumer>
            {({user,setUser})=>{
              return (
               <Button
               onClick={(e) => {
                 handleSubmit(e,setUser);
               }}
               type="primary"
               style={{ backgroundColor: "black" }}
               size="large"
               block
             >
               Sign in
             </Button>
              )
            }}
           
          </userContext.Consumer>
          <br />
          <Divider>OR</Divider>
        
          <Button block icon={<GoogleOutlined />}>
            Sign in with Google
          </Button>
          <br />
          <br />
          <Button block icon={<FacebookOutlined />}>
            Sign in with Facebook
          </Button>
          <br/>
          
      </Card>
    </div>
  );
}
