
var appName = 'Text Validator', suffix = 'pt';
;

// //to check all for the selected artboard
// function checkAll(context) {
//   checkFontSize(context, );
//   checkFontFace(context);
//   checkTextColor(context);
//   checkTextHeight(context);
// };


// MAIN FUNCTIONS

// to check font size and fontface for the selected artboard
function checkFontSize(context) {
  var contextnew = context.selection.objectAtIndex(0);
  var artboardType = checkArtboard(context);
  
  if (artboardType == "android"){
    var fontAllowed = [12,14,16,24];
  }
  if (artboardType == "mweb"){
    var fontAllowed = [12,14,18,24,36];
  }
  if (artboardType == "iOS"){
    var fontAllowed = [12,13,14,16,17,24];
  }
  if (artboardType == "web"){
    var fontAllowed = [12,14,18,24,36];
  }
  log(artboardType);
  fontSize(contextnew,fontAllowed);
};

// to check the correct font face
function checkFontFace(context){
  var contextnew = context.selection.objectAtIndex(0);
  fontFace(contextnew);
};

// to check for text color for selected artboard
function checkTextColor(context) {
  var contextnew = context.selection.objectAtIndex(0);
  var artboardType = checkArtboard(context);
  
  if ((artboardType == "android")||(artboardType == "iOS")){
    var colorAllowed = ["#000000","#2D2D32","#787887", "#FFFFFF","#14BEF0","#FF2D00","#00A500"];
  }
  if ((artboardType == "web")||(artboardType == "mweb")){
    var colorAllowed = ["#000000","#414146","#787887", "#FFFFFF","#01A400","#FF2D00","#14BEF0","#14BEF0","#28328C"];
  }
  
  textColor(contextnew, colorAllowed);
};

// to check for line height for selected artboard
function checkTextHeight(context) {
  var contextnew = context.selection.objectAtIndex(0);
  var artboardType = checkArtboard(context);

  var lineHeightAllowed = [0,1, 1.33, 1.5, 1.75];
  textHeight(contextnew, lineHeightAllowed);
};

// to check the layer colors
function checkColor(context) {
  var contextnew = context.selection.objectAtIndex(0);
  var artboardType = checkArtboard(context);
  var colorAllowed = ["#000000","#2D2D32","#787887", "#FFFFFF","#14BEF0","#FF2D00","#00A500" ,"#28328C", "#FFFFFF", "#F0F0F5", "#B4B4BE", "#FFD700", "#FF2166", "FFC74D"];
  color(contextnew, colorAllowed);
};

// to check for spelling
function checkSpelling(context){
  var contextnew = context.selection.objectAtIndex(0);
  spelling(contextnew);
};

// to check text contrast
function checkContrast (context){
  var doc = context.document;
  var selection = context.selection; 
  var page = doc.currentPage();
  var app = NSApplication.sharedApplication();

  if (selection.count() == 0){
    app.displayDialog_withTitle("Please select one or two layers.", "Color Contrast Analyser");
  }

  if (selection.count() == 1){
    var layer1 = selection[0];
    var color1 = getColorOfLayer(layer1);

    if(color1[0]){
      var textLayer = color1[1];
    }

    if (page.currentArtboard() != null) {
      // get the color of the artboard
      color2 = page.currentArtboard().backgroundColor();
      var result = contrast(color1[2], color2);
      displayConstrast(doc, textLayer, result);
    }
  }

  if(selection.count() == 2){
    var layer1 = selection[0];
    var layer2 = selection[1];

    var color1 = getColorOfLayer(layer1);
    var color2 = getColorOfLayer(layer2);
    if(color1[0]){
      var textLayer = color1[1];
    }
    if(color2[0]){
      var textLayer = color2[1];
    }

    var result = contrast(color1[2], color2[2]);
    displayConstrast(doc, textLayer, result);
  }
};

// SUPPORTING FUNCTIONS

