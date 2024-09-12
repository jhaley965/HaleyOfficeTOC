export async function insertSampleText(text) {
  // Write text to the document.
  try {
    await Word.run(async (context) => {
      let body = context.document.body;

      // Function to insert heading and text
      function insertTopic(topicTitle, text) {
        // Insert heading
        body.insertParagraph(topicTitle, Word.InsertLocation.end).style = "Heading 1";
        
        // Split the text into paragraphs
        let paragraphs = text.split('\n').slice(0, 3); // Assuming text is already provided in newlines
        paragraphs.forEach((paragraph) => {
          body.insertParagraph(paragraph, Word.InsertLocation.end).style = "Normal";
        });
      }

      // Insert "Alpha Topic" heading and text
      insertTopic("Alpha Topic", text);

      // Insert "Beta Topic" heading and text
      insertTopic("Beta Topic", text);

      // Insert "Gamma Topic" heading and text
      insertTopic("Gamma Topic", text);

      // Insert "Delta Topic" heading and text
      insertTopic("Delta Topic", text);

      await context.sync();
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}

export async function insertTOC() {
  try {
    await Word.run(async (context) => {
      let body = context.document.body;

      // Insert a new section at the beginning of the document
      body.insertBreak(Word.BreakType.sectionNext, Word.InsertLocation.start);

      //get existing ooxml for the doc
      const originalOoxml = body.getOoxml();
      await context.sync();
 
      // Step 2: Define the new paragraph OOXML you want to insert
      const tocXml = `
      <w:sdt>
        <w:sdtPr>
          <w:id w:val="-1637326371"/>
          <w:docPartObj>
            <w:docPartGallery w:val="Table of Contents"/>
            <w:docPartUnique/>
          </w:docPartObj>
        </w:sdtPr>
        <w:sdtEndPr/>
        <w:sdtContent>
          <w:p>
          </w:p>
          <w:p>
            <w:r>
              <w:fldChar w:fldCharType="begin"/>
            </w:r>
            <w:r>
              <w:instrText xml:space="preserve"> TOC \\o "1-3" \\h \\z \\u </w:instrText>
            </w:r>
            <w:r>
              <w:fldChar w:fldCharType="separate"/>
            </w:r>
          </w:p>
          <w:p>
            <w:r>
              <w:fldChar w:fldCharType="end"/>
            </w:r>
          </w:p>
        </w:sdtContent>
      </w:sdt>`;

      // Step 3: Insert the new paragraph right after the <w:body> tag
      const modifiedOoxml = originalOoxml.value.replace("<w:body>", `<w:body>${tocXml}`);

      // Step 4: Insert the modified OOXML back into the document
      body.insertOoxml(modifiedOoxml, Word.InsertLocation.replace);
      await context.sync();
      body.fields.load();
      await context.sync();
      
      var field = context.document.body.fields.getFirstOrNullObject();
      field.load();
      await context.sync();

      await field.updateResult();
      await context.sync();


      // Insert a heading for the Table of Contents
      body.insertParagraph("Table of Contents", Word.InsertLocation.start).style = "Heading 1";

      // console.log('got tocXml, inserting');
      // // Insert the WordML at the start of the document
      // body.insertOoxml(tocXml, Word.InsertLocation.start);
      // console.log('done');

      await context.sync();
    });
  } catch (error) {
    console.log("Error: " + error);
   }
}

export async function changeTocSpacingAfter(val){
  await Word.run(async (context) => {
    let paragraphs = context.document.body.paragraphs;
    paragraphs.load('items'); // Load all paragraphs in the document

    await context.sync();

    // Loop through the paragraphs and find those that use the "TOC1" style
    //paragraphs.items.forEach(paragraph => {
    for (const paragraph of paragraphs.items) {
      try {
        console.log('style: ' + paragraph.style + ', para '+ paragraph.text + '')
        if (paragraph.style === "TOC 1") {
          paragraph.spaceAfter = Number(val); // Set the spacing after (in points)
          await context.sync();
        }
      } catch (exception) {
        console.log("changeTocSpacingAfter error:" + exception);
      }
    }
    await context.sync();
  });
}
