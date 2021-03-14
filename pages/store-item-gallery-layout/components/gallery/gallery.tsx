import styles from './gallery.module.scss'
import React from 'react'

type GalleryProps = (
    {
        srcArray?: string[];
        componentArray?: never;
    } | {
        componentArray: React.ReactNode[];
        srcArray?: never;
    }
)

const Gallery:React.FC<GalleryProps> = ({componentArray, srcArray}) => {

    console.log(props)

    return (
        <div>Gallery
        </div>
    )
}

export default Gallery;