// to check for the type of platfrom designing for
// function checkArtboard (context){
//   var text = '',
//       app = NSApplication.sharedApplication(),
//       doc = context.document,
//       documentName = doc.displayName(),
//       pages = doc.pages()
//       artboardType = "web";

//   for (var i = 0; i < pages.length; i++) {
//     var validPage = true;
//     var pageName = pages[i];

//     if( ((pages[i].name()) != "Symbols")  && (pages[i].artboards().count() != 0 )){
//       var artboards = pages[i].artboards();
//       var firstArtboard = artboards.firstObject();
//       var artboardWidth = firstArtboard.frame().width();
//     }
//   }
//   log("artboardWidth" + artboardWidth);
//   if(artboardWidth == 320){
//     artboardType = "mweb";
//   }
//   if(artboardWidth == 375){
//     artboardType = "ios";
//   }
//   if(artboardWidth == 360){
//     artboardType = "android";
//   }
//   return (artboardType);
// };

function checkArtboard (context){
  var doc = context.document;
  var selection = context.selection; 
  var page = doc.currentPage();
  var app = NSApplication.sharedApplication();
  var artboardType = "web";

  var artboardWidth = page.currentArtboard().frame().width();

  if(artboardWidth == 320){
    artboardType = "mweb";
  }
  if(artboardWidth == 375){
    artboardType = "ios";
  }
  if(artboardWidth == 360){
    artboardType = "android";
  }
  return (artboardType);
};

// convert rgb value to Hex
function rgbToHex(r, g, b) {

  if (Math.round(r*255).toString(16) == "0"){
    var red = "00";
  }else{
    var red = Math.round(r*255).toString(16);
  }

  if (Math.round(g*255).toString(16) == "0"){
    var green = "00";
  }else{
    var green = Math.round(g*255).toString(16);
  }

  if (Math.round(b*255).toString(16) == "0"){
    var blue = "00";
  }else{
    var blue = Math.round(b*255).toString(16);
  }

  return ("#" + red.toUpperCase() + green.toUpperCase() + blue.toUpperCase());
};

var hexToRGB = function(hex, alpha) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex),
        red = parseInt(result[1], 16) / 255,
        green = parseInt(result[2], 16) / 255,
        blue = parseInt(result[3], 16) / 255,
        alpha = (typeof alpha !== 'undefined') ? alpha : 1;
    return NSColor.colorWithCalibratedRed_green_blue_alpha(red, green, blue, alpha)
};


