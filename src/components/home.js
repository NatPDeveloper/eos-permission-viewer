import React from 'react';
import { Component } from 'react';
import Navigation from './navigation';
import Input from './UI/input';
import axios from 'axios';

class Home extends Component {

    state = {
        permissionInfo: {},
        account_name: "eosnewyorkio",
        url: 'https://nodes.get-scatter.com:443/v1/chain/get_account'
    }

    // componentDidMount() {
    //     const data = JSON.stringify({
    //         account_name: this.state.account_name
    //     });
    //     axios.post(this.state.url, data)
    //     .then(response => {
    //         this.setState({permissionInfo: response})
    //         console.log(this.state.permissionInfo.data.permissions)
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // }

    requestPermission(){
        const data = JSON.stringify({
            account_name: this.state.account_name
        });
        axios.post(this.state.url, data)
        .then(response => {
            this.setState({permissionInfo: response})
            console.log(this.state.permissionInfo.data.permissions)
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    render() {
        return (
            <div>
                <Navigation></Navigation>
                <Input passedFunction={() => this.requestPermission()}></Input>
            </div>
        );
    }
}

export default Home;