import React, { useCallback, useRef, useState } from "react";
import { setSearchValue } from "../../redux/slices/filterSlice.ts";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import { useDispatch } from "react-redux";

export const Search: React.FC = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeTimeOut = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 400),
    []
  );

  const onClickClearInp = (event: React.MouseEvent<SVGSVGElement>) => {
    console.log(event);
    inputRef.current?.focus();

    dispatch(setSearchValue(""));
    setValue("");
  };

  const onChangeInp = (e: React.ChangeEvent<HTMLInputElement>) => {
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
