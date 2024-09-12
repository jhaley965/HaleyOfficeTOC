import * as React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import TextInsertion from "./TextInsertion";
import TOCInsertion from "./TOCInsertion";
import TOCSpacing from "./TOCSpacing";
import { makeStyles, TableRowIdContextProvider } from "@fluentui/react-components";
import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";
import { insertSampleText, insertTOC, changeTocSpacingAfter } from "../taskpane";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App = (props) => {
  const { title } = props;
  const styles = useStyles();
  // The list items are static and won't change at runtime,
  // so this should be an ordinary const, not a part of state.

  return (
    <div className={styles.root}>
      <Header logo="assets/jmhlarge.png" title={title} message="Adjust table of contents spacing" />
      <TextInsertion insertText={insertSampleText} />
      <TOCInsertion insertToc={insertTOC} />
      <TOCSpacing changeTocSpacingAfter={changeTocSpacingAfter} />
    </div>
  );
};

App.propTypes = {
  title: PropTypes.string,
};

export default App;
