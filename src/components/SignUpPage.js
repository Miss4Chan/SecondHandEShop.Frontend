import React, {useState } from 'react';
import { Form, Button, InputGroup, FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { SignUp } from '../services/authentication';
import { useDispatch } from 'react-redux';

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const dispatch = useDispatch();

    return <div style={{ width: '30rem', margin: 'auto', paddingTop: '8px' }}>
        <Form
            onSubmit={event => {
                event.preventDefault();
                if (password === confirmPassword) {
                    SignUp(dispatch, { username, name, surname, phone, address, email, password, city, postalCode});
                }
            }}>
            <h4 style={{ textAlign: 'center' }}>Create an account</h4>
            <InputGroup className='mb-3'>
                <FormControl placeholder='Enter Username'
                    onChange={event => setUsername(event.target.value)} />
            </InputGroup>
            <InputGroup className='mb-3'>
                <FormControl placeholder='Enter Name'
                    onChange={event => setName(event.target.value)} />
            </InputGroup>
            <InputGroup className='mb-3'>
                <FormControl placeholder='Enter Surname'
                    onChange={event => setSurname(event.target.value)} />
            </InputGroup>
            <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip id="color-tooltip">Example for the phone input: (389) 70 123 456</Tooltip>}
                >
            <InputGroup className='mb-3'>
                <FormControl placeholder='Enter Phone'
                    onChange={event => setPhone(event.target.value)} />
            </InputGroup>
                </OverlayTrigger>

            <InputGroup className='mb-3'>
                <FormControl placeholder='Enter Address'
                    onChange={event => setAddress(event.target.value)} />
            </InputGroup>
            <InputGroup className='mb-3'>
                <FormControl placeholder='Enter City'
                    onChange={event => setCity(event.target.value)} />
            </InputGroup>
            <InputGroup className='mb-3'>
                <FormControl placeholder='Enter Postal Code'
                    onChange={event => setPostalCode(event.target.value)} />
            </InputGroup>
            <InputGroup className='mb-3'>
                <FormControl placeholder='Enter Email'
                    onChange={event => setEmail(event.target.value)} />
            </InputGroup>
            <InputGroup className='mb-3'>
                <FormControl placeholder='Enter Password' type='password'
                    onChange={event => setPassword(event.target.value)} />
            </InputGroup>
            <InputGroup className='mb-3'>
                <FormControl placeholder='Confirm Password' type='password'
                    onChange={event => setConfirmPassword(event.target.value)} />
            </InputGroup>
            <Button type='submit' variant='dark'
                style={{ margin: 'auto', display: 'block', width: '10rem' }}
                disabled={password !== confirmPassword || password.length <= 0}>Sign Up</Button>
        </Form>
    </div>
};

export default SignUpPage;
