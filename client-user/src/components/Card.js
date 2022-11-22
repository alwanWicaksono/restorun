import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function ItemCard(props) {
  const {item} = props
  return (
    <Link to={`${item.id}`} className='col-3 justify-content-center' style={{color: "inherit", textDecoration: "none" }}>
      <Card style={{width: '18rem'}} className='mx-auto'>
        <Card.Img variant="top" src={item.imgUrl} style={{height: "250px"}} />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default ItemCard;