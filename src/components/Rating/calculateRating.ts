export const calculateRating = (ratingArray: Array<number>) => ratingArray.reduce((prev, curr, idx, arr) =>  curr + ((idx + 1) * prev), 0)


