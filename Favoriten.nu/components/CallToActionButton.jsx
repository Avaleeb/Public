/* eslint react/prop-types: 0 */
import React, { useState } from 'react';
import { Button } from 'antd';
import AddLinkModal from './AddLinkModal';
import { logEvent } from '../lib/analytics';

export default function CallToActionButton({ place, size }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const className = size === 'large' ? 'large-primary-button' : 'secondary-button';

  let text;
  let openEvent;

  if (place.giftCardURL) {
    text = 'Köp presentkort';
    openEvent = () => {
      logEvent('user-click', `gift-card-${size}`, place.name);
      window.open(place.giftCardURL);
    };
  } else if (!place.giftCardURL && place.emailContact) {
    text = 'Stötta';
    openEvent = () => {
      logEvent('user-click', `ask-for-support-link-update-${size}`, place.name);
      setShowAddModal(true);
    };
  } else {
    text = 'Be om presentkort';
    openEvent = () => {
      logEvent('user-click', `ask-for-email-link-update-${size}`, place.name);
      setShowAddModal(true);
    };
  }

  return (
    <div key={place.placeID}>
      <Button
        size={size}
        className={className}
        type="default"
        onClick={() => openEvent()}
      >
        {text}
      </Button>
      <AddLinkModal
        shouldShow={showAddModal}
        place={place}
        size={size}
        onClose={() => setShowAddModal(false)}
      />

    </div>
  );
}