// PER ARTBOARD
function color(artboard, colorSizeSet){
  var text = '',
      app = NSApplication.sharedApplication();

  var validArtboard = true;
  var layers = artboard.children();

  for (var k = 0; k < layers.count(); k++) {

    if(layers.objectAtIndex(k).class() == "MSLayerGroup" && (layers.objectAtIndex(k).isVisible()==0)){
      var hiddenLayers = layers.objectAtIndex(k).children();
      for(var g = 0; g < hiddenLayers.count(); g++){
        hiddenLayers.objectAtIndex(g).setIsVisible(false);
      }
    }
    var layerObject = layers.objectAtIndex(k);

    if ((layerObject.class() == "MSShapeGroup") && (layerObject.isVisible)){

      // check if the layer is visually visible

      // https://github.com/nathco/Swap-Fill-Border/blob/master/Swap-Fill-Border.sketchplugin/Contents/Sketch/Swap-Fill-Border.js
      var fillCount = layerObject.style().fills().count();
      var bordersCount = layerObject.style().borders().count();
      var visibleFill = false;
      var visibleBorder = false;

      for ( var f = 0; f < fillCount; f++){
        if (layerObject.style().fills().objectAtIndex(f).isEnabled()){
          visibleFill = true;
        }
      }

      for ( var b = 0; b < bordersCount; b++){
        if (layerObject.style().borders().objectAtIndex(b).isEnabled()){
          visibleBorder = true;
        }
      }

    }

    if ((layerObject.class() == "MSShapeGroup") && (layerObject.isVisible()!=0) && (visibleFill > 0))  {
      var validColor = false;

      // all text properties are here : http://developer.sketchapp.com/reference/api/file/api/Text.js.html#lineNumber48
      
      var layerColor = layerObject.style().fills().objectAtIndex(0).color();
      var myRegexp = /\(r:(.*) g:(.*) b:(.*) a:(.*)\)/g;
      var colorValues = myRegexp.exec(layerColor);

      var rgbColor = rgbToHex( parseFloat(colorValues[1]), parseFloat(colorValues[2]), parseFloat(colorValues[3]));

      // check color valid or not
      for (var l = 0; l < colorSizeSet.length; l++) {
        if (rgbColor === colorSizeSet[l]) {
          validColor = true;
          break;
        }
      }

      if (!validColor) {
        var borderCount = layers.objectAtIndex(k).style().borders().count();
        layers.objectAtIndex(k).style().addStylePartOfType(1);
        layers.objectAtIndex(k).style().borders().objectAtIndex(borderCount).setThickness(4);
        layers.objectAtIndex(k).style().borders().objectAtIndex(borderCount).color().setRed(1);
        layers.objectAtIndex(k).style().borders().objectAtIndex(borderCount).color().setGreen(0.13);
        layers.objectAtIndex(k).style().borders().objectAtIndex(borderCount).color().setBlue(0.40);
        text += " color:       " + '  \"' + layers.objectAtIndex(k).name() + '\"  ' + rgbColor + '\n';
      }
    }

    if ((layerObject.class() == "MSShapeGroup") && (layerObject.isVisible()!=0) && (visibleBorder > 0)){
      var borderColor = layerObject.style().borders().objectAtIndex(0).color();
      var validColor = false;
      var layerObject = layers.objectAtIndex(k);

      var myRegexp = /\(r:(.*) g:(.*) b:(.*) a:(.*)\)/g;
      var colorValues = myRegexp.exec(borderColor);

      var rgbColor = rgbToHex( parseFloat(colorValues[1]), parseFloat(colorValues[2]), parseFloat(colorValues[3]));

      // check color valid or not
      for (var l = 0; l < colorSizeSet.length; l++) {
        if (rgbColor === colorSizeSet[l]) {
          validColor = true;
          break;
        }
      }

      if (!validColor) {
        var borderCount = layers.objectAtIndex(k).style().borders().count();
        layers.objectAtIndex(k).style().addStylePartOfType(1);
        layers.objectAtIndex(k).style().borders().objectAtIndex(borderCount).setThickness(2);
        layers.objectAtIndex(k).style().borders().objectAtIndex(borderCount).color().setRed(1);
        layers.objectAtIndex(k).style().borders().objectAtIndex(borderCount).color().setGreen(0.78);
        layers.objectAtIndex(k).style().borders().objectAtIndex(borderCount).color().setBlue(0.30);
        text += " color: " + '  \"' + layers.objectAtIndex(k).name() + '\"  ' + rgbColor + '\n';
      }

    }
  }

  if (text == '') {
    app.displayDialog_withTitle("Well done. 🙌", "No issues found." +"\n" );
  } else {
    app.displayDialog_withTitle("Happy fixing. 😇","The layers marked in red have wrong fill colors. In yellow have wrong border colors." +"\n");
  }
};

