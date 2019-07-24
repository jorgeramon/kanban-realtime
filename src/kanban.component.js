import React from 'react';
import './kanban.component.css';

import Stage from './stage.component';
import CardForm from './card-form.component';

const STAGE_TODO = "todo";
const STAGE_DOING = "doing";
const STAGE_DONE = "done";

class Kanban extends React.Component {

  constructor(props) {
    super(props);

    this.id = 1;
    this.state = {
      cards: []
    };

    console.log(process.env);
  }

  moveCard(cardId, stageId) {
    const cards = this.state.cards.slice();
    const card = cards.find(card => card.id == cardId);
    card.stage = stageId;
    this.setState({ cards });
  }

  addCard(data) {
    const cards = this.state.cards.slice();
    cards.push({ ...data, id: this.id++, stage: STAGE_TODO });

    this.setState({ cards });
  }

  render() {
    const todo = this.state.cards.filter(card => card.stage === STAGE_TODO);
    const doing = this.state.cards.filter(card => card.stage === STAGE_DOING);
    const done = this.state.cards.filter(card => card.stage === STAGE_DONE);

    const moveCard = this.moveCard.bind(this);
    const addCard = this.addCard.bind(this);

    return (
      <div>
        <CardForm addCard={ addCard } />
        <div id="container">
          <Stage id={ STAGE_TODO } name="To Do" cards={ todo } moveCard={ moveCard } />
          <Stage id={ STAGE_DOING } name="Doing" cards={ doing } moveCard={ moveCard } />
          <Stage id={ STAGE_DONE } name="Done" cards={ done } moveCard={ moveCard } />
        </div>
      </div>
    );
  }
}

export default Kanban;
