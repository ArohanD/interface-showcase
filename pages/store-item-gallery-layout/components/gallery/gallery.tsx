import styles from "./gallery.module.scss";
import { createRef, RefObject, useEffect, useState } from "react";

type srcObj = {
  src: string;
  alt?: string;
  class?: string;
};

type orTest = (
  {
    columns: number;
    breakPoint: never;
  } | {
    columns: never;
    breakPoint: number;
  }
)

type GalleryProps = {
  onScrollDown?: Function;
  onScrollUp?: Function;
} & ({
      srcArray: srcObj[];
      componentArray?: never;
    } | {
      componentArray: React.ReactNode[];
      srcArray?: never;
    }) & ({
        columns: number;
        breakPoint?: never;
      } | {
        columns?: never;
        breakPoint: number;
      })

const Gallery: React.FC<GalleryProps> = ({
  componentArray,
  srcArray,
  onScrollDown,
  onScrollUp,
  breakPoint,
  columns
}) => {
  // STATE & LIFECYCLE
  const scrollContainer = createRef<HTMLDivElement>();
  const [scrollPos, setScrollPos] = useState(0);
  const [cols, setCols] = useState([]);
  const [imagesRebalanced, setImagesRebalanced] = useState(!!componentArray);
  const [allowScrollAdjustment, setAllowScrollAdjustment] = useState(true);
  const [numCols, setNumCols] = useState(columns || 2);

  const handleScroll = () => {
    const currentPos = scrollContainer.current.scrollTop;
    console.log(currentPos, scrollContainer.current.scrollHeight)
    if (allowScrollAdjustment)
      currentPos > scrollPos ? onScrollDown() : onScrollUp();
    setAllowScrollAdjustment(false);
    setTimeout(() => {
      setAllowScrollAdjustment(true);
    }, 900);
    setScrollPos(currentPos);
  };

  // IMAGE LOADING
  const elementArray = componentArray
    ? Array.from(componentArray)
    : srcArray.map((srcObject) => (
      <img
        src={srcObject.src}
        alt={srcObject.alt}
        className={srcObject.class}
        key={srcObject.src}
      />
    ));

  useEffect(() => {
    if(breakPoint){
      const newNumCols = Math.floor(window.innerWidth / breakPoint);
      setNumCols(newNumCols);
      window.addEventListener("resize", () => resizeCols(breakPoint, setNumCols));
  
      return () => {
        window.removeEventListener("resize", () =>
          resizeCols(numCols, setNumCols)
        );
      };
    }
  }, []);

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

    return () => { };
  }, [numCols]);

  const refArray = new Array(numCols)
    .fill("x")
    .map(() => createRef<HTMLDivElement>());

  useEffect(() => {
    // NEED TO ADD A REBALANCE DELAY
    setTimeout(() => {
      if (!imagesRebalanced && refArray[0].current) {
        setCols(rebalanceImages(refArray, numCols));
        setImagesRebalanced(true);
      }
    }, 500);
  }, [cols]);

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
type heightTrackedColumn = {
  heightTotal: number;
  nodes: Element[];
};
const getIndexWithLowestHeight = (newColsWithHeight: heightTrackedColumn[]) => {
  let minIndex = 0;
  newColsWithHeight.forEach((col, index) => {
    if (col.heightTotal < newColsWithHeight[minIndex].heightTotal) {
      minIndex = index;
    }
  });
  return minIndex;
};

const resizeCols = (breakPoint: number, setter: Function) => {
  if(window.innerWidth < breakPoint) return 1
  setter(Math.floor(window.innerWidth / breakPoint));
};

const rebalanceImages = (
  refArray: RefObject<HTMLDivElement>[],
  numCols: number
) => {
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

  return newColsWithHeight
    .map((col) => col.nodes)
    .map((col) =>
      col.map((node) => (
        <img
          src={node.src}
          alt={node.alt}
          className={node.class}
          key={node.src}
        />
      ))
    );
};

export default Gallery;
