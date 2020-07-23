import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
}));

const MediaCard = ({ titulo, obtenerTotal, imagen, colorFondo }) => {
  const classes = useStyles();
  const [subtitulo, setSubtitulo] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    obtenerSubtitulo();
  }, []);

  const obtenerSubtitulo = () => {
    try {
      const total = obtenerTotal();
      setSubtitulo(total);
    } catch (error) {
      setSubtitulo("-");
    }
  };

  return (
    <Card className={classes.root} style={{ backgroundColor: colorFondo }}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {titulo}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {subtitulo}
          </Typography>
        </CardContent>
      </div>
      <CardMedia className={classes.cover} image={imagen} />
    </Card>
  );
};

MediaCard.propTypes = {
  titulo: PropTypes.string.isRequired,
  obtenerTotal: PropTypes.func.isRequired,
  imagen: PropTypes.node.isRequired,
  colorFondo: PropTypes.string.isRequired,
};

export default MediaCard;
