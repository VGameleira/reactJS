import styles from './MinhaImage.module.css';
import heroImg from '../src/assets/hero.png';

function MinhaImage() {
  return (
    <img src={heroImg} className={styles.image} alt="Hero" />
  );
}

export default MinhaImage;