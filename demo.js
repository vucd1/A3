import { SVG } from '@svgdotjs/svg.js';
import {MyToolkit} from './mytoolkit.js';

// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
btn.move(100,100);
btn.onclick(function(e){
	console.log(e);
});


// SVG.on(document, 'DOMContentLoaded', function() {
// 	var btn = new Button;
// 	btn.onclick(function(event) {
// 		console.log('clicked')
// 	})
// })


// var draw = SVG().addTo('#someId').size('100%', '100%')
// SVG.on(document, 'DOMContentLoaded', function() {
// 	var draw = SVG().addTo('body')
//   })


// import { SVG } from '@svgdotjs/svg.js'

// SVG.on(document, 'DOMContentLoaded', function() {
//     var draw = SVG().addTo('body').size('1000px', '1000px');
//     var window = draw.group();
//     window.rect(400, 400).stroke('orange').fill('white');

//     var group = draw.group();
//     var rect = group.rect(200, 30).fill('white').stroke('black');
//     var text = group.text('hello').move(2, 4);
//     var caret = group.line(45, 2.5, 45, 25).stroke({width: 1, color: 'black'});

//     group.move(100, 100);
    
//     window.add(group);
//     window.move(100, 100);
// });

