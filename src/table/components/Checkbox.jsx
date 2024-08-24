/* eslint-disable react/prop-types */
import React from "react";

// eslint-disable-next-line react/display-name
export const Checkbox = React.forwardRef(
  ({ indeterminate, label, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input
          type="checkbox"
          className="form-check-inline form-check-input shadow-none"
          id={label && `label-${label}`}
          ref={resolvedRef}
          {...rest}
        />
        {label && (
          <label htmlFor={`label-${label}`} className="form-label">
            {label}
          </label>
        )}
      </>
    );
  }
);
