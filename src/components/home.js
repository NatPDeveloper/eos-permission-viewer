import React from 'react';
import { Component } from 'react';
import Navigation from './navigation';
import axios from 'axios';
import { InputGroup, InputGroupAddon, Input, Button, Table } from 'reactstrap';
import Spinner from './Spinner/Spinner';

class Home extends Component {
    state = {
        permissionInfo: {},
        account_name: "",
        url: 'https://nodes.get-scatter.com:443/v1/chain/get_account',
        loading: false,
        response: false
    }

    requestPermission = (e) => {
        this.setState({loading: true})
        e.preventDefault();
        const data = JSON.stringify({
            account_name: this.state.account_name
        });
        axios.post(this.state.url, data)
        .then(response => {
            const res = this.parsePermissionInfo(response.data.permissions);
            this.setState({permissionInfo: res, loading: false, response: true})
            console.log(response.data.permissions)
        })
        .catch(err => {
            console.log(err);
            this.setState({loading: false})
        });
    }

    parsePermissionInfo(response) {
        let arr = [];
        for(let index in response) { 
            arr.push(response[index].perm_name); 
        }
        return arr;
    }
    
    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({account_name: event.target.value})
    }

    render() {
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
        if(!this.state.loading && this.state.response) {
            let permissions = [...this.state.permissionInfo];
            let table = permissions.map((e, index) => (
                <tr>
                    <th scope="row">{index+1}</th>
                    <td>{e}</td>
                </tr>
            ));
            const header = (
                <div className="table">
                <Table striped>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Permission Name</th>
                    </tr>
                    </thead>
                    <tbody>
                        {table}
                    </tbody>
                </Table>
                </div>
            )
            body = header;
        }

        /*
        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

        THIS https://reactstrap.github.io/components/tables/ 

        TO DO:
        1. Add Keys to Table + other meta data to table
        2. Add button to refresh page
        3. Make logo anchor tag smaller

        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        */

        return (
            <div>
                <Navigation/>
                {body}
            </div>
        );
    }
}

export default Home;