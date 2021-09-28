import React, { useState , useEffect} from "react";
import "./Interests.css";
import { Card, Input, Button } from "antd";
import axios from "axios";
import Interest from "./Interest/Interest";
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  DownloadOutlined,
} from "@ant-design/icons";



function Interests() {
  const [images, getImages] = useState([]);

  const [userInterests, setInterest] = useState([]);
  useEffect(async() => {
    const response = await axios.get(
      `http://localhost:3000/interests`
    );    

    getImages(response.data);
    console.log(response.data)
    return () => {
      
    }
  }, [])


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
           
            style={{ backgroundColor: "black", width:"200px" }}
            type="primary"
            shape="round"
            size="large"
          >
            Next
          </Button>,
        ]}
      >
        <Interest images={images.map(value=>(value.charAt(0).toUpperCase()+value.substr(1) ))} onInterestClick={onCardClick} />
      </Card>
    </div>
  );
}

export default Interests;
