import React from 'react';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';

const InputBox = (props) => {
  return (
    <div>
      <InputGroup size="lg">
        <InputGroupAddon addonType="prepend">Account :</InputGroupAddon>
        <Input placeholder="Your account name here :)" />
      </InputGroup>
    </div>
  );
};

export default InputBox;