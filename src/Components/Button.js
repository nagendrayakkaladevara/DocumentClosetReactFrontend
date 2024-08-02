import React from 'react';

const Button = ({ text, onClick, type, style, className, disabled, ...props }) => {
    const buttonStyle = {
        padding: '5px 20px',
        margin: '5px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        ...style,
    };

    return (
        <button
            onClick={onClick}
            type={type || 'button'}
            style={buttonStyle}
            className={className + 'FontFamliy text-xs bg-orange-400 text-white hover:bg-red-400'}
            disabled={disabled}
            {...props}
           
        >
            {text}
        </button>
    );
};

export default Button;
