import React, { Component, PropTypes } from 'react';

function decodeHtml(html) {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

function getBarColor(val) {
  if(val <= 100 && val > 70) {
    return 'progress-bar progress-bar-success';
  } else if(val <= 66 && val > 34) {
    return 'progress-bar progress-bar-warning';
  } else {
    return 'progress-bar progress-bar-danger';
  }
}

export class Recipe extends Component {
  static propTypes = {
    recipe: PropTypes.object
  };

  render() {
    const score = Math.round(this.props.recipe.Social_rank);
    return (
      <div style={{ textAlign: 'center' }}>
        {this.props.recipe.Title &&
          <div>
            <h3>{decodeHtml(this.props.recipe.Title)}</h3>
            <div>
            Publisher: {this.props.recipe.Publisher}
            </div>
            <a href={this.props.recipe.Source_url}>I like it, show me the recipe!</a>
            <div>
              <div className="progress">
                <div className={getBarColor(parseInt(score))} role="progressbar"
                ariaValuenow={score} ariaValuemin="0" ariaValuemax="100" style={{ width: score + '%' }}>
                Rating: {score}%
                </div>
              </div>
            </div>
            <div>
              <img src={this.props.recipe.Image_url}/>
            </div>
          </div>
        }
      </div>
    );
  }
}