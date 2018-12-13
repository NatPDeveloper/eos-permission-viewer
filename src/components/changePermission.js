import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Navigation from './navigation';

class changePermission extends Component {

render() {
        return (
            <div>
                <Navigation></Navigation>
                <div className="permissionInput">
                    <Form>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleAccount" className="mr-sm-2">Your EOS Account</Label>
                            <Input type="text" name="account" id="exampleAccount" placeholder="eosnewyorkio" />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="publicKey" className="mr-sm-2">New Active Public Key</Label>
                            <Input type="text" name="publicKey" id="publicKey" placeholder="EOS868QZgR1EGd6MscpGMNdGbuun3FWGiLSx12r7V8GgBJFUQjnra " />
                        </FormGroup>
                        <Button color="primary" className="primary_button">Submit</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default changePermission;