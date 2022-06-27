exports.Category = {
  products: ({ id }, { filter }, { db }) => {
    const categoryProducts = db.products.filter(
      (product) => product.categoryId === id
    );
    if (!filter) {
      return categoryProducts;
    }
    // const filteredProducts = categoryProducts;
    // return filteredProducts.filter((product) => {
    //   return product.onSale === filter.onSale;
    // });

    let filtered = [];
    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale && onSale === true) {
        filtered = categoryProducts.filter((product) => {
          return product.onSale;
        });
      } else if (onSale === false) {
        filtered = categoryProducts.filter((product) => {
          return !product.onSale;
        });
      }

      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filtered = categoryProducts.filter((product) => {
          let sumRating = 0;
          let numOfReviews = 0;
          db.reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numOfReviews++;
            }
          });
          const avgProductRating = sumRating / numOfReviews;

          return avgProductRating >= avgRating;
        });
      }
    }
    return filtered;
  },
};
