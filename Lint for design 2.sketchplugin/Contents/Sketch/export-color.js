@import 'common.js'

function exportColor(context) {

  var sketch = context.api();
  var doc = sketch.selectedDocument;
  var presentDoc = context.document;
  //get the name of the document and remove the file extension if there is one
  var documentName = removeFileExtension(doc.sketchObject.displayName());

  //reference the shared styles
  var sharedStyles = doc.sketchObject.documentData().layerStyles();

  //reference the number of shared styles
  var numberOfSharedStyles = Number(sharedStyles.numberOfSharedStyles());

  //allow json to be written to the folder
  var fileTypes = [@"json"];

  //create select folder window to save the file
  var panel = [NSSavePanel savePanel];
  [panel setCanChooseDirectories:true];
  [panel setCanCreateDirectories:true];
  [panel setAllowedFileTypes:fileTypes];
  [panel setNameFieldStringValue:documentName+".json"];

  //the text on the button in the panel
  panel.setPrompt("Save Color Palette");

  //check if Ok has been clicked
  if (panel.runModal()) {
    //create an array to hold the palette
    var paletteArray = [];

    for (var z = 0; z < numberOfSharedStyles; z++){

      layerStyle = sharedStyles.objects().objectAtIndex(z);
      //convert variables to Strings for JSON export
      var colorName = String(layerStyle.name());
      if(layerStyle.value().firstEnabledFill().color != null){
        var colorCode = layerStyle.value().firstEnabledFill().color().immutableModelObject().hexValue();
        // log(colorCode);
        var colorHex = "#" + colorCode;
        log("colorHex");
      }
      

      //push this info into the palette array
      paletteArray.push({
        name: colorName,
        value: colorHex,
      })

    }
    //get the file path
    var file_path = panel.URL().path();
    // Create the JSON object from paletteArray
    // var jsonObj = { "Color Palette": paletteArray };
    
    // Convert the object to a json string and format it
    var file = NSString.stringWithString(JSON.stringify(paletteArray, null, "\t"));
    // Save the file
    file.writeToFile_atomically_encoding_error(file_path, true, NSUTF8StringEncoding, null);

    // var alertMessage = documentName+".json saved to: " + file_path;
    presentDoc.showMessage("Color style(s) are succesfully saved");
  }

};
