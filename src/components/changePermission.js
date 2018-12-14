import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Navigation from './navigation';
import { connect } from 'react-redux'

// Changed back to eosjs 16, 20 was throwing error
import Eos from 'eosjs';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
// import ScatterEOS from 'scatterjs-plugin-eosjs2';

class ChangePermission extends Component {

    constructor(props){
        super(props)
        this.state = {
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
            // }]
        }
    }

    render() {
        // Function won't run outside of render for some reason..

        const changePermissionLevel = () => {
            // console.log(this.props.network);
            const scatter = this.props.scatter;
            const eosOptions = { expireInSeconds:60 };
            const eos = scatter.eos(this.props.network, Eos, eosOptions);
            const transactionOptions = { authorization:[`${this.props.account.name}@${this.props.account.authority}`] };

            eos.contract('eosezchatnat').then(contract => {
                contract.sendmsg(this.props.account.name, "chat_id", "message", transactionOptions)
              }).catch(e => {
                  console.log("error", e);
                  alert("There was an issue with sending this transaction, please login and try again")
              })
            // eos.transact(config);
        }
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
                        <Button onClick={changePermissionLevel} color="primary" className="primary_button">Submit</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        network: state.network,
        account: state.account,
        scatter: state.scatter
    }
}

export default connect(mapStateToProps)(ChangePermission);