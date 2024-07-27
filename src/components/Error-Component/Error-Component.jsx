import React from 'react';
import { Alert } from 'antd';
import styles from './Error-Component.module.scss';

const ErrorComponent = ({ className, errorMessage }) => {
  return (
    <div>
      <Alert
        type='error'
        message={errorMessage}
        banner
        className={`${styles.error} ${className}`}
      />
    </div>
  );
};

export default ErrorComponent;
