// import { SVG } from "./svg.min.js";

// SVG.on(document, 'DOMContentLoaded', function(){
//     var draw = SVG().addTo('body').size('1000px', '1000px');
//     var frame = draw.group();
//     frame.rect(400, 400).stroke('orange').fill('white')
//     frame.click(function(event){
//         console.log('window')
//         console.log(event)
//     })

//     SVG.on(window, 'keyup', (event) => {
//         console.log(event.key)
//     })
//     frame.move(10, 10)
// })
import {MyToolkit} from './toolkit.js';
import {SVG} from './svg.min.js';


SVG.on(document, 'DOMContentLoaded', function() {
	// create the frame
	var draw = SVG().addTo('body').size('100%','100%');
	var frame = draw.group();
	frame.rect(1200,800).stroke('gray').fill('white');
	// frame.click(function(event){
	// 	console.log('frame')
	// 	console.log(event)
	// })

	// create button
	var btn = new MyToolkit.Button(draw);
	btn.move(20, 20);
	btn.setText('button');
	// btn.setText('really longggggggg text')
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
	var textbox = new MyToolkit.TextBox(draw);
	textbox.move(20, 300);
	textbox.stateChanged(function(event){
		console.log('state changed to: ' + event)
	})




	// add widgets to frame
	frame.add(btn.src);
	frame.add(checkbox.src);
	frame.add(radioButtons.src);
	frame.add(textbox.src);
	// frame.move(10, 10);
})