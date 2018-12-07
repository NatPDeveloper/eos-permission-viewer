import React from 'react';
import InputBox from './input-box';
import { Button } from 'reactstrap';

const input = (props) =>  {
    
    return(
        <div className="input">
            <InputBox></InputBox>
            <Button onClick={props.passedFunction} className="primary_button" color="primary" size="lg" block>Submit!</Button>{' '}
        </div>
    )
}

export default input;