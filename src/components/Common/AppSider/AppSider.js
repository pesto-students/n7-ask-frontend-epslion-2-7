import React, { useState, useEffect } from "react";
import "./AppSider.css";
import { Divider, Layout, Menu, Checkbox, Affix } from "antd";
import {
  TagsOutlined,
  FilterOutlined,
  SortDescendingOutlined,
  BuildOutlined,
} from "@ant-design/icons";
import axios from "axios";

const Interests = {
  
  Nature:1,
  Technology:2,
  Movies:3,
  Space:4,
  Business:5,
  Travel:6,
  Health:9,
  Books:10,
  Science:11,
  Fashion:12
};
function AppSider({ selectedInterests, whatToShow,setWhatToShow, toSort, setSelectedInterests }) {
  // const [interestCategory, setInterestCategory] = useState(Object.keys(Interests));

  useEffect(async () => {
    
    // setInterestCategory(InterestsFields);
  }, []);

  // useEffect(async()=>{

  //   // if(whatToShow!="interestsList"){
  //   //   console.log("clear")
  //   //   setSelectedInterests([])
  //   // }

  // },[whatToShow])

  const onInterestsChecked = (checkedValue) => {
    // setWhatToShow("home")
    setSelectedInterests(checkedValue);
    console.log("Selected Checkboxes"+ checkedValue)
  };
  const onFilterClick = (e, type) => {
    if (type == "sort") {
      toSort(true);
    } else {
      setWhatToShow(type);
      toSort(false);
    }
  };
  return (
    <>
      <Menu
        className="SideBarOverflow"
        // onClick={this.handleClick}

        selectable={false}
        mode="inline"
      >
         <Menu.ItemGroup key="filter" icon={<FilterOutlined />} title="Filter">
          {/* <Menu.Item
            key="1"
            icon={<TagsOutlined />}
            onClick={(e) => {
              onFilterClick(e, "trending");
            }} 
          >
            Trending
          </Menu.Item> */}
          <Menu.Item
            key="1"
            icon={<SortDescendingOutlined />}
            onClick={(e) => {
              onFilterClick(e, "sort");
            }}
          >
            Sort by Most Liked
          </Menu.Item>
          {/* <Menu.Item
            key="3"
            icon={<BuildOutlined />}
            onClick={(e) => {
              onFilterClick(e, "random");
            }}
          >
            Random
          </Menu.Item> */}
        </Menu.ItemGroup>
        <Menu.Divider />
        <Menu.Divider />
        <Menu.ItemGroup className="sideBarMenu" key="interest" title="Interest">
          <Checkbox.Group
            options={Object.keys(Interests)}
            value={selectedInterests}
            onChange={onInterestsChecked}
          />
          <br />
          <br />
        </Menu.ItemGroup>
      </Menu>
    </>
  );
}

export default AppSider;
