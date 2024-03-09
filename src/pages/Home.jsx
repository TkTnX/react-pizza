import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";

import { PizzaBlock } from "./../components/PizzaBlock/PizzaBlock";
import { Categories } from "./../components/categories/Categories";
import { Sort } from "./../components/sort/Sort";
import { Skeleton } from "./../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/pagination/Pagination";
import { SearchContext } from "../App";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

export const Home = () => {
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const sortType = sort.sortProp;

  const { items, status } = useSelector((state) => state.pizza);

  const dispatch = useDispatch();

  const { searchValue } = useContext(SearchContext);
  const category = categoryId > 0 ? `category=${categoryId}` : "";

  useEffect(() => {
    async function fetchData() {
      dispatch(
        fetchPizzas({
          category,
          sortType,
          currentPage,
        })
      );
    }

    fetchData();
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);
  return (
    <>
      <div className="content__top">
        <Categories
          isActiveCategory={categoryId}
          onClickCategory={(i) => dispatch(setCategoryId(i))}
        />
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      {status === "loading" && <h2>Загрузка...</h2>}
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Пиццы не найдены! 😕</h2>
          <p>
            Похоже, что-то случилось :( <br /> Вернитесь позже!
          </p>
        </div>
      ) : (
        <ul className="content__items">
          {status === "loading"
            ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
            : items
                .filter((value) =>
                  value.title.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((value) => <PizzaBlock key={value.id} {...value} />)}
        </ul>
      )}

      <Pagination
        currentPage={currentPage}
        onChange={(num) => dispatch(setCurrentPage(num))}
      />
    </>
  );
};
