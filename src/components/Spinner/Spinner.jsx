import { Spin } from 'antd';
import styles from './Spinner.module.scss';

const Spinner = ({ className }) => {
  return <Spin size='large' className={`${styles.spinner} ${className}`} />;
};

export default Spinner;
