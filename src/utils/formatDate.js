const formatDate = (date) => {
  return new Date(date).toLocaleDateString("de-DE");
};

export default formatDate;