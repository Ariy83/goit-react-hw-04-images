import React from 'react'
import { RiFindReplaceLine } from "react-icons/ri";

export const Searchbar = ({onSubmit}) => {
  return (
    <header className="Searchbar">
  <form className="SearchForm" onSubmit={onSubmit}>
        <button type="submit" className="SearchForm-button">
          <RiFindReplaceLine style={{height:'48px'}} />
      <span className="SearchForm-button-label">Search</span>
    </button>

        <input
          className="SearchForm-input"
          name='search'
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
  </form>
</header>
  )
}