import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

function LoginPage() {
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("https://taco-bell-2022.herokuapp.com/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInput)
      })
      const data = await response.json();
      if (data.msg) {
        throw { msg: data.msg };
      }
      const access_token = data.access_token;
      localStorage.setItem("access_token", access_token);
      MySwal.fire({
        icon: "success",
        title: "Login Success",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    
    
  };
  return (
    <div className='min-vh-100 text-center pt-5'>
      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/Taco_Bell_2016.svg/640px-Taco_Bell_2016.svg.png" class="img-fluid" style={{height: "200px"}}/>
      <div className='d-flex flex-column align-items-center justify-content-center mt-5'>
        <Form className='col-4 mt-5' onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
            type="email" 
            placeholder="Enter email"
            name="email"
            value={loginInput.email}
            onChange={(e) => {
              setLoginInput({
                ...loginInput,
                email: e.target.value,
              });
            }} 
          />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
            type="password" 
            placeholder="Password"
            name="password"
            value={loginInput.password}
            onChange={(e) => {
              setLoginInput({
                ...loginInput,
                password: e.target.value,
              });
            }} 
          />
          </Form.Group>
          <Button style={{backgroundColor: "#702082"}} className="d-flex mx-auto" variant="primary" type="submit">
            Submit
          </Button>
        </Form> 
      </div>
    </div>
  );
}

export default LoginPage;