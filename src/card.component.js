import React from 'react';
import './card.component.css';

class Card extends React.Component {

  drag(event) {
    const { id } = this.props;
    event.dataTransfer.setData("id", id);
  }

  render() {
    const { title, description, removeCard, id } = this.props;

    return (
      <div className="card" draggable onDragStart={ e => this.drag(e) }>
        <h2 className="card-activity">{ title }</h2>
        <p className="card-description">{ description }</p>
        <span className="card__date card__date--late" onClick={ e => removeCard(id) }>DELETE</span>
      </div>
    )
  }
};

export default Card;
