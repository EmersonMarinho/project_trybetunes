import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    checkboxLoading: false,
  };

  handleCheckboxClick = async ({ target }) => {
    const { music } = this.props;
    const isChecked = target.checked;

    this.setState({ checkboxLoading: true });

    if (isChecked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }

    this.setState({ checkboxLoading: false });
  };

  render() {
    const { music } = this.props;
    const { checkboxLoading } = this.state;

    return (
      <div>
        <p>{music.trackName}</p>
        <input
          type="checkbox"
          data-testid={ `checkbox-music-${music.trackId}` }
          onClick={ this.handleCheckboxClick }
        />
        {checkboxLoading && <span>Carregando...</span>}
        <audio controls data-testid="audio-component">
          <source src={ music.previewUrl } type="audio/mp3" />
          <track kind="captions" srcLang="en" label="English captions" />
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape.isRequired,
};

export default MusicCard;
