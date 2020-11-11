import React from 'react';
import { Button } from 'antd';
import { FacebookProvider, Share } from 'react-facebook';

export default class ShareOptions extends React.Component {
  shareToFB() {}

  render() {
    return (
      <div>
        <FacebookProvider appId="904429346685098">
          <Share href="https://favoriten.nu">
            {({ handleClick, loading }) => (
              <Button
                onClick={handleClick}
                className="primary-button"
              >
                Facebook
              </Button>
            )}
          </Share>
        </FacebookProvider>

        <Button
          className="primary-button"
          onClick={() => {
            window.open(
              'https://twitter.com/intent/tweet?url=https://favoriten.nu&text=Svenska%20sm%C3%A5f%C3%B6retag%20beh%C3%B6ver%20oss%20nu%20mer%20%C3%A4n%20n%C3%A5gonsin%20-%20presentkort%20kan%20g%C3%B6ra%20en%20stor%20skillnad.%20Jag%20st%C3%B6djer%20mina%20favoritrestauranger%20genom%20https%3A%2F%2Ffavoriten.nu%20%23st%C3%B6ttafavoritennu',
            );
          }}
        >
          Twitter
        </Button>
      </div>
    );
  }
}
