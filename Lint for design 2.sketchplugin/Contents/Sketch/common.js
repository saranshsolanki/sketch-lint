function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function colorFromString(value) {
    var immutable = MSImmutableColor.colorWithSVGString_(value);
    return MSColor.alloc().initWithImmutableObject_(immutable);
}

function alert(title, message){
	var app = [NSApplication sharedApplication];
	[app displayDialog:message withTitle:title];
}

function checkIfExists(colorName, existingStyles){
	var existsArray = [];
	for (var i = 0; i < existingStyles.length; i++){
		if(existingStyles[i] == colorName){
			existsArray.push(colorName);
		}
	}

	if(existsArray.length > 0){
		return true;
	}else{
		return false;
	}
}

function createSelect(msg, items, selectedItemIndex){
  selectedItemIndex = selectedItemIndex || 0

  var accessory = NSComboBox.alloc().initWithFrame(NSMakeRect(0,0,200,25))
  accessory.addItemsWithObjectValues(items)
  accessory.selectItemAtIndex(selectedItemIndex)

  var alert = NSAlert.alloc().init()
  alert.setMessageText(msg)
  alert.addButtonWithTitle('OK')
  alert.addButtonWithTitle('Cancel')
  alert.setAccessoryView(accessory)

  var responseCode = alert.runModal()
  var sel = accessory.indexOfSelectedItem()

  return [responseCode, sel]
}

function removeFileExtension(layerName){
	if([layerName containsString:@"."]){
		var nameArray = [layerName componentsSeparatedByString:@"."];
		var name = nameArray[0];
		return name;
	}else{
		return layerName;
	}
}