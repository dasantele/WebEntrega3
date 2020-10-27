import React from 'react';




export default class Job extends React.Component {


    state ={
        "publicacion": this.props.publicacion
    };


    renderPublic(){
        return (
          <div>
            <h2>{this.publicación.name}</h2>
            <h3>{this.publicación.company}</h3>
            <h4>{this.publicación.salary}</h4>
            <h5>{this.publicación.city}</h5>
          </div>
        );
      }

  render() {
    return (
      <div>
        {this.renderPublic()}
      </div>
    );
  }
}