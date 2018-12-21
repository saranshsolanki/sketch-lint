# Sketch Police

Validate your designs against your defined design guidelines, within seconds

![alt text](https://github.com/saranshsolanki/sketch-lint/blob/master/police2.gif.gif?raw=true)

# Need for this plugin
Well, I love design systems. They are extremely essential in today's world to build faster, better, robust and consistent products. Having such rules gives designers space and opportunity to focus on vital components which define the usability of their products. 

However, design systems often many times tend to have many rules. As many that are almost humanly impossible for a designer to remember them at once. Sketch, the design tool which is celebrated as the preferred design tools across the industry, provides a solution in the form of Symbols. Symbols are a great solution to my opinion. But there are some loopholes which make it furthermore exposed. 

Firstly, creating Symbols for complicated components is extremely cumbersome. Overrides, responsiveness, and dynamism are critical for them to work as expected. At the same time, most designers, even though when provided with Symbols, tend to detach them and make corresponding modifications. I noticed this behavior in the various design teams I have worked with in the past few years. Designers are problem-solvers and tinkerers. This requires them to bend the rules, which often many time is done without knowing the rules itself. 

Hence, there is a need for a tool which could assist with all of this. In computer programming, Linting is the process of running a piece of code that will analyze code for potential errors. This program checks the source code for Programmatic and Stylistic errors. The plan here was to create a similar tool for reviewing designs. Reminding the designer of potential errors and automatically fixing it will help in better, consistent and faster design handovers. 

The plugin currently is in a prototype phase. I have been testing the algorithm, its performance, and usability with design teams in different countries. Below you can read about the basic framework on how it works. The plugin can check for typography, color, spelling, contrast, and padding issues. 

# Extract the rules
To use this plugin, you just need a Sketch file with your design guideline. This is file which contains text styles and colors swatches defined. The plugin can extract all the typography cases and color rules from the guideline with a single click and store it as a JSON. This JSON is what is going to power the plugin in the next stages. 

# Check for errors
This plugin works exactly like how a lint for code works. With the rules mentioned, it would analyze your designs for any potential errors.

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

### Padding
Check for vertical padding between layers and shapes.

# Fixing the errors
Now that the designers know the errors in their designs, the plugin can assist in fixing them. The plugin can suggest you with possible fixes. The logic behind is a complex set of fuzzy logic which helps estimates the nearest possible rules to the problematic layer. 

This is still in progess, and the following video demonstrates the bare minimum of what the plugin can achieve.


# Installation
1. [Download](https://github.com/saranshsolanki/sketch-lint/archive/master.zip) this plugin 
2. Double click the plugin file to automatically install
3. The shortcut should now be available under the Plugin's menu in Sketch


## Contact
Saransh : [@SaranshSolanki](https://twitter.com/SaranshSolanki)
