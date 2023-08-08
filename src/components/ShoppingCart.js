import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  Button, Modal } from 'react-bootstrap';
import { GetShoppingCart, DeleteFromShoppingCart, OrderNow } from '../services/shoppingCart';
import { useNavigate } from 'react-router-dom';
import { FaTrash,  FaArrowLeft } from 'react-icons/fa';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.productsSlice.cart);
  const totalPrice = useSelector(state => state.productsSlice.totalPrice);
  const email = useSelector((state) => state.authenticationSlice.email);

  useEffect(() => {
    GetShoppingCart(dispatch, email);
  }, [dispatch, email]);

  const [showModal, setShowModal] = useState(false);

  const handleOrderNow = () => {
    setShowModal(true);
  };

  const confirmOrder = () => {
    OrderNow(dispatch, email);
    setShowModal(false);
    navigate('/myOrders');
  };

  const cancelOrder = () => {
    setShowModal(false);
  };

  const [step, setStep] = useState(1); // Tracks the current step of the process

  const handleOrderClick = () => {
    setStep(2); // Move to step 2: Enter Address
  };

  const handleAddressSubmit = () => {
    setStep(3); // Move to step 3: Preview Order
  };

  const handlePreviewSubmit = () => {
    setStep(4); // Move to step 4: Confirm Order
  };

  const handleConfirmOrder = () => {
    // Implement the logic to place the order
    setStep(5); // Move to step 5: Order Placed
  };

  const styles = `
  body{
    min-height: 100vh;
    vertical-align: middle;
    font-family: sans-serif;
    font-size: 0.8rem;
    font-weight: bold;
}
.title{
    margin-bottom: 5vh;
}
.card{
    margin: auto;
    margin-top: 30px;
    width: 80%;
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 1rem;
    border: transparent;
}


.cart{
    background-color: rgba(255, 255, 255, 0.7);
    padding: 4vh 5vh;
    border-bottom-left-radius: 1rem;
    border-top-left-radius: 1rem;
}
.summary{
    background-color: #ddd;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    padding: 4vh;
    color: rgb(65, 65, 65);
}
.summary .col-2{
    padding: 0;
}
.summary .col-10
{
    padding: 0;
}.row{
    margin: 0;
}
.title b{
    font-size: 1.5rem;
}
.main{
    margin: 0;
    padding: 2vh 0;
    width: 100%;
}
.col-2, .col{
    padding: 0 1vh;
}
a{
    padding: 0 1vh;
}
.close{
    margin-left: auto;
    font-size: 0.7rem;
}
img{
    width: 3.5rem;
}
.back-to-shop{
    margin-top: 4.5rem;
}
h5{
    margin-top: 4vh;
}
hr{
    margin-top: 1.25rem;
}
form{
    padding: 2vh 0;
}
select{
    border: 1px solid rgba(0, 0, 0, 0.137);
    padding: 1.5vh 1vh;
    margin-bottom: 4vh;
    outline: none;
    width: 100%;
    background-color: rgb(247, 247, 247);
}
input{
    border: 1px solid rgba(0, 0, 0, 0.137);
    padding: 1vh;
    margin-bottom: 4vh;
    outline: none;
    width: 100%;
    background-color: rgb(247, 247, 247);
}
input:focus::-webkit-input-placeholder
{
      color:transparent;
}
.btn{
    background-color: #000;
    border-color: #000;
    color: white;
    width: 100%;
    font-size: 0.7rem;
    margin-top: 4vh;
    padding: 1vh;
    border-radius: 0;
}
.btn:focus{
    box-shadow: none;
    outline: none;
    box-shadow: none;
    color: white;
    -webkit-box-shadow: none;
    -webkit-user-select: none;
    transition: none; 
}
.btn:hover{
    color: white;
}
a{
    color: black; 
}
a:hover{
    color: black;
    text-decoration: none;
}
 #code{
    background-image: linear-gradient(to left, rgba(255, 255, 255, 0.253) , rgba(255, 255, 255, 0.185)), url("https://img.icons8.com/small/16/000000/long-arrow-right.png");
    background-repeat: no-repeat;
    background-position-x: 95%;
    background-position-y: center;
}`;

  return (
    <div class="card">
      <style>{styles}</style>
            <div class="row">
                <div class="col-md-8 cart">
                    <div class="title">
                        <div class="row">
                            <div class="col"><h4><b>Shopping Cart</b></h4></div>
                            <div class="col align-self-center text-right text-muted">{cartItems.length} items</div>
                        </div>
                    </div>    

                    {cartItems.length === 0 ? (
        <h5><b>Your shopping cart is empty</b></h5>
      ) : (
        <>
          {cartItems.map((product) => (
                     <div class="row border-top border-bottom">
                        <div class="row main align-items-center">
                            <div class="col-2"><img src={product.productImage}/></div>
                            <div class="col">
                                <div class="row text-muted">{product.productName}</div>
                            </div>
                            <div class="col">{product.productPrice} MKD</div>
                    <div class="col" onClick={() => DeleteFromShoppingCart(dispatch, email, product)} style={{ cursor: 'pointer'}}>
                      <FaTrash className="trash-icon" />
                    </div>
                    <div class="col">
                   <Button style={{margin:'0'}}>View product</Button>
                    </div>
                        </div>
                    </div>           
          ))}
          
        </>
        
      )}

          <div className="btn back-to-shop col-3">
            <FaArrowLeft /> Back To Shopping
          </div>

          
          
                </div>
          {cartItems.length !== 0 && (
            <>
             <div className="col-md-4 summary">
              <div><h5><b>Summary</b></h5></div><hr /><div className="row">
              <div className="col" style={{ paddingLeft: '0' }}>ITEMS {cartItems.length}</div>
              <div className="col text-right">{totalPrice} MKD</div>
            </div><form>
                <p>SHIPPING</p>
                <select><option className="text-muted">Standard-Delivery- &euro;5.00</option></select>
                <p>COUPON CODE</p>
                <input id="code" placeholder="Enter your code" />
              </form><div className="row" style={{ borderTop: '1px solid rgba(0,0,0,.1)', padding: '2vh 0' }}>
                <div className="col">TOTAL PRICE</div>
                <div className="col text-right">{totalPrice} MKD</div>
              </div><button className="btn">ORDER</button></div> </>
          )}
            </div>
            </div>
  );
}

export default ShoppingCart;
