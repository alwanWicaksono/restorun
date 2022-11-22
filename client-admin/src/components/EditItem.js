import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { updateItem } from "../store/actions/items";

function EditItem(props) {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.item.item);
  const categories = useSelector(state => state.category.categories)
  const [itemForm, setItemForm] = useState({
    name: "",
    description: "",
    price: 0,
    imgUrl: 0,
    CategoryId: "",
  });
  function changeHandler(e) {
    const { name, value } = e.target;
    const newInput = {
      ...itemForm,
    };
    newInput[name] = value;
    setItemForm(newInput);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateItem(itemForm, item.id));
    props.onHide();
  };
  useEffect(() => {
    if (item) {
      if (Object.keys(item).length) {
        setItemForm({
          name: item.name,
          description: item.description,
          price: item.price,
          imgUrl: item.imgUrl,
          CategoryId: item.CategoryId,
        });
      }
    }
  }, [item]);

  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Item</Modal.Title>
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
              value={itemForm.name}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="description"
              name="description"
              onChange={changeHandler}
              value={itemForm.description}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="price"
              autoFocus
              name="price"
              onChange={changeHandler}
              value={itemForm.price}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Image Url</Form.Label>
            <Form.Control
              type="text"
              placeholder="imgUrl"
              autoFocus
              name="imgUrl"
              onChange={changeHandler}
              value={itemForm.imgUrl}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>CategoryId</Form.Label>
                <Form.Select
                name="CategoryId"
                value={itemForm.CategoryId}
                onChange={changeHandler}
              >
                <option defaultValue={""} hidden>
                  -- Select Category --
                </option>
                {categories.map((category) => {
                  return (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </Form.Select>
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
  );
}

export default EditItem;
