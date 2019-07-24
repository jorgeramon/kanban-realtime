import React from 'react';
import './card-form.component.css';

class CardForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      activity: ''
    };
  }

  handleChange(input) {
    return event => {
      event.preventDefault();
      this.setState({ [input]: event.target.value });
    };
  }

  add(event) {
    event.preventDefault();
    this.titleInput.value = '';
    this.activityInput.value = '';

    const { title, activity } = this.state;
    this.props.addCard({ title, description: activity });

    this.setState({ title: '', activity: '' });
  }

  render() {
    const { title, activity } = this.state;

    return (
      <header>
        <input type="text"
          ref={ el => this.titleInput = el } placeholder="Title" onChange={ this.handleChange('title') }/>
        <input type="text"
          ref={ el => this.activityInput = el } placeholder="Activity" onChange={ this.handleChange('activity') }/>
        <button type="button" onClick={ e => this.add(e) }>Add</button>
      </header>
    );
  }
}

export default CardForm;
