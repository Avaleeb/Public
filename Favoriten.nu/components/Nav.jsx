import React, { useState } from 'react';
import Link from 'next/link';
import './style/Nav.scss';
import {
  Popover,
} from 'antd';
import FAQModal from './FAQModal';
import ShareOptions from './ShareOptions';

const Nav = () => {
  const [faqVisible, setFaqVisible] = useState(false);

  return (
    <header className="header">
      <FAQModal
        shouldShow={faqVisible}
        onClose={() => setFaqVisible(false)}
      />
      <a href="/" className="logo">Favoriten.nu</a>
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" htmlFor="menu-btn"><span className="navicon" /></label>
      <ul className="menu">
        <li><button type="button" onClick={() => setFaqVisible(true)}>FAQ</button></li>
        <li>
          <Link href="/presentkort">
            <a>Presentkort via oss</a>
          </Link>
        </li>
        <li>
          <Popover overlayClassName="share-popover" content={<ShareOptions />}>
            <button type="button">
              Sprid ordet
            </button>
          </Popover>
        </li>
      </ul>
    </header>
  );
};

export default Nav;

// <Title
//   onClick={() => setFaqVisible(true)}
//   style={{
//     color: 'white',
//     display: 'inline',
//     marginRight: '16px',
//     cursor: 'pointer',
//   }}
//   level={4}
// >
//   FAQ
// </Title>
// <Popover overlayClassName="share-popover" content={<ShareOptions />}>

// </Popover>;
