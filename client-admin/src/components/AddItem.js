import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createItem, fetchItems } from "../store/actions/items";
import { fetchCategories } from "../store/actions/categories";

function AddItem(props) {
  const dispatch = useDispatch();
  const [ingredients, setIngredients] = useState([{
    name: ""
  }]);
  const [itemForm, setItemForm] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    CategoryId: "",
  });
  const categories = useSelector((state) => state.category.categories);
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  function addIngredients(e) {
    e.preventDefault();
    setIngredients([...ingredients, {}])
  }
  function deleteHandler(e, index) {
    e.preventDefault();
    const temp = ingredients.filter((x, i) => i !== index);
    setIngredients(temp);
  }
  function itemChangeHandler(e) {
    const data = e.target.name;
    const value = e.target.value;
    const newData = {
      ...itemForm,
    };
    newData[data] = value;
    setItemForm(newData);
  }
  function ingredientsChangeHandler(e, i) {
    const {value} = e.target
    const newData = ingredients.map((ingredient, index) => {
      if (i === index) {
        return { ...ingredient, name: value };
      }
      return ingredient;
    });
    setIngredients(newData);
  }
  function submitHandler(e) {
    e.preventDefault()
    const itemInput = {
      ...itemForm,
      ingredients,
    };
    dispatch(createItem(itemInput));
    dispatch(fetchItems());
    props.onHide();
  }

  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/Taco_Bell_2016.svg/640px-Taco_Bell_2016.svg.png" className="img-fluid me-4" style={{height: "40px"}}/>
          <Modal.Title>Add Item</Modal.Title>
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
                onChange={itemChangeHandler}
                value={itemForm.name}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="description"
                name="description"
                onChange={itemChangeHandler}
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
                onChange={itemChangeHandler}
                value={itemForm.price}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="image url"
                autoFocus
                name="imgUrl"
                onChange={itemChangeHandler}
                value={itemForm.imgUrl}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>CategoryId</Form.Label>
                <Form.Select
                name="CategoryId"
                value={itemForm.CategoryId}
                onChange={itemChangeHandler}
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
            {ingredients.map((x, index) => {
              return (
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Ingredient</Form.Label>
                  <div>
                    <input
                      key={index}
                      type="text"
                      id={`ingredient${index}`}
                      name={`ingredient${index}`}
                      className="w-5/6 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-smalt focus:border-smalt"
                      onChange={(e) => ingredientsChangeHandler(e, index)}
                      value={ingredients.name}
                    />
                    <Button 
                      className="ms-3"
                      onClick={(e) => deleteHandler(e, index)}
                    >
                      Delete
                    </Button>
                  </div>
                </Form.Group>
              );
            })}
            <Button variant="secondary" onClick={(e) => addIngredients(e)}>
              Add Ingredient
            </Button>
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
  );
}

export default AddItem;
