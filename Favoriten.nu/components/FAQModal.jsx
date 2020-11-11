import React, { useState } from 'react';
import { Modal } from 'antd';
import { useRouter } from 'next/router';

const FAQEntry = ({ title, body }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <h3
        style={{ cursor: 'pointer' }}
        onClick={(event) => setExpanded(!expanded)}
      >
        {title}
      </h3>
      {expanded && (
        body
      )}
    </>
  );
};

function FAQModal({ shouldShow, onClose }) {
  const router = useRouter();

  function renderLink(url, text, target) {
    target = target || '_blank';
    return <a target={target} href={url}>{text}</a>;
  }

  function addPlaceLink(text) {
    return <a role="button" onClick={() => router.push('/?addplace=show', '/addplace', { shallow: true })}>{text}</a>;
  }

  const consumerFAQs = [
    {
      title: 'Vad är Favoriten.nu?',
      body: (
        <p>
          Favoriten.nu är en samlingssida över restauranger och kaféer i Sverige
          som erbjuder presentkort att köpa online. Det är vår förhoppning att
          genom att tillhandahålla denna tjänst kunna mobilisera lojala kunder för att ge
          efterfrågat och nödvändigt stöd till sina favoritplatser i stan.
        </p>
      ),
    },
    {
      title: 'Varför finns inte min favoritrestaurang på Favoriten.nu?',
      body: (
        <p>
          Du får mer än gärna hjälpa oss att lägga till dina favoritställen för mat & dryck&nbsp;
          {addPlaceLink('här.')}
        </p>),

    },
    {
      title:
        'Hur kan jag annars stödja lokala företag utöver att köpa ett presentkort hos er?',
      body: (
        <p>
          Takeaway-beställningar är ett mycket bra sätt att bidra!
          Vissa restauranger som normalt inte erbjuder leverans har börjat erbjuda det nu så
          kolla in deras hemsidor och sociala medier för att se vad som finns tillgängligt.
        </p>),
    },
    {
      title: 'Vem står bakom Favoriten.nu?',
      body: (
        <p>
          Bakom Favoriten.nu är Techbolaget Sverige AB (559184-3114) och Oscar Rundqvist,
          Jens Rathsman och Tom Berg
          Vi såg hur hårt denna situation slog mot besöksnäringen som vi
          med så många andra ju tycker så mycket om.
          Favoriten.nu är vårt enkla sätt att göra det lättare för
          människor att hjälpa lokala företag genom denna svåra tid.
          Du kan kontakta oss med frågor om initiativet på&nbsp;
          {renderLink('mailto:info@techbolag.se', 'info@techbolag.se')}
        </p>),
    },
  ];
  const bizFAQs = [
    {
      title: 'Varför finns inte min restaurang på Favoriten.nu?',
      body: (
        <p>
          Du får mer än gärna hjälpa oss att lägga till dina favoritställen för mat & dryck&nbsp;
          {addPlaceLink('här.')}
        </p>),
    },
    {
      title:
        'Mitt företag erbjuder presentkort, men er sida säger att vi inte gör det.',
      body: (
        <p>
          Du får mer än gärna hjälpa oss med rätt uppgifter för din restaurang
          {addPlaceLink('här.')}
        </p>),
    },
    {
      title: 'Hur kan jag börja erbjuda presentkort online?',
      body: (
        <p>
          Just nu kan vi tyvärr endast visa restauranger med egna
          lösningar för presentkort online, så vi skickar nu bara vidare kunden.
          Vi kommer dock mycket snart kunna hjälpa även dig utan befintlig egen lösning,
          med en lösning direkt på Favoriten.nu. Skriv in ditt företags e-postadress&nbsp;
          {addPlaceLink('här')}
          &nbsp;så säger vi till så fort vi är där (inom några dagar)!
        </p>),
    },
    {
      title: 'Hur kan jag uppmuntra kunder att köpa presentkort?',
      body: (
        <p>
          Människor letar efter sätt de kan stödja sina favoritföretag,
          så var inte rädd för att låta dem få veta att presentkort hjälper.
          Tips är att nå ut till dem på Facebook, Twitter och Instagram och
          använd din e-postlista för att komma i kontakt med dina kunder.
          Be dem överväga att köpa ett presentkort för en månads utgifter för att
          hjälpa dig genom detta, så att du kan fortsätta att erbjuda god
          mat / kaffe / etc. i flera år framöver.
        </p>),
    },
  ];
  return (
    <Modal
      title="FAQs"
      visible={shouldShow}
      onOk={onClose}
      width="80%"
      onCancel={onClose}
      footer={<span />}
    >
      <h2>För restaurangbesökare</h2>
      {consumerFAQs.map((faq) => (
        <FAQEntry key={faq.title} title={faq.title} body={faq.body} />
      ))}
      <h2>För restauranger</h2>
      {bizFAQs.map((faq) => (
        <FAQEntry key={faq.title} title={faq.title} body={faq.body} />
      ))}
    </Modal>
  );
}

export default FAQModal;
