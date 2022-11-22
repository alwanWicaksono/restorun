import CardGroup from 'react-bootstrap/CardGroup';
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { fetchItem } from "../store/actions";
import ItemCard from '../components/Card';
import Carousel from 'react-bootstrap/Carousel';

function HomePage() {
  const dispatch = useDispatch()
  const {item} = useSelector(state => {
    return state
  })
  useEffect(() => {
    dispatch(fetchItem("https://taco-bell-2022.herokuapp.com/users"))
  }, [])
  return (
    <>
    <Carousel variant="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.tacobell.co.id/wp-content/uploads/2020/09/Carousel_Desktop-KCT_1700x660_NO.jpg"
          alt="First slide"
        />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.tacobell.co.id/wp-content/uploads/2020/09/Carousel_Desktop-NCT_1700x660_NO.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>
      <h1 style={{margin: "20px 100px", textDecoration: "underline"}}>Meals</h1>
      <CardGroup>
        {item.map((item) => {
          if(item.CategoryId == 1){
            return <ItemCard item={item} key={item.id} />;
          }
        })}
      </CardGroup>
      <h1 style={{margin: "20px 100px", textDecoration: "underline"}}>Desserts</h1>
      <CardGroup>
        {item.map((item) => {
          if(item.CategoryId == 2){
            return <ItemCard item={item} key={item.id} />;
          }
        })}
      </CardGroup>
      <h1 style={{margin: "20px 100px", textDecoration: "underline"}}>Snacks</h1>
      <CardGroup>
        {item.map((item) => {
          if(item.CategoryId == 3){
            return <ItemCard item={item} key={item.id} />;
          }
        })}
      </CardGroup>
      <h1 style={{margin: "20px 100px", textDecoration: "underline"}}>Drinks</h1>
      <CardGroup>
        {item.map((item) => {
          if(item.CategoryId == 4){
            return <ItemCard item={item} key={item.id} />;
          }
        })}
      </CardGroup>
    </>
  );
}

export default HomePage;