import { useState, useEffect } from 'react';
import {Form, Row, Col, Button, FormControl, FormLabel } from "react-bootstrap";
import { DeleteProduct, NewProduct, EditProduct } from '../services/products';
import { useDispatch } from 'react-redux';
import * as React from "react"

export default ({product, setIsEditing}) =>
{
    const descriptions = ['Groceries', 'Credit Card', 'Student Loans', 'Eating out', 'Gas'];
    const [description, setDescription] = useState(descriptions[0]);
    const [name,  setName] = useState("");
    const [isNewProduct, setIsNewProduct] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if(product !== undefined) {
            setIsNewProduct(false);
            //console.log(product.productName);
            setName(product.productName);
        }
        else {
            setIsNewProduct(true);
        }
    }, [product]); //arrayot tuka e koga ke se smeni ova praj go ovoj effect


    return <Form
    onSubmit={event => {
        event.preventDefault();
        if(isNewProduct) {
            //add
            console.log("vlaga li")
            NewProduct(dispatch, {productName:name,description: description});
        }
        else {
            //edit
            console.log("dali vlaga")
            EditProduct(dispatch, {id: product.id, description: description, productName:name});
            setIsEditing(false);

        }
        }}
        >
        <Row>
            <Col>
            <Form.Label>Description</Form.Label>
                <Form.Control as='select'
                    onChange={event => setDescription(event.target.value)}>
                    {descriptions.map((d) => <option>{d}</option>)}
                </Form.Control>
            </Col>
            <Col>
                <FormLabel>Name</FormLabel>
                <FormControl type='text'
                placeholder = {name}
                onChange={event=>setName(event.target.value)}></FormControl>
            </Col>
            <Col>
            <div>
                {isNewProduct ? <Button variant={'primary'} type='submit'>Add</Button>:
                <div>
                    <Button variant={'warning'} onClick={()=>DeleteProduct(dispatch,product)}>Delete</Button>
                    <Button variant={'success'} type='submit'>Save</Button>
                    <Button variant={'default'} onClick={()=>setIsEditing(false)}>Cancel</Button>
                </div>
            }
            </div>
            </Col>
        </Row>
    </Form>
}