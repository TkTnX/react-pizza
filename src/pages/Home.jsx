import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";

import { PizzaBlock } from "./../components/PizzaBlock/PizzaBlock";
import { Categories } from "./../components/categories/Categories";
import { Sort } from "./../components/sort/Sort";
import { Skeleton } from "./../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/pagination/Pagination";
import { SearchContext } from "../App";

export const Home = () => {
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const sortType = sort.sortProp;

  const dispatch = useDispatch();

  const { searchValue } = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageData, setPageData] = useState({});

  const category = categoryId > 0 ? `category=${categoryId}` : "";

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const pizzaArr = await axios
        .get(
          `https://82322d706a51e4fa.mokky.dev/pizzas?&limit=4&page=${currentPage}&${category}&sortBy=${sortType}`
        )
        .catch((err) => {
          console.warn(err);
          alert("Не удалось получить данные с сервера!");
        })
        .finally(() => {
          setIsLoading(false);
        });

      const totalPages = pizzaArr.data.meta.total_pages;
      setPageData(totalPages);
      setPizzas(pizzaArr.data.items);
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
      <Pagination
        currentPage={currentPage}
        pageData={pageData}
        onChange={(num) => dispatch(setCurrentPage(num))}
      />
    </>
  );
};
