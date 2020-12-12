import React from "react";

import "./style.scss";

interface Props {
  show: boolean;
  onClose: (bool: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  title?: string;
}

const Modal = ({
  show = false,
  className = "",
  style = {},
  children = <></>,
  onClose,
  title = "",
}: Props) => {
  return (
    <React.Fragment>
      {show && (
        <div className={`component-modal`}>
          <div
            className="bg"
            onClick={() => {
              onClose(false);
            }}
          ></div>
          <div className={`body ${className}`} style={style}>
            <div style={{ position: "absolute", top: 10, left: 10 }}>
              {title}
            </div>
            <button
              className="close-button"
              type="button"
              onClick={() => {
                onClose(false);
              }}
            >
              <i className="fas fa-times-circle"></i>
            </button>
            {children}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Modal;
