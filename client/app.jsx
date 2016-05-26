import React, { Component, PropTypes } from 'react';
import { Recipe } from './components/Recipe'

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getNewInd(old, min, max) {
  const newInd = randInt(min, max);
  if(newInd == old) return getNewInd(old, min, max);
  return newInd;
}

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingreds: '',
      recipe: {},
      noRec: false,
      getting: false,
      got: false
    };
  }

  getRecipe = () => {
    this.setState({ getting: true, noRec: false, recipe: {} });
    fetch('data/' + this.state.ingreds)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      if(data.Count == 0) {
        this.setState({ noRec: true, recipe: {}, getting: false, got: false });
        return;
      }
      let recInd = randInt(0, data.Count - 1);
      if(data.Recipes[recInd].Title == this.state.recipe.Title && data.Count > 1) {
        recInd = getNewInd(recInd, 0, data.Count - 1);
      }
      this.setState({ recipe: data.Recipes[recInd], getting: false, got: true });
    })
    .catch((error) => {
      this.setState({ getting: false, got: false })
      console.log(error);
    });
  };

  handleChange = (e) => {
    this.setState({ ingreds: e.target.value });
  };

  onEnter = (e) => {
    if (e.keyCode === 13) {
      // 13 is enter
      this.getRecipe();
    }
  };

  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Mangiamo!</h1>
        <div className='well'>
          <p>
          You're hungry but you simply can't decide what to eat. Sound familiar? Well you're in luck. Let Mangiamo
          decide for you! Simply enter some ingredients you like the sound of separated with only a space (or just try your luck without any)
          and a recipe will be generated for you. If you don't like it, <i>nessun problema!</i> Just click the button to get a different
          recipe that fits your needs.
          </p>
          <p>
          <b>Buon Appetito!</b>
          </p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <hr/>
          <input onKeyDown={this.onEnter} onChange={this.handleChange} type='text' placeholder='Enter ingredients' />
          <br/>
          <br/>
          <button className='btn btn-lg btn-primary' onClick={this.getRecipe}>
          {this.state.got ?
          "Give me another one!" :
          "Let's eat!"}
          </button>
        </div>
        {this.state.getting &&
          <div className='sk-folding-cube'>
            <div className='sk-cube1 sk-cube'></div>
            <div className='sk-cube2 sk-cube'></div>
            <div className='sk-cube4 sk-cube'></div>
            <div className='sk-cube3 sk-cube'></div>
          </div>}
        <hr/>
        {this.state.noRec && <div className='alert alert-warning'>Sorry, couldn't find a recipe for that.</div>}
        <Recipe recipe={this.state.recipe}/>
        <br/>
      </div>
    );
  }
}