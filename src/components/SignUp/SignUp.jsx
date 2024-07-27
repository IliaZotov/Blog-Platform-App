import { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCreateUser } from '../redux/userSlice/userFetch';
import styles from './SignUp.module.scss';
import ErrorComponent from '../Error-Component/Error-Component';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmit = async ({ username, email, password }) => {
    try {
      await dispatch(fetchCreateUser({ username, email, password })).unwrap();
      setError(null);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.title}>Create new account</h3>
      {error && <ErrorComponent errorMessage={error} />}
      <Form
        className={styles.form}
        layout='vertical'
        name='basic'
        style={{ maxWidth: 600 }}
        initialValues={{ remember: false }}
        onFinish={onSubmit}
        autoComplete='off'
      >
        <span>Username</span>
        <Form.Item
          label=''
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
            {
              pattern: /^[a-z][a-z0-9]*$/,
              message: 'You can only use lowercase English letters and numbers',
            },
            { min: 3, message: 'Username must be at least 3 characters long!' },
            {
              max: 20,
              message: 'Username cannot be longer than 20 characters!',
            },
          ]}
        >
          <Input placeholder='Username' style={{ width: '320px' }} />
        </Form.Item>
        <span>Email address</span>
        <Form.Item
          label=''
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your Email address!',
            },
            {
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
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
        <span>Repeat password</span>
        <Form.Item
          label=''
          name='rep password'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords must match'));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder='Repeat Password'
            style={{ width: '320px' }}
          />
        </Form.Item>

        <Form.Item
          name='remember'
          valuePropName='checked'
          rules={[
            {
              validator: (_, value) => {
                if (value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('You must accept the terms and conditions'),
                );
              },
            },
          ]}
        >
          <Checkbox className={styles.checkbox}>
            I agree to the processing of my personal information
          </Checkbox>
        </Form.Item>

        <Form.Item className={styles.buttonForm}>
          <Button type='primary' htmlType='submit' style={{ width: '320px' }}>
            Create
          </Button>
        </Form.Item>
        <div className={styles.signUpInfo}>
          <p className={styles.info}>Already have an account?</p>
          <Link to='/sign-in' className={styles.link}>
            Sign In
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
