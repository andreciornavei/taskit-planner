import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { FormControl } from 'react-bootstrap'

export default function Input({ name, ...rest }) {
    const inputRef = useRef(null);
    const { fieldName, defaultValue = '', registerField, error } = useField(name);
    useEffect(() => {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
      });
    }, [fieldName, registerField]);
    return <>
      <FormControl ref={inputRef} isInvalid={error ? true : false} defaultValue={defaultValue} {...rest} />
      { error && <span className="d-flex fs-11 text-red ff-montserrat-semibold">{error}</span> }
    </>;
  }