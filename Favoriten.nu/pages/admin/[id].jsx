/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import axios from 'axios';
import './admin.scss';

export async function getServerSideProps({ params }) {
  const { id } = params;
  const result = await(await axios.get(`${process.env.baseUrl}/api/data_views/admin`)).data;
  const cities = await(await axios.get(`${process.env.baseUrl}/api/places/cities`)).data;
  return {
    props: {
      result,
      cities,
      id,
    },
  };
}

// eslint-disable-next-line react/prop-types
const Admin = ({ result, id, cities }) => {
  if (id !== process.env.AdminId) {
    return (
      <div>ERROR 404</div>
    );
  }
  const [currentData, setCurrentData] = useState(result);
  const [selectedHood, setSelectedHood] = useState();
  const [places, setPlaces] = useState([]);

  function removeFromFrontend(index) {
    const data = [...currentData];
    data.splice(index, 1);
    setCurrentData(data);
  }

  async function deleteRow(mongoId, index) {
    removeFromFrontend(index);
    await axios.post('/api/places/delete_potential_place', {
      body: mongoId,
    })
      .then((res) => console.log(res));
  }

  async function addToDb(dataPoint, index) {
    removeFromFrontend(index);
    await fetch('/api/places/submit_new_place', {
      method: 'POST',
      body: JSON.stringify(dataPoint),
    })
      .then((res) => console.log(res));
  }

  async function loadPlaces(hood) {
    axios.get('/api/places/by_neighborhood', {
      params: {
        neighborhood: hood,
        offset: 0,
        limit: 999999,
      },
    }).then((response) => {
      setPlaces(response.data.suggestedPlaces);
      console.log(places);
    });
  }

  async function newHood(event) {
    const hood = event.target.value;
    console.log(hood);
    setSelectedHood(hood);
    loadPlaces(hood);
  }

  const ShowData = () => currentData.map((dataPoint, index) => (
    <div className="data_wrapper" key={dataPoint._id}>
      <button type="button" className="delete" onClick={() => deleteRow(dataPoint._id, index)}> delete</button>
      <p>{dataPoint.google_data.formatted.main_text}</p>
      <p>{dataPoint.email}</p>
      <p>{dataPoint.google_data.formatted.secondary_text}</p>
      <a href={dataPoint.gift_card_url} rel="noopener noreferrer" target="_blank">{dataPoint.gift_card_url}</a>
      <button type="button" className="accept" onClick={() => addToDb(dataPoint, index)}> Godkänn</button>
    </div>
  ));

  const savePlace = ({ placeID, giftCardURL, emailContact }) => {
    axios.post(`/api/admin/updatePlace/${placeID}`, { giftCardURL, emailContact })
      .then((res) => alert(`${res.statusText} ${JSON.stringify(res.data)}`))
      .catch((err) => alert(`Fel :( ${err.toString()}`));
  };

  const EditPlaces = () => (
    <div>
      <select value={selectedHood} onChange={newHood}>
        <option> - Välj Hood -</option>
        {cities.map((n) => <option key={n.key} value={n.key}>{n.name} [{n.count}]</option>)}
      </select>
      {places.map((p, index) => (
        <form
          index={index}
          key={p.placeID}
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            const form = event.target;
            const placeID = form.placeID.value;
            const emailContact = form.emailContact.value;
            const giftCardURL = form.giftCardURL.value;
            console.log('Save PLace:', placeID, emailContact, giftCardURL);
            savePlace({ placeID, giftCardURL, emailContact });
          }}
        >
          <span>
            <strong>{p.name}</strong>
            {' '}
            {p.address}
          </span>
                    &nbsp;
          <input type="hidden" name="placeID" value={p.placeID} />
          <label>
            <strong>Gift card:</strong>
            <input type="text" name="giftCardURL" defaultValue={p.giftCardURL} />
          </label>
                    &nbsp;
          <label>
            <strong>Email:</strong>
            <input type="text" name="emailContact" defaultValue={p.emailContact} />
          </label>
          <input type="submit" value="Save" />
          <br />
          <br />
        </form>
      ))}
    </div>
  );


  return (
    <div>
      <h1>Favoriten.nu Admin</h1>
      <h2>
        Nya plejs:
        {currentData.length}
      </h2>
      <ShowData />
      <hr />
      <h2>Administrera plejs</h2>
      <EditPlaces />
    </div>

  );
};


export default Admin;
