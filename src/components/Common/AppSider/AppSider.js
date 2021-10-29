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

function AppSider({ selectedInterests, whatToShow,setWhatToShow, toSort, setSelectedInterests }) {
  const [interestCategory, setInterestCategory] = useState([]);

  useEffect(async () => {
    const response = await axios.get(`http://localhost:3000/interests`);
    setInterestCategory(response.data);
  }, []);

  useEffect(async()=>{

    if(whatToShow!="interestsList"){
      console.log("clear")
      setSelectedInterests([])
    }

  },[whatToShow])

  const onInterestsChecked = (checkedValue) => {
    setWhatToShow("interestsList")
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
          <Menu.Item
            key="3"
            icon={<BuildOutlined />}
            onClick={(e) => {
              onFilterClick(e, "random");
            }}
          >
            Random
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.Divider />
        <Menu.Divider />
        <Menu.ItemGroup className="sideBarMenu" key="interest" title="Interest">
          <Checkbox.Group
            options={interestCategory.map(
              (value) => value.charAt(0).toUpperCase() + value.substr(1)
            )}
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
