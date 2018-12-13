import React from 'react';
import axios from 'axios';
import { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, Button, Table, NavLink, UncontrolledAlert } from 'reactstrap';
import Spinner from './Spinner/Spinner';
import ErrorAlert from './UI/alert'
import Navigation from './navigation';

/*
    Things to do:

    1. Figure out where to connect to scatter and how to pass around the scatter login
        Need to use redux
    2. How to properly null out scatter reference
    3. Insert modal to explain exactly what the user is doing
    4. Insert axios post request to chain using HTTPs
    5. Test on Jungle
*/

class Home extends Component {

    /*
        Setting up state

        permissionInfo          - data being stored to be mapped to table
        account_name            - holding account_name for axios POST request to Scatter API
        loading                 - loading boolean for spinner
        response                - boolean used for conveying response has been received
        notFound                - boolean used to render correct error message if not found
        incorrectAccount length - boolean used to render correact error message if incorrect account length used
    */

    state = {
        permissionInfo: {},
        account_name: "",
        url: 'https://nodes.get-scatter.com:443/v1/chain/get_account',
        loading: false,
        response: false,
        notFound: false,
        incorrectAccountLength: false
    }

    /*
        Performing axios POST request to Scatter API
    */

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

    /*
        Parsing permission info received from response.  If permission level is using keys one set of logic, if accounts, another set.
        In the future, may need to account for KEYS & ACCOUNTS in same permission level; however, no one in top 21 is set that way as of now
    */

    parsePermissionInfo(response) {
        let arr = [];

        response.forEach((i, index) => {
            let temp = {
              perm_name: i.perm_name,
              parent: i.parent,
              threshold: i.required_auth.threshold
            };
            if(i.required_auth.keys.length){
              let t = ""
              i.required_auth.keys.forEach((i, index) => {
                t += i.weight + " - " + i.key + ", ";
              })
              temp.keys = t.substring(0, t.length - 2);
            }
            if(i.required_auth.accounts.length){
              let t = ""
              i.required_auth.accounts.forEach((i, index) => {
                t += i.weight + " - " + i.permission.actor + "@" + i.permission.permission + ", ";
              })
              temp.keys = t.substring(0, t.length - 2);
            }
            arr.push(temp);
          })

        return arr;
    }

    handleChange = (event) => {
        this.setState({account_name: event.target.value})
    }

    render() {

        /* Setting up variables to potentially ocupy JSX for return */

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

        /* Mapping table object */

        if(!this.state.loading && this.state.response) {
            let table;
            let permissions = [...this.state.permissionInfo];
            let temp = permissions.filter((key) => {
                return key.perm_name === "active" || key.perm_name === "owner"
            })

            /*
                threshold could be aboce 1 in length, so yo account, calling substring with thresholds length to trimp string to just key if there
            */
            if(temp[0].keys === temp[1].keys && temp[0].keys.substring(temp[0].threshold + 3).length === 53){
                match = true;
            }

            console.log(permissions);
            table = permissions.map((e, index) => (
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{e.perm_name}</td>
                    <td>{e.parent}</td>
                    <td>{e.threshold}</td>
                    <td>{e.keys}</td>
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
                            <th>Threshold</th>
                            <th>Weight - Public Key / Accounts</th>
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