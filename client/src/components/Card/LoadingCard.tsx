import React from 'react';
import { Card, Button, Row, Col, Placeholder } from 'react-bootstrap';
import image from '../../assets/images/image.jpg'

const LoadingCard = () => {
  return (
    <Card style={{ width: '18rem' }}>
      <Placeholder as={Card.Img} animation='glow' style={{height: "15rem", backgroundColor: "grey", borderRadius: "6px"}} />
      {/* <Card.Img style={{ height: "100%", maxHeight: "15rem", objectFit: 'cover' }} variant="top" src={image} /> */}
      <Card.Body>
        <Placeholder as={Card.Title} animation="wave">
          <Placeholder xs={5} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="wave">
          <Placeholder xs={3} /> <Placeholder xs={4} style={{ backgroundColor: "transparent" }} /> <Placeholder xs={4} />
        </Placeholder>
        <Placeholder as={Placeholder.Button} style={{ backgroundColor: "#3c6bbd", border: 0 }} animation='wave' xs={12} />
      </Card.Body>
    </Card>
  );
};

export default LoadingCard;