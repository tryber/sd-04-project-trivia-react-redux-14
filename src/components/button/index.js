import React from 'react';
import Proptypes from 'prop-types';

const Button = ({ type, isDisabled, children, ...props }) => {
  if (isDisabled) {
    return (
      <button {...props} disabled>
        {children}
      </button>
    );
  };
  return <button {...props}>{children}</button>
};

export default Button;

Button.protoTypes = {
  type: Proptypes.string.isRequired,
  isDisabled: Proptypes.bool,
  children: Proptypes.object,
}
