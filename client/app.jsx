import React, { Component, PropTypes } from 'react';

const apiKey = 'cd16c92a86c4a770ab7db477e3eab80d';
function newRecipe() {
  fetch('http://food2fork.com/api/search?key=' + apiKey + '&q=shredded%20chicken', {
    method: 'GET',
    mode: 'cors'
  })
  .then(function(data) {
    return data.json();
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error) {
    console.log(error);
  });
}

export class App extends Component {
  static propTypes = {

  };

  componentDidMount() {
    newRecipe();
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
      Hello thisss
      </div>
    );
  }
}