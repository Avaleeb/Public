/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Row, Typography } from 'antd';
import Skeleton from 'react-loading-skeleton';
import CallToActionButton from './CallToActionButton';
import './style/SuggestedPlaceCards.scss';

const SuggestedPlaceCards = ({
  moreAvailable, passRef, suggestedPlaces, onLoadMore,
}) => {
  const { Title } = Typography;
  let suggestedPlaceCards;
  if (suggestedPlaces && suggestedPlaces.length) {
    suggestedPlaceCards = suggestedPlaces.map((suggestion) => (
      <div key={suggestion.key} className="suggested-place">
        <Row style={{
          minHeight: '88px',
          heigth: '100%',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundImage: `url(https://api.hitta.se/image/v2/1/13/${suggestion.location.lat}:${suggestion.location.lng})`,
        }}
        >
          <div className="darken-overlay">
            <Title
              className="suggestion-title"
              level={4}
            >
              {suggestion.name}
            </Title>
            <div className="cardButton">
              <CallToActionButton place={suggestion} size="default" />
            </div>
          </div>
        </Row>
      </div>
    ));
  } else {
    suggestedPlaceCards = [...Array(9).keys()].map((placeholder) => (
      <div key={placeholder} className="suggested-place">
        <div style={{ marginTop: -4 }}>
          <Skeleton height={168} />
        </div>
      </div>
    ));
  }
  return (
    <div ref={passRef}>
      <section className="suggestions-container">
        <Row style={{ justifyContent: 'center' }}>{suggestedPlaceCards}</Row>
      </section>
      {moreAvailable && (
        <div style={{ textAlign: 'center' }}>
          <Button
            className="primary-button"
            shape="round"
            size="default"
            onClick={onLoadMore}
          >
            Visa fler
          </Button>
        </div>
      )}
    </div>
  );
};

export default SuggestedPlaceCards;
