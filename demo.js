import {MyToolkit} from './toolkit.js';
import {SVG} from './svg.min.js';


SVG.on(document, 'DOMContentLoaded', function() {
	// create the window
	var draw = SVG().addTo('body').size('100%','100%');
	var window = draw.group();
	window.rect(1200,800).stroke('gray').fill('white');

	// create button
	var btn = new MyToolkit.Button(draw);
	btn.move(20, 20);
	btn.setText('button');
	btn.onclick(function(event){
		console.log(event)
		console.log(event.target)
	})
	btn.stateChanged(function(event){
		console.log('state changed to: ' + event)
	})
	

	var checkbox = new MyToolkit.CheckBox(draw);
	checkbox.move(20, 100);
	checkbox.onclick(function(event){
		console.log(event)
		console.log(event.target)
	})
	checkbox.stateChanged(function(event){
		console.log('state changed to: ' + event)
	})
	checkbox.setText('hey there!');



	var radioAttr = [];
	radioAttr.push(['Radio button 1', false]);
	radioAttr.push(['Radio button 2', false]);
	radioAttr.push(['Radio button 3', true]);
	var radioButtons = new MyToolkit.RadioButtons(draw, radioAttr);
	radioButtons.move(20, 150);
	// radioButtons.setText(1, 'hi');
	radioButtons.onclick;
	radioButtons.stateChanged(function(event){
		console.log('state changed to: ' + event)
	})



	// create text
	var text = new MyToolkit.TextBox(draw);
	text.move(20, 300);



	// add widgets to window
	window.add(btn.src);
	window.add(checkbox.src);
	window.add(radioButtons.src);
	window.add(text.src);
	// window.move(10, 10);

})