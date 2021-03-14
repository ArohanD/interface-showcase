import styles from "./gallery.module.scss";
import {
  createRef,
  useEffect,
  useState,
} from "react";

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
    const scrollContainer = createRef<HTMLDivElement>()
    const [scrollPos, setScrollPos] = useState(0)
    //   Fix
    useEffect(() => {
      getShortestColumn();
    
      return () => {};
    }, []);
    
    const handleScroll = () => {
        const currentPos = scrollContainer.current.scrollTop;
        (currentPos > scrollPos) ? onScrollDown() : onScrollUp();
        setScrollPos(currentPos)
    }


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

  let cols = [];
  for (let i = 0; i < numCols; i++) cols.push([]);

  let pushArrayIndex = 0;
  elementArray.forEach((element) => {
    cols[pushArrayIndex].push(element);
    pushArrayIndex++;
    if (pushArrayIndex === numCols) pushArrayIndex = 0;
  });


  return (
    <div className={styles.container} 
    onScroll={() => handleScroll()}
    ref={scrollContainer}
    >
      {cols.map((column, index) => (
        <div
          className={styles.image_column}
          key={index}
          id={`gallery-column-${index}`}
          data-height={""}
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
  const heights = columnElements.map((element) => element.clientHeight);
  console.log(heights);
};

export default Gallery;
