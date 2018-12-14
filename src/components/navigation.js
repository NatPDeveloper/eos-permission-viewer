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

// import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'eosjs';
import { Api, JsonRpc } from 'eosjs';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs2';

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
            result: null,
            sending: false
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
        loggedIn: state.loggedIn,
        result: state.result,
        sending: state.sending
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetScatter: (scatter) => dispatch(actions.setScatter(scatter)),
        onSetAccount: (account) => dispatch(actions.setAccount(account)),
        onLogout: () => dispatch(actions.logout()),
        onSendResult: (result) => dispatch(actions.sendResult(result))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation));