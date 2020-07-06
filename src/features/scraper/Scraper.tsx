import React from 'react';
import { Tabs } from 'antd';
import CategoryForm from './CategoryForm';
import { ProductTypes } from './scraperSlice';
import { useTranslation } from 'react-i18next';

const { TabPane } = Tabs;

export default function Scraper() {
  const { t } = useTranslation();

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab={t('Grafičke Kartice')} key="1">
        <CategoryForm categoryName={t('Grafičke Kartice')} partType={ProductTypes.gpu} searchTermDesc={t('opisTerminaGPU')} />
      </TabPane>
      <TabPane tab={t('Procesori')} key="2">
        <CategoryForm categoryName={t('Procesori')} partType={ProductTypes.cpu} searchTermDesc={t('opisTerminaCPU')} />
      </TabPane>
      <TabPane tab="SSD" key="3">
        <CategoryForm categoryName="SSD" partType={ProductTypes.ssd} searchTermDesc={t('opisTerminaSSD')} />
      </TabPane>
    </Tabs>
  );
}