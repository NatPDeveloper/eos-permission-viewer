import React from 'react';
import { Alert } from 'reactstrap';

const alert = (props) => {
    return (
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

export default alert;