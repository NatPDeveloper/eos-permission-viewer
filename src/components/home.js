import React from 'react';
import axios from 'axios';
import { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, Button, Table, NavLink, UncontrolledAlert } from 'reactstrap';
import Spinner from './Spinner/Spinner';
import ErrorAlert from './UI/alert'
import Navigation from './navigation';

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
        e.preventDefault();
        const account_name = this.state.account_name;

        if (account_name.length > 12 || account_name.length < 12) {
            this.setState({incorrectAccountLength: true})
            return;
        }

        this.setState({loading: true})

        const data = JSON.stringify({
            account_name: account_name
        });

        axios.post(this.state.url, data)
        .then(response => {
            console.log(response);
            const res = this.parsePermissionInfo(response.data.permissions);
            this.setState({permissionInfo: res, loading: false, response: true});
        })
        .catch(err => {
            console.log(err);
            this.setState({loading: false, notFound: true})
        });
    }

    parsePermissionInfo(response) {
        let arr = [];
        // console.log(response[0].perm_name);
        // console.log(response);
        
        for(let index in response) { 
            if(response[index].required_auth.keys.length === 0 && response[index].required_auth.accounts.length !== 0){
                let tempStore = [];
                response[index].required_auth.accounts.forEach((i) => {
                  tempStore.push(i.permission);  
                })
                // console.log(tempStore);
                arr.push({
                    perm_name: response[index].perm_name, 
                    parent: response[index].parent,
                    key: response[index].required_auth.accounts[0].permission.actor
                    //tempStore
                });
            } else if(response[index].required_auth.keys.length === 1) {
                arr.push({
                    perm_name: response[index].perm_name, 
                    parent: response[index].parent,
                    key: response[index].required_auth.keys[0].key
                });
            }
        }

        return arr;
    }
    
    handleChange = (event) => {
        this.setState({account_name: event.target.value})
    }

    render() {
        let match;
        let notFound;
        let warning;

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
            let table;
            let permissions = [...this.state.permissionInfo];
            console.log(permissions);
            let temp = permissions.filter((key) => {
                return key.perm_name === "active" || key.perm_name === "owner"
            })
            
            if(temp[0].key === temp[1].key && temp[0].key.length > 52){
                match = true;
            }

            table = permissions.map((e, index) => (
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
                            <th>Public Key / Accounts</th>
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

        if(match){
            warning = (
                <ErrorAlert/>
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