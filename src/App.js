import * as React from "react"
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import { ToastContainer } from 'react-toastify';

const App=()=> (
  <div>
    <ToastContainer/>
    <h2>New product</h2>
    <ProductForm/>
    <h2>Your products</h2>
    <ProductList/>
  </div>
);

export default App;
