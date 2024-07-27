import { useEffect, useState } from 'react';
import { Button, Form, Input, Space } from 'antd';
import uniqid from 'uniqid';
import styles from './NewArticle.module.scss';

const NewArticle = ({ title, initialData, onFormSubmit }) => {
  const [form] = Form.useForm();
  const [tags, setTags] = useState([{ key: uniqid(), value: '' }]);

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        title: initialData.title,
        description: initialData.description,
        body: initialData.body,
      });
      setTags(
        (initialData.tagList || []).map((tag) => ({
          key: uniqid(),
          value: tag,
        })),
      );
    }
  }, [initialData, form]);

  const addTag = () => {
    setTags([...tags, { key: uniqid(), value: '' }]);
  };

  const removeTag = (key) => {
    setTags(tags.filter((tag) => tag.key !== key));
  };

  const handleTagChange = (key, value) => {
    setTags(tags.map((tag) => (tag.key === key ? { ...tag, value } : tag)));
  };

  const onSubmit = (formData) => {
    const tagsValue = tags.map((tag) => tag.value);
    return onFormSubmit(formData, tagsValue);
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.title}>{title}</h3>
      <Form
        form={form}
        scrollToFirstError
        className={styles.form}
        onFinish={onSubmit}
        layout='vertical'
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        requiredMark={false}
      >
        <Form.Item name='title' label='Title' rules={[{ required: true }]}>
          <Input placeholder='Title' style={{ width: '874px' }} />
        </Form.Item>

        <Form.Item
          name='description'
          label='Short description'
          rules={[{ required: true }]}
        >
          <Input placeholder='Description' style={{ width: '874px' }} />
        </Form.Item>

        <Form.Item name='body' label='Text' rules={[{ required: true }]}>
          <Input.TextArea
            rows={7}
            placeholder='Text'
            style={{ maxWidth: '874px', width: '874px' }}
          />
        </Form.Item>

        {tags.map((tag) => (
          <Space
            key={tag.key}
            style={{ display: 'flex', marginBottom: 8 }}
            align='baseline'
          >
            <Input
              style={{ width: '300px' }}
              placeholder='Tag'
              value={tag.value}
              onChange={(e) => handleTagChange(tag.key, e.target.value)}
            />
            {tags.length > 1 && (
              <Button
                type='danger'
                className={styles.deleteButton}
                onClick={() => removeTag(tag.key)}
              >
                Delete
              </Button>
            )}
            {tag.key === tags[tags.length - 1].key && (
              <Button
                type='dashed'
                className={styles.addButton}
                onClick={addTag}
              >
                Add Tag
              </Button>
            )}
          </Space>
        ))}

        <Form.Item>
          <Button type='primary' htmlType='submit' style={{ width: '300px' }}>
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewArticle;
