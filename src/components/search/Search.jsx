import React, { useCallback, useContext, useRef, useState } from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import { SearchContext } from "../../App";

export const Search = ({}) => {
  const [value, setValue] = useState("");
  const { setSearchValue } = useContext(SearchContext);
  const inputRef = useRef(null);

  const onChangeTimeOut = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 400),
    []
  );

  const onClickClearInp = () => {
    inputRef.current.focus();
    setSearchValue("");
    setValue("");
  };

  const onChangeInp = (e) => {
    onChangeTimeOut(e.target.value);
    setValue(e.target.value);
  };

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        value={value}
        className={styles.input}
        onChange={onChangeInp}
        placeholder="Найти пиццу..."
      />

      {value && (
        <svg
          onClick={onClickClearInp}
          className={styles.iconX}
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title />
          <g data-name="Layer 2" id="Layer_2">
            <path d="M4,29a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l24-24a1,1,0,1,1,1.42,1.42l-24,24A1,1,0,0,1,4,29Z" />
            <path d="M28,29a1,1,0,0,1-.71-.29l-24-24A1,1,0,0,1,4.71,3.29l24,24a1,1,0,0,1,0,1.42A1,1,0,0,1,28,29Z" />
          </g>
        </svg>
      )}
    </div>
  );
};
