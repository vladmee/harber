import React from "react";

const Input = ({ label, name, ...rest }) => {
  return (
    <>
      <div className={`input-wrapper d-flex flex-row align-items-center mb-3`}>
        <label htmlFor={name} className="mb-0">
          {label}
        </label>
        <input name={name} className="form-control" {...rest} />
      </div>
    </>
  );
};

export default Input;
