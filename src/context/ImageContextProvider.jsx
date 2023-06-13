import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

export const ImageContext = createContext();

function ImageContextProvider({ imagesBgCarousel, children }) {
  const contextValue = useMemo(() => ({ imagesBgCarousel }), [imagesBgCarousel]);
  return <ImageContext.Provider value={contextValue}>{children}</ImageContext.Provider>;
}

ImageContextProvider.propTypes = {
  imagesBgCarousel: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  children: PropTypes.node.isRequired,
};

export default ImageContextProvider;
