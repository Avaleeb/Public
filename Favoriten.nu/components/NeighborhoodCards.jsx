/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Typography } from 'antd';
import axios from 'axios';
import SuggestedPlaceCards from './SuggestedPlaceCards';
import { logEvent } from '../lib/analytics';

const { Title } = Typography;

export default class NeighborhoodCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestedPlaces: null,
      selectedNeighborhood: this.props.neighborhoods[0],
      offset: 0,
      fetchOffset: 0,
      windowWidth: 0,
      loading: true,
    };

    this.ref = React.createRef();
  }

  componentDidMount = async () => {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.fetchSuggestionsForNeighborhood(this.props.neighborhoods[0], this, 0);
  }

  componentWillUnmount = async () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ windowWidth: window.innerWidth });
  }

  fetchSuggestionsForNeighborhood(neighborhood, ref, fetchOffset) {
    const allPlacesInNeighborhood = this.props.allPlaces[neighborhood];
    const suggestions = allPlacesInNeighborhood.slice(fetchOffset, fetchOffset + 12);
    const moreAvailable = (fetchOffset+12) < allPlacesInNeighborhood.length;
    const merged = (this.state.suggestedPlaces || []).concat(suggestions);
    ref.setState((state, props) => {
      const nextOffset = state.fetchOffset + suggestions.length;
      return {
        suggestedPlaces: merged,
        fetchOffset: nextOffset,
        moreAvailable,
      };
    });
    
    // this.setState({ loading: true });
    // axios.get('/api/places/by_neighborhood', {
    //   params: {
    //     neighborhood,
    //     offset: fetchOffset,
    //   },
    // })
    //   .then((response) => {
    //     console.log(ref.state.suggestedPlaces)
    //     const suggestions = response.data.suggestedPlaces;
    //     console.log(suggestions)
    //     const { moreAvailable } = response.data;
    //     const merged = (this.state.suggestedPlaces || []).concat(suggestions);
    //     console.log(merged)
    //     ref.setState((state, props) => {
    //       const nextOffset = state.fetchOffset + suggestions.length;
    //       return {
    //         loading: false,
    //         suggestedPlaces: merged,
    //         fetchOffset: nextOffset,
    //         moreAvailable,
    //       };
    //     });
    //   })
    //   .catch((error) => {
    //     ref.setState({ loading: false });
    //   });
  }

  loadMoreForCurrentNeighborhood() {
    this.fetchSuggestionsForNeighborhood(
      this.state.selectedNeighborhood,
      this,
      this.state.fetchOffset,
    );
  }

  getCardsForCurrentPage() {
    const neighborhoodCards = this.props.neighborhoods
      .slice(this.state.offset)
      .map((neighborhood) => (
        <div
          key={neighborhood}
          className="neighborhood-card"
          style={{ textAlign: 'center' }}
        >
          <div
            className={
                `neighborhood-card-image${
                  this.state.selectedNeighborhood
                && this.state.selectedNeighborhood === neighborhood
                    ? ' neighborhood-card-image-selected'
                    : ''}`
              }
            onClick={(event) => {
              logEvent('user-click', 'neighborhood-selected', neighborhood);
              this.setState({
                selectedNeighborhood: neighborhood,
                fetchOffset: 0,
                suggestedPlaces: null,
              },
                () => this.fetchSuggestionsForNeighborhood(neighborhood, this, 0),
              );
            }}
          >
            <div
              className={
                  `neighborhood-card-title${
                    this.state.selectedNeighborhood
                  && this.state.selectedNeighborhood === neighborhood
                      ? ' neighborhood-card-title-selected'
                      : ''}`
                }
            >
              {neighborhood}
            </div>
          </div>
        </div>
      ));
    return neighborhoodCards;
  }

  render() {
    return (
      <>
        <div className="explore-neighborhood-section">
          <Title className="section-title" level={4}>
            Eller leta fritt per stad i
            {' '}
          </Title>
        </div>
        {this.props.neighborhoods && (
          <section
            className="neighborhood-card-container"
            style={{
              maxWidth:
                this.state.windowWidth >= 576
                  ? this.state.windowWidth - 200
                  : this.state.windowWidth,
            }}
          >
            {this.state.offset !== 0 && (
              <a
                className={
                  `neighborhood-card-arrow neighborhood-card-arrow-left ${
                    this.state.offset >= this.props.neighborhoods.length - 1
                      ? 'neighborhood-card-arrow-disabled'
                      : ''}`
                }
                onClick={(event) => {
                  this.setState({
                    offset: Math.max(0, this.state.offset - 1),
                  });
                }}
              >
                ‹
              </a>
            )}
            {this.getCardsForCurrentPage()}
            {this.state.offset < this.props.neighborhoods.length - 1 && (
              <a
                className={
                  `neighborhood-card-arrow neighborhood-card-arrow-right ${
                    this.state.offset >= this.props.neighborhoods.length - 1
                      ? 'neighborhood-card-arrow-disabled'
                      : ''}`
                }
                onClick={(event) => {
                  this.setState({
                    offset: Math.min(
                      this.props.neighborhoods.length - 1,
                      this.state.offset + 1,
                    ),
                  });
                }}
              >
                ›
              </a>
            )}
          </section>
        )}
        {(this.state.loading
          || (this.state.suggestedPlaces
            && this.state.suggestedPlaces.length > 0)) && (
            <SuggestedPlaceCards
              passRef={this.ref}
              suggestedPlaces={this.state.suggestedPlaces}
              moreAvailable={this.state.moreAvailable}
              onLoadMore={() => {
                this.loadMoreForCurrentNeighborhood();
              }}
            />
        )}

        {this.state.suggestedPlaces
          && this.state.suggestedPlaces.length === 0
          && this.state.selectedNeighborhood && (
            <p>
              Vi har tyvärr inga platser för
              {this.state.selectedNeighborhood.name}
              {' '}
              än, hjälp oss gärna att lägga till ditt favoritställe
              <a href="?addplace=show">här</a>
            </p>
        )}
      </>
    );
  }
}
