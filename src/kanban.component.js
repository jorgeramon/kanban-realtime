import React from 'react';
import './kanban.component.css';

import Stage from './stage.component';
import CardForm from './card-form.component';
import db from './firestore';

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

    db.collection('cards')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          const data = change.doc.data();
          const id = change.doc.id;

          switch (change.type) {

            case 'added':
              this.addCardState({ ...data, id });
              break;

            case 'modified':
              this.moveCardState(id, data.stage);
              break;

            case 'removed':
              this.removeCardState(id);
              break;
          }
        });
      });
  }

  addCardState(card) {
    const cards = this.state.cards.slice();
    cards.push(card);
    this.setState({ cards });
  }

  moveCardState(cardId, stageId) {
    const cards = this.state.cards.slice();
    const card = cards.find(card => card.id == cardId);
    card.stage = stageId;
    this.setState({ cards });
  }

  removeCardState(cardId) {
    const cards = this.state.cards.slice();
    const index = cards.findIndex(card => card.id == cardId);

    if (index !== -1) {
      cards.splice(index, 1);
      this.setState({ cards });
    }
  }

  removeCard(cardId) {
    this.removeCardState(cardId);
    db.collection('cards').doc(cardId).delete();
  }

  moveCard(cardId, stageId) {
    this.moveCardState(cardId, stageId);
    db.collection('cards').doc(cardId).set({ stage: stageId }, { merge: true });
  }

  addCard(data) {
    db.collection('cards').add({ ...data, stage: STAGE_TODO });
  }

  render() {
    const todo = this.state.cards.filter(card => card.stage === STAGE_TODO);
    const doing = this.state.cards.filter(card => card.stage === STAGE_DOING);
    const done = this.state.cards.filter(card => card.stage === STAGE_DONE);

    const moveCard = this.moveCard.bind(this);
    const addCard = this.addCard.bind(this);
    const removeCard = this.removeCard.bind(this);

    return (
      <div>
        <CardForm addCard={ addCard } />
        <div id="container">
          <Stage id={ STAGE_TODO } name="To Do" removeCard={ removeCard } cards={ todo } moveCard={ moveCard } />
          <Stage id={ STAGE_DOING } name="Doing" removeCard={ removeCard } cards={ doing } moveCard={ moveCard } />
          <Stage id={ STAGE_DONE } name="Done" removeCard={ removeCard } cards={ done } moveCard={ moveCard } />
        </div>
      </div>
    );
  }
}

export default Kanban;
