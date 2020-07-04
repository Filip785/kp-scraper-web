import React from 'react';
import { Tabs } from 'antd';
import CategoryForm from './CategoryForm';
import { ProductTypes } from './scraperSlice';

const { TabPane } = Tabs;

export default function Scraper() {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Grafičke Kartice" key="1">
        <CategoryForm categoryName="Grafičke Kartice" partType={ProductTypes.gpu} />
      </TabPane>
      <TabPane tab="Procesori" key="2">
        <h1>Sutra :)</h1>
        {/* <CategoryForm categoryName="Procesori" partType={ProductTypes.cpu} /> */}
      </TabPane>
    </Tabs>
  );
}