import React from 'react'

export default ({ name, placeholder, type, options = [], col = 1, required = false, handleChange, value = '' }) =>
    <div className={`radio-check-label col-${col}`}>
        {placeholder && <p>{placeholder}</p>}
        {options && !!options.length &&
            options.map((option, i) =>   
                <label 
                    key={`box-${i}`}
                    className={`form-field`}
                >  
                    <p>{option}</p>
                    <input
                        type={type}
                        placeholder={option}
                        name={name}
                        onChange={handleChange}
                        required={required}
                        value={option}
                        checked={value.includes(option) ? true : false}
                    />
                </label>
        )}
    </div>
    