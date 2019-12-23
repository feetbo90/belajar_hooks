import React, { useState, useEffect, useCallback, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {

  //const [userIngredients, setUserIngredients] = useState([]);
  //const [statusSimpan, setStatusSimpan] = useState(false);
  const [statusDelete, setStatusDelete] = useState(false);

  const ingredientsReducer = (currentIngredients, action) => {
    
    switch(action.type) {
      case 'ADD' :
        //console.log(action.ingredient)
        return {...currentIngredients, ingredients: action.ingredient}
      default :
        return currentIngredients;
    }
  }

  const [ userIngredients, dispatch ] = useReducer(ingredientsReducer, {ingredients : []});

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
      dispatch({type : 'ADD', ingredient: loadedIngredients});

    })
  }

  const addUserIngredientsHandler = ingredient => {
      
  }

  const simpanStatus = (data) => {
    //setUserIngredients([...userIngredients, data])
  }

  const deleteStatus = () => {
    fetchData()
  }

  const filteredIngredients = useCallback(filterIng => {
    dispatch( { type: 'ADD', ingredient: filterIng });
  }, []);

  console.log(userIngredients);

  return (
    
    <div className="App">
      <IngredientForm simpanStatus={simpanStatus} onAddIngredients={addUserIngredientsHandler}/>

      <section>
        <Search onLoadIngredients={filteredIngredients}/>
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients.ingredients} statusDelete={deleteStatus}/>
      </section>
    </div>
  );
}

export default Ingredients;
