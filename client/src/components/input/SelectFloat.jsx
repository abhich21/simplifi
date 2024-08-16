import React, { useState } from 'react';
import "./SelectFloat.css"

const SelectFloat = (props) => {
  const [focus,setFocus] = useState(false);
  const { children, label } = props;

    const labelClass =
      focus ? "label-select label-focus" : "label-select";
  return (
    <div
    className="float-label"
    onBlur={() => setFocus(false)}
    onFocus={() => setFocus(true)}
>
    {children}
    <label className={labelClass}>{label}</label>
</div>
  )
}

export default SelectFloat