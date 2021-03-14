import styles from "./gallery.module.scss";
import { useEffect } from "react";

type srcObj = {
  src: string;
  alt?: string;
  class?: string;
};

type GalleryProps = {
  iterateVertically?: boolean;
} & (
  | {
      srcArray: srcObj[];
      componentArray?: never;
    }
  | {
      componentArray: React.ReactNode[];
      srcArray?: never;
    }
);

const Gallery: React.FC<GalleryProps> = ({
  componentArray,
  srcArray,
  iterateVertically,
}) => {
  const elementArray = componentArray
    ? componentArray
    : srcArray.map((srcObject) => (
        <img
          src={srcObject.src}
          alt={srcObject.alt}
          className={srcObject.class}
        />
      ));

  console.log(iterateVertically);

  const numCols = 2;

  let cols = [];
  for (let i = 0; i < numCols; i++) cols.push([]);




  let pushArrayIndex = 0;
  elementArray.forEach((element) => {
      console.log(element)
    cols[pushArrayIndex].push(element);
    pushArrayIndex++;
    if (pushArrayIndex === numCols) pushArrayIndex = 0;
  });

  return (
    <div className={styles.container}>
      {cols.map((column, index) => (
        <div className={styles.image_column} key={index}>
            {column}
        </div>
      ))}
    </div>
  );
};

export default Gallery;
