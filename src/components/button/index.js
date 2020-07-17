import React from 'react';

const Button = ({ type, isDisabled, onClickFunction, children, ...props }) => {
  if (isDisabled) {
    return (
      <button {...props} disabled>
        {children}
      </button>
    );
  };
  return <button {...props}>{children}</button>;
};

export default Button;
