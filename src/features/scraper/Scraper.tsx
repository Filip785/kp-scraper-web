import React from 'react';
import { Tabs } from 'antd';
import CategoryForm from './CategoryForm';

const { TabPane } = Tabs;

export default function Scraper() {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Grafičke Kartice" key="1">
        <CategoryForm categoryName="Grafičke Kartice" />
      </TabPane>
      <TabPane tab="Procesori" key="2">
      <CategoryForm categoryName="Procesori" />
      </TabPane>
    </Tabs>
  );
}