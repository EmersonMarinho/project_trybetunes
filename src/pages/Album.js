import React, { Component } from 'react';
import PropTypes from 'prop-types';
import musicsAPI from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import LoadMessage from '../components/LoadMessage';

class Album extends Component {
  state = {
    musics: [],
    albumName: '',
    artistName: '',
    loading: true,
    favoriteSongs: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const musics = await musicsAPI(id);
    const favoriteSongs = await getFavoriteSongs();

    this.setState((prevState) => ({
      musics: [...prevState.musics, ...musics.slice(1)],
      albumName: musics[0].collectionName,
      artistName: musics[0].artistName,
      loading: false,
      favoriteSongs,
    }));
  }

  updateFavoriteSongs = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs });
  };

  renderMusicList = (musics, favoriteSongs) => musics.map((music, index) => (
    <li key={ `${music.trackId}-${index}` }>
      <MusicCard
        music={ music }
        favoriteSongs={ favoriteSongs }
        onUpdateFavoriteSongs={ this.updateFavoriteSongs }
      />
    </li>
  ));

  render() {
    const { musics, albumName, artistName, loading, favoriteSongs } = this.state;

    if (loading) {
      return <LoadMessage />;
    }

    return (
      <div data-testid="page-album">
        <h2 data-testid="artist-name">{artistName}</h2>
        <h3 data-testid="album-name">{albumName}</h3>
        <ul>{this.renderMusicList(musics, favoriteSongs)}</ul>
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
