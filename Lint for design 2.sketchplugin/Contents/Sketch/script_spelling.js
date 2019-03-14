function checkSpelling(context){
  var contextnew = context.selection.objectAtIndex(0);
  spellingAllPage(context);
}

var hexToRGB = function(hex, alpha) {
  var resultColor = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex),
      red = parseInt(resultColor[1], 16) / 255,
      green = parseInt(resultColor[2], 16) / 255,
      blue = parseInt(resultColor[3], 16) / 255,
      alpha = (typeof alpha !== 'undefined') ? alpha : 1;
  return NSColor.colorWithCalibratedRed_green_blue_alpha(red, green, blue, alpha)
}

function spelling(artboard){
  var text = '',
      app = NSApplication.sharedApplication();

  var validArtboard = true;
  var layers = artboard.children();
  var validSpelling = true;

  for (var k = 0; k < layers.count(); k++) {
    if(layers.objectAtIndex(k).class() == "MSLayerGroup" && (layers.objectAtIndex(k).isVisible()==0)){
      var hiddenLayers = layers.objectAtIndex(k).children();
      for(var g = 0; g < hiddenLayers.count(); g++){
        hiddenLayers.objectAtIndex(g).setIsVisible(false);
      }
    }

    if ((layers.objectAtIndex(k).class() == "MSTextLayer") && (layers.objectAtIndex(k).isVisible()!=0)) {

      var stringValue = layers.objectAtIndex(k).stringValue();
      var language = [[NSSpellChecker sharedSpellChecker] language];
      var rangeString = [[NSSpellChecker sharedSpellChecker] checkSpellingOfString:stringValue startingAt:0]; 

      while(rangeString.length >0 ){
        validSpelling = false;
        var endString = rangeString.location + rangeString.length;
        var misSpelledWord = stringValue.substring(rangeString.location, endString);
        var color = hexToRGB("FF2166");

        layers.objectAtIndex(k).setIsEditingText(true);
        layers.objectAtIndex(k).addAttribute_value_forRange(NSForegroundColorAttributeName, color, rangeString);
        layers.objectAtIndex(k).setIsEditingText(false);

        rangeString = [[NSSpellChecker sharedSpellChecker] checkSpellingOfString:stringValue startingAt:endString]; 

        if (rangeString.location < endString ){
          break;
        }
      }
    }
  }

  if (validSpelling) {
    app.displayDialog_withTitle("Well done. 🙌", "No issues found." +"\n" );
  } else {
    app.displayDialog_withTitle("Happy fixing. 😇", "The text layers marked in red have wrong spelling.");
  }
};

function spellingAllPage(context){
  var text = '',
      app = NSApplication.sharedApplication(),
      doc = context.document,
      documentName = doc.displayName(),
      pages = doc.pages();

  var wrongSpelling = 0;

  for (var i = 0; i < pages.length; i++) {
    if((pages[i].name()) == "Symbols"){
      break;
    }

    var validPage = true;
    var artboards = pages[i].artboards();

    for (var j = 0; j < artboards.length; j++) {

      var artboard = artboards[j];
      var validArtboard = true;
      var layers = artboard.children();

      for (var k = 0; k < layers.count(); k++) {
        if(layers.objectAtIndex(k).class() == "MSLayerGroup" && (layers.objectAtIndex(k).isVisible()==0)){
          var hiddenLayers = layers.objectAtIndex(k).children();
          for(var g = 0; g < hiddenLayers.count(); g++){
            hiddenLayers.objectAtIndex(g).setIsVisible(false);
          }
        }

        if ((layers.objectAtIndex(k).class() == "MSTextLayer") && (layers.objectAtIndex(k).isVisible()!=0)) {

          var stringValue = layers.objectAtIndex(k).stringValue();
          var language = [[NSSpellChecker sharedSpellChecker] language];

          var rangeString = [[NSSpellChecker sharedSpellChecker] checkSpellingOfString:stringValue startingAt:0]; 

          while(rangeString.length >0 ){
            wrongSpelling ++;
            var endString = rangeString.location + rangeString.length;
            var misSpelledWord = stringValue.substring(rangeString.location, endString);
            var color = hexToRGB("FF0202");

            layers.objectAtIndex(k).setIsEditingText(true);
            layers.objectAtIndex(k).addAttribute_value_forRange(NSForegroundColorAttributeName, color, rangeString);
            layers.objectAtIndex(k).setIsEditingText(false);

            rangeString = [[NSSpellChecker sharedSpellChecker] checkSpellingOfString:stringValue startingAt:endString]; 

            if (rangeString.location < endString ){
              break;
            }
          }
        }
      }
    }
  }

  if (wrongSpelling == 0) {
    doc.displayMessage("Well done, no spelling mistakes found 🙌");
  } else {
    app.displayDialog_withTitle( "Happy fixing 😇", wrongSpelling+ " misspelled words found." + "\n" + "They are marked in red.");
  }
};