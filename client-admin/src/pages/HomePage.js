import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ItemTable from "../components/ItemTable";
import { fetchItems } from '../store/actions/items';
import AddItem from '../components/AddItem';
import Button from 'react-bootstrap/Button';

function HomePage() {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const items = useSelector((state) => {
    return state.item.items;
  });
  useEffect(() => {
    dispatch(fetchItems());
  }, []);
  
  return (
    <div className='mx-5'>
      <div className='d-flex justify-content-between mb-5'>
        <h1>Item List</h1>
        <Button style={{backgroundColor: "#702082"}} onClick={handleShow}>
          Add Item
        </Button>
        <AddItem show={show} onHide={handleClose}/>
      </div>
      <Table className="align-middle text-center" responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>CreatedBy</th>
            <th>Image</th>
            <th>Ingredients</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            return <ItemTable item={item} key={item.id} index={index+1}/>;
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default HomePage;