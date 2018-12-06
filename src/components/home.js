import React from 'react';
import { Component } from 'react';
import Navigation from './navigation';
import Input from './UI/input';

class Home extends Component {
    
    render() {
        return (
            <div>
                <Navigation></Navigation>
                <Input></Input>
            </div>
        );
    }
}

export default Home;