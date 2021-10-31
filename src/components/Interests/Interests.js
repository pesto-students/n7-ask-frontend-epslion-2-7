import React, { useState , useEffect} from "react";
import "./Interests.css";
import { Card, Input, Button } from "antd";
import axios from "axios";
import Interest from "./Interest/Interest";
import { Redirect, useLocation, useHistory,Link } from "react-router-dom";
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
const InterestsFields = [
  
  "Nature",
  "Technology",
  "Movies",
  "Space",
  "Business",
  "Travel",
  "Health",
  "Books",
  "Science",
  "Fashion",
];
const InterestsFields1 = [
  
  "sdfsd",
  "Nature",
  "Technology",
  "Movies",
  "Space",
  "Business",
  "Travel",
  "Health",
  "Books",
  "Science",
  "Fashion",
];


function Interests({user}) {
  const history = useHistory();
  const [images, getImages] = useState([]);

  const [userInterests, setInterest] = useState([]);
  


  const onCardClick = (InterestId, index) => {
    if (userInterests.includes(InterestId)) {
      document.getElementById("interestCard" + index).style.borderColor = "";
      let arr = userInterests;
      let index2 = userInterests.indexOf(InterestId);
      arr.splice(index2, 1);
      setInterest(arr);
    } else {
      setInterest([...userInterests, InterestId]);
      document.getElementById("interestCard" + index).style.borderColor = "red";
    }
    console.log(userInterests);
  };

  const onSearchSubmit = async (term) => {
    if(term==""){

    }
    else{

    }
   
  };

  const onNextClick = async () =>{

    if(userInterests.length>0 && user){
      let selectedList = userInterests.map(val=>InterestsFields1.indexOf(val))
      let response = await axios.post(`https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/interests`,selectedList,
      {
        headers: { Authorization: `${user.token}` },
      })
      console.log(response);
      if(response&&response.data.success){
        history.push('/login')
      }
    }
    
  }

  return (
    <div className="container3">
      <Card className="MainCard"
        title={<b>Select your Interests</b>}
        extra={
          <Input.Search
            placeholder="input search text"
            onSearch={onSearchSubmit}
            style={{ width: 200 }}
          />
        }
        actions={[
          <Button
            onClick={()=>{onNextClick()}}
            style={{ backgroundColor: "black", width:"200px" }}
            type="primary"
            shape="round"
            size="large"
          >
            Next
          </Button>,
        ]}
      >
        <Interest images={InterestsFields} onInterestClick={onCardClick} />
      </Card>
    </div>
  );
}

export default Interests;
