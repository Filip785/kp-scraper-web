import React from 'react';
import { Tabs } from 'antd';
import CategoryForm from './CategoryForm';
import { ProductTypes } from './scraperSlice';

const { TabPane } = Tabs;

export default function Scraper() {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Grafičke Kartice" key="1">
        <CategoryForm categoryName="Grafičke Kartice" partType={ProductTypes.gpu} searchTermDesc="Moguće je dodati više termina, na primer ako tražite RX 580 i RX 590 unesite prvo 580 i pritisnite 'Enter' pa unesite 590 i pritisnite 'Enter'" />
      </TabPane>
      <TabPane tab="Procesori" key="2">
        <CategoryForm categoryName="Procesori" partType={ProductTypes.cpu} searchTermDesc="Moguće je dodati više termina, na primer ako tražite Ryzen 3600X i Ryzen 3700X unesite prvo 3600X i pritisnite 'Enter' pa unesite 3700X i pritisnite 'Enter'" />
      </TabPane>
      <TabPane tab="SSD" key="3">
        <CategoryForm categoryName="SSD" partType={ProductTypes.ssd} searchTermDesc="Moguće je dodati više termina, na primer ako tražite Samsung 860 i Samsung 970 unesite prvo 860 i pritisnite 'Enter' pa unesite 970 i pritisnite 'Enter'" />
      </TabPane>
    </Tabs>
  );
}