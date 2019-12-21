import React from 'react';

import './IngredientList.css';

const IngredientList = props => {

const deleteIngredients = (id) => {
  fetch(`https://react-hook-project.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}

    }).then(response => {
      console.log(response.json())
      props.statusDelete();  
    })
    
}

  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map(ig => (
          <li key={ig.id} onClick={()=>deleteIngredients(ig.id)}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
