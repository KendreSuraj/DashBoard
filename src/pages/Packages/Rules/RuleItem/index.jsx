import React, { useState } from 'react';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Chip from '@mui/material/Chip';

const RuleItem = ({ onChange, rule, index, names, productNames, setProductNames, allRules, onDelete }) => {
    const packageType = localStorage.getItem('packageDetail');

    const handleProductChange = (event) => {
        const productId = event.target.value;
        setProductNames(names.filter(item => item !== productId));
        onChange(index, { ...rule, productId });
    };

    const handleNotIncludedProductChange = (event) => {
        const notIncludedProductIds = event.target.value;
        onChange(index, { ...rule, notIncludedProductIds });
    };
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 280,
                width: 250,
            },
        },
    };

    const handleDelete = () => {
        onDelete(index);
    };

    const selectedProductIds = allRules
        .filter((_, i) => i !== index)
        .map(r => r.productId);

    // Filter available product names to exclude already selected product IDs
    const filteredProductNames = names.filter(name => !selectedProductIds.includes(name));

    return (
        <div style={{ display: "flex", gap: "20px" }}>
            <FormControl style={{ width: "200px" }}>
                <InputLabel id={`product-${index}-label`}>ProductId*</InputLabel>
                <Select
                    labelId={`product-${index}-label`}
                    id="demo-simple-select"
                    value={rule.productId}
                    label="Age"
                    onChange={handleProductChange}
                    disabled={Boolean(rule.productId) }
                >
                    {filteredProductNames?.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: "12px" }}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>

            </FormControl>
            <FormControl style={{ width: "900px" }}>
                <InputLabel id={`not-included-products-${index}-label`}>Not Included ProductIds*</InputLabel>
                <Select
                    labelId={`not-included-products-${index}-label`}
                    multiple
                    required
                    value={rule.notIncludedProductIds}
                    onChange={handleNotIncludedProductChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {productNames?.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: "12px" }}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>

            </FormControl>
            <button style={{
                backgroundColor: "rgb(215, 0, 64)",
                borderColor: "rgb(215, 0, 64)",
                color: "white",
                cursor: "pointer",
                width: "100px",
                borderRadius: "10px"
            }}
                onClick={handleDelete}>DELETE</button>
        </div>
    )
}

export default RuleItem