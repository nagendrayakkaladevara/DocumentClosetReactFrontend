import React from 'react';
import '../App.css';

const Text = ({ className, text, color, size, weight, margin, style, ...props }) => {
    const textStyle = {
        color: color || 'black',
        fontSize: size || '12px',
        fontWeight: weight || 'normal',
        margin: margin || "0px",
        ...style
    };

    // Ensure there's a space between the provided className and 'FontFamily'
    const combinedClassName = `${className || ''} FontFamliy`;

    return (
        <p style={textStyle} {...props} className={combinedClassName}>
            {text}
        </p>
    );
};

export default Text;