import React from 'react';
import { Form, Button, InputNumber, Table, Tooltip, Select } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { attemptSubmit, selectIsFetching, clearItems, ProductTypes, ScraperState } from './scraperSlice';

interface Props {
  categoryName: string;
  partType: ProductTypes;
  searchTermDesc: string;
}

export default function CategoryForm(props: Props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isFetching = useSelector(selectIsFetching);

  const items = useSelector(({ scraper }: { scraper: ScraperState }) => {
    if (props.partType === ProductTypes.gpu) {
      return scraper.gpuItems;
    }

    if (props.partType === ProductTypes.cpu) {
      return scraper.cpuItems;
    }

    if (props.partType === ProductTypes.ssd) {
      return scraper.ssdItems;
    }

    return [];
  });

  return (
    <div className="category-form">
      <h1>{props.categoryName}</h1>
      <Form
        name="submit-form"
        onFinish={() => dispatch(attemptSubmit(form.getFieldValue('num-pages'), form.getFieldValue('min-price'), form.getFieldValue('max-price'), form.getFieldValue('search-term'), props.partType))}
        form={form}
      >
        <h3 className="info-msg">Nemoj broj stranica preko 20 da staviš :)</h3>
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
          <InputNumber style={{ width: '250px' }} />
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
          <InputNumber style={{ width: '250px' }} />
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
          <InputNumber style={{ width: '250px' }} />
        </Form.Item>

        <Form.Item
          label={
            <span>
              Termini za pretragu &nbsp;
              <Tooltip title={props.searchTermDesc}>
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          name="search-term"
          rules={[
            {
              required: true,
              message: 'Unesite termine za pretragu',
            },
          ]}
        >
          <Select mode="tags" style={{ width: '250px' }} placeholder="Unesite jedan ili više termina"></Select>
        </Form.Item>

        <Form.Item className="last-row">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Tooltip title="Briše sve podatke iz tabele ispod">
                <Button type="primary" danger htmlType="button" onClick={() => dispatch(clearItems(props.partType))}>
                  Obriši podatke
                </Button>
              </Tooltip>
            </div>
            <div>
              <Button type="primary" htmlType="submit" loading={isFetching}>
                Pošalji upit
              </Button>
            </div>
          </div>
        </Form.Item>
      </Form>

      <Table columns={[
        {
          title: 'Ime fajla',
          dataIndex: 'fileName',
          key: 'fileName'
        },
        {
          title: 'Datum kreiranja',
          dataIndex: 'dateCreated',
          key: 'dateCreated'
        },
        {
          title: 'Vreme Kreiranja',
          dataIndex: 'timeCreated',
          key: 'timeCreated'
        },
        {
          title: 'Veličina fajla',
          dataIndex: 'fileSize',
          key: 'fileSize'
        },
        {
          title: 'Link za preuzimanje',
          dataIndex: 'downloadUrl',
          key: 'downloadUrl',
          render: link => <a href={link}>Klikni ovde</a>
        },
      ]} dataSource={items} rowKey="fileName" pagination={false} />
    </div>
  );
}