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
          key={srcObject.src}
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

    // const elementArrayCopy = [...elementArray];
    // let newCols = new Array(Math.floor(elementArrayCopy.length / numCols))
    //   .fill("x")
    //   .map(() => elementArrayCopy.splice(0, numCols + 1));
    setCols(newCols);
  }, []);

  const refArray = new Array(numCols)
    .fill("x")
    .map(() => createRef<HTMLDivElement>());

  const colContainerRef = createRef<HTMLDivElement>();

  useEffect(() => {
      // NEED TO ADD A REBALANCE DELAY
    setTimeout(() => {
      if (!imagesRebalanced && refArray[0].current) {
          setCols(rebalanceImages());
          setImagesRebalanced(true)
      }
    }, 100);
  }, [cols]);

  const rebalanceImages = () => {
    const childHTMLArrays = refArray.map((ref) => ref.current.children);
    const childNodeArrays = refArray.map((ref) => ref.current.childNodes);

    const numItemsArray = childHTMLArrays.map((htmlCol) => htmlCol.length);

    const maxIndex = Math.max(...numItemsArray);

    const nodeCollectionWithHeight = [];
    for (let rowIndex = 0; rowIndex < maxIndex; rowIndex++) {
      for (let colIndex = 0; colIndex < numCols; colIndex++) {
        if (childHTMLArrays[colIndex][rowIndex]) {
          nodeCollectionWithHeight.push({
            node: childNodeArrays[colIndex][rowIndex],
            height: childHTMLArrays[colIndex][rowIndex].scrollHeight,
          });
        }
      }
    }

    let newColsWithHeight = [];
    for (let i = 0; i < numCols; i++)
      newColsWithHeight.push({
        heightTotal: 0,
        nodes: [],
      });

    nodeCollectionWithHeight.forEach((node) => {
      const pushIndex = getIndexWithLowestHeight(newColsWithHeight);
      newColsWithHeight[pushIndex].heightTotal += node.height;
      newColsWithHeight[pushIndex].nodes.push(node.node);
    });

    return newColsWithHeight.map((col) => col.nodes).map(col => col.map(node => (
        <img src={node.src} alt={node.alt} className={node.class} key={node.src}/>
    )));
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

// TYPE THIS
const getIndexWithLowestHeight = (newColsWithHeight) => {
  let minIndex = 0;
  newColsWithHeight.forEach((col, index) => {
    if (col.heightTotal < newColsWithHeight[minIndex].heightTotal) {
      minIndex = index;
    }
  });
  return minIndex;
};

export default Gallery;
