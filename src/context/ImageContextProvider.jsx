// Imports the necessary hooks and libraries from React and PropTypes.
import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

// Create a context with React.
// The context allows values to be shared between components without having to explicitly pass a prop at each level.
// Here we've created an image context, which will be used to share carousel images between several components.
export const ImageContext = createContext();

// We define a context provider component
// This component uses useMemo to optimize performance. useMemo will store the context value and only recalculate it when 'imagesBgCarousel' changes.
// This stored value is then provided to all child components via the context.
function ImageContextProvider({ imagesBgCarousel, children }) {
  const contextValue = useMemo(() => ({ imagesBgCarousel }), [imagesBgCarousel]);
  return <ImageContext.Provider value={contextValue}>{children}</ImageContext.Provider>;
}

// PropTypes is used for type checking.
// PropTypes validates that the props passed to the component are of the correct type.
// 'imagesBgCarousel' must be an array of objects, and 'children' must be a React element, and both are mandatory.
ImageContextProvider.propTypes = {
  imagesBgCarousel: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  children: PropTypes.node.isRequired,
};

export default ImageContextProvider;
