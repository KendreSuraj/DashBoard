import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './SearchComponent.style.css';
import { InputLabel } from '@mui/material';

const SearchComponent = ({
  searchText,
  searchType,
  searchBtnPressed,
  setSearchText,
  setSearchType,
  setSearchBtnPressed,
  setStartDate,
  setEndDate
}) => {
  const handleChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearch = () => {
    setSearchBtnPressed(!searchBtnPressed);
  };

  const handleTextChange=(e)=>{
    setSearchText(e.target.value)
    const today = new Date();
    const oneMonthBefore = new Date(today);
    oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);
    const oneMonthAfter = new Date(today);
    oneMonthAfter.setMonth(oneMonthAfter.getMonth() + 1);
    setStartDate(oneMonthBefore.toISOString().split('T')[0]);
    setEndDate(oneMonthAfter.toISOString().split('T')[0]);
  }
  return (
    <>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-standard-label">
          Filter Type
        </InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={searchType}
          label="searchType"
          onChange={handleChange}
        >
          <MenuItem value="phoneNumber">Client Phone</MenuItem>
          <MenuItem value="partnerName">Partner Name</MenuItem>
          <MenuItem value="name">Client Name</MenuItem>
        </Select>
      </FormControl>

      <TextField
        placeholder="Search"
        variant="outlined"
        size="small"
        value={searchText}
        onChange={handleTextChange}
        // onChange={(e) => setSearchText(e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton color="primary" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </>
  );
};

export default SearchComponent;
