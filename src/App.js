import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import './App.css';


class Recipe extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            open: false
        };
    }
    render() {
        return(
            <div className="recipe">
            <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
            click
        </Button>
            <Panel collapsible expanded={this.state.open}>
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
            </Panel>
                </div>
        );
    }
}

class App extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            open: true
        };
    }

    render() {
        return (
                <div className="container">
                <h1>Recipe Box </h1>
                  <div className="well">
                    <Recipe />
                    <Recipe />
                  </div>
                </div>
        );
    }
}

export default App;
