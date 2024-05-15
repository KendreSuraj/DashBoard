import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const PackageItem = ({ index, rule, names, onChange }) => {
    const handleProductChange = (event) => {
        const productId = event.target.value;
        onChange(index, { ...rule, productId });
    };

    const handleSessionsChange = (event) => {
        const sessions = event.target.value;
        onChange(index, { ...rule, sessions });
    };

    return (
        <div style={{ display: "flex", gap: "20px" }}>
            <FormControl style={{ width: "400px" }}>
                <InputLabel id={`product-${index}-label`}>Product ID*</InputLabel>
                <Select
                    labelId={`product-${index}-label`}
                    id={`product-${index}-select`}
                    value={rule.productId}
                    onChange={handleProductChange}
                    label="Product ID"
                >
                    {names?.map((name) => (
                        <MenuItem key={name} value={name}>{name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                variant="outlined"
                label="No of sessions"
                name="sessions"
                type='number'
                value={rule.sessions}
                onChange={handleSessionsChange}
                required
            />
        </div>
    );
};

export default PackageItem;
