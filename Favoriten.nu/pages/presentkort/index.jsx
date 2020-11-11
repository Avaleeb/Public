import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';

const Presentkort = () => {
  const [email, setEmail] = useState('');

  function sendToDb() {
    console.log(email);
    if (email.length > 4) {
      axios.post('/api/potentialCustomer', {
        email,
      }).then((res) => console.log(res));
    }
  }

  return (
    <Layout title="Presentkort">
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ color: 'white' }}>Denna tjänst är inte redo ännu men skriv gärna in din mail i fältet nedan så kontaktar vi dig så fort den är klar </h2>
        <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <button type="button" onClick={() => sendToDb()}>Skicka</button>
      </div>
    </Layout>
  );
};


export default Presentkort;
