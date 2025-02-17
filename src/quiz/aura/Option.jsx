// Option.jsx

import React from "react";

const Options = ({ options, selectedOption, onOptionChange }) => {
    return (
        <div className="options">
            {options.map((option, index) => (
                <div key={index} className="form-check">
                    <input
                        type="radio"
                        name="option"
                        value={index + 1} // Ensure numerical values (1–5)
                        checked={selectedOption === index + 1} // Compare with numerical `selectedOption`
                        onChange={onOptionChange}
                        className="form-check-input"
                    />
                    <label className="form-check-label">{option}</label>
                </div>
            ))}
        </div>
    );
};

export default Options;
