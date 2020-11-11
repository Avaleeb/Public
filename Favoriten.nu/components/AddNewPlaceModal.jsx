import React, { useState } from 'react';
import { Modal } from 'antd';
import axios from 'axios';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import useScript from '../lib/useScript';
import { logEvent } from '../lib/analytics';
// If you want to use the provided css
// import 'react-google-places-autocomplete/dist/assets/index.css';

// TODO this shares a lot of logic with AddLinkModal.js

export default function AddNewPlaceModal(props) {
  const [giftLink, setGiftLink] = useState('');
  const [email, setEmail] = useState('');
  const [loveMessage, setLoveMessage] = useState('');
  const [error, setError] = useState(null);
  const [placeDetails, setPlaceDetails] = useState(null);
  const googleURL = `https://maps.googleapis.com/maps/api/js?key=${
    process.env.GoogleAPIKey
  }&libraries=places`;
  const [scriptLoaded] = useScript(googleURL);

  const [hasSubmitted, setHasSubmitted] = useState(false);
  // this Counter is a hack so we can have two 'pages' in this Modal
  const [counter, setCounter] = useState(0);
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
    if (!placeDetails) {
      setError('Please select a place above.');
      return;
    }
    setHasSubmitted(true);
    setCounter(1);
    logEvent('user-click', 'added-new-potential-place', `google-placeId=${placeDetails.structured_formatting.main_text}`);
    axios.post('/api/places/submit_new_potential_place', {
        place_details: placeDetails,
        email,
        gift_card_url: giftLink,
        love_message: loveMessage,
      })
      .then((response) => {
        closeSoon();
      })
      .catch((error) => {
        if (
          error.response
          && error.response.data
          && error.response.data.error
        ) {
          setError(error.response.data.error);
          setHasSubmitted(false);
          setCounter(0);
        } else {
          closeSoon();
        }
      });
  }
  return (
    <Modal
      title={<span>Lägg till en ny restaurang!</span>}
      visible={props.shouldShow}
      onOk={(args) => {
        counter === 0 ? handleLinkSubmission() : resetAndClose();
      }}
      width="600px"
      destroyOnClose
      okButtonProps={{ shape: 'round', className: 'primary-button' }}
      cancelButtonProps={{ shape: 'round' }}
      okText={hasSubmitted ? 'Klart!' : 'Lägg till'}
      cancelText="Stäng"
      onCancel={resetAndClose}
    >
      {hasSubmitted && (
        <div>
          Tack! Vi lägger till det till vår kö och lanserar så snart som
          möjligt.
        </div>
      )}
      {!scriptLoaded && <div>Loading...</div>}
      {scriptLoaded && !hasSubmitted && (
        <div>
          <GooglePlacesAutocomplete
            onSelect={(selected) => {
              setError(null);
              setPlaceDetails(selected);
              logEvent('user-action', 'selected-from-google-suggestions', `${selected.structured_formatting.main_text}`);
            }}
            placeholder="Sök restaurang"
            inputClassName="add-link-modal-input"
            autocompletionRequest={{
              types: ['establishment'],
              componentRestrictions: {
                country: 'swe',
              },
            }}
            types={['establishment']}
          />
          <input
            className="add-link-modal-input"
            onChange={(event) => {
              setGiftLink(event.target.value);
            }}
            type="text"
            placeholder="Länk till köp av restaurangens presentkort *"
            value={giftLink}
          />
          <input
            className="add-link-modal-input"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            type="text"
            placeholder="Restaurangens e-post (valfritt)"
            value={email}
          />
          <input
            className="add-link-modal-input"
            onChange={(event) => {
              setLoveMessage(event.target.value);
            }}
            type="text"
            placeholder="Berätta varför du gillar det här stället fler kan lockas dit"
            value={loveMessage}
          />
          {error && <div style={{ marginTop: 8 }}>{error}</div>}
          <br/>
          <p className="font-size-14">* Lägg till namnet på restaurangen samt e-postadress om länk till presentkort saknas. Tack för att du hjälper oss öka antalet restauranger!</p>
        </div>
      )}
    </Modal>
  );
}
