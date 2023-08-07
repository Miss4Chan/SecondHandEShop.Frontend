import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Button } from 'react-bootstrap';
import { GetFavourites, DeleteFromFavourites } from '../services/favourites';
import { AddToCart } from '../services/products';
import { FaTrash,  FaArrowLeft } from 'react-icons/fa';

const Favourites = () => {
  const dispatch = useDispatch();
  const favourites = useSelector(state => state.productsSlice.favourites);
  const email = useSelector((state) => state.authenticationSlice.email);

  console.log(favourites)

  useEffect(()=>{
      GetFavourites(dispatch, email);
  }, [dispatch, email]);

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
.row{
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
`;

  return (
    <div class="card">
      <style>{styles}</style>
            <div class="row">
                <div class="cart">
                    <div class="title">
                        <div class="row">
                            <div class="col"><h4><b>Favourites</b></h4></div>
                            <div class="col align-self-center text-right text-muted">{favourites.length} items</div>
                        </div>
                    </div>    

                    {favourites.length === 0 ? (
        <h5><b>Your favourites is empty</b></h5>
      ) : (
        <>
          {favourites.map((product) => (
                     <div class="row border-top border-bottom">
                        <div class="row main align-items-center">
                            <div class="col-2"><img src={product.productImage}/></div>
                            <div class="col">
                                <div class="row text-muted">{product.productName}</div>
                            </div>
                            <div class="col">{product.productPrice} MKD</div>
                    <div class="col" onClick={() => DeleteFromFavourites(dispatch, email, product)} style={{ cursor: 'pointer'}}>
                      <FaTrash className="trash-icon" />
                    </div>
                    <div class="col" onClick={() => AddToCart(dispatch, product, email)} style={{ cursor: 'pointer'}}>
                    <i className="fa fa-shopping-cart"></i>
                    </div>
                    <div class="col">
                   <Button>View product</Button>
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
            </div>
            </div>
  );
}

export default Favourites;