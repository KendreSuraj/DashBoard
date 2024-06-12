import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function DropdownWithCheckBox({
  dropdownLabel,
  data,
  setSelectedValues,
  selectedValues
}) {
  return (
    <Autocomplete
      onChange={(event, value) => setSelectedValues(value)}
      multiple
      id="checkboxes-tags-demo"
      options={data}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title?option.title:option.name}
      value={selectedValues}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title?option.title:option.name}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => <TextField {...params} label={dropdownLabel} />}
    />
  );
}
