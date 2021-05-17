import {MyToolkit} from './toolkit.js';
import {SVG} from './svg.min.js';


SVG.on(document, 'DOMContentLoaded', function() {
	// create the window
	// var draw = SVG().addTo('body').size('2000px','2000px');
	var draw = SVG().addTo('body').size('100%','100%');
	var window = draw.group();
	window.rect(1200,800).stroke('gray').fill('white');
	// window.click(function(event){
	// 	console.log('window')
	// 	console.log(event)
	// })


	// create button
	var btn = new MyToolkit.Button(draw);
	btn.move(20, 20);
	btn.setText('button');
	btn.onclick(function(event){
		console.log('onclick: ')
		console.log(event)
		console.log('event target: ')
		console.log(event.target)
	})
	btn.stateChanged(function(event){
		console.log('state changed to: ' + event)
	})
	

	var checkbox = new MyToolkit.CheckBox(draw);
	checkbox.move(20, 100);
	checkbox.onclick(function(event){
		console.log('onclick: ')
		console.log(event)
		console.log('event target: ')
		console.log(event.target)
	})
	checkbox.stateChanged(function(event){
		console.log('state changed to: ' + event)
	})

	var radioButton = new MyToolkit.RadioButton(draw);
	radioButton.move(20, 150);
	radioButton.onclick(function(event){
		console.log('onclick: ')
		console.log(event)
		console.log('event target: ')
		console.log(event.target)
	})
	radioButton.stateChanged(function(event){
		console.log('state changed to: ' + event)
	})



	// create text
	var text = new MyToolkit.TextBox(draw);
	text.move(20, 300);



	// add widgets to window
	window.add(btn.src);
	window.add(text.src);
	window.add(checkbox)
	// window.move(10, 10);

})