import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

function Register(props) {
  const [registerInput, setRegisterInput] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  function changeHandler(e) {
    e.preventDefault();
    const {name, value} = e.target;
    const newData = {
      ...registerInput,
    };
    newData[name] = value;
    setRegisterInput(newData);
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://taco-bell-2022.herokuapp.com/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(registerInput),
      })
      const data = await response.json();
      if (data.msg) {
        throw { msg: data.msg };
      }
      MySwal.fire({
        icon: "success",
        title: "Register Success",
        showConfirmButton: false,
        timer: 1500,
      });
      props.onHide();
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: error.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/Taco_Bell_2016.svg/640px-Taco_Bell_2016.svg.png" className="img-fluid me-4" style={{height: "40px"}}/>
          <Modal.Title>Register Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => submitHandler(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="username"
                autoFocus
                name="username"
                onChange={changeHandler}
                value={registerInput.username}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                autoFocus
                name="email"
                onChange={changeHandler}
                value={registerInput.email}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                autoFocus
                name="password"
                onChange={changeHandler}
                value={registerInput.password}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="0813123131"
                autoFocus
                name="phoneNumber"
                onChange={changeHandler}
                value={registerInput.phoneNumber}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="address"
                autoFocus
                name="address"
                onChange={changeHandler}
                value={registerInput.address}
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
  );
}

export default Register;