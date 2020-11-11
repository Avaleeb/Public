/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/head';
import {
  Row,
} from 'antd';
import { initGA, logPageView } from '../lib/analytics';
import Nav from './Nav';
import '../pages/index.scss';

export default class Layout extends React.Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  render() {
    return (
      <div>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        <Row className="hero-row">
          <div style={{ maxWidth: '1100px', margin: '0px auto' }}>
            <Row className="top-header">
              <Nav />
            </Row>
            {this.props.children}
          </div>
        </Row>
      </div>
    );
  }
}
