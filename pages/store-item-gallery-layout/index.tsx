import styles from "./styles/StoreItemGalleryLayout.module.scss";
import SampleItemInfo from "./components/sampleItemInfo/sampleItemInfo";
import Gallery from "./components/gallery";
import MobileNav from './components/mobileNav/mobileNav'
import Header from "./components/header/header";

const StoreItemGalleryLayout: React.FC = () => {
  return (
    <div className={styles.page_container}>
      <div className={styles.page_header}>
          <Header />
      </div>
      <div className={styles.item_gallery}>
        <Gallery />
      </div>
      <div className={styles.item_info_container}>
        <SampleItemInfo />
      </div>
      <div className={styles.page_mobile_nav}>
          <MobileNav styles={styles} />
      </div>
    </div>
  );
};

export default StoreItemGalleryLayout;
