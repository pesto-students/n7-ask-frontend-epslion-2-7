import React, { useState,useEffect } from "react";
import './AppSider.css';
import { Divider, Layout, Menu, Checkbox } from "antd";
import {
  
  TagsOutlined,
  FilterOutlined,
  SortDescendingOutlined,
  BuildOutlined,
} from "@ant-design/icons";
import axios from "axios";

function AppSider({ setWhatToShow , toSort }) {
  const [interestCategory, setInterestCategory]=useState([])

  useEffect(async()=>{
    const response = await axios.get(
      `http://localhost:3000/interests`
    ); 
      setInterestCategory(response.data)
      
  },[])


  const onInterestsChecked = (checkedValue)=>{

  }
  const onFilterClick = (e, type) => {
    if(type=="sort"){
      toSort(true)
    }
    else{
    setWhatToShow(type);
    toSort(false)
    }
  };
  return (
    <>
      <Menu
        // onClick={this.handleClick}
        
        mode="inline"
      >
        <Menu.ItemGroup key="filter" icon={<FilterOutlined />} title="Filter">
          <Menu.Item
            key="1"
            icon={<TagsOutlined />}
            onClick={(e) => {
              onFilterClick(e, "trending");
            }}
          >
            Trending
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<SortDescendingOutlined />}
            onClick={(e) => {
              onFilterClick(e, "sort");
            }}
          >
            Sort by Most Liked
          </Menu.Item>
          <Menu.Item key="3" icon={<BuildOutlined />}>
            Random{" "}
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="interest" title="Interest"></Menu.ItemGroup>
            
      </Menu>
      
      <Checkbox.Group options={interestCategory.map(value=>(value.charAt(0).toUpperCase()+value.substr(1) ))}  onChange={onInterestsChecked} />
      
     
     
    </>
  );
}

export default AppSider;