function fontSize(artboard, fontSizeSet) {
  var text = '',
      app = NSApplication.sharedApplication();

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
      var validFont = false;
      // all text properties are here : http://developer.sketchapp.com/reference/api/file/api/Text.js.html#lineNumber48
      // check font valid or not
      for (var l = 0; l < fontSizeSet.length; l++) {
        if (layers.objectAtIndex(k).fontSize() === fontSizeSet[l]) {
          validFont = true;
          break;
        }
      }

      // check text font
      if (!validFont) {
        layers.objectAtIndex(k).style().addStylePartOfType(1);
        layers.objectAtIndex(k).style().borders().objectAtIndex(0).setThickness(2);
        layers.objectAtIndex(k).style().borders().objectAtIndex(0).color().setRed(1);
        layers.objectAtIndex(k).style().borders().objectAtIndex(0).color().setGreen(0.13);
        layers.objectAtIndex(k).style().borders().objectAtIndex(0).color().setBlue(0.40);
        text = "wrong text layer"; 
      }
    }
  }

  if (text == '') {
    app.displayDialog_withTitle("Well done. 🙌", "No issues found." +"\n" );
  } else {
    app.displayDialog_withTitle("Happy fixing. 😇", "The text layers marked in red have wrong font size.");
  }
};

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
        var color = hexToRGB('FF2166');

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

function fontFace(artboard) {
  var text = '',
      app = NSApplication.sharedApplication();

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
      var validFontName = false;

      // all text properties are here : http://developer.sketchapp.com/reference/api/file/api/Text.js.html#lineNumber48
      
      if ((layers.objectAtIndex(k).font().fontName() == "CamphorPro-Bold") || (layers.objectAtIndex(k).font().fontName() == "CamphorPro-Regular")) {
        validFontName = true;
      }

      if (!validFontName){
        layers.objectAtIndex(k).style().addStylePartOfType(1);
        layers.objectAtIndex(k).style().borders().objectAtIndex(0).setThickness(2);
        layers.objectAtIndex(k).style().borders().objectAtIndex(0).color().setRed(1);
        layers.objectAtIndex(k).style().borders().objectAtIndex(0).color().setGreen(0.13);
        layers.objectAtIndex(k).style().borders().objectAtIndex(0).color().setBlue(0.40);
        text = "wrong text layer";
      }
    }
  }

  if (text == '') {
    app.displayDialog_withTitle("Well done. 🙌", "No issues found." +"\n" );
  } else {
    app.displayDialog_withTitle("Happy fixing. 😇", "The text layers marked in red have wrong font face.");
  }
};

function getColorOfLayer(layer) {
  var color = null;

  var isText = null,
      textLayer = null;

  if (layer.class() == MSTextLayer){
    color = layer.textColor();
    textLayer = layer;
    fontSize = textLayer.fontSize();
    isText = true;

    var fill = layer.style().fills().firstObject();
    if(fill != undefined && fill.isEnabled())
      color = fill.color();
  }
  else{
    var fill = layer.style().fills().firstObject();
    color = fill.color();
  }
  return [isText, textLayer, color];
};

function contrast(color1, color2) {

  // Color 1

  L1R = color1.red();
  if (L1R <= 0.03928) {
    L1R = color1.red() / 12.92;
  } else {
    L1R = Math.pow(((L1R + 0.055)/1.055), 2.4)
  }

  L1G = color1.green();
  if (L1G <= 0.03928) {
    L1G = color1.green() / 12.92;
  } else {
    L1G = Math.pow(((L1G + 0.055)/1.055), 2.4)
  }

  L1B = color1.blue();
  if (L1B <= 0.03928) {
    L1B = color1.blue() / 12.92;
  } else {
    L1B = Math.pow(((L1B + 0.055)/1.055), 2.4)
  }

  // Color 2

  L2R = color2.red();
  if (L2R <= 0.03928) {
    L2R = color2.red() / 12.92;
  } else {
    L2R = Math.pow(((L2R + 0.055)/1.055), 2.4)
  }

  L2G = color2.green();
  if (L2G <= 0.03928) {
    L2G = color2.green() / 12.92;
  } else {
    L2G = Math.pow(((L2G + 0.055)/1.055), 2.4)
  }

  L2B = color2.blue();
  if (L2B <= 0.03928) {
    L2B = color2.blue() / 12.92;
  } else {
    L2B = Math.pow(((L2B + 0.055)/1.055), 2.4)
  }

  var L1 = 0.2126 * L1R + 0.7152 * L1G + 0.0722 * L1B;
  var L2 = 0.2126 * L2R + 0.7152 * L2G + 0.0722 * L2B;

  // Make sure L1 is the lighter color

  if (L1 <= L2) {
    var temp = L2;
    L2 = L1;
    L1 = temp;
  }

  // Calculate contrast

  cr = (L1 + 0.05) / (L2 + 0.05);

  return cr;
};

