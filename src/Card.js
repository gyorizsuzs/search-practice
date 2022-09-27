import React, { useState, useEffect } from "react";

const Card = ({ meals }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${meals.id}/information?includeNutrition=true&apiKey=5d7d6fdfdb7344eb83cc81d23aba5e70`
    )
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.image);
      })
      .catch(() => console.log("error"));
  }, [meals.id]);

  return (
    <main>
      <ul className="card-grid">
        {meals.map((meal) => (
          <li>
            <article className="card" key={meal.id}>
              <div className="card-image">
                <img src={imageUrl} alt={meal.title} />
              </div>
              <div className="card-content">
                <h2 className="card-name">{meal.title}</h2>
                <p className="card-summary">{meal.sourceUrl}</p>
                <ol className="card-nutrition">
                  <li className="card-nutrition-name">
                    Calories: {meal.nutrition.nutrients[0].name}
                  </li>
                  <li className="card-nutrition-amount">
                    {meal.nutrition.nutrients[0].amount}
                    {meal.nutrition.nutrients[0].unit} kcal
                  </li>
                </ol>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Card;
