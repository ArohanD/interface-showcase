import styles from "./SampleItemInfo.module.scss";

const SampleItemInfo: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className="item_info">
        <h1 className={styles.item_title}>Kettle</h1>
        <h3 className={styles.item_brand}>Boil & Decker</h3>
      </div>
      <div className={styles.item_price_and_shipping}>
        <h2 className={styles.item_price}>$89</h2>
        <span className={styles.item_small_text}>Ships in 2 - 3 weeks</span>
      </div>
      <p className="item_description">
        - Intelligent pre-sets for tea, coffee & water <br />
        - Heat-insulating outer layer <br />
        - Directed spout <br />
      </p>
      <div className="item_colors"></div>
      <button className={styles.item_purchase_button}>Add to Cart</button>
    </div>
  );
};

export default SampleItemInfo;
