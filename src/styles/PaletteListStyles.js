import mySizes from './MediaQueries';
import myBg from './Confetti-Doodles.svg';

export default {
  '@global':{
    '.fade-exit':{
      opacity:1
    },
    '.fade-exit-active':{
      opacity:0,
      transition: 'opacity 500ms ease-out'
    }
  },
  root: {
    height: "70rem",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: '#f5c367',
    backgroundImage: `url(${myBg})`,
    overflow: 'scroll'
  },
  heading:{
    fontSize: '2rem'
  },
  container: {
    width: "60%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
        [mySizes.down('extraLarge')]: {
      width: '80%',
    justifyContent: "center"
    }
  },
  nav: {
    display: "flex",
    width: "80%",
    justifyContent: "flex-start",
    color: "white",
    alignItems: 'center',
    '& a': {
      color: 'grey',
      marginLeft: '22px',
      fontSizeAdjust: 'inherit'
    }
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3,30%)",
    gridGap: "2.5rem",
    [mySizes.down('medium')]: {
      gridTemplateColumns: "repeat(2,50%)",
    },
    [mySizes.down('extraSmall')]: {
      gridTemplateColumns: "repeat(1,100%)",
      gridGap: "1rem"
    }
  }
};

/* background by SVGBackgrounds.com */