import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PizzaBlock } from "./../components/PizzaBlock/PizzaBlock";
import { Categories } from "./../components/categories/Categories";
import { Sort } from "./../components/sort/Sort";
import { Skeleton } from "./../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/pagination/Pagination";
import { SearchContext } from "../App";


export const Home = () => {
  const {searchValue} = useContext(SearchContext)
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActiveSort, setIsActiveSort] = useState({
    name: "популярности (↑)",
    sortProp: "rating",
  });
  const [isActiveCategory, setIsActiveCategory] = useState(0);

  const category = isActiveCategory > 0 ? `category=${isActiveCategory}` : "";

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const pizzaArr = await axios
        .get(
          `https://82322d706a51e4fa.mokky.dev/pizzas?${category}&sortBy=${isActiveSort.sortProp}`
        )
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
  }, [isActiveCategory, isActiveSort, searchValue]);

  return (
    <>
      <div className="content__top">
        <Categories
          isActiveCategory={isActiveCategory}
          onClickCategory={(i) => setIsActiveCategory(i)}
        />
        <Sort
          isActiveSort={isActiveSort}
          onClickSort={(i) => setIsActiveSort(i)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {isLoading && <h2>Загрузка...</h2>}

      <ul className="content__items">
        {isLoading
          ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
          : pizzas
              .filter((value) =>
                value.title.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((value) => <PizzaBlock key={value.id} {...value} />)}
      </ul>
      <Pagination />
    </>
  );
};
