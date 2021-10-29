import React from "react";
import "./Registration.css";
import axios from "axios";
import { useState } from "react";
import { Card, Input, Tooltip, Form, Button, Typography } from "antd";
import {
  InfoCircleOutlined,
  UserOutlined,
  GoogleOutlined,
  MailOutlined,
  FacebookOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  LockOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { Redirect, useLocation, useHistory,Link } from "react-router-dom";
import { Divider } from "antd";

const { Text, Title } = Typography;

function Registration({setShowInterestPage}) {

  const history = useHistory();
 const [emailExist, setEmailExistError]=useState("")
  const [Name, setName] = useState({
    firstClick: false,
    title: "",
  });

  const [Email, setEmail] = useState({
    firstClick: false,
    title: "",
  });
  const [Password, setPassword] = useState({
    firstClick: false,
    title: "",
  });
  const [submitClicked, setSubmitClicked] = useState(false);

  const Regex = {
    Email:
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    Name: /^[a-z ,.'-]+$/i,

    Password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
  };

  const errorValue = {
    Name: <span style={{color:"red"}}>Enter a valid name</span>,
    email: <span  style={{color:"red"}}>Enter a valid email</span>,
    password: <span  style={{color:"red"}}>Enter a valid password</span>,
  };

  const handleChange = (type, event) => {
    if (type === "Name") {
      setName({ ...Name, title: event.target.value });
    } else if (type === "Email") {
      setEmail({ ...Email, title: event.target.value });
    } else if (type === "Password") {
      setPassword({ ...Password, title: event.target.value });
    }
  };
  const handleSubmit = async(e) => {
    setSubmitClicked(true);
    e.preventDefault();

    if (
      Regex.Name.test(Name.title) &&
      Regex.Email.test(Email.title) &&
      Regex.Password.test(Password.title)
    ) {

       const response= await axios.post(`https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/user`, {name: Name.title, email:Email.title,password:Password.title}).catch(err=>{
         return err.response
       });
      console.log(response);
      if(response && response.status==200){
        //console.log("aa rha h")
       history.push('/login')
      }
      else if(response.data.message=="user with email Address is already exist"){
        setEmailExistError("User Already Exists")
      }
      
        // }
    }
  };

  return (
    
    <div className="container2 ">
      <Card className="formSignup" title={<Title  >SIGN UP </Title>}>
        <Form>
          <Form.Item>
            Name
            <Input
              onClick={() => {
                setName({ ...Name, firstClick: true });
              }}
              onChange={(e) => setName({ ...Name, title: e.target.value })}
              placeholder="Enter your Name"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
            {Name.firstClick || submitClicked
              ? Regex.Name.test(Name.title)
                ? null
                : errorValue.Name
              : null}
          </Form.Item>
          <Form.Item>
            Email
            <Input
              onClick={() => {
                setEmail({ ...Email, firstClick: true });
              }}
              onChange={(e) => {
                handleChange("Email", e);
              }}
              placeholder="Enter your email"
              prefix={<MailOutlined className="site-form-item-icon" />}
            />
            {Email.firstClick || submitClicked
              ? Regex.Email.test(Email.title)
                ? null
                : errorValue.email
              : null}
          </Form.Item>
          <Form.Item>
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
               
              
            <br />
            <span style={{color:"red"}}> {emailExist}</span>
           
            <br />
            <Button
              className="signUpBtn"
              size="large"
              block
              onClick={handleSubmit}
            >
              Create an account
            </Button>
          </Form.Item>

          <Divider>OR</Divider>
          

          <Button block icon={<GoogleOutlined />}>
            Continue with Google
          </Button>
          <br />
          <br />
          <Button block icon={<FacebookOutlined />}>
            Continue with Facebook
          </Button>
        </Form>
        <br />
        <Link className="signupLink" style={{color:"gray", textDecoration: "underline"}} to="/login">Click here to login!</Link>
      </Card>
    </div>
  
  );
}

export default Registration;
