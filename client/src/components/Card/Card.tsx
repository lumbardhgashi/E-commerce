import { IProduct } from '@aaecomm/common';
import React, { MouseEventHandler } from 'react';
import { Card, Button, Row, Container, Col } from 'react-bootstrap';
import { isOlderThanOneWeek } from '../../helpers';
import { useQuery } from '@tanstack/react-query';
interface IProductCardProps {
  product: IProduct,
  onClickHandler: (id: string) => any
  onAddToCart: (id:string) => void
}

const ProductCard: React.FunctionComponent<IProductCardProps> = ({ product, onClickHandler, onAddToCart }) => {

  const date = new Date();
  date.setDate(date.getDate() - 8);

  const onClick = () => {
    onClickHandler(product?.id)

  }
  const onAddToCartHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onAddToCart(product?.id)
  }
  return (
    <Card style={{ width: '18rem', borderRadius: '8px', border: '1px solid #ccc' }} onClick={onClick} className="product-card" >
      <div style={{ position: 'relative', maxHeight: '15rem', overflow: 'hidden' }}>
        {!isOlderThanOneWeek(product?.createdAt) &&
          <span style={{ position: 'absolute', top: '0', right: '0', background: 'green', color: '#fff', padding: '0.5rem', borderRadius: '4px' }}>
            New
          </span>}
        <Card.Img
          variant="top"
          src={`https://ecommerce.dev/api/images/${product.id}`}
          alt={product?.name}
          style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }}
        />
      </div>
      <Card.Body>
        <Card.Title style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{product?.name}</Card.Title>
        <Row className='align-items-center justify-content-between mb-3' >
          <Col md={4}>
            <Card.Text style={{ fontSize: '1.2rem', fontWeight: 'bold', }}>{product?.price}€</Card.Text>
          </Col>
          <Col md={{ span: 4, offset: 4 }}>
            <Card.Text style={{ fontSize: '0.9rem', color: '#777' }}>{product?.category.name}</Card.Text>
          </Col>
        </Row>
        <Button onClick={onAddToCartHandler} style={{ width: '100%', backgroundColor: "#5a84ce", border: "1px solid #5a84ce" }}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;