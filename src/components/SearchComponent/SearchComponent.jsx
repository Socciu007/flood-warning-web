import React from 'react'
import searchIcon from '../../assets/icons/icon-search.svg'
import { useTranslation } from 'react-i18next'
import './style.scss'

const SearchComponent = () => {
  const { t } = useTranslation()
  return (
    <div className="search-wrap">
      <img className="icon" src={searchIcon} alt="img-search" />
      <input
        // value={search}
        // onChange={handleSearch}
        className="search-content"
        placeholder={t("What are you looking for?")}
      ></input>
    </div>
  )
}

export default SearchComponent