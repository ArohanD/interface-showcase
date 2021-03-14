import styles from "./styles/StoreItemGalleryLayout.module.scss";
import SampleItemInfo from "./components/sampleItemInfo/sampleItemInfo";
import Gallery from "./components/gallery/gallery";
import MobileNav from "./components/mobileNav/mobileNav";
import Header from "./components/header/header";

const StoreItemGalleryLayout: React.FC = () => {
  return (
    <div className={styles.page_container}>
      <div className={styles.page_header}>
        <Header />
      </div>
      <div className={styles.item_gallery}>
        <Gallery  />
      </div>
      <div className={styles.item_info_container}>
        <SampleItemInfo />
      </div>
      <div className={styles.page_mobile_nav}>
        <MobileNav />
      </div>
    </div>
  );
};

const galleryImages = [
  "/images/kettles/andrew-donovan-valdivia-6Pd4M4L25DU-unsplash.jpg",
  "/images/kettles/jacob-campbell-5IcRb8PlhOc-unsplash.jpg",
  "/images/kettles/john-forson-WWzDPKot6nQ-unsplash.jpg",
  "/images/kettles/kevin-canlas-OSzl8fLLLuE-unsplash.jpg",
  "/images/kettles/tyler-nix-w4wqXGQU-J8-unsplash.jpg",
];

export default StoreItemGalleryLayout;
