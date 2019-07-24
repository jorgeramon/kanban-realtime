import React from 'react';
import './stage.component.css';

import CardHidden from './card-hidden.component';
import Card from './card.component';

class Stage extends React.Component {

  constructor(props) {
    super(props);
  }

  drop(event) {
    event.preventDefault();

    const { id, moveCard } = this.props;
    moveCard(event.dataTransfer.getData("id"), id);
  }

  allowDrop(event) {
    event.preventDefault();
  }

  render() {
    const { name, cards, removeCard } = this.props;

    return (
      <section className="stage" onDrop={ e => this.drop(e) } onDragOver={ e => this.allowDrop(e) }>
        <h2 className="stage-title">{ name }</h2>
        <CardHidden />
        {
          cards.map(value => (
            <Card key={ value.id } { ...value } removeCard={ removeCard } />
          ))
        }
      </section>
    );
  }
}

export default Stage;
