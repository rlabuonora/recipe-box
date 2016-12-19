import React, { Component } from 'react';
import { Button, Panel, Modal } from 'react-bootstrap';
import './App.css';



class AddButton extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    render() {
        return(
                <div>
                <Button bsStyle="primary"
                        onClick={this.open.bind(this)}
                >
                  Add Recipe
            </Button>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h4> Text in modal </h4>
                </Modal.Body>

                  <Modal.Footer>
                  <Button onClick={this.close.bind(this)}>Close</Button>
                  </Modal.Footer>
              </Modal>
                
                </div>
        );
    }
}

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
                Spaghetti
            </Button>
              <Panel collapsible expanded={this.state.open}>
                <h3> Ingredients </h3>            
              <ul className="list-group">
               <li className="list-group-item">Cras justo odio</li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
                <li className="list-group-item">Morbi leo risus</li>
                <li className="list-group-item">Porta ac consectetur ac</li>
                </ul>
                <Button bsStyle="warning">Edit </Button>
                <Button bsStyle="danger">Delete </Button>
            </Panel>
                </div>
        );
    }
}

class App extends Component {
    render() {
        return (
                <div className="container">
                <h1>Recipe Box </h1>
                  <div className="well">
                    <Recipe />
                    <Recipe />
                    <AddButton />
                  </div>
                </div>
        );
    }
}

export default App;
