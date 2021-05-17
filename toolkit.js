import {SVG} from './svg.min.js';
import {Colors} from './colors.js';

var MyToolkit = (function() {
    var Button = function(draw){
        // TO-DO:
        // - consider longer text (elongating button or adding '...')

        // REQUIREMENTS:
        // Visually change for at least 3 states (e.g., color change on hover)
        // Expose a custom label property to set the text on the button
        // Expose an event handler that notifies consuming code when the button is clicked
        // Expose an event handler that notifies consuming code when the widget state has changed

        //create button component
        var width = 100;
        var height = 40;

        var button = draw.group();
        var rect = button.rect(width, height).fill({color: Colors.lightblue}).radius(10);
        var text = button.text('Button')
            .font({family: 'Roboto',
                    size: 14,
                    anchor: 'middle'})
            .move(width/4, height/4);

        // define states
        // states: idle, hover, pressed, up (mouseup?)
        var clickEvent = null
        var stateEvent = null
        var defaultState = 'idle'

        // action states
        rect.mouseover(function(){
            this.fill({ color: Colors.blue})
            defaultState = 'hover'
            transition()
        })
        rect.mouseout(function(){
            this.fill({ color: Colors.lightblue})
            defaultState = 'idle'
            transition()
        })
        rect.mousedown(function(){
            this.fill({ color: Colors.darkblue})
            defaultState = 'pressed'
            transition()
        })
        rect.mouseup(function(event){
            this.fill({ color: Colors.lightblue})
            if(defaultState == 'pressed'){
                if(clickEvent != null)
                    clickEvent(event)
            }
            defaultState = 'up'
            transition()
        })

        function transition(){
            if(stateEvent != null)
                stateEvent(defaultState)
        }

        return {
            move: function(x, y) {
                button.move(x, y);
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
                console.log(defaultState) // doesn't work??
            },
            src: function() {
                return button;
            },
            setText: function(msg) {
                text.clear();
                text.text(msg);
            }
        }
    }

    var CheckBox = function(draw){
        // REQUIREMENTS:
        // Visually support checked and unchecked states
        // Expose a custom label property to set the text that appears to the RIGHT of the check box
        // Expose an event handler that notifies consuming code when the checked state has changed
        // Expose an event handler that notifies consuming code when the widget state has changed

        // create checkbox widget
        var width = 20;
        var height = 20;
        var checkbox  = draw.group();
        var rect = checkbox.rect(width, height).fill({color: 'white'}).stroke({ color: 'gray', width: 1});
        var text = checkbox.text('Checkbox').font({family: 'Roboto', size: 14}).move(width*1.5, 0);

        // define state vars
        var checkedEvent = null;
        var checkedState = 'unchecked';
        var stateEvent = null;
        var defaultState = 'idle';

        // action states
        rect.mouseover(function(){
            // this.fill({ color: 'white'})
            defaultState = 'hover'
            transition()
        })
        rect.mouseout(function(){
            // this.fill({ color: 'white'})
            defaultState = 'idle'
            transition()
        })
        rect.mousedown(function(){
            // this.fill({ color: Colors.blue})
            // this.stroke({color: Colors.blue})
            defaultState = 'pressed'
            transition()
        })
        rect.mouseup(function(event){
            // this.fill({ color: Colors.lightblue})
            if(defaultState == 'pressed'){
                if(checkedEvent != null)
                    checkedEvent(event)
                    if(checkedState == 'unchecked'){
                        checkedState = 'checked'
                        this.fill({color: Colors.blue})
                        this.stroke({color: Colors.blue})
                    }
                    else {
                        checkedState = 'unchecked'
                        this.fill({color: Colors.white})
                        this.stroke({color: Colors.black})
                    }
                    console.log('checkedState: ' + checkedState)
            }
            defaultState = 'up'
            transition()
        })

        function transition(){
            if(stateEvent != null)
                stateEvent(defaultState)
        }

        return {
            move: function(x, y) {
                checkbox.move(x, y);
            },
            onclick: function(eventHandler){
                checkedEvent = eventHandler
            },
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
                console.log('defaultstate: ' + defaultState) // doesn't work??
                
            },
            src: function() {
                return checkbox;
            },
            setText: function(msg) {
                text.clear();
                text.text(msg);
            }
        }
    }

    var RadioButton = function(draw, n = 2){
         // REQUIREMENTS:
         // visually support checked and unchecked states [done]
         // support 2 to n numbers of buttons, where n is set 
         //     by the consuming code, with minimum of two, positioned vertically
         // ensure that only one button can be checked at a time
         // expose a custom label property to set the text that appears to the RIGHT of each button
         // expose an event handler that notifies consuming code when the checked state has changed
         //     and which n has been checked
         // expose an event handler that notifies consuming code when the widget state has changed [done]

         // QUESTIONS:
         // - do i need to handle errors? n = 1

        // attributes
        var width = 20;
        var height = 20;
        // var radioCount = n; //default values in js???

        // create checkbox widget
        var radioButton  = draw.group();
        var circle = radioButton.circle(width, height).fill({color: 'white'}).stroke({ color: Colors.black, width: 1});
        var text = radioButton.text('Radio Button 1').font({family: 'Roboto', size: 14}).move(width*1.5, 0);

        // define state vars
        var checkedEvent = null;
        var checkedState = 'unchecked';
        var stateEvent = null;
        var defaultState = 'idle';

        // action states
        circle.mouseover(function(){
            // this.fill({ color: 'white'})
            defaultState = 'hover'
            transition()
        })
        circle.mouseout(function(){
            // this.fill({ color: 'white'})
            defaultState = 'idle'
            transition()
        })
        circle.mousedown(function(){
            // this.fill({ color: Colors.blue})
            // this.stroke({color: Colors.blue})
            defaultState = 'pressed'
            transition()
        })
        circle.mouseup(function(event){
            // this.fill({ color: Colors.lightblue})
            if(defaultState == 'pressed'){
                if(checkedEvent != null)
                    checkedEvent(event)
                    if(checkedState == 'unchecked'){
                        checkedState = 'checked'
                        this.fill({color: Colors.blue})
                        this.stroke({color: Colors.blue})
                    }
                    else {
                        checkedState = 'unchecked'
                        this.fill({color: Colors.white})
                        this.stroke({color: Colors.black})
                    }
                    console.log('checkedState: ' + checkedState)
            }
            defaultState = 'up'
            transition()
        })

        function transition(){
            if(stateEvent != null)
                stateEvent(defaultState)
        }

        return {
            move: function(x, y) {
                radioButton.move(x, y);
            },
            onclick: function(eventHandler){
                checkedEvent = eventHandler
            },
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
                console.log('defaultstate: ' + defaultState) // doesn't work??
                
            },
            src: function() {
                return radioButton;
            },
            setText: function(msg) {
                text.clear();
                text.text(msg);
            },
            setAmount: function(value){

            }
        }
    }

    var TextBox = function(draw){
        //doesn't work!!
        // var draw = SVG().addTo('body').size('1000px','1000px');
        // var window = draw.group();
        // window.rect(400, 400).stroke('orange').fill('white');

        var textbox = draw.group();
        var rect = textbox.rect(200, 30).fill('white').stroke('black');
        var text = textbox.text('hello').move(2, 4);
        var caret = textbox.line(45, 2.5, 45, 25).stroke({width: 1, color: 'black'});
        return {
            move: function(x, y) {
                textbox.move(x, y);
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            src: function(){
                return textbox;
            }
        }
        // group.move(100, 100);
        // window.add(group);
        // window.move(100, 100);
    }

    var ScrollBar = function(){
        var draw = SVG().addTo('body').size('100%','100%');
        var rect = draw.rect(100,50).fill('purple')
        var clickEvent = null

        rect.mouseover(function(){
            this.fill({ color: 'blue'})
        })
        rect.mouseout(function(){
            this.fill({ color: 'red'})
        })
        rect.mouseup(function(){
            this.fill({ color: 'red'})
        })
        rect.click(function(event){
            this.fill({ color: 'pink'})
            if(clickEvent != null)
                clickEvent(event)
        })
        return {
            move: function(x, y) {
                rect.move(x, y);
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            }
        }
    }

    var ProgressBar = function(){
        var draw = SVG().addTo('body').size('100%','100%');
        var rect = draw.rect(100,50).fill('purple')
        var clickEvent = null

        rect.mouseover(function(){
            this.fill({ color: 'blue'})
        })
        rect.mouseout(function(){
            this.fill({ color: 'red'})
        })
        rect.mouseup(function(){
            this.fill({ color: 'red'})
        })
        rect.click(function(event){
            this.fill({ color: 'pink'})
            if(clickEvent != null)
                clickEvent(event)
        })
        return {
            move: function(x, y) {
                rect.move(x, y);
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            }
        }
    }

    // custom widget
    var ToggleSwitch = function(){
        var draw = SVG().addTo('body').size('100%','100%');
        var rect = draw.rect(100,50).fill('purple')
        var clickEvent = null

        rect.mouseover(function(){
            this.fill({ color: 'blue'})
        })
        rect.mouseout(function(){
            this.fill({ color: 'red'})
        })
        rect.mouseup(function(){
            this.fill({ color: 'red'})
        })
        rect.click(function(event){
            this.fill({ color: 'pink'})
            if(clickEvent != null)
                clickEvent(event)
        })
        return {
            move: function(x, y) {
                rect.move(x, y);
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            }
        }
    }

return {Button, CheckBox, RadioButton, TextBox, ScrollBar, ProgressBar, ToggleSwitch}


}());

export{MyToolkit}