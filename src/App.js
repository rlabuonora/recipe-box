import React, { Component } from 'react';
import { Button, Panel, Modal } from 'react-bootstrap';
import './App.css';



class RecipeForm extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            titleVal: "",
            ingredientVals: ""
        }
    }
    componentWillMount() {
        if (this.props.recipeTitle) {
            this.setState( { titleVal: this.props.recipeTitle,
                             ingredientVals: this.props.ingredients });
        }
    }
    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }
    handleTitleChange(event) {
        this.setState( { titleVal: event.target.value });
    }
    handleIngredientChage(event) {
        this.setState( { ingredientVals: event.target.value });
    }

    add() {
        this.props.add(this.state.titleVal, this.state.ingredientVals);
        this.setState({ titleVal: "", ingredientVals: "" });
        this.close();
    }

    edit() {
        this.props.edit(this.props.idx, this.state.titleVal, this.state.ingredientVals);
        this.close();
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
                        <input
                          className="form-control"
                          placeholder="Recipe Name"
                          value={ this.state.titleVal  }
                          onChange={ this.handleTitleChange.bind(this) }
                         ></input>
                      </div>
                
                      <div className="form-group">
                        <label>Ingredients</label>
                        <input
                          className="form-control"
                          placeholder="Ingredients (separated by commas)"
                          value={  this.state.ingredientVals }
                          onChange={ this.handleIngredientChage.bind(this) }
                        ></input>
                      </div>

                    </Modal.Body>

                    <Modal.Footer>
                { this.props.title === "Add Recipe" ?
                  <Button bsStyle="primary"
                    onClick={this.add.bind(this)}
                  > { this.props.title }
                  </Button> :
                  <Button bsStyle="warning"
                    onClick={this.edit.bind(this)}
                  > { this.props.title }
                  </Button> }
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
    delete() {
        alert("Sure?");
        this.setState( { open: false });
        this.props.delete(this.props.idx);
        
    }
    edit(idx, title, ingredients) {
        this.props.edit(idx, title, ingredients);
    }
    render() {
        var lis = []
        this.props.ingredients.forEach(function(ingredient, i) {
            lis.push(<li key={i} className="list-group-item">{ingredient}</li>);
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
                <RecipeForm title="Edit Recipe"
                            recipeTitle={this.props.title}
                            ingredients={this.props.ingredients}
                            idx={this.props.idx}
                            edit={this.edit.bind(this)}
                />
                <Button onClick={this.delete.bind(this)} className="delete" bsStyle="danger">Delete </Button>
                
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
        // TODO: refactor into helpers
      const localStorageKey = "recipebox-recipes";
      // check in local storage for data TODO: refactor
      let recipesStr = window.localStorage.getItem(localStorageKey);
      if ( recipesStr ) {
        let recipesJson = JSON.parse(recipesStr);
        this.setState( { recipes: recipesJson });
      }  else {
          this.setState( { recipes: [
          { title: 'Onion Pie',
            ingredients: [ 'Onion', 'Pie Crust', 'Eggs' ] },
          { title: 'Spaghetti',
            ingredients: [ 'Tomato Sauce', 'Pasta', 'Meat Loaf' ] }
          ] });
        }
    }

    componentWillUpdate() {
        const localStorageKey = "recipebox-recipes";
        let recipes = JSON.stringify(this.state.recipes);
        window.localStorage.setItem(localStorageKey, recipes);        
    }

    deleteRecipe(i) {
        let temp = this.state.recipes;
        temp.splice(i, 1);
        this.setState({ recipes: temp });
    }

    editRecipe(i, title, ingredients) {
        let temp = this.state.recipes;
        temp[i].title = title;
        temp[i].ingredients = ingredients.split(",").map(function(s) { return s.trim() });
        this.setState({ recipes: temp });
    }

    addRecipe(title, ingredients) {
        let temp = this.state.recipes;
        let ingredientsArr = ingredients.split(",").map(function(s) { return s.trim() });
        temp.push({ title: title, ingredients: ingredientsArr });
        this.setState({ recipes: temp });
    }
    render() {
        var recipes = [];
        this.state.recipes.forEach(function(recipe, i) {
            recipes.push(<Recipe
                           delete={this.deleteRecipe.bind(this)}
                           edit={this.editRecipe.bind(this)}
                           key={i}
                           title={recipe.title}
                           idx={i}
                           ingredients={recipe.ingredients} />);
        }.bind(this));
        return (
                <div className="container">
                <h1>Recipe Box </h1>
                <div className="well">
                
                { recipes }
                    
                <RecipeForm title="Add Recipe" add={this.addRecipe.bind(this)}/>
                  </div>
                </div>
        );
    }
}



export default App;
