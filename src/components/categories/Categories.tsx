import React, { memo } from "react";
import "./_categories.scss";
type CategoriesProps = {
  isActiveCategory: number;
  onClickCategory: (index: number) => void;
};

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

export const Categories: React.FC<CategoriesProps> = memo(
  ({ isActiveCategory, onClickCategory }) => {
    return (
      <div className="categories">
        <ul>
          {categories.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => onClickCategory(index)}
                className={isActiveCategory === index ? "active" : ""}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);
