import React, { useEffect, useState } from "react";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import "./wistItem.css";
import WistApi from "./api";
import { Row, Col } from "reactstrap";

function WistItem({ item }) {
  const [pros, setPros] = useState([]);
  const [cons, setCons] = useState([]);
  useEffect(
    function () {
      async function getProCons(itemId) {
        try {
          let proResults = await WistApi.getProsForItem(itemId);
          let conReults = await WistApi.getConsForItem(itemId);
          setPros(proResults);
          setCons(conReults);
        } catch (err) {
          console.error(err);
        }
      }
      getProCons(item.id);
    },
    [item.id]
  );
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
        <Row>
          <Col sm="6">
            <ul className="procons">
              <h4>Pros:</h4>
              {pros.length
                ? pros.map((pro) => <li key={pro.id}>{pro.comment}</li>)
                : null}
            </ul>
          </Col>
          <Col sm="6">
            <ul className="procons">
              <h4>Cons:</h4>
              {cons.length
                ? cons.map((con) => <li key={con.id}>{con.comment}</li>)
                : null}
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default WistItem;
