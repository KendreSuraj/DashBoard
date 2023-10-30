/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import './SearchComponent.style.css';

const SearchComponent = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <TextField
      placeholder="Search"
      variant="outlined"
      size="small"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      InputProps={{
        endAdornment: (
          <IconButton color="primary" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
  );
};

export default SearchComponent;
