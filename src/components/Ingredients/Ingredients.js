import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {

  const [userIngredients, setUserIngredients] = useState([]);
  const [statusSimpan, setStatusSimpan] = useState(false);

  useEffect(() => {
    fetch("https://react-hook-project.firebaseio.com/ingredients.json")
    .then(response => response.json())
    .then(responseData => {
      const loadedIngredients = []
      for(const key in responseData) {
        loadedIngredients.push({
          id: key,
          title: responseData[key].title,
          amount: responseData[key].amount
        })
      }
      setUserIngredients(loadedIngredients)
    })
  }, [])

  const addUserIngredientsHandler = ingredient => {

  }

  const simpanStatus = (data) => {
    setStatusSimpan(true)
    setUserIngredients([...userIngredients, data])
  }

  return (
    <div className="App">
      <IngredientForm simpanStatus={simpanStatus} onAddIngredients={addUserIngredientsHandler}/>

      <section>
        <Search />
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} onRemoveItem={() =>{}}/>
      </section>
    </div>
  );
}

export default Ingredients;
