export default {
  down(size) {
    const mySizes = {
      extraSmall: "575.98px",
      small: "767.98px",
      medium: "991.98px",
      large: "1199.98px",
      extraLarge: '1600px'
    };
    return `@media (max-width: ${mySizes[size]})`;
  }
};
