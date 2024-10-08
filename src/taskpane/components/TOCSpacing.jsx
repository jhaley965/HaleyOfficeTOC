import React, { useEffect } from 'react';
import { Button, Slider, tokens, makeStyles } from "@fluentui/react-components";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  instructions: {
    fontWeight: tokens.fontWeightSemibold,
    marginTop: "20px",
    marginBottom: "10px",
  },
  textPromptAndInsertion: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textAreaField: {
    marginLeft: "20px",
    marginTop: "30px",
    marginBottom: "20px",
    marginRight: "20px",
    maxWidth: "50%",
  },
  sliderContainer: {
    marginTop: "20px",
    width: "50%",
  },
  
});

const TOCSpacing = (props) => {

  const [spacing, setSpacing] = React.useState(20); // State to track slider value
  const [spacingChangeCommited, setSpacingChangeCommitted] = React.useState(false);

  useEffect(() => {
    console.log ("useEffect: " + spacing) ;
    if (spacingChangeCommited) {
      props.changeTocSpacingAfter(spacing)
    };
  }, [spacingChangeCommited]);

  const handleTocSpacingChange = async () => {
    await props.changeTocSpacingAfter(20);
  };

  const handleSliderChange = async (event) => {
    setSpacingChangeCommitted(false);
    const newVal = event.target.value;
    setSpacing(newVal);
  };

  const handleSliderCommitted = async (event) => {
    setSpacingChangeCommitted(true);
  };

  const styles = useStyles();

  return (
    <div className={styles.textPromptAndInsertion}>
      <div className={styles.sliderContainer}>
        <Slider
          min={0}
          max={50}
          step={1}
          value={spacing}
          onChange={handleSliderChange}
          onMouseUp={handleSliderCommitted}
          aria-label="Spacing Slider"
        />
        <p>Current Spacing: {spacing} pts</p>
      </div>
    </div>
  );
};

export default TOCSpacing;
