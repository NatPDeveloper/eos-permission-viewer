import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Navigation from './navigation';

class changePermission extends Component {

    state = {
        // actions: [{
        //     account: 'eosio',
        //     name: 'updateauth',
        //     authorization: [{
        //         actor: this.state.account.name,
        //         permission: this.state.account.authority,
        //     }],
        //     data: {
        //         account: this.state.account.name,
        //         permission: 'active',
        //         parent: 'owner',
        //         auth: {
        //             "threshold": 1,
        //             "keys": [{
        //                 "key": "EOS56mYJBd4UyA5vmi2Xtyj5JxkB5Ub6oBKy5ipPn2Y1jEbqhCKwq",
        //                 "weight": 1
        //                 }
        //             ]
        //         }
        //     }
        // }],
    }
    
    changePermissionLevel() {
        
    }

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
                        <Button onClick={this.changePermissionLevel} color="primary" className="primary_button">Submit</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default changePermission;