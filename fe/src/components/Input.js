import React from "react";

const Input = (props) => {
    const {id, label, error, type, name, placeholder, onchange} = props;
    const className = error ? "form-control is-invalid" : "form-control";
    return (<div className={"form-group"}>
        <label htmlFor={id}>{label}</label>
        <input className={className}
               type={type}
               id={id}
               name={name}
               placeholder={placeholder}
               onChange={onchange}/>
        <div className="invalid-feedback">{error}</div>
    </div>)
}

export default Input;