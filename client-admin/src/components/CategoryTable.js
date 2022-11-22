import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteCategory, fetchCategory } from "../store/actions/categories";
import EditCategory from "./EditCategory";

function CategoryTable(props) {
  const dispatch = useDispatch()
  const {category, index} = props
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEdit = (e, id) => {
    e.preventDefault();
    handleShow();
    dispatch(fetchCategory(id));
  };
  const deleteHandler = (id) => {
    dispatch(deleteCategory(id));
  };
  return (
    <tr>
      <td>{index}</td>
      <td>{category.name}</td>
      <td>
        <Button style={{backgroundColor: "#a77bca"}} onClick={(e) => handleEdit(e, category.id)} className="me-2">
          <BsFillPencilFill></BsFillPencilFill>
        </Button>
        <EditCategory show={show} onHide={handleClose}/>

        <Button style={{backgroundColor: "#a77bca"}} onClick={() => deleteHandler(category.id)}>
          <BsFillTrashFill></BsFillTrashFill>
        </Button>
      </td>
    </tr>
  )
}
export default CategoryTable