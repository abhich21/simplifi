import React, { useState } from 'react'
import "./FloatingLabel.css"

const FloatingLabel = (props) => {
    const [focus,setFocus] = useState(false);
    const { children, label, value } = props;

    const labelClass =
      focus || (value && value.length !== 0) ? "label label-float" : "label";

    return (
    <div
        className="float-label"
        onBlur={() => {
            if(value.length !== 0 ) setFocus(false);
             else setFocus(true)}}
        onFocus={() => setFocus(true)}
    >
        {children}
        <label className={labelClass}>{label}</label>
    </div>
    );
}

export default FloatingLabel