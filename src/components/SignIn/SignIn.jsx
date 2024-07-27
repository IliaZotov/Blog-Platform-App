import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLoginUser } from '../redux/userSlice/userFetch';
import ErrorComponent from '../Error-Component/Error-Component';
import styles from './SignIn.module.scss';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmit = async ({ email, password }) => {
    try {
      await dispatch(fetchLoginUser({ email, password })).unwrap();
      setError(null);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.title}>Sign In</h3>
      {error && <ErrorComponent errorMessage={error} />}{' '}
      <Form
        className={styles.form}
        layout='vertical'
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <span>Email address</span>
        <Form.Item
          label=''
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your Email address!',
            },
          ]}
        >
          <Input placeholder='Email address' style={{ width: '320px' }} />
        </Form.Item>

        <span>Password</span>
        <Form.Item
          label=''
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            { min: 6, message: 'Password must be at least 6 characters long!' },
            {
              max: 60,
              message: 'Password cannot be longer than 60 characters!',
            },
          ]}
        >
          <Input.Password placeholder='Password' style={{ width: '320px' }} />
        </Form.Item>

        <Form.Item
          className={styles.buttonForm}
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type='primary'
            htmlType='submit'
            style={{ width: '320px', marginLeft: '-105px' }}
          >
            Login
          </Button>
        </Form.Item>
        <div className={styles.signInInfo}>
          <p className={styles.info}>Don't have an account?</p>
          <Link to='/sign-up' className={styles.link}>
            Sign Up
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default SignIn;