function displayConstrast (doc, textLayer, result) {
  // Check against AA / AAA
  var status = "😢 AA Failed";
  var fontSize = 14;

  if (textLayer != null) {
    var fontSize = textLayer.fontSize();
    var isBold = false;

    if (textLayer.fontPostscriptName().indexOf("Bold") != -1) {
      var isBold = true;
    }
  }


  if ((fontSize >= 18 || (fontSize >= 14 && isBold)) && result >=3) {
    status = "😎 AA passed (large text)";
  }

  if(result >= 4.5) {
    status = "😎 AA passed";
  }

  if ((fontSize >= 18 || (fontSize >= 14 && isBold)) && result >=4.5) {
    status = "😎 AAA passed (large text)";
  }

  if(result >= 7.0) {
    status = "😎 AAA passed";
  }

  var floored = Math.round((result.toString()) * 100) / 100;
  doc.showMessage(status + " - " + floored + ":1");
};

function textColor(artboard, colorSizeSet) {
  var text = '',
      app = NSApplication.sharedApplication();

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
          var validColor = false;

          // all text properties are here : http://developer.sketchapp.com/reference/api/file/api/Text.js.html#lineNumber48
          var textColor = layers.objectAtIndex(k).textColor();
          var myRegexp = /\(r:(.*) g:(.*) b:(.*) a:(.*)\)/g;
          var colorValues = myRegexp.exec(textColor);
          var rgbColor = rgbToHex( parseFloat(colorValues[1]), parseFloat(colorValues[2]), parseFloat(colorValues[3]));

          // check color valid or not
          for (var l = 0; l < colorSizeSet.length; l++) {
            if (rgbColor === colorSizeSet[l]) {
              validColor = true;
              break;
            }
          }
          // check text color
          if (!validColor) {
            layers.objectAtIndex(k).style().addStylePartOfType(1);
            layers.objectAtIndex(k).style().borders().objectAtIndex(0).setThickness(2);
            layers.objectAtIndex(k).style().borders().objectAtIndex(0).color().setRed(1);
            layers.objectAtIndex(k).style().borders().objectAtIndex(0).color().setGreen(0.13);
            layers.objectAtIndex(k).style().borders().objectAtIndex(0).color().setBlue(0.40);
            text = "wrong text layer";
          }
        }
      }

  if (text == '') {
    app.displayDialog_withTitle("Well done. 🙌", "No issues found." +"\n" );
  } else {
    app.displayDialog_withTitle("Happy fixing. 😇", "The text layers marked in red have wrong text color.");
  }
};

function textHeight(artboard, lineHeightSet) {
  var text = '',
  app = NSApplication.sharedApplication();

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
      var validLineHeight = false;

      // all text properties are here : http://developer.sketchapp.com/reference/api/file/api/Text.js.html#lineNumber4
      for (var l = 0; l < lineHeightSet.length; l++) {
        if (Math.round(layers.objectAtIndex(k).lineHeight()/layers.objectAtIndex(k).fontSize()*100)/100 === lineHeightSet[l]) {
          validLineHeight = true;
          break;
        }
      }
      // check font height
      if (!validLineHeight) {
        layers.objectAtIndex(k).style().addStylePartOfType(1);
        layers.objectAtIndex(k).style().borders().objectAtIndex(0).setThickness(2);
        layers.objectAtIndex(k).style().borders().objectAtIndex(0).color().setRed(1);
        layers.objectAtIndex(k).style().borders().objectAtIndex(0).color().setGreen(0.13);
        layers.objectAtIndex(k).style().borders().objectAtIndex(0).color().setBlue(0.40);
        text = "wrong text layer";      
      }
    }
  }

  if (text == '') {
    app.displayDialog_withTitle("Well done. 🙌", "No issues found." +"\n" );
  } else {
    app.displayDialog_withTitle("Happy fixing. 😇", "The text layers marked in red have wrong line height.");
  }
};



