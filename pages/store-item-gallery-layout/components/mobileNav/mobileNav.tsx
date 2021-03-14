import styles from './mobileNav.module.scss'
import { BiHomeAlt, BiShoppingBag, BiBookOpen } from "react-icons/bi";

const MobileNav: React.FC = () => {
  return <div className={styles.container}>
    <BiHomeAlt size={"2em"} />
    <BiBookOpen size={"2em"} />
    <BiShoppingBag size={"2em"} />
  </div>;
};

export default MobileNav;
