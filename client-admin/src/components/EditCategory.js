import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "../store/actions/categories";

function EditCategory(props) {
  const dispatch = useDispatch();
  const category = useSelector(state => state.category.category)
  const [categoryForm, setCategoryForm] = useState({
    name: "",
  });
  function changeHandler(e) {
    const value = e.target.value;
    setCategoryForm(value);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateCategory(categoryForm, category.id));
    props.onHide();
  };
  useEffect(() => {
    if (category) {
      if (Object.keys(category).length) {
        setCategoryForm({
          name: category.name,
        });
      }
    }
  }, [category])

  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => submitHandler(e)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="name"
              autoFocus
              name="name"
              onChange={changeHandler}
              value={categoryForm.name}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
              Close
            </Button>
            <Button style={{backgroundColor: "#702082"}} type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
export default EditCategory