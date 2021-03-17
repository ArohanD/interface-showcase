import styles from "./styles/StoreItemGalleryLayout.module.scss";
import SampleItemInfo from "./components/sampleItemInfo/sampleItemInfo";
import Gallery from "./components/gallery/gallery";
import MobileNav from "./components/mobileNav/mobileNav";
import Header from "./components/header/header";
import Image from "next/image";
import { useState } from "react";

const StoreItemGalleryLayout: React.FC = () => {
  const [userIsScrollingDown, setUserIsScrollingDown] = useState(false);

  return (
    <div
      className={`${styles.page_container} ${
        userIsScrollingDown && styles.page_container_contracted
      }`}
    >
      <div className={styles.page_header}>
        <Header />
      </div>
      <div className={styles.item_gallery}>
        <Gallery
          // componentArray={nextImages()}
          srcArray={galleryImages}
          onScrollDown={() => {
            if (!userIsScrollingDown) setUserIsScrollingDown(true);
          }}
          onScrollUp={() => {
            if (userIsScrollingDown) setUserIsScrollingDown(false);
          }}
        />
      </div>
      <div className={styles.item_info_container}>
        <SampleItemInfo compress={userIsScrollingDown} />
      </div>
      <div className={styles.page_mobile_nav}>
        <MobileNav />
      </div>
    </div>
  );
};

const galleryImages = [
  {
    src: "/images/kettles/andrew-donovan-valdivia-6Pd4M4L25DU-unsplash.jpg",
    alt: "kettle image",
    class: "test_class",
  },
  {
    src: "/images/kettles/jacob-campbell-5IcRb8PlhOc-unsplash.jpg",
    alt: "kettle image",
    class: "test_class",
  },
  {
    src: "/images/kettles/john-forson-WWzDPKot6nQ-unsplash.jpg",
    alt: "kettle image",
    class: "test_class",
  },
  {
    src: "/images/kettles/kevin-canlas-OSzl8fLLLuE-unsplash.jpg",
    alt: "kettle image",
    class: "test_class",
  },
  {
    src: "/images/kettles/tyler-nix-w4wqXGQU-J8-unsplash.jpg",
    alt: "kettle image",
    class: "test_class",
  },
];

const nextImages = () => {
  return galleryImages.map((imageData) => (
    <Image
      src={imageData.src}
      alt={imageData.alt}
      className={imageData.class}
      layout="fill"
      // width={500}
      // height={800}
      objectFit="scale-down"
      // unoptimized
    />
  ));
};

export default StoreItemGalleryLayout;
