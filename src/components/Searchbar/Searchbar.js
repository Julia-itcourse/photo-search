import PropTypes from 'prop-types'
import React, { PureComponent } from "react";
import styles from "./Searchbar.module.css";

class Searchbar extends PureComponent {
  state = {
    inputValue: "",
  };

  onInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    const query = this.state.inputValue;
    this.props.onSubmit(query);
    this.setState({ inputValue: "" });
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.form} onSubmit={this.onSubmitForm}>
          <button type="submit" className={styles.button}>
            <span className={styles.buttonLabel}>Search</span>
          </button>

          <input
            onChange={this.onInputChange}
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
