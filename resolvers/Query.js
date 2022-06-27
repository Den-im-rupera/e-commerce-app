exports.Query = {
  hello: () => {
    return [null, "Harsh", "Rupera"];
  },
  products: (parent, { filter }, { db }) => {
    if (!filter) return db.products;
    let filtered = [];

    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale && onSale === true) {
        filtered = db.products.filter((product) => {
          return product.onSale;
        });
      } else if (onSale === false) {
        filtered = db.products.filter((product) => {
          return !product.onSale;
        });
      }

      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filtered = db.products.filter((product) => {
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
  product: (parent, { id }, { db }) => {
    return db.products.find((product) => product.id === id);
  },
  categories: (parent, args, { db }) => db.categories,
  category: (parent, { id }, { db }) => {
    return db.categories.find((cat) => cat.id === id);
  },
};
