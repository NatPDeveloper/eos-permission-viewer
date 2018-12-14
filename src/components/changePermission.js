import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Navigation from './navigation';
import { connect } from 'react-redux'
import * as actions from '../store/actions/auth';

import { Api, JsonRpc } from 'eosjs';

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
            
            const rpc = new JsonRpc(this.props.network.fullhost());
            const scatter = this.props.scatter;
            const eos = scatter.eos(this.props.network, Api, {rpc});
            const completed = res => {
                this.props.onSendResult(res);
                // this.props.sending = false;
            }
            eos.transact({
                    actions: [{
                        account: 'eosezchatnat',
                        name: 'sendmsg',
                        authorization: [{
                            actor: this.props.account.name,
                            permission: this.props.account.authority,
                        }],
                        data: {
                            user: this.props.account.name,
                            msg_id: "chatId",
                            msg: "hi"
                        },
                    }]
                }, {
                    blocksBehind: 3,
                    expireSeconds: 30,
                });
                completed(this.props.result);
                console.log(this.props.result);
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
        scatter: state.scatter,
        result: state.result,
        sending: state.sending
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSendResult: (result) => dispatch(actions.sendResult(result))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePermission);