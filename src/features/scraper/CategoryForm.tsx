import React from 'react';
import { Form, Button, InputNumber, Table, Tooltip, Select } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { attemptSubmit, selectIsFetching, clearItems, ProductTypes, ScraperState } from './scraperSlice';
import { useTranslation } from 'react-i18next';

interface Props {
  categoryName: string;
  partType: ProductTypes;
  searchTermDesc: string;
}

export default function CategoryForm(props: Props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isFetching = useSelector(selectIsFetching);
  const { t } = useTranslation();

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
        <h3 className="info-msg">{t('Nemoj broj stranica preko 20 da staviš')}</h3>
        <Form.Item
          label={t("Maksimalan broj strana koje želite da pokrijete")}
          name="num-pages"
          rules={[
            {
              required: true,
              message: 'Unesite broj strana',
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label={t("Minimalna cena artikla (u evrima)")}
          name="min-price"
          rules={[
            {
              required: true,
              message: 'Unesite minimalnu cenu',
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label={t("Maksimalna cena artikla (u evrima)")}
          name="max-price"
          rules={[
            {
              required: true,
              message: 'Unesite maksimalnu cenu',
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label={
            <span>
              {t('Termini za pretragu')} &nbsp;
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
          <Select mode="tags" placeholder="Unesite jedan ili više termina"></Select>
        </Form.Item>

        <Form.Item className="last-row">
          <div className="btn-wrapper">
            <div>
              <Tooltip title={t("Briše sve podatke iz tabele ispod")}>
                <Button type="primary" danger htmlType="button" onClick={() => dispatch(clearItems(props.partType))}>
                  {t('Obriši podatke')}
                </Button>
              </Tooltip>
            </div>
            <div className="submit-btn-wrapper">
              <Button type="primary" htmlType="submit" loading={isFetching}>
                {t('Pošalji upit')}
              </Button>
            </div>
          </div>
        </Form.Item>
      </Form>

      <Table columns={[
        {
          title: t('Ime fajla'),
          dataIndex: 'fileName',
          key: 'fileName',
          render(children) {
            return {
              children,
              props: {
                'data-desc': t('Ime fajla')
              }
            };
          }
        },
        {
          title: t('Pronađeno oglasa'),
          dataIndex: 'adCount',
          key: 'adCount',
          render(children) {
            return {
              children,
              props: {
                'data-desc': t('Pronađeno oglasa')
              }
            };
          }
        },
        {
          title: t('Datum kreiranja'),
          dataIndex: 'dateCreated',
          key: 'dateCreated',
          render(children) {
            return {
              children,
              props: {
                'data-desc': t('Datum Kreiranja')
              }
            };
          }
        },
        {
          title: t('Vreme kreiranja'),
          dataIndex: 'timeCreated',
          key: 'timeCreated',
          render(children) {
            return {
              children,
              props: {
                'data-desc': t('Vreme kreiranja')
              }
            };
          }
        },
        {
          title: t('Veličina fajla'),
          dataIndex: 'fileSize',
          key: 'fileSize',
          render(children) {
            return {
              children,
              props: {
                'data-desc': t('Veličina fajla')
              }
            };
          }
        },
        {
          title: t('Link za preuzimanje'),
          dataIndex: 'downloadUrl',
          key: 'downloadUrl',
          render(link) {
            return {
              children: <a href={link}>{t('Klikni ovde')}</a>,
              props: {
                'data-desc': t('Link za preuzimanje')
              }
            };
          }
        },
      ]} dataSource={items} rowKey="fileName" pagination={false} />
    </div>
  );
}