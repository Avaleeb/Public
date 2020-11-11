import React from 'react';
import axios from 'axios';
import {
  Typography, Row, Col,
} from 'antd';
import { useRouter } from 'next/router';
import AddNewPlaceModal from '../components/AddNewPlaceModal';
import NeighborhoodCards from '../components/NeighborhoodCards';
import PlaceFilterDisplay from '../components/PlaceFilterDisplay';
import Layout from '../components/Layout';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

const { Title } = Typography;

export async function getServerSideProps() {
  const allPlaces = await axios.get(`${process.env.baseUrl}/api/places/all_places`);

  const arrayToObject = allPlaces.data.reduce((obj, item) => {
    if (!obj[item.areaToMatchNeighborhood]) {
      obj[item.areaToMatchNeighborhood] = [];
    }
    obj[item.areaToMatchNeighborhood].push(item);
    return obj;
  }, {});

  return {
    props: {
      neighborhoods: Object.keys(arrayToObject),
      allPlaces: arrayToObject,
    },
  };
}

const Index = ({ neighborhoods, allPlaces }) => {
  const router = useRouter();


  const addPlaceVisible = !!router.query.addplace;

  function hideAddPlaceVisible() {
    router.push('/', '/', { shallow: true });
  }

  return (
    <Layout title="Favoriten.nu - Stötta din lokala favoritrestaurang">
      <AddNewPlaceModal
        shouldShow={addPlaceVisible}
        onClose={() => hideAddPlaceVisible()}
      />
      <Col
        xs={{ span: 18, offset: 3 }}
        span={16}
        offset={4}
        style={{ textAlign: 'center', padding: '20px 0px' }}
      >
        <Title
          level={1}
          style={{ color: 'white', textAlign: 'center', marginBottom: '40px' }}
        >
          Din favoritrestaurang kan behöva stänga för alltid. Hjälp till att rädda den!
        </Title>
        <div className="header-sans">
          Presentkort hjälper till att "plana ut kurvan" för förlorade inkomster på grund av COVID-19. Stötta favoriten nu!
        </div>
      </Col>
      <Col
        sm={{ span: 20, offset: 2 }}
        md={{ span: 20, offset: 2 }}
        lg={{ span: 20, offset: 2 }}
      >
        <div className="main-results">
          <div style={{ padding: 20 }}>
            <PlaceFilterDisplay allPlaces={allPlaces} />
            <span className="center font-size-14">
              Finns den inte med? Lägg till din favoritrestaurang
              <a onClick={() => router.push('/?addplace=show', '/addplace', { shallow: true })}>
                  &nbsp;här
              </a>
            </span>
          </div>
          <div className="neighborhood-card-container-outer">
            <NeighborhoodCards neighborhoods={neighborhoods} allPlaces={allPlaces} />
          </div>
        </div>
      </Col>
      <Row className="footer-content">
        <Col
          offset={2}
          xs={18}
          sm={18}
          md={9}
          lg={9}
          xl={9}
          style={{ textAlign: 'left' }}
        >
          <Title level={3}>Vårt ansvar som lojala kunder</Title>
          <p className="font-size-14">
            Våra småföretag behöver oss mer än någonsin. Även om vi inte kan lämna hemmet,
            kan vi fortfarande stödja lokala restauranger genom att köpa presentkort.
            Det är i princip ett minilån, så köp ett nu för att använda senare.
          </p>
        </Col>
        <Col
          offset={2}
          xs={18}
          sm={18}
          md={9}
          lg={9}
          xl={9}
          style={{ textAlign: 'left' }}
        >
          <Title level={3}>3 veckor utan kunder kan räcka för konkurs</Title>
          <p className="font-size-14">
            Restauranger har massor av fasta kostnader såsom hyra, löner,
            lånekostnader, försäkringar, leveranser, reparationer osv.
            Restauranger har vanligtvis redan pressade marginaler så situationen
            vi befinner oss i
            just nu hotar många restaurangers överlevnad.
          </p>
        </Col>
      </Row>
    </Layout>

  );
};

export default Index;
