import React, { useState } from 'react';
import styles from './styles.module.css';

const InputFile = ({
    onImageUrlChange,
    label,
    icon,
    uploadLabel,
    disclaimer,
    name,
    logoBanner
}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = async (event) => {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
            const imageUrl = URL.createObjectURL(selectedImage);
            setImageUrl(imageUrl);
            setSelectedFile(selectedImage);
            // onImageUrlChange(selectedImage);
        }
    };

    return (
        <div className={styles.inputFile}>
            <p>{name}</p>
            <div className={styles.lblDiclaimr}>
                <p className={styles.labelP}>{label}</p>
            </div>
            <label className={styles.label}>
                {imageUrl ? (
                    <div
                        className={
                            logoBanner === 'banner'
                                ? styles.fullImage
                                : styles.image
                        }
                    >
                        <img src={imageUrl} alt="Selected Image" />
                        {loading && <p>Uploading...</p>}
                    </div>
                ) : (
                    <>
                        <input
                            accept="image/*" // Limit to image files
                            name={name}
                            type="file"
                            onChange={handleImageChange}
                        />
                        <div className={styles.icon}>{icon}</div>
                        <p>{uploadLabel}</p>
                    </>
                )}
            </label>

            <style jsx>{`
                .custom-file-input {
                    margin-bottom: 20px;
                }
                label {
                    display: block;
                    margin-bottom: 5px;
                }
                img {
                    max-width: 100%;
                    max-height: 200px; // Adjust the maximum image height as needed
                }
            `}</style>
            <div className={styles.disclaim}>{disclaimer}</div>
        </div>
    );
};

export default InputFile;
