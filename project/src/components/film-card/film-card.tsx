import { MOVIE_REF, PREVIEW_TIMEOUT } from '../../const';
import { useEffect, useState } from 'react';

import Film from '../../types/film';
import { Link } from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';

type FilmCardProps = {
  film: Film,
  onFilmCardHover: (film: Film) => void;
};

function FilmCard(props: FilmCardProps): JSX.Element {
  const {film, onFilmCardHover} = props;
  const [isCursorHold, setCursorHold] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  function handleMouseOver() {
    setCursorHold(true);
    onFilmCardHover(film);
  }

  function handleMouseOut() {
    setCursorHold(false);
    setShowPreview(false);
  }

  useEffect(() => {
    if (!isCursorHold) {
      return;
    }

    const timer = setTimeout(() => {
      setShowPreview(true);
    }, PREVIEW_TIMEOUT);

    return () => clearTimeout(timer);
  }, [handleMouseOver, handleMouseOut]);

  return (
    <article className="small-film-card catalog__films-card" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <div className="small-film-card__image">
        {showPreview ? (
          <VideoPlayer posterSrc={`img/${film.posterSrc}`} src={MOVIE_REF} startPlaying={showPreview}/>
        ) : (
          <img src={`img/${film.posterSrc}`} alt={film.title} width="280" height="175"/>
        )}
      </div>
      <h3 className="small-film-card__title">
        <Link
          className="small-film-card__link"
          to={`films/${film.id}`}
          state={{ film: film }}
        >{film.title}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
