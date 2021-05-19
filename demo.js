
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
	btn.text = 'Button'
	btn.onclick(function(event){
		console.log(event)
		console.log(event.target)
	})

	btn.stateChanged(function(event){
		console.log('state changed to: ' + event)
	})
	

	var checkbox = new MyToolkit.CheckBox(draw);
	checkbox.move(20, 100);
	checkbox.text = 'Checkbox'
	checkbox.onclick(function(event){
		console.log(event)
		console.log(event.target)
	})
	checkbox.stateChanged(function(event){
		console.log('state changed to: ' + event)
	})




	var radioAttr = [];
	radioAttr.push(['Radio button 1', false]);
	radioAttr.push(['Radio button 2', false]);
	radioAttr.push(['Radio button 3', true]);
	var radioButton = new MyToolkit.RadioButton(draw, radioAttr);
	radioButton.move(20, 150);
	radioButton.stateChanged(function(event){
		console.log('state changed to: ' + event)
	})



	// create textbox
	var textbox = new MyToolkit.TextBox(draw);
	textbox.move(20, 300);
	textbox.onkeypress(function(event){
		console.log(event)
		console.log(event.target)
		console.log(textbox.text)
	})
	textbox.stateChanged(function(event){
		console.log('state changed to: ' + event)
	})


	// create scroll bar
	var scroll = new MyToolkit.ScrollBar(draw);
	scroll.move(300, 50);
	scroll.onscroll(function(event){
		console.log(event)
		console.log(event.target)
		console.log(scroll.direction)
		console.log(scroll.thumbPosition)
	})
	scroll.stateChanged(function(event){
		console.log('state changed to: ' + event)
	})


	// create progress bar
	var progress = new MyToolkit.ProgressBar(draw);
	progress.move(20, 400);
	progress.size(200, 10);
	setInterval(inc, 1000);
	var p = 0;
	function inc(){
		p += 20
		if (p > 200){
			p = 0;
			progress.setProgress(p); 
		}
		else {
			progress.setProgress(p);
		}
	}
	progress.onincrement(function(event){
		// console.log(event)
	})
	progress.stateChanged(function(event){
		console.log('state changed to: ' + event)
	})

	
	// custom: toggle switch
	var toggle = new MyToolkit.ToggleSwitch(draw);
	toggle.move(300, 250);
	toggle.onclick(function(event){
		console.log(event)
		console.log(event.target)
	})
	toggle.stateChanged(function(event){
		console.log('state changed to: ' + event)
	})

	// add widgets to frame
	frame.add(btn.src);
	frame.add(checkbox.src);
	frame.add(radioButton.src);
	frame.add(textbox.src);
	frame.add(progress.src);
	frame.add(toggle.src);
})