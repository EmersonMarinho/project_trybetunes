import React, { Component } from 'react';
import PropTypes from 'prop-types';
import musicsAPI from '../services/musicsAPI';

class Album extends Component {
  state = {
    musics: [],
    albumName: '',
    artistName: '',
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const musics = await musicsAPI(id);

    this.setState((prevState) => ({
      musics: [...prevState.musics, ...musics.slice(1)],
      albumName: musics[0].collectionName,
      artistName: musics[0].artistName,
    }));
  }

  renderMusicList = (musics) => musics.map((music, index) => (
    <li key={ `${music.trackId}-${index}` }>
      <p>{music.trackName}</p>
      <audio controls data-testid="audio-component">
        <source src={ music.previewUrl } type="audio/mp3" />
        <track kind="captions" srcLang="en" label="English captions" />
      </audio>
    </li>
  ));

  render() {
    const { musics, albumName, artistName } = this.state;

    return (
      <div>
        <h2 data-testid="artist-name">{artistName}</h2>
        <h3 data-testid="album-name">{albumName}</h3>
        <ul>{this.renderMusicList(musics)}</ul>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
