import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
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
import * as actions from '../store/actions/auth';

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
            incorrectAccountLength: false
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
                this.props.onSetScatter(ScatterJS.scatter)
                window.ScatterJS = null;
            }
        });
    }

    login = () => {
        const scatter = this.props.scatter;
        const requiredFields = { accounts:[this.props.network] };
        scatter.getIdentity(requiredFields).then(() => {
        
            const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');                
            console.log(account)
            this.props.onSetAccount(account)
        })
        .catch(error => {
            console.error(error);
        });
    }

    logout = () => {
        this.props.scatter.forgetIdentity()
        this.props.onLogout();
        alert('Logged Out')
    }

    action = () => {
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
    }

    render() {

        let loginButtons;
        if(this.props.loggedIn){
            loginButtons = (
                <NavItem>
                    <Button onClick={this.logout}  id="scatterLogout" color="primary">Logout</Button>{' '}
                </NavItem>
            )
        } else {
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

const mapStateToProps = state => {
    return {
        network: state.network,
        account: state.account,
        scatter: state.scatter,
        loggedIn: state.loggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetScatter: (scatter) => dispatch(actions.setScatter(scatter)),
        onSetAccount: (account) => dispatch(actions.setAccount(account)),
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation));