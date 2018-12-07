import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import Navigation from './navigation';

const about = (props) => {
  return (
    <div>
        <Navigation></Navigation>
        <div className="jumbotron">
            <Jumbotron className="jumbotron">
                <h1 className="display-5">About EOS Permission Viewer</h1>
                <p className="lead">EOSPV is a simple permission viewer for the EOS blockchain.  
                I made this in the hopes of spreading account security awareness.
                If the EOS User Agreement is implemented in its current capacity, 
                <a href="https://medium.com/eos-new-york/eos-platform-user-agreement-v2-0-c0cc2496e650"><strong> Article XII — Personal Security</strong></a> will remove ECAF's ability
                to arbitrate on behalf of those who have had their keys stolen or phished.
                </p>
                <hr className="my-2" />
                <h4>How to use:</h4>
                <p>Simply enter your EOS account name (not public key) and the app will show you your current permission levels.  
                    It will also show you a warning if your owner/active keys are the same.  An owner key should never be loaded into a wallet.  
                    Think of it as the master key, it is needed to change the ownership of the account.  
                    The active permission level is what you want to sign with.  
                    In the case that someone gets your active key, they will not be able to change it to something else.  
                    If you sign up for <strong><a href="https://t.me/EOSAlarmEBot">Telegram alerts</a>
                    </strong> or <strong><a href="https://eosauthority.com/alerts">EOS Authority's alert system</a></strong>, you will always be notified of an unstake command.
                </p>
                <p className="lead">
                <Button href="https://github.com/NatPDeveloper/eos-permission-viewer" color="primary">Check the source code!</Button>
                </p>
            </Jumbotron>
        </div>
    </div>
  );
};

export default about;