import React from 'react';
import { Form, Button, InputNumber } from 'antd';
import { useDispatch } from 'react-redux';
import { attemptSubmit } from './scraperSlice';

interface Props {
  categoryName: string;
}

export default function CategoryForm(props: Props) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  return (
    <div className="category-form">
      <h1>{props.categoryName}</h1>
      <Form
        name="submit-form"
        onFinish={() => dispatch(attemptSubmit(form.getFieldValue('num-pages'), form.getFieldValue('min-price'), form.getFieldValue('max-price')))}
        form={form}
      >
        <Form.Item
          label="Maksimalan broj strana koje želite da pokrijete"
          name="num-pages"
          rules={[
            {
              required: true,
              message: 'Unesite broj strana',
            },
          ]}
        >
          <InputNumber style={{width: '250px'}} />
        </Form.Item>

        <Form.Item
          label="Minimalna cena artikla (u evrima)"
          name="min-price"
          rules={[
            {
              required: true,
              message: 'Unesite minimalnu cenu',
            },
          ]}
          
        >
          <InputNumber style={{width: '250px'}} />
        </Form.Item>

        <Form.Item
          label="Maksimalna cena artikla (u evrima)"
          name="max-price"
          rules={[
            {
              required: true,
              message: 'Unesite maksimalnu cenu',
            },
          ]}
          
        >
          <InputNumber style={{width: '250px'}} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 17 }} className="last-row">
          <div style={{ display: 'flex' }}>
            <div>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Send
              </Button>
            </div>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}