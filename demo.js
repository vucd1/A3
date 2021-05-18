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

	// create button
	var btn = new MyToolkit.Button(draw);
	btn.move(20, 20);
	btn.text = 'oh!'
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
	checkbox.text = 'hey there!';



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



	// create textbox
	var textbox = new MyToolkit.TextBox(draw);
	textbox.move(20, 300);
	textbox.stateChanged(function(event){
		console.log('state changed to: ' + event)
	})


	// create scroll bar
	var scroll = new MyToolkit.ScrollBar(draw);
	scroll.move(20, 300);
	// scroll.stateChanged(function(event){
	// 	console.log('state changed to: ' + event)
	// })


	// create progress bar
	var progress = new MyToolkit.ProgressBar(draw);
	progress.move(20, 400);
	// progress.progress(80);
	progress.size(200, 10);
	// progress.attr.progress = 40;
	// console.log(progress.attr.progress)
	// setInterval(inc, 1000);
	// var p = 0;
	// function inc(){
	// 	p += 20
	// 	if (p > 200){
	// 		p = 0;
	// 		progress.setProgress(p); 
	// 	}
	// 	else {
	// 		progress.setProgress(p);
	// 	}
	// }
	progress.stateChanged(function(event){
		console.log('state changed to: ' + event)
	})




	// add widgets to frame
	frame.add(btn.src);
	frame.add(checkbox.src);
	frame.add(radioButtons.src);
	frame.add(textbox.src);
	frame.add(scroll.src);
	frame.add(progress.src);
	// frame.move(10, 10);
})