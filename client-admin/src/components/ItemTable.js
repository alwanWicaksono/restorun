import rupiahFormat from "../helpers/rupiahFormat"
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItem, fetchItem } from "../store/actions/items";
import EditItem from "./EditItem";

function ItemTable(props) {
  const dispatch = useDispatch()
  const {item, index} = props
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEdit = (e, id) => {
    e.preventDefault();
    handleShow();
    dispatch(fetchItem(id));
  };
  const deleteHandler = (id) => {
    dispatch(deleteItem(id));
  };
  return (
    <tr>
      <td>{index}</td>
      <td>{item.name}</td>
      <td>{item.Category.name}</td>
      <td>{rupiahFormat(item.price)}</td>
      <td>{item.User.username}</td>
      <td>
        <img src={item.imgUrl} width="50"/>
      </td>
      <td>
        {
          item.Ingredients?.map((ingredient,index)=>{
            return <> <p key={index}>* {ingredient.name}</p>
            </>
          })
        }
      </td>
      <td>
        <Button style={{backgroundColor: "#a77bca"}} onClick={(e) => handleEdit(e, item.id)} className="me-2">
          <BsFillPencilFill></BsFillPencilFill>
        </Button>
        <EditItem show={show} onHide={handleClose}/>

        <Button style={{backgroundColor: "#a77bca"}} onClick={() => deleteHandler(item.id)}>
          <BsFillTrashFill></BsFillTrashFill>
        </Button>
      </td>
    </tr>
  )
}
export default ItemTable