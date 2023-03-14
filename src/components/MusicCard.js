import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import LoadMessage from './LoadMessage';

class MusicCard extends Component {
  state = {
    checkboxLoading: false,
  };

  handleCheckboxChange = async ({ target }) => {
    const { music, onUpdateFavoriteSongs } = this.props;
    const isChecked = target.checked;

    this.setState({ checkboxLoading: true });

    if (isChecked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }

    await onUpdateFavoriteSongs();
    this.setState({ checkboxLoading: false });
  };

  render() {
    const { music, favoriteSongs } = this.props;
    const { checkboxLoading } = this.state;
    const isFavorite = favoriteSongs.some((song) => song.trackId === music.trackId);

    return (
      <div>
        <p>{music.trackName}</p>
        <input
          type="checkbox"
          data-testid={ `checkbox-music-${music.trackId}` }
          onChange={ this.handleCheckboxChange }
          checked={ isFavorite }
        />
        {checkboxLoading && <span><LoadMessage /></span>}
        <audio controls data-testid="audio-component">
          <source src={ music.previewUrl } type="audio/mp3" />
          <track kind="captions" srcLang="en" label="English captions" />
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
  favoriteSongs: PropTypes.arrayOf(
    PropTypes.shape({
      trackId: PropTypes.number.isRequired,
      trackName: PropTypes.string.isRequired,
      previewUrl: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onUpdateFavoriteSongs: PropTypes.func.isRequired,
};
export default MusicCard;
