import React from 'react';
import { Row, Typography } from 'antd';
import SuggestedPlaceCards from './SuggestedPlaceCards';

export default class NearbySpots extends React.Component {
  render() {
    const Title = Typography;
    return (
      <>
        <Row
          style={{
            textAlign: 'center',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          <Title className="section-title" style={{ margin: 'auto' }} level={4}>
            Restauranger i närheten
          </Title>
        </Row>
        <SuggestedPlaceCards suggestedPlaces={this.props.suggestedPlaces} />
      </>
    );
  }
}
