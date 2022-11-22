import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { createCategory, fetchCategories } from "../store/actions/categories";

function AddCategory(props) {
  const dispatch = useDispatch();
  const [categoryForm, setCategoryForm] = useState({
    name: "",
  });
  function changeHandler(e) {
    const value = e.target.value;
    setCategoryForm(value);
  }
  function submitHandler(e) {
    e.preventDefault();
    dispatch(createCategory(categoryForm));
    dispatch(fetchCategories());
    props.onHide();
  }
  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/Taco_Bell_2016.svg/640px-Taco_Bell_2016.svg.png" className="img-fluid me-4" style={{height: "40px"}}/>
          <Modal.Title>Add Category</Modal.Title>
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
    </>
  )
}

export default AddCategory