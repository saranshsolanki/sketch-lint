# Sketch Lint

Check the compliance of your design guidelines within seconds

![alt text](https://github.com/saranshsolanki/sketch-lint/blob/master/lint.gif?raw=true)

# What is lint?
Linting is the process of running a piece of code that will analyze the system for potential errors. This program checks the source code for Programmatic and Stylistic errors. The idea here was to create a similar tool for reviewing the design.

# The problem
While leading the designs for the consumer app at Practo, I realized the redundant work being done while maintaining and validating style guides. This entire process was being done manually which was time-consuming and not precise. This plugin works exactly like how a lint for code works. You type in your rules, and it would analyze your designs for any potential errors. 

Currently, the plugin can check for typography, color, spelling and contrast issues.

### Typography
The plugin checks for font size, font-color, font-face and line height.

### Color
Validate the color of any layer with your guideline color palette.

### Spelling
Check the spelling of your text layers directly from Sketch. Just run the plugin once. The plugin is using OSX's dictionary to check for spelling mistakes.


### Contrast
This helps you get the accessibility score of the text layers based on readability and contrast formula according to W3C standards.
1. Select a text layer and background layer. The plugin calculates the score for the text layer in comparison to the background layer.
2. Select just the text layer. This fetches the score in comparison with the background color of the artboard.

# Installation
1. [Download](https://github.com/saranshsolanki/sketch-lint/archive/master.zip) this plugin 
2. Double click the plugin file to automatically install
3. The shortcut should now be available under the Plugin's menu in Sketch

# How to use?
1. Go to Plugins Menu -> Manage Plugins... 
2. Click the "gear" icon at the bottom -> "Reveal Plugins Folder" 
3. Right Click "Lint for design" -> "Show package contents" 
4. Go to Content -> Sketch 
5. Open "script.js" in any text editor
6. Replace the colors and rules according to your styleguide. All fields to be filled are commented with ###. 
7. Your plugin is good to go :D

# Next steps
1. I'm working on a way to add the rules by not making changes to the code. 
2. Adding more rules to check for (padding, components etc)

## Contact
Saransh : [@SaranshSolanki](https://twitter.com/SaranshSolanki)
