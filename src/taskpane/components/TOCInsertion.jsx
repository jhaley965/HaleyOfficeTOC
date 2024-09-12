import * as React from "react";
import { useState } from "react";
import { Button, Field, Textarea, tokens, makeStyles } from "@fluentui/react-components";
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
  button: {
    marginBottom: "20px", // Add marginBottom here
  },  

});

const TOCInsertion = (props) => {

  const handleTocInsertion = async () => {
    
    if (typeof props.insertToc === "function") {
      await props.insertToc();
    } else {
      console.log("insertToc is not a function or is undefined");
    }
    
    await props.insertToc;
  };

  const styles = useStyles();

  return (
    <div className={styles.textPromptAndInsertion}>
      <Button className="styles.button" appearance="primary" disabled={false} size="large" onClick={handleTocInsertion}>
        Insert Table of Contents
      </Button>
    </div>
  );
};

export default TOCInsertion;
