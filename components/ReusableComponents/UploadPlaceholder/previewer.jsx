import React from 'react';
import { UploadPlaceholderBox } from './UploadStyle';
import { UploadContainer, IconPencilContainer } from '../../Invoices/InvoicesStyle';
import IconPencil from '../IconComponents/IconPencil';
const Previewer = ( { imageURL, onClick } ) => {
  return (
    <UploadPlaceholderBox>
      <p>Upload your store logo</p>
      <UploadContainer>
        <img src={ imageURL } />
        <IconPencilContainer onClick={ onClick } >
          <IconPencil />
        </IconPencilContainer>
      </UploadContainer>
      <p className="caution">Only images are allowed, max of 1mb.</p>
    </UploadPlaceholderBox>
  );
};

export default Previewer;
