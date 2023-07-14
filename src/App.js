import * as React from "react"
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

const App=()=> (
  <div>
    <h2>New product</h2>
    <ProductForm/>
    <h2>Dali ke raboti</h2>
    <ProductList/>
  </div>
);

export default App;
