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

// Changed back to eosjs 16, 20 was throwing error
import Eos from 'eosjs';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
// import ScatterEOS from 'scatterjs-plugin-eosjs2';

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
                blockchain:'eos',
                protocol:'https',
                host:'jungle2.cryptolions.io',
                port:443,
                chainId:'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473'
            },
            account: null,
            scatter: null
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        ScatterJS.plugins( new ScatterEOS() );
        ScatterJS.scatter.connect('EOS Permission Viewer').then(connected => {
            if(connected){
                // this.props.login(ScatterJS.scatter);
                this.setState({scatter: ScatterJS.scatter})
                window.ScatterJS = null;
            }
        });
    }

    login = () => {
        const scatter = this.state.scatter;
        const requiredFields = { accounts:[this.state.network] };
        scatter.getIdentity(requiredFields).then(() => {
        
            const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');                
            console.log(account)
            this.setState({account: account});
        })
        .catch(error => {
            console.error(error);
        });
    }

    logout = () => {
        this.state.scatter.forgetIdentity()
        this.setState({loggedIn: false, account: null});
        alert('Logged Out')
    }

    action = () => {
        const scatter = this.state.scatter;
        const eosOptions = { expireInSeconds:60 };
        const eos = scatter.eos(this.state.network, Eos, eosOptions);
        const transactionOptions = { authorization:[`${this.state.account.name}@${this.state.account.authority}`] };
        eos.contract('eosezchatnat').then(contract => {  // contract account needs to change when going to jungle..
            contract.sendmsg(this.state.account.name, "chat_id", "message", transactionOptions)
          }).catch(e => {
              console.log("error", e);
          })
    }

    render() {

        let loginButtons;
        if(this.props.location.pathname === "/change-permission/" && this.state.account){
            loginButtons = (
                <NavItem>
                    <Button onClick={this.logout}  id="scatterLogout" color="primary">Logout</Button>{' '}
                </NavItem>
            )
        } else if (this.props.location.pathname === "/change-permission/"){
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
                        <NavItem>
                            <Button onClick={this.action}  id="scatterLogout" color="primary">Action</Button>{' '}
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