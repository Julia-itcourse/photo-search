import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

class Modal extends PureComponent {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleOnOverlayClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={styles.Overlay} onClick={this.handleOnOverlayClick}>
        <div className={styles.Modal}>
          <img src={this.props.bigImageUrl} alt="enlarged image" />
        </div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  bigImageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
