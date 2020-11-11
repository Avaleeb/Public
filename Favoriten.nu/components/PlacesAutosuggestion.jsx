import React from "react";
import Autosuggest from "react-autosuggest";
import AddNewPlaceModal from "./AddNewPlaceModal";
import {logEvent} from "../lib/analytics"
import axios from "axios";

export class PlaceAutosuggestion extends React.Component {
  maxSuggestions = 8;
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      showAddModal: false,
      suggestions: [],
    };
  }

  sanitizeInput = input => {
    return input
      .trim()
      .toLowerCase()
      .replace("é", "e");
  };

  getSuggestions = value => {
    const inputValue = this.sanitizeInput(value);
    const inputLength = inputValue.length;
    if (inputLength < 2) {
      return [];
    } else {
      let results = []
      for (const key in this.props.allPlaces){
        const filter = this.props.allPlaces[key].filter(
          place => this.sanitizeInput(place.name).indexOf(inputValue) !== -1
        );
        results = results.concat(filter)
      }
      if (results.length === 0) {
        logEvent('user-roadblock', 'no-result', 'auto-suggestion')
      }
      results.push({ special: "letUsKnowRow" });
      return results.slice(0, this.maxSuggestions);
    }
  };
  getSuggestionValue = suggestion => suggestion.name || "";
  renderSuggestion = suggestion => {
    if (suggestion.special) {
      return (
        <div>
          <div>Ser du inte din favoritrestaurang?</div>
          <div>
            <a
              onClick={() => {
                this.setState({ showAddModal: false });
              }}
              className="primary-link"
            >
              Lägg till den!
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>{suggestion.name}</div>
          <div className="autosuggest-address">{suggestion.address}</div>
        </div>
      );
    }
  };
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
    this.props.onSearchChanged(newValue);
  };
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  renderInputComponent = inputProps => (
    <div className="react-autosuggest__wrapper">
      <div className="react-autosuggest__left-icon">🍽</div>
      <input {...inputProps} />
    </div>
  );

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Sök efter din favoritrestaurang…",
      value,
      onChange: this.onChange,
      onFocus: event => {
        logEvent("user-action", "search-entered", 'auto-suggestion')
      }
    };
    return (
      <div className="autosuggest-outer">
        <AddNewPlaceModal
          shouldShow={this.state.showAddModal}
          onClose={() => this.setState({ showAddModal: false })}
        />
        <Autosuggest
          suggestions={suggestions}
          focusInputOnSuggestionClick={false}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          highlightFirstSuggestion={true}
          renderInputComponent={this.renderInputComponent}
          onSuggestionSelected={(event, data) => {
            if (data.suggestion.special) {
              logEvent('user-click', 'tell-us-missing-place', this.state.value)
              this.setState({ showAddModal: true });
            } else {
              this.props.onPlaceSelected(data.suggestion);
            }
          }}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}
