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

const TextInsertion = (props) => {
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla arcu ac est porttitor, eu dictum risus gravida. Sed consectetur mauris ultrices odio molestie vulputate. Phasellus vel risus vitae lacus euismod ornare vitae non ex. Maecenas lobortis augue a lacus porta aliquam. Nam faucibus massa et magna posuere pellentesque. Integer ut urna a tortor ullamcorper pharetra. Nunc dictum tortor ut est tristique, ac venenatis ante mollis. Cras blandit lobortis enim, eget sagittis velit porttitor et. Pellentesque a sollicitudin ligula, at sodales tellus. Fusce sit amet purus eros. Phasellus in tempor purus, quis imperdiet lacus.";

  const handleTextInsertion = async () => {
    await props.insertText(lorem);
  };

  const styles = useStyles();

  return (
    <div className={styles.textPromptAndInsertion}>
      <Button className={styles.button} appearance="primary" disabled={false} size="large" onClick={handleTextInsertion}>
        Insert Sample Text
      </Button>
    </div>
  );
};

TextInsertion.propTypes = {
  insertText: PropTypes.func.isRequired,
};

export default TextInsertion;
