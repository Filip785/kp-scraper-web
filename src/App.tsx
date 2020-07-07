import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Scraper from './features/scraper/Scraper';
import './shared/i18n';
import { Select } from 'antd';
import { useTranslation, Trans } from 'react-i18next';

const { Option } = Select;

function App() {
  const { i18n } = useTranslation();

  return (
    <div className="App">
      <div className="lang-select">
      <h3><Trans i18nKey="Izaberite jezik"></Trans></h3>
        <Select defaultValue={localStorage.getItem('i18nextLng') || 'rs'} style={{ width: 175 }} onChange={lang => i18n.changeLanguage(lang)}>
          <Option value="rs">
            <img src="/img/serbia.png" alt="Serbian flag" />
            <span className="lang-select-desc">
              <Trans i18nKey="Srpski"></Trans>
            </span>
          </Option>
          <Option value="en">
            <img src="/img/uk.png" alt="United Kingdom flag" />
            <span className="lang-select-desc">
              <Trans i18nKey="Engleski"></Trans>
            </span>
          </Option>
        </Select>
      </div>
      <Scraper />
    </div>
  );
}

export default App;
