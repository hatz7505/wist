import React, { useState } from "react";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import "./wistItem.css";

function WistItem({ item }) {
  const [hoverState, setHoverState] = useState(false);

  function handleHover() {
    hoverState ? setHoverState(false) : setHoverState(true);
  }

  return (
    <div className="wist-item-container">
      <Card className="wist-item-card">
        <CardImg className="image" src={item.picture} alt="wist item" />
        <CardBody>
          <CardTitle className="wist-item-header">
            {item.name} ${item.price}
          </CardTitle>
          <CardSubtitle className="wist-item-subtitle">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="wist-item-link"
            >
              Buy item here
            </a>
          </CardSubtitle>
        </CardBody>
      </Card>
      <div className="overlay">
        <div className="text">hiiii</div>
      </div>
    </div>
  );
}

export default WistItem;