// ENTIRE FILE AT ONCE. DISCUSS IF THESE MAKE SENSE
function check_ForFontSizeAll(context, fontSizeSet) {
  var text = '',
      app = NSApplication.sharedApplication(),
      doc = context.document,
      documentName = doc.displayName(),
      pages = doc.pages();

  for (var i = 0; i < pages.length; i++) {
    if((pages[i].name()) == "Symbols"){
      break;
    }

    var validPage = true;
    var artboards = pages[i].artboards();
    
    for (var j = 0; j < artboards.length; j++) {
      var validArtboard = true;
      var layers = artboards[j].children();

      for (var k = 0; k < layers.count(); k++) {

        // log("class"+layers.objectAtIndex(k).class() + "        name :" + layers.objectAtIndex(k).name() + "       " + layers.objectAtIndex(k).isVisible());

        if(layers.objectAtIndex(k).class() == "MSLayerGroup" && (layers.objectAtIndex(k).isVisible()==0)){
          // log ("hidden groups :   " +layers.objectAtIndex(k).children());
          var hiddenLayers = layers.objectAtIndex(k).children();

          for(var g = 0; g < hiddenLayers.count(); g++){
            hiddenLayers.objectAtIndex(g).setIsVisible(false);
          }
        }

        if ((layers.objectAtIndex(k).class() == "MSTextLayer") && (layers.objectAtIndex(k).isVisible()!=0)) {
          var validFont = false;
          var validFontName = false;


          // all text properties are here : http://developer.sketchapp.com/reference/api/file/api/Text.js.html#lineNumber48
          // log("layer name" + layers.objectAtIndex(k));
          var textValue = layers.objectAtIndex(k).stringValue();

          // check font valid or not
          for (var l = 0; l < fontSizeSet.length; l++) {
            if (layers.objectAtIndex(k).fontSize() === fontSizeSet[l]) {
              validFont = true;
              break;
            }
          }

          for (var l = 0; l < fontSizeSet.length; l++) {
            if ((layers.objectAtIndex(k).font().fontName() == "CamphorStd-Bold") || (layers.objectAtIndex(k).font().fontName() == "CamphorStd-Regular")) {
              validFontName = true;
              break;
            }
          }

          // check text font
          if (!validFont) {
            if (validPage) {
              validPage = false;
              text += '\nPage: ' + pages[i].name() + '\n';
            }
            if (validArtboard) {
              validArtboard = false;
              text += '\nArtboard: ' + artboards[j].name() + '\n';
            }
            text += 'text size:  \"'  + layers.objectAtIndex(k).name() + '\"  ' + layers.objectAtIndex(k).fontSize() + "px" + '\n';
          }
          
          if (!validFontName) {
            if (validPage) {
              validPage = false;
              text += '\nPage: ' + pages[i].name() + '\n';
            }
            if (validArtboard) {
              validArtboard = false;
              text += '\nArtboard: ' + artboards[j].name() + '\n';
            }
            text += 'Font:  \"'  + layers.objectAtIndex(k).name() + '\"  ' + layers.objectAtIndex(k).font().fontName() + '\n';
          }

        }
      }
    }
  }

  if (text == '') {
    app.displayDialog_withTitle("Well done. 🙌", "No issues found." +"\n" );
  } else {
    app.displayDialog_withTitle(text, "These layers have wrong font sizes." +"\n"+"Happy fixing. 😇");
  }
};