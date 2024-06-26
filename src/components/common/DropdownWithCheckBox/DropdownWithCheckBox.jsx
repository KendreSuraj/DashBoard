import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Chip } from '@mui/material';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function DropdownWithCheckBox({
  dropdownLabel,
  data,
  setSelectedValues,
  selectedValues
}) {

  const changeHandler = (event, value) => {
    console.log(event, value)
   setSelectedValues(value)
  }

  console.log(data);
  return (
    <Autocomplete
      onChange={(event, value) => changeHandler(event, value)}
      multiple
      limitTags={2}
      id="checkboxes-tags-demo"
      options={data}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title?option.title:option.name}
      value={selectedValues}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={option.id}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title?option.title:option.name}
        </li>
      )}

      renderTags={(selected, getTagProps) => 
        selected.map((option, index) => (
          <Chip
            key={option.id}
            label={option.title ? option.title : option.name}
            {...getTagProps({ index })}
          />
        ))
      }
      style={{ width: 500 }}
      renderInput={(params) => <TextField {...params} label={dropdownLabel} />}
    />
  );
}
