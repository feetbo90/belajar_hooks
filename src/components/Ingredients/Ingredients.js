import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {

  const [userIngredients, setUserIngredients] = useState([]);
  //const [statusSimpan, setStatusSimpan] = useState(false);
  const [statusDelete, setStatusDelete] = useState(false);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
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
  }

  const addUserIngredientsHandler = ingredient => {

  }

  const simpanStatus = (data) => {
    setUserIngredients([...userIngredients, data])
  }

  const deleteStatus = () => {
    fetchData()
  }

  return (
    <div className="App">
      <IngredientForm simpanStatus={simpanStatus} onAddIngredients={addUserIngredientsHandler}/>

      <section>
        <Search />
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} statusDelete={deleteStatus}/>
      </section>
    </div>
  );
}

export default Ingredients;
