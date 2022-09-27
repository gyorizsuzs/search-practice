import React, { useState, useEffect } from "react";
import Card from "./Card";

const Modal = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/autocomplete?apiKey=5d7d6fdfdb7344eb83cc81d23aba5e70&number=5&query=${meals}`
    )
      .then((response) => response.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setMeals(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [meals]);

  function handleChange(event) {
    setMeals(event.target.value);
  }

  if (error) {
    return <>{error.message}</>;
  } else if (!isLoaded) {
    return <>Loading...</>;
  } else {
    return (
      <div className="wrapper">
        <div className="control">
          <input
            className="input-field"
            type="text"
            placeholder="Search for a meal..."
            onChange={handleChange}
          />
          <button /*  onClick={getMeal} */>Submit</button>
        </div>
        {meals && <Card meals={meals} />}
      </div>
    );
  }
};

export default Modal;
