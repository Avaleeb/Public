/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import axios from 'axios';
import './style/AddLinkModal.scss';
import { logEvent } from '../lib/analytics';

export default function AddLinkModal(props) {
  const [giftLink, setGiftLink] = useState('');
  const [email, setEmail] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [counter, setCounter] = useState(0);
  const emailBody = `Hejsan! Jag var på Favoriten.nu och såg att ${
    props.place.name
  } inte erbjuder presentkort online. 
  Jag gillar verkligen er och skulle gärna stötta er dessa tider, 
  så låt mig gärna veta hur jag i sådant fall kan göra det. Tack på förhand!`;

  function resetAndClose() {
    setGiftLink('');
    setEmail('');
    setHasSubmitted(false);
    setCounter(0);
    props.onClose();
  }

  function closeSoon() {
    window.setTimeout(() => {
      resetAndClose();
    }, 5000);
  }

  function handleLinkSubmission() {
    setHasSubmitted(true);
    setCounter(1);
    logEvent('user-click', 'submit-update-on-company', props.place.name);
    axios.post('/api/places/submit_potential_update', {
        place_id: props.place.placeID,
        gift_card_url: giftLink,
        email_address: email,
      })
      .then(() => {
        closeSoon();
      })
      .catch(() => {
        closeSoon();
      });
  }

  return (
    <Modal
      title={(
        <span>
          <b>{props.place.name}</b>
        </span>
      )}
      visible={props.shouldShow}
      onOk={() => (counter === 0 ? handleLinkSubmission() : resetAndClose())}
      width="400px"
      destroyOnClose
      okButtonProps={{ shape: 'round', className: 'primary-button' }}
      cancelButtonProps={{ shape: 'round' }}
      okText={hasSubmitted ? 'Done' : 'Skicka'}
      onCancel={resetAndClose}
    >
      {hasSubmitted && (
        <div>
          Tack! Vi uppdaterar datat så snart som möjligt.
        </div>
      )}
      {!hasSubmitted && (
        <div>

          { props.place.emailContact
            && (
              <div className="send-support-email-row">
                <span>Stötta restaurangen genom att skicka ett uppmuntrande mail!</span>
                <Button
                  className="primary-button"
                  type="default"
                  shape="round"
                  // eslint-disable-next-line no-unused-vars
                  onClick={(event) => {
                    logEvent('user-click', `email-for-gift-card-${props.size}`, props.place.name);
                    window.location.href = `mailto:${
                      props.place.emailContact
                    }?subject=K%C3%B6pa%20presentkort%3F&body=${
                      emailBody}`;
                  }}
                >
                  Stötta
                </Button>
              </div>
            )}

          <span>
            Vi saknar fortfarande viss data för&nbsp;
            {props.place.name}
            . Om du vet något av följande fälten
            hjälp oss gärna uppdatera dem!
          </span>
          <input
            className="add-link-modal-input"
            onChange={(event) => {
              setGiftLink(event.target.value);
            }}
            type="text"
            placeholder="Länk till köp av restaurangens presentkort *"
            value={giftLink}
          />

          { !props.place.emailContact
            && (
              <input
                className="add-link-modal-input"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                type="text"
                placeholder="Email-Adress"
                value={email}
              />
            )}
        </div>
      )}
    </Modal>
  );
}
