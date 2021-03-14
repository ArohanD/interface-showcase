import styles from "./gallery.module.scss";
import { createRef, useEffect, useState } from "react";

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

  const [colRefs, setColRefs] = useState([]);
  useEffect(() => {
      let refArray = (new Array(numCols).fill('x').map(() => createRef()))
      setColRefs(refArray)
      return () => {
          
      }
  }, [])



  let pushArrayIndex = 0;
  elementArray.forEach((element) => {
    cols[pushArrayIndex].push(element);
    pushArrayIndex++;
    if (pushArrayIndex === numCols) pushArrayIndex = 0;
  });

  if(colRefs) {
      colRefs.forEach(columnRef => {
          if(columnRef.current) console.log(columnRef.current.clientHeight)
      })
  }

  return (
    <div className={styles.container}>
      {cols.map((column, index) => (
        <div className={styles.image_column} key={index} id={`gallery-column-${index}`} ref={colRefs[index]}>
            {column}
        </div>
      ))}
    </div>
  );
};

export default Gallery;
