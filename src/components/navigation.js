import React from 'react';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Button
} from 'reactstrap';

/* Importing Scatter Wallet & eosjs */
import Eos from 'eosjs';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs2';

ScatterJS.plugins( new ScatterEOS() );

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            permissionInfo: {},
            account_name: "",
            url: 'https://nodes.get-scatter.com:443/v1/chain/get_account',
            loading: false,
            response: false,
            notFound: false,
            incorrectAccountLength: false,
            network: {
                // blockchain:'eos',
                // protocol:'https',
                // host:'nodes.get-scatter.com',
                // port:443,
                // chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
                blockchain:'eos',
                protocol:'https',
                host:'jungle2.cryptolions.io',
                port:443,
                chainId:'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473'
            },
            loggedIn: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    login = () => {
        ScatterJS.scatter.connect("EOS Permission Viewer").then(connected => {
            // User does not have Scatter Desktop, Mobile or Classic installed.
            if(!connected) return false;
    
            const scatter = ScatterJS.scatter;
            const requiredFields = { accounts:[this.state.network] };
            scatter.getIdentity(requiredFields).then(() => {
        
                const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
        
                const eosOptions = { expireInSeconds:60 };
        
                // const eos = scatter.eos(this.state.network, Eos, eosOptions);
                // const transactionOptions = { authorization:[`${account.name}@${account.authority}`] };
        
                // eos.contract('eosezchatnat').then(contract => {  // contract account needs to change when going to jungle..
                //     contract.sendmsg(account.name, "id here", "message", transactionOptions)
                //   }).catch(e => {
                //       console.log("error", e);
                //   })
                this.setState({loggedIn: true});
            }).catch(error => {
                console.error(error);
            });
            window.ScatterJS = null;
        });
    }

    logout = () => {
        ScatterJS.scatter.connect("EOS Permission Viewer").then(connected => {
            const scatter = ScatterJS.scatter;
            scatter.forgetIdentity()
            this.setState({loggedIn: false});
            window.ScatterJS = null;
            alert('Logged Out Successfully')
        });
    }

    render() {

        let loginButtons;

        if(this.props.location.pathname === "/change-permission/" && this.state.loggedIn){
            loginButtons = (
                <NavItem>
                    <Button onClick={this.logout}  id="scatterLogout" color="primary">Logout</Button>{' '}
                </NavItem>
            )
        } else if (this.props.location.pathname === "/change-permission/" && this.state.loggedIn === false){
            loginButtons = (
                <NavItem>
                    <Button onClick={this.login} id="scatterLogin" color="primary">Scatter Login</Button>{' '}
                </NavItem>
            )
        }

        return (
            <div>
                <Navbar color="light" light expand="md">
                    <img className="logo-img" src={require('../logo/EOSPV_logo.png')} alt="EOS Permission Viewer" id="logo"></img>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" pills>
                        <NavItem>
                            <NavLink href="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/about/">About</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/change-permission/">Change Permission</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/NatPDeveloper/eos-permission-viewer">Source Code</NavLink>
                        </NavItem>
                        {loginButtons}
                    </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(Navigation);