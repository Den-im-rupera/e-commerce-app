exports.Product = {
  category: ({ categoryId }, args, { db }) => {
    return db.categories.find((cat) => cat.id === categoryId);
  },
  reviews: ({ id }, args, { db }) => {
    return db.reviews.filter((review) => review.productId === id);
  },
};
