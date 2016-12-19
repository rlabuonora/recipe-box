import React, { Component } from 'react';
import { Button, Panel, Modal } from 'react-bootstrap';
import './App.css';



class RecipeForm extends Component {
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
                <Button bsStyle={ this.props.title === "Add Recipe" ? "primary" : "warning" }
                        onClick={this.open.bind(this)}
                >
                { this.props.title }
                </Button>
                
                <form className="form-inline">
                  <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                      <Modal.Title>{ this.props.title }</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                      <div className="form-group">
                        <label>Recipe</label>
                        <input className="form-control" placeholder="Recipe Name"></input>
                      </div>
                
                      <div className="form-group">
                        <label>Ingredients</label>
                        <input className="form-control" placeholder="Ingredients (separated by commas)"></input>
                      </div>

                    </Modal.Body>

                    <Modal.Footer>
                      <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                  </Modal>
                </form>
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
                
                <RecipeForm title="Edit Recipe" />
                <Button className="delete" bsStyle="danger">Delete </Button>
                
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
                <RecipeForm title="Add Recipe" />
                  </div>
                </div>
        );
    }
}

export default App;
