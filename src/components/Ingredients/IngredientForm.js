import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  
  const [ inputState, setInputState ] = useState({
    title: '',
    amount: ''
  })

  const submitHandler = event => {
    event.preventDefault();

    fetch("https://react-hook-project.firebaseio.com/ingredients.json", {
      method: 'POST',
      body: JSON.stringify(inputState),
      headers: {'Content-Type': 'application/json'}

    }).then(response => {
      console.log(response.json())
      props.simpanStatus(inputState)
    })

    // ...
  };

  console.log(inputState)
  return (
    
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input 
              type="text" 
              id="title" 
              value={inputState.title}
              onChange={
                event => {
                  const newTitle = event.target.value
                  setInputState(prevInputState => ({
                    title: newTitle,
                    amount: prevInputState.amount
                  }))
                }
              }
              />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input 
              type="number" 
              id="amount" 
              value={inputState.amount}
              onChange={event => {
                const newAmount = event.target.value
                const objek = {...inputState, amount: newAmount}
                setInputState(() => (objek))
              }}
              />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
