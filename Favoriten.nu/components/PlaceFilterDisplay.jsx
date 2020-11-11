import React from 'react';
import axios from 'axios';
import NearbySpots from './NearbySpots';
import { PlaceResultMain } from './PlaceResultMain';
import { PlaceAutosuggestion } from './PlacesAutosuggestion';

export default class PlaceFilterDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      hasFetched: false,
      place: null,
      suggestedPlaces: null,
    };
    this.elementRef = React.createRef();
  }

  render() {
    return (
      <div ref={this.elementRef}>
        <PlaceAutosuggestion
          onPlaceSelected={(place) => { this.setState({ place, suggestedPlaces: [] }); }}
          onSearchChanged={(newValue) => {
            if (newValue.length === 0) {
              this.setState({ place: null, suggestedPlaces: null });
            }
          }}
          allPlaces={this.props.allPlaces}
        />
        <div style={{ textAlign: 'left' }}>
          <PlaceResultMain place={this.state.place} />
          {this.state.suggestedPlaces
            && this.state.suggestedPlaces.length > 0 && (
              <NearbySpots suggestedPlaces={this.state.suggestedPlaces} />
          )}
        </div>
      </div>
    );
  }
}
