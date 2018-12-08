import React from 'react';
import { Component } from 'react';
import Navigation from './navigation';
import axios from 'axios';
import { InputGroup, InputGroupAddon, Input, Button, Table, NavLink, Alert, UncontrolledAlert } from 'reactstrap';
import Spinner from './Spinner/Spinner';

class Home extends Component {
    state = {
        permissionInfo: {},
        account_name: "",
        url: 'https://nodes.get-scatter.com:443/v1/chain/get_account',
        loading: false,
        response: false,
        notFound: false,
        incorrectAccountLength: false
    }

    requestPermission = (e) => {
        const account_name = this.state.account_name;
        if (account_name.length > 12 || account_name.length < 12) {
            // alert("Account names must be 12 characters in length")
            this.setState({incorrectAccountLength: true})
            return;
        }
        this.setState({loading: true})
        e.preventDefault();
        const data = JSON.stringify({
            account_name: account_name
        });
        axios.post(this.state.url, data)
        .then(response => {
            const res = this.parsePermissionInfo(response.data.permissions);
            this.setState({permissionInfo: res, loading: false, response: true})
            console.log(response.data.permissions)
        })
        .catch(err => {
            console.log(err);
            this.setState({loading: false, notFound: true})
            // alert("Your account was not found!")
        });
    }

    parsePermissionInfo(response) {
        let arr = [];
        for(let index in response) { 
            arr.push({
                perm_name: response[index].perm_name, 
                parent: response[index].parent,
                key: response[index].required_auth.keys[0].key
            }); 
        }
        return arr;
    }
    
    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({account_name: event.target.value})
    }

    render() {
        let match;
        let notFound;
        let body = (
            <div className="input">
                <InputGroup size="lg">
                    <InputGroupAddon addonType="prepend">Account :</InputGroupAddon>
                    <Input 
                        onChange={this.handleChange}
                        placeholder="Your account name here :)"
                    />
                </InputGroup>
                <Button onClick={(e) => this.requestPermission(e)} 
                    type="submit" 
                    className="primary_button" 
                    color="primary" 
                    size="lg" block>Submit!
                </Button>
            </div>
        )

        if(this.state.loading) {
            body = <Spinner/>
        }

        if(this.state.incorrectAccountLength) {
            notFound = (
                <UncontrolledAlert className="alert" color="danger">
                    Account names must be 12 characters in length, please try again!
                </UncontrolledAlert>
            )
        }

        if(this.state.notFound) {
            notFound = (
                <UncontrolledAlert className="alert" color="danger">
                    Your account was not found, please try again!
                </UncontrolledAlert>
            )
        }

        if(!this.state.loading && this.state.response) {
            let permissions = [...this.state.permissionInfo];
            console.log(permissions);
            let temp = permissions.filter((key) => {
                return key.perm_name === "active" || key.perm_name === "owner"
            })
            if(temp[0].key === temp[1].key){
                match = true;
            }
            console.log(temp);
            let table = permissions.map((e, index) => (
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{e.perm_name}</td>
                    <td>{e.parent}</td>
                    <td>{e.key}</td>
                </tr>
            ));
            const header = (
                <div className="table">
                <Table striped>
                    <thead>
                    <tr>
                        <th className="tableAccountName">{this.state.account_name}</th>
                        <th>Permission Name</th>
                        <th>Permission Level Parent</th>
                        <th>Public Key</th>
                    </tr>
                    </thead>
                    <tbody>
                        {table}
                    </tbody>
                </Table>
                <NavLink className="refresh" href="/" active>Try another account!</NavLink>
                </div>
            )
            body = header;
        }

        let warning;
        if(match){
            warning = (
                <Alert className="alert" color="danger">
                    <h5><strong>Your Owner and Active permission level are currently using the same private key! </strong></h5>
                    <p>  
                    The Owner permission level should only be used for changing your Owner/Active keys and should be used sparingly.  
                    Your Active permission level is meant for everyday use.
                    To protect your account, you should set a different key pair to your Active permission level and only use your Owner key when absolutely necessary.  
                    See the <a href="/about" className="alert-link"> About </a> 
                    for why this is more important now than ever as well as for additional steps you can use to keep your account safe!</p>
                    <hr />
                    <p>You can easily change your Active key to something else by visiting the 
                        <a href="https://eostoolkit.io/account/permissions" className="alert-link"> EOS Toolkit</a> and using 
                        <a href="https://get-scatter.com/" className="alert-link"> the Scatter Wallet!</a></p>
                </Alert>
            )
        }
        
        return (
            <div>
                <Navigation/>
                {notFound}
                {warning}
                {body}
            </div>
        );
    }
}

export default Home;