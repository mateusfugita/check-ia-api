const filterImages = (images) => {
    const filteredImages = images.map(image => {
        return {
          'image': image.urls.regular,
          'alt': image.alt_description,
        }
    });
    return filteredImages;
}

module.exports = filterImages;