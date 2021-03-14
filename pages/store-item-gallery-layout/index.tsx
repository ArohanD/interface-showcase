import SampleItemInfo from './components/sampleItemInfo'
import styles from './styles/StoreItemGalleryLayout.module.scss'

const StoreItemGalleryLayout: React.FC = () => {
    return (
        <div className={styles.item_info_container}>
            <SampleItemInfo />
        </div>
    )
}

export default StoreItemGalleryLayout