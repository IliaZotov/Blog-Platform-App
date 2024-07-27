import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import styles from './Profile.module.scss';
import { fetchUpdateUser } from '../redux/userSlice/userFetch';

const Profile = () => {
  const { username, email, image } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      username: username,
      email: email,
      image: image,
    });
  }, [username, email, image, form]);
  // eslint-disable-next-line
  const onSubmit = ({ email, username, image }) => {
    dispatch(fetchUpdateUser({ email, username, image }));
    navigate('/');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.title}>Edit Profile</h3>
      <Form
        form={form}
        className={styles.form}
        layout='vertical'
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
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

        <span>New password</span>
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

        <span>Avatar Image (url)</span>
        <Form.Item
          label=''
          name='image'
          rules={[
            {
              pattern:
                /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
              message: 'URL is not correct',
            },
          ]}
        >
          <Input placeholder='Image URL' style={{ width: '320px' }} />
        </Form.Item>

        <Form.Item className={styles.buttonForm}>
          <Button type='primary' htmlType='submit' style={{ width: '320px' }}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
