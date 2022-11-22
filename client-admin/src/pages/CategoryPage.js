import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import CategoryTable from "../components/CategoryTable";
import { fetchCategories } from '../store/actions/categories';
import AddCategory from '../components/AddCategory';
import Button from 'react-bootstrap/Button';

function CategoryPage() {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const categories = useSelector((state) => {
    return state.category.categories;
  });
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  
  return (
    <div style={{margin: "0px 200px"}}>
      <div className='d-flex justify-content-between mb-5'>
        <h1>Category List</h1>
        <Button style={{backgroundColor: "#702082"}} onClick={handleShow}>
          Add Category
        </Button>
        <AddCategory show={show} onHide={handleClose}/>
      </div>
      <Table className="align-middle text-center" responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => {
            return <CategoryTable category={category} key={category.id} index={index+1}/>;
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default CategoryPage;