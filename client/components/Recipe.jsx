import React, { Component, PropTypes } from 'react';

function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export class Recipe extends Component {
  static propTypes = {
    recipe: PropTypes.object
  };

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        {this.props.recipe.Title &&
          <div>
            <h3>{decodeHtml(this.props.recipe.Title)}</h3>
            <a href={this.props.recipe.Source_url}>I like it, show me the recipe!</a>
            <div>
              <img src={this.props.recipe.Image_url}/>
            </div>
          </div>
        }
      </div>
    );
  }
}