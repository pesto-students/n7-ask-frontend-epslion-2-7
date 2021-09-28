import React, { useState } from "react";
import "./Interest.css";
import { Card, Image, List } from "antd";
import { Typography } from "antd";

const { Text } = Typography;
function Interest({ images, onInterestClick }) {
  const onInterestCardClick = (InterestId, index) => {
      
    onInterestClick(InterestId)

  };

  return (
    <div className="LayoutDimension">
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={images}
        renderItem={(item, index) => (
          <List.Item>
            <Card
            hover
              id={"interestCard" + index}
              style={{ textAlign: "center" }}
              bordered
              onClick={() => onInterestClick(item, index)}
              size="small"
              
              cover={
                <Image className="ImageDimension"
                  preview={false}
                  alt="example"
                  width={135}
                  height={100}
                 src="./logo512.png"
                />
              }
            >
              <Text strong ellipsis>
                {item}
              </Text>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Interest;
