import React, { memo, useEffect, useRef, useState } from "react";
import "./_sort.scss";
import { useDispatch } from "react-redux";
import { filterSliceType, setSortId } from "../../redux/slices/filterSlice.ts";

type SortType = {
  name: string;
  sortProp: string;
}[];

const sortList: SortType = [
  { name: "популярности (↓)", sortProp: "-rating" },
  { name: "популярности (↑)", sortProp: "rating" },
  { name: "цене (↓)", sortProp: "-price" },
  { name: "цене (↑)", sortProp: "price" },
  { name: "алфавиту (↓)", sortProp: "-title" },
  { name: "алфавиту (↑)", sortProp: "title" },
];

type SortPopup = {
  value: filterSliceType;
};

export const Sort: React.FC<SortPopup> = memo(({ value }) => {
  const dispatch = useDispatch();

  const [openPopup, setOpenPopup] = useState<Boolean>(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickClose = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpenPopup(false);
      }
    };

    document.body.addEventListener("click", onClickClose);

    return () => document.body.removeEventListener("click", onClickClose);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label" onClick={() => setOpenPopup(!openPopup)}>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span>{value.name}</span>
      </div>
      {openPopup && (
        <>
          <div className="sort__popup">
            <ul>
              {sortList.map((sort, index) => {
                return (
                  <li
                    onClick={() => {
                      dispatch(setSortId(sort));
                      setOpenPopup(false);
                    }}
                    key={index}
                    className={value.sortProp === sort.sortProp ? "active" : ""}
                  >
                    {sort.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
});
