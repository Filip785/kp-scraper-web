import React from 'react';
import { Tabs } from 'antd';
import CategoryForm from './CategoryForm';

const { TabPane } = Tabs;

export default function Scraper() {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Grafičke Kartice" key="1">
        <CategoryForm categoryName="Grafičke Kartice" catId="gpu" />
      </TabPane>
      <TabPane tab="Procesori" key="2">
        <h1>Sutra :)</h1>
      {/* <CategoryForm categoryName="Procesori" catId="cpu" /> */}
      </TabPane>
    </Tabs>
  );
}