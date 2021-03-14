import styles from "./gallery.module.scss";
import { createRef, ReactNode, useEffect, useState } from "react";

type srcObj = {
  src: string;
  alt?: string;
  class?: string;
};

type GalleryProps = {
  onScrollDown?: Function;
  onScrollUp?: Function;
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
  onScrollDown,
  onScrollUp,
}) => {
  // STATE & LIFECYCLE
  const scrollContainer = createRef<HTMLDivElement>();
  const [scrollPos, setScrollPos] = useState(0);
  const [cols, setCols] = useState([]);
  const [imagesRebalanced, setImagesRebalanced] = useState(false);

  const handleScroll = () => {
    const currentPos = scrollContainer.current.scrollTop;
    currentPos > scrollPos ? onScrollDown() : onScrollUp();
    setScrollPos(currentPos);
  };

  // IMAGE LOADING
  const elementArray = componentArray
    ? componentArray
    : srcArray.map((srcObject) => (
        <img
          src={srcObject.src}
          alt={srcObject.alt}
          className={srcObject.class}
        />
      ));

  const numCols = 2;

  useEffect(() => {
    let newCols = [];
    for (let i = 0; i < numCols; i++) newCols.push([]);

    let pushArrayIndex = 0;
    elementArray.forEach((element) => {
      newCols[pushArrayIndex].push(element);
      pushArrayIndex++;
      if (pushArrayIndex === numCols) pushArrayIndex = 0;
    });
    setCols(newCols);
  }, []);

  const refArray = new Array(numCols)
    .fill("x")
    .map(() => createRef<HTMLDivElement>());

  useEffect(() => {
    if(!imagesRebalanced) rebalanceImages();
  }, [cols]);

  const rebalanceImages = () => {
    console.log(refArray);
    refArray.forEach((ref) => console.log(ref.current));
  };

  return (
    <div
      className={styles.container}
      onScroll={() => handleScroll()}
      ref={scrollContainer}
    >
      {cols.map((column, index) => (
        <div
          className={styles.image_column}
          key={index}
          id={`gallery-column-${index}`}
          ref={refArray[index]}
        >
          {column}
        </div>
      ))}
    </div>
  );
};

const getShortestColumn = () => {
  let columnElements = Array.from(
    document.getElementsByClassName(`${styles.image_column}`)
  );
  const heights = columnElements.map((element) => {
    if (element.children.length === 0) return 0;
    let totalHeight = 0;
    for (element of element.children) totalHeight += element.scrollHeight;

    return totalHeight;
  });

  let minIndex = 0;
  heights.forEach((colHeight, index) => {
    if (heights[minIndex] > colHeight) minIndex = index;
  });
  console.log(heights, minIndex);
  return minIndex;
};

export default Gallery;
