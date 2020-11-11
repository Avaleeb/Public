import React from "react";
import { Row, Col } from "antd";
import AddLinkModal from "./AddLinkModal";
import CallToActionButton from "./CallToActionButton";
import './style/PlaceResultMain.scss'
export class PlaceResultMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false
    };
  }
  hideAddLinkModal = () => {
    this.setState({
      showAddModal: false
    });
  };
  render() {
    var place = this.props.place;
    if (!place) {
      return null;
    }
    return (
      <Row className="place-result">
        <Col
          xs={24}
          sm={24}
          md={8}
          lg={8}
          xl={8}
        > 
            <a className="details-image--container" href={`https://www.hitta.se/kartan/partner?mc=${place.location.lat},${place.location.lng}&mc=${place.location.lat},${place.location.lng}`} target="_blank" >
              <img src={`https://api.hitta.se/image/v2/0/12/${place.location.lat}:${place.location.lng}?width=350&heigth=300&markers={%22pn%22:[${place.location.lat},${place.location.lat}],%22pe%22:[${place.location.lng},${place.location.lng}],%22marker%22:1}`} />
            </a> 
        </Col>
        <Col
          xs={24}
          sm={24}
          md={16}
          lg={16}
          xl={16}
          style={{ padding: "8px 16px" }}
        >
          <Row align="center">
            <Col span={14} className="flex-vertical">
              <h2 className="place-title">{place.name}</h2>
            </Col>
            <Col span={10} className="flex-vertical">
              <div style={{ textAlign: "right" }} className="place-address">
                {place.formatted_address}
              </div>
            </Col>
          </Row>
          <Row style={{ minHeight: 80 }} align="bottom">
            <Col
              xs={24}
              sm={14}
              md={14}
              lg={14}
              xl={14}
              style={{ position: "relative", top: 12 }}
            >
              {place.giftCardURL && (
                <p>
                  {place.name} erbjuder köp av presentkort online. Överväg att köpa till ett värde av en månads spendering.
                </p>
              )}
              {!place.giftCardURL && place.emailContact && (
                <p>Vi har tyvärr ingen information om att {place.name} har presentkort. Klicka gärna på stötta för att skicka ett mail.</p>
              )}
              {!place.giftCardURL && !place.emailContact && (
                <p>
                  Har de en länk till köp av presentkort online?{" "}
                  <a
                    className="app-link"
                    onClick={() => this.setState({ showAddModal: true })}
                  >
                    Hjälp oss hitta den här.
                  </a>
                </p>
              )}
            </Col>
            <Col
              className="flex-vertical"
              xs={24}
              sm={10}
              md={10}
              lg={10}
              xl={10}
            >
              <div className="call-to-action-outer">
                <CallToActionButton place={place} size="large" />
              </div>
            </Col>
            <AddLinkModal
              shouldShow={this.state.showAddModal}
              place={place}
              onClose={() => {
                this.hideAddLinkModal();
              }}
            />
          </Row>
        </Col>
      </Row>
    );
  }
}
