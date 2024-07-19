import React from 'react';
import styles from './Error-Component.module.scss';
import { Alert } from 'antd';

const ErrorComponent = ({ className }) => {
  return (
    <div>
      <Alert
        type='error'
        message='Hm, something went wrong...'
        banner
        className={`${styles.error} ${className}`}
      />
    </div>
  );
};

export default ErrorComponent;
