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
        var lis = []
        this.props.ingredients.forEach(function(ingredient) {
            lis.push(<li className="list-group-item">{ingredient}</li>);
        });
        return(
            <div className="recipe">
              <Button  onClick={ ()=> this.setState({ open: !this.state.open })}>
                { this.props.title }
              </Button>
                <Panel collapsible expanded={this.state.open}>
                <h3> Ingredients </h3>            
                <ul className="list-group">
                { lis }
                  
                </ul>
                <RecipeForm title="Edit Recipe" />
                <Button className="delete" bsStyle="danger">Delete </Button>
                
              </Panel>
            </div>
        );
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            recipes: []
        }
    }
    componentWillMount() {
        this.setState({ recipes: [
            { title: 'Onion Pie',
              ingredients: [ 'Onion', 'Pie Crust', 'Eggs' ] },
            { title: 'Spaghetti',
              ingredients: [ 'Tomato Sauce', 'Pasta', 'Meat Loaf' ] }
        ]});
    }
    render() {
        var recipes = [];
        this.state.recipes.forEach(function(recipe) {
            recipes.push(<Recipe title={recipe.title}
                         ingredients={recipe.ingredients} />);
        });
        return (
                <div className="container">
                <h1>Recipe Box </h1>
                <div className="well">
                
                { recipes }
                    
                <RecipeForm title="Add Recipe" />
                  </div>
                </div>
        );
    }
}

export default App;
