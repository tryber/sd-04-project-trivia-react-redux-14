import React from 'react';
import Proptypes from 'prop-types';

const Button = ({ type, isDisabled, children, ...props }) => {
  if (isDisabled) {
    return (
      <button {...props} disabled>
        {children}
      </button>
    );
  }
  return <button {...props}>{children}</button>;
};

Button.propTypes = {
  type: Proptypes.string,
  isDisabled: Proptypes.bool.isRequired,
  children: Proptypes.object.isRequired,
};

export default Button;
