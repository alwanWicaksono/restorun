import { useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { useParams, Link } from "react-router-dom";
import rupiahFormat from "../helpers/rupiahFormat";
import { fetchDetailItem} from "../store/actions";
import { BsSkipBackwardFill } from "react-icons/bs";
import Button from "react-bootstrap/esm/Button";

function DetailPage() {
  const dispatch = useDispatch()
  const {itemId} = useParams()
  const {detailItem} = useSelector(state => {
    return state
  })
  useEffect(() => {
    dispatch(fetchDetailItem(`https://taco-bell-2022.herokuapp.com/users/${itemId}`));
  }, [])
  return (
    <div className="row" style={{padding: "0px", margin: "0px"}}>
      <img src="https://i.pinimg.com/originals/56/cd/67/56cd67f016363030eeaafbb0f698e9e7.jpg" className="img-fluid vh-100 col-4" alt={detailItem.name} style={{padding: "0px", margin: "0px"}}/>
      <div className="col-4" style={{padding: "20px", margin: "0px", backgroundColor: "#A77BCA"}}>
        <Link to={'/'}>
          <BsSkipBackwardFill className="btn-sm mb-2 btn-dark" style={{width: "50px", fontSize: "30px", color: "black"}}/>
        </Link>
        <img src={detailItem.imgUrl} className="img-fluid rounded" alt={detailItem.name} style={{width: "100%"}}/>
        <h1>{detailItem.name}</h1>
        <p>{detailItem.description}</p>
        <p>Ingredients: </p>
        <div className="d-flex justify-content-between">
          <ul>
            {
              detailItem.Ingredients?.map((ingredient, index)=>{
                return <> <li key={index}> {ingredient.name}</li>
                </>
              })
            }
          </ul>
          <h3>{rupiahFormat(detailItem.price)}</h3>
        </div>
      </div>
      <img src="https://i.pinimg.com/originals/56/cd/67/56cd67f016363030eeaafbb0f698e9e7.jpg" className="img-fluid vh-100 col-4" alt={detailItem.name} style={{padding: "0px", margin: "0px"}}/>
    </div>
  )
}

export default DetailPage