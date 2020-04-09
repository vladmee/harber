import React from "react";

const Input = ({ label, name, error, ...rest }) => {
  return (
    <>
      <div className="mb-3">
        <div
          className={`input-wrapper d-flex flex-row align-items-center mb-1`}
        >
          <label htmlFor={name} className="mb-0">
            {label}
          </label>
          <input name={name} className="form-control" {...rest} />
        </div>
        {error && <p className="small text-danger text-left">{error}</p>}
      </div>
    </>
  );
};

export default Input;
