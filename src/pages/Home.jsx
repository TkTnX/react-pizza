import React, { useState, useEffect } from "react";
import axios from "axios";

import { PizzaBlock } from "./../components/PizzaBlock/PizzaBlock";
import { Categories } from "./../components/categories/Categories";
import { Sort } from "./../components/sort/Sort";
import { Skeleton } from "./../components/PizzaBlock/Skeleton";

export const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const pizzaArr = await axios
        .get("https://82322d706a51e4fa.mokky.dev/pizzas")
        .catch((err) => {
          console.warn(err);
          alert("Не удалось получить данные с сервера!");
        })
        .finally(() => {
          setIsLoading(false);
        });

      setPizzas(pizzaArr.data);
    }

    fetchData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {isLoading && <h2>Загрузка...</h2>}
      <ul className="content__items">
        {isLoading
          ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((value) => <PizzaBlock key={value.id} {...value} />)}
      </ul>
    </>
  );
};
