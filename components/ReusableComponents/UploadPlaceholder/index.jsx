import React from 'react'
import { UploadPlaceholderBox } from './UploadStyle'
import IconAddUpload from '../IconComponents/IconAddUpload'


export const UploadPlaceholder = ( { handleUpload, title = "Upload your store logo", type = "logo", name } ) => {
  return (
    <UploadPlaceholderBox>
      <p>{ title}</p>
      <div className='stroke-box'>
        <div style={ { cursor: 'pointer', display: 'flex', flexDirection: "column", alignItems: "center" } }>
          <IconAddUpload />
          <input type='file' name={ name } onChange={ handleUpload } />
          <a>Click to add a { type }</a>
        </div>
      </div>
      <p className='caution'>Only images are allowed, max of 1mb.</p>
    </UploadPlaceholderBox>

  )
}
