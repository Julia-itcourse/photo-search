import PropTypes from "prop-types";
import styles from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleyItem";

const ImageGallery = ({ hits, onItemClick }) => {
  return (
    <ul className={styles.ImageGallery}>
      {hits.map((hit) => (
        <ImageGalleryItem
          key={hit.id}
          cardImage={hit.webformatURL}
          alt={hit.tags}
          largeImage={hit.largeImageURL}
          onItemClick={onItemClick}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  hits: PropTypes.array.isRequired,
};

export default ImageGallery;
