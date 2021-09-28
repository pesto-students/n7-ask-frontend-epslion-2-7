import React, { useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
  Link,
} from "react-router-dom";
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
import axios from "axios";
import "./ResetPassword.css";

import { Divider } from "antd";

const { Text, Title } = Typography;
const errorValue = {
  email: <span>Enter a valid email</span>,
  password: <span>Enter a valid password</span>,
  dontMatch: <span>Password Doesn't Match</span>,
};
const Regex = {
  Email:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  Password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
};

function ResetPassword() {
  const [Email, setEmail] = useState({
    firstClick: false,
    title: "",
  });
  const [Password, setPassword] = useState({
    firstClick: false,
    title: "",
  });
  const [retypePassword, setRetypePassword] = useState({
    firstClick: false,
    title: "",
  });
  const [submitClicked, setSubmitClicked] = useState(false);

  let  history = useHistory();

  const handleSubmit = async (e) => {
  

    setSubmitClicked(true);
    e.preventDefault();
    if (
      Regex.Email.test(Email.title) &&
      Regex.Password.test(Password.title) &&
      (Password.title == retypePassword.title)
    ) {
        history.push('/login');
      //send the post request with the email and password and get a response
      const response = await axios.post(
        `https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/resetpassword`,
        {
          email: Email.title,
          password: Password.title,
          password1: retypePassword.title,
        }
      );
      console.log(response);
      
    }
    
  };

  const handleChange = (type, event) => {
    if (type === "Email") {
      setEmail({ ...Email, title: event.target.value });
    } else if (type === "Password") {
      setPassword({ ...Password, title: event.target.value });
    } else if (type === "retypePassword") {
      setRetypePassword({ ...retypePassword, title: event.target.value });
    }
  };

  return (
    <div className="resetPassword">
      <Card className="form" title={<Title>Reset Password</Title>}>
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
          <br />
        </Form.Item>

        <Form.Item className="textDesign">
          Re-type Password
          <Input.Password
            onClick={() => {
              setRetypePassword({ ...retypePassword, firstClick: true });
            }}
            onChange={(e) => {
              handleChange("retypePassword", e);
            }}
            placeholder="Enter your password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          {retypePassword.firstClick || submitClicked
            ? Password.title === retypePassword.title
              ? null
              : errorValue.dontMatch
            : null}
          <br />
        </Form.Item>

        {/*ForgotPassword*/}

        <Button
          onClick={(e) => {
            handleSubmit(e);
          }}
          type="primary"
          style={{ backgroundColor: "black" }}
          size="large"
          block
        >
          Reset
        </Button>
      </Card>
    </div>
  );
}

export default ResetPassword;
