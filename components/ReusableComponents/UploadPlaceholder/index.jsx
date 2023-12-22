import React from 'react'
import { UploadPlaceholderBox } from './UploadStyle'
import IconAddUpload from '../IconComponents/IconAddUpload'


export const UploadPlaceholder = ( { handleUpload } ) => {
  return (
    <UploadPlaceholderBox>
      <p>Upload your store logo</p>
      <div className='stroke-box'>
        <div style={ { cursor: 'pointer', display: 'flex', flexDirection: "column", alignItems: "center" } }>
          <IconAddUpload />
          <input type='file' onChange={ handleUpload } />
          <a>Click to add a logo</a>
        </div>
      </div>
      <p className='caution'>Only images are allowed, max of 1mb.</p>
    </UploadPlaceholderBox>

  )
}
