import React from 'react'

export default ({ name, placeholder, col = 1, required = false, handleChange, value = '' }) =>
    <label className={`form-field col-${col}`}>
         <input
            type='text'
            placeholder={placeholder}
            name={name}
            onChange={handleChange}
            required={required}
            value={value}
        />
    </label>