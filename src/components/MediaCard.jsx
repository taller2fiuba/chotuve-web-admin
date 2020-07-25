import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

import BeatLoader from "react-spinners/BeatLoader";

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
  icon: {
    flex: "1 0 auto",
    marginTop: "10%",
  },
  cover: {
    width: 120,
    height: 80,
  },
}));

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

const SubtitleTypography = withStyles({
  root: {
    color: "#000000",
    border: "solid",
    backgroundColor: "#faec91",
  },
})(Typography);

const MediaCard = ({ titulo, obtenerTotal, icono, colorFondo, colorIcono }) => {
  const classes = useStyles();
  const [subtitulo, setSubtitulo] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    obtenerSubtitulo();
  }, []);

  const obtenerSubtitulo = async () => {
    try {
      const total = await obtenerTotal();
      setSubtitulo(total);
    } catch (error) {
      setSubtitulo("-");
    }
  };

  return (
    <Card className={classes.root} style={{ backgroundColor: colorFondo }}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <WhiteTextTypography component="h6" variant="h6">
            {titulo}
          </WhiteTextTypography>
          <SubtitleTypography variant="subtitle1">
            {subtitulo == null ? (
              <BeatLoader size={10} margin={2} color={colorIcono} loading />
            ) : (
              subtitulo
            )}
          </SubtitleTypography>
        </CardContent>
      </div>
      <Icon
        className={classes.icon}
        style={{ color: colorIcono, fontSize: 50 }}
      >
        {icono}
      </Icon>
    </Card>
  );
};

MediaCard.propTypes = {
  titulo: PropTypes.string.isRequired,
  obtenerTotal: PropTypes.func.isRequired,
  icono: PropTypes.string.isRequired,
  colorFondo: PropTypes.string.isRequired,
  colorIcono: PropTypes.string.isRequired,
};

export default MediaCard;
