import React from 'react';

const InputField = ({ label, type, placeholder, value, onChange, style, name }) => {
    return (
        <div style={{ margin: '10px 0', ...style }}>
            {/* {label && <label style={{ marginBottom: '5px', display: 'block' }} className='text-xs FontFamliy'>{label}</label>} */}
            <input type={type || 'text'} placeholder={placeholder} className="input input-bordered input-warning w-full max-w-xs" value={value}
                onChange={onChange} style={{ color: "white" }} name={name}/>
        </div>
    );
};

export default InputField;