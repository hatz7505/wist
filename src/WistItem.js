import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import "./wistItem.css";

function WistItem({ item }) {
  return (
    <div>
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
    </div>
  );
}

export default WistItem;
