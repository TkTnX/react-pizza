import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
} from "../redux/slices/filterSlice.js";

import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock.tsx";
import { Categories } from "../components/categories/Categories.tsx";
import { Sort } from "../components/sort/Sort.tsx";
import { Skeleton } from "../components/PizzaBlock/Skeleton.tsx";
import { Pagination } from "../components/pagination/Pagination.tsx";
import { fetchPizzas, selectPizza } from "../redux/slices/pizzaSlice.js";

export const Home: React.FC = () => {
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const sortType = sort.sortProp;

  const { items, status } = useSelector(selectPizza);

  const dispatch = useDispatch();

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
          onClickCategory={(i: number) => dispatch(setCategoryId(i))}
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
                .filter((value: any) =>
                  value.title.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((value: any) => <PizzaBlock key={value.id} {...value} />)}
        </ul>
      )}

      <Pagination
        currentPage={currentPage}
        onChange={(num: number) => dispatch(setCurrentPage(num))}
      />
    </>
  );
};
