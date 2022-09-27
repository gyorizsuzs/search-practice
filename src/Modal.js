import React, { useState, useEffect } from "react";

const Modal = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/{id}/information?includeNutrition=true&apiKey=5d7d6fdfdb7344eb83cc81d23aba5e70`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setMeals(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <>{error.message}</>;
  } else if (!isLoaded) {
    return <>Loading...</>;
  } else {
    return (
      <div className="wrapper">
        <ul className="card-grid">
          {meals.map((meal) => (
            <li>
              <article className="card" key={meal.id}>
                <div className="card-image">
                  <img src={meal.image} alt={meal.title} />
                </div>
                <div className="card-content">
                  <h2 className="card-name">{meal.title}</h2>
                  <p className="card-summary">{meal.sourceUrl}</p>
                  <ol className="card-nutrition">
                    <li className="card-nutrition-name">
                      {meal.nutrition.nutrients[0].name}
                    </li>
                    <li className="card-nutrition-amount">
                      {meal.nutrition.nutrients[0].amount}
                    </li>
                    <li className="card-nutrition-unit">
                      {meal.nutrition.nutrients[0].unit}
                    </li>
                  </ol>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default Modal;
