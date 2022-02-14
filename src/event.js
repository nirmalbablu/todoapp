import React, { useEffect, useReducer, useRef } from "react";
import "./event.css";
import useLocalStorage from "./useLocalStorage";

const reducer = (value, dispatch) => {
  switch (dispatch.type) {
    case "text":
      dispatch.callback([...value, dispatch.payload]);
      return [...value, dispatch.payload];
    case "delete":
      dispatch.callback(value.filter((name) => name !== dispatch.payload));

      return value.filter((name) => name !== dispatch.payload);
    default:
      break;
  }
};

const Event = () => {
  const { todo, changeTodo } = useLocalStorage();
  const [value, dispatch] = useReducer(reducer, todo);
  const infoRef = useRef();

  const handleEsc = (e) => {
    if (e.key === "Escape") {
      infoRef.current.value = "";
    }
    if (e.key === "x") {
      infoRef.current.focus();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleEsc]);
  return (
    <div>
      <div className="main">
        <input
          className="inputbar"
          ref={infoRef}
          on
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dispatch({
                type: "text",
                payload: infoRef.current.value,
                callback: changeTodo,
              });
              infoRef.current.value = "";
            }
          }}
        />
        <button
          onClick={() => {
            dispatch({
              type: "text",
              payload: infoRef.current.value,
              callback: changeTodo,
            });
            infoRef.current.value = "";
          }}
        >
          submit
        </button>
      </div>
      <div className="outputmain">
        {value.map((name) => {
          return (
            <div className="submain">
                <div className="inner">
              <span>{name}</span>
              <span
                className="delete"
                onClick={() => {
                  dispatch({
                    type: "delete",
                    payload: name,
                    callback: changeTodo,
                  });
                }}
              >
                delete
              </span>
              </div>
            </div>
          );
        })}
      </div>         
    </div>
  );
};
export default Event;
