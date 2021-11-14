import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ cardImage, alt, largeImage, onItemClick }) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        className={styles.image}
        src={cardImage}
        alt={alt}
        data-source={largeImage}
        onClick={(e) => onItemClick(e.target.dataset.source)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  cardImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,

  alt: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
