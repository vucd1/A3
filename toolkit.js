import {SVG} from './svg.min.js';
import {Colors} from './colors.js';

var MyToolkit = (function() {
    var Button = class{
        // TO-DO:
        // - consider longer text (elongating button or adding '...')

        // REQUIREMENTS:
        // Visually change for at least 3 states (e.g., color change on hover)
        // Expose a custom label property to set the text on the button
        // Expose an event handler that notifies consuming code when the button is clicked
        // Expose an event handler that notifies consuming code when the widget state has changed

        //create button component
        constructor(draw, w=100, h=40){
            this.draw = draw;
            this.width = w;
            this.height = h;
            this.button = draw.group();
            this.input = 'Button'
            this.rect = this.button.rect(this.width, this.height)
                .fill({color: Colors.lightblue})
                .radius(10);
            this.buttonText = this.button.text(this.input)
                .font({family: 'Roboto',
                        size: 14,
                        anchor: 'middle'})
                .move(this.width/4, this.height/4);

            // define widget states
            this.clickEvent = null
            this.stateEvent = null
            this.defaultState = 'idle'
            this.registerEvent(this.button);
        }

        registerEvent(obj){
            obj.click((event) => {
            })
            obj.mouseover((event) => {
                this.rect.fill({ color: Colors.blue})
                this.defaultState = 'hover'
                this.transition()
            })
            obj.mouseout((event) => {
                this.rect.fill({ color: Colors.lightblue})
                this.defaultState = 'idle'
                this.transition()
            })
            obj.mousedown((event) => {
                this.rect.fill({ color: Colors.darkblue})
                this.defaultState = 'pressed'
                this.transition()
            })
            obj.mouseup((event) => {
                this.rect.fill({ color: Colors.lightblue})
                if(this.defaultState == 'pressed'){
                    if(this.clickEvent != null)
                        this.clickEvent(event)
                }
                this.defaultState = 'up'
                this.transition()
            })
        }
        transition(){
            if(this.stateEvent != null)
                this.stateEvent(this.defaultState)
        }

        handleEvent(e) {
            switch(e.type) {
                case "click":
                    this.clickEvent(e);
                break;
                case "mouseover":
                    this.mouseOverEvent(e);
                break;
                case "mouseout":
                    this.mouseOutEvent(e);
                break;
                case "mousedown":
                    this.mouseDownEvent(e);
                break;
                case "mouseup":
                    this.mouseUpEvent(e);
                break;
            }
        }

        update(){
            if(this.buttonText != null){
                this.buttonText.text(this.input)
            }
        }


        move(x, y) {
            this.button.move(x, y);
        }
        onclick(eventHandler) {
            this.clickEvent = eventHandler
        }
        stateChanged(eventHandler) {
            // console.log(eventHandler)
            this.stateEvent = eventHandler
        }
        src() {
            return this.button;
        }
        set text(text) {
            this.input = text;
            this.update();
        }
    }

    var CheckBox = class{
        // REQUIREMENTS:
        // Visually support checked and unchecked states
        // Expose a custom label property to set the text that appears to the RIGHT of the check box
        // Expose an event handler that notifies consuming code when the checked state has changed
        // Expose an event handler that notifies consuming code when the widget state has changed

        constructor(draw){
            this.draw = draw;
            this.width = 20;
            this.height = 20;
            this.checkbox = draw.group();
            this.input = 'Checkbox'
            this.rect = this.checkbox.rect(this.width, this.height)
                .fill({color: 'white'})
                .stroke({ color: 'gray', width: 1});
            this.checkBoxText = this.checkbox.text('Checkbox')
                .font({family: 'Roboto', size: 14})
                .move(this.width*1.5, 0);


            // define widget states
            this.checkedEvent = null
            this.checkedState = 'unchecked'
            this.stateEvent = null
            this.defaultState = 'idle'
            this.registerEvent(this.checkbox)
        }

        registerEvent(obj){
            obj.click((event) => {
            })
            obj.mouseover((event) => {
                this.defaultState = 'hover'
                this.transition()
            })
            obj.mouseout((event) => {
                this.defaultState = 'idle'
                this.transition()
            })
            obj.mousedown((event) => {
                this.defaultState = 'pressed'
                this.transition()
            })
            obj.mouseup((event) => {
                if(this.defaultState == 'pressed'){
                    if(this.checkedEvent != null)
                        this.checkedEvent(event);
                        if(this.checkedState == 'unchecked'){
                            this.checkedState = 'checked'
                            this.rect.fill({color: Colors.blue})
                            this.rect.stroke({color: Colors.blue})
                        }
                        else {
                            this.checkedState = 'unchecked'
                            this.rect.fill({color: Colors.white})
                            this.rect.stroke({color: Colors.black})
                        }
                }
                this.defaultState = 'up'
                this.transition()
            })
        }

        transition(){
            if(this.stateEvent != null)
                this.stateEvent(this.defaultState)
        }

        handleEvent(e) {
            switch(e.type) {
                case "click":
                    this.clickEvent(e);
                break;
                case "mouseover":
                    this.mouseOverEvent(e);
                break;
                case "mouseout":
                    this.mouseOutEvent(e);
                break;
                case "mousedown":
                    this.mouseDownEvent(e);
                break;
                case "mouseup":
                    this.mouseUpEvent(e);
                break;
            }
        }

        update(){
            if(this.checkBoxText != null){
                this.checkBoxText.text(this.input)
            }
        }


        move(x, y) {
            this.checkbox.move(x, y);
        }
        onclick(eventHandler) {
            this.clickEvent = eventHandler
        }
        stateChanged(eventHandler) {
            // console.log(eventHandler)
            this.stateEvent = eventHandler
        }
        src() {
            return this.checkbox;
        }
        set text(text) {
            this.input = text;
            this.update();
        }

        // // create checkbox widget
        // var width = 20;
        // var height = 20;
        // var checkbox  = draw.group();
        // var rect = checkbox.rect(width, height).fill({color: 'white'}).stroke({ color: 'gray', width: 1});
        // var text = checkbox.text('Checkbox').font({family: 'Roboto', size: 14}).move(width*1.5, 0);

        // // define state vars
        // var checkedEvent = null;
        // var checkedState = 'unchecked';
        // var stateEvent = null;
        // var defaultState = 'idle';

        // // action states
        // rect.mouseover(function(){
        //     defaultState = 'hover'
        //     transition()
        // })
        // rect.mouseout(function(){
        //     defaultState = 'idle'
        //     transition()
        // })
        // rect.mousedown(function(){
        //     defaultState = 'pressed'
        //     transition()
        // })
        // rect.mouseup(function(event){
        //     if(defaultState == 'pressed'){
        //         if(checkedEvent != null)
        //         checkedEvent(event);
        //             if(checkedState == 'unchecked'){
        //                 checkedState = 'checked'
        //                 this.fill({color: Colors.blue})
        //                 this.stroke({color: Colors.blue})
        //             }
        //             else {
        //                 checkedState = 'unchecked'
        //                 this.fill({color: Colors.white})
        //                 this.stroke({color: Colors.black})
        //             }
        //     }
        //     defaultState = 'up'
        //     transition()
        // })

        // function transition(){
        //     if(stateEvent != null)
        //         stateEvent(defaultState)
        // }

        // return {
        //     move: function(x, y) {
        //         checkbox.move(x, y);
        //     },
        //     onclick: function(eventHandler){
        //         checkedEvent = eventHandler
        //     },
        //     stateChanged: function(eventHandler){
        //         stateEvent = eventHandler
        //     },
        //     src: function() {
        //         return checkbox;
        //     },
        //     setText: function(msg) {
        //         text.clear();
        //         text.text(msg);
        //     }
        // }

        
    }

    var RadioButton = function(draw, msg, isChecked, heightIncr=0){
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

        // create radio button widget
        var width = 20;
        var height = 20;
        var whitespace = 3;
        var radioButton  = draw.group();
        var circle = radioButton.circle(width, height)
            .fill({color: 'white'})
            .stroke({ color: Colors.black, width: 1})
            .move(whitespace, heightIncr+whitespace);
        var text = radioButton.text(msg)
            .font({family: 'Roboto', size: 14})
            .move(width*1.5+whitespace, heightIncr+whitespace);

        // define state vars
        var clickEvent = null;
        var checkedState = isChecked; // true if checked; false otherwise
        var stateEvent = null;
        var defaultState = 'idle';

        // action states
        circle.mouseover(function(){
            defaultState = 'hover'
            transition()
        })
        circle.mouseout(function(){
            defaultState = 'idle'
            transition()
        })
        circle.mousedown(function(){
            defaultState = 'pressed'
            transition()
        })
        circle.mouseup(function(event){
            if(defaultState == 'pressed'){
                if(clickEvent != null)
                    clickEvent(event)
                    checkedState = !checkedState;

                    // modify appearance
                    if(checkedState){
                        this.fill({color: Colors.blue})
                        this.stroke({color: Colors.blue})
                    }
                    else {
                        this.fill({color: Colors.white})
                        this.stroke({color: Colors.black})
                    }
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
            },
            setText: function(msg) {
                text.clear();
                text.text(msg);
            },
            src: radioButton,
            getCheckedState: checkedState
        }
    }

    var RadioButtons = function(draw, radioAttr){
        // attributes
        var frameWidth = 150;
        var frameHeight = 30;
        var heightIncr = 30;
        var attributes = [...radioAttr]; //clone array
        var activeButton = -1; // -1 if none selected or the value of the button (starting from 0)

        var clickEvent = null;
        var checkedState = isChecked; // true if checked; false otherwise
        var stateEvent = null;
        var defaultState = 'idle';

        // frame
        var frame = draw.group();
        var rect = frame.rect(frameWidth, frameHeight*radioAttr.length).fill({color: Colors.seafoam, opacity: 100});

        // create a list of radio buttons
        var radioButtonList = [];
        for (var i = 0; i < attributes.length; i++){
            var msg = attributes[i][0];
            var isChecked = attributes[i][1];
            var radioButton = new RadioButton(draw, msg, isChecked, heightIncr*i);
            radioButtonList.push(radioButton);
        }

        for(var i = 0; i < radioButtonList.length; i++) {
            radioButtonList[i].src.addEventListener('click', bindClick(i));
            radioButtonList[i].src.addEventListener('mouseover', bindMouseOver(i));
            radioButtonList[i].src.addEventListener('mouseout', bindMouseOut(i));
            radioButtonList[i].src.addEventListener('mousedown', bindMouseDown(i));
            radioButtonList[i].src.addEventListener('mouseup', e => {bindMouseUp(i, e)});
        }
     
        function bindClick(i) {
            // console.log("you clicked region number " + i);
        }

        function bindMouseOver(i){
            defaultState = 'hover'
            transition()
        }
        function bindMouseOut(i){
            defaultState = 'idle'
            transition()
        }
        function bindMouseDown(i){
            defaultState = 'pressed'
            transition()
        }
        function bindMouseUp(i, event){
            if(defaultState == 'pressed'){
                console.log('hi there');
                if(clickEvent != null)
                    clickEvent(event)
                    checkedState = !checkedState;

                    // modify appearance
                    if(checkedState){
                        this.fill({color: Colors.blue})
                        this.stroke({color: Colors.blue})
                    }
                    else {
                        this.fill({color: Colors.white})
                        this.stroke({color: Colors.black})
                    }
                    console.log('checked state is:' + checkedState)
            }
            defaultState = 'up'
            transition()
        }

        function transition(){
            if(stateEvent != null)
                stateEvent(defaultState)
        }

        

        // function: get a dict of position: checkedState(true or false)
        function getCheckedStates(){
            var states = {}; 
            for (var i = 0; i < radioButtonList.length; i++){
                states[i] = radioButtonList[i].getCheckedState;
            }
            return states;
        }

        // when the mouse is up, check if a radio button has been pressed
        // if true, uncheck the previous button
        // change activeButton var
        // check new button
        // frame.mouseup(function(event){
            // console.log('mouseup');
            // this.fill({ color: Colors.lightblue})
            // if the radio group has been pressed...
            // if(defaultState == 'pressed'){
                // if a radio button has been pressed...
                // loop thru and check on click?????? how does onclick/check actually work??
                // var states = getCheckedStates();
                // for (var i = 0; i < states.length; i++){
                //     states[i]
                // }
                // if(checkedState == 'unchecked'){
                //     checkedState = 'checked'
                //     this.fill({color: Colors.blue})
                //     this.stroke({color: Colors.blue})
                // }
                // else {
                //     checkedState = 'unchecked'
                //     this.fill({color: Colors.white})
                //     this.stroke({color: Colors.black})
                // }
        //     }
        //     defaultState = 'up'
        //     transition()
        // })

        return {
            move: function(x, y) {
                frame.move(x, y);
                for (var i = 0; i < radioButtonList.length; i++){
                    radioButtonList[i].move(x, y + (heightIncr*i));
                }
            },
            onclick: function(){
                for (var rb in radioButtonList){
                    console.log(rb.getCheckedState);
                    rb.onclick;
                }
            },
            stateChanged: function(eventHandler){
                stateEvent = eventHandler;
            },
            src: function() {
                return radioButtonList;
            },
            setText: function(buttonNumber, msg) {
                //takes a number from 1 to n
                radioButtonList[buttonNumber-1].setText(msg);
            }
        }
    }

    var TextBox = function(draw){
        // TO DO:
        // - consider caret with whitespace at the end of text. does not consider it (spaces)
        // - caret should only be visible on hover focus

        // REQUIREMENTS:
        // Visually support a caret | that informs the user about the position of the cursor. 
        //      The caret should only be visually present when the widget has hover focus.
        // Expose a custom property to get the text entered by the user.
        // Expose an event handler that notifies consuming code when the text has changed. [???]
        // Expose an event handler that notifies consuming code when the widget state has changed. [done]

        var textbox = draw.group();
        var rect = textbox.rect(200, 30).fill('white').stroke('black');
        var text = textbox.text('').move(5, 0)
        var caret = textbox.rect(2, 16).move(text.length()+6, 7)
        var runner = caret.animate().width(0)
        runner.loop(1000, 1, 0)
    
        SVG.on(window, 'keyup', (event) => {
            // text can go to the end and then stop
            // console.log(event)
            var key = event.key
            if (key == 'Backspace'){
                var msg = text.text()
                text.text(msg.substring(0, msg.length-1))	
            }
            else if (event.altKey || event.ctrlKey) {
                // do nothing
                // otherwise, the letter will print
            }
            else if (event.key.length == 1){
                if (text.length() < 186) {
                    if (event.shiftKey){
                        text.text(text.text() + event.key.toUpperCase())
                    }
                    else {
                        text.text(text.text() + event.key)
                    }
                }
                
            }
            caret.x(textbox.x()+text.length()+6)
        })


        // define widget states
        var clickEvent = null
        var stateEvent = null
        var defaultState = 'idle'

        // action states
        rect.mouseover(function(){
            // if the user just clicked and is still hovering, show the caret
            // if(defaultState = 'up'){
            //     caret.show();
            // }
            defaultState = 'hover'
            transition()
        })
        rect.mouseout(function(){
            defaultState = 'idle'
            transition()
        })
        rect.mousedown(function(){
            defaultState = 'pressed'
            transition()
        })
        rect.mouseup(function(event){
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
                textbox.move(x, y);
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            },
            src: function() {
                return textbox;
            },
            setText: function(msg) {
                text.clear();
                text.text(msg);
            }
        }
    }

    var ScrollBar = function(draw){
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

    var ProgressBar = function(draw, w=200, h=15, i=25){
        // REQUIREMENTS:
        // Expose a custom property to set the width of the progress bar.
        // Expose a custom property to set the increment value of the progress bar.
        // Expose a custom property to get the increment value of the progress bar.
        // Expose a custom method to increment the value of the progress bar. The method should support an arbitrary numerical value from 0-100.
        //      if 0, progress bar should be empty... and so on
        //      "as long as your code provides a way for calling code to change the value
        //      (or progress) of the widget"
        // Expose an event handler that notifies consuming code when the progress bar has incremented.
        // Expose an event handler that notifies consuming code when the widget state has changed.

        //attributes
        var width = w;
        var height = h;

        // var attr = {
        //     width: w,
        //     height: h,
        //     // custom property to set the increment value of the progress bar
        //     set progress(value) {
        //         console.log(value)
        //         width = value
        //         innerRect.width(value)
        //     },
        //     // custom property to get the increment value of the progress bar
        //     get progress() {
        //         return width
        //     }
        // }

        // create progress bar
        var progressBar = draw.group();
        var outterRect = progressBar.rect(width, height).fill('white').stroke('black');
        var innerRect = progressBar.rect(width, height).fill('green');


        // define widget states
        var clickEvent = null
        var stateEvent = null
        var defaultState = 'idle'

        // action states
        outterRect.mouseover(function(){
            // if the user just clicked and is still hovering, show the caret
            // if(defaultState = 'up'){
            //     caret.show();
            // }
            defaultState = 'hover'
            transition()
        })
        outterRect.mouseout(function(){
            defaultState = 'idle'
            transition()
        })
        outterRect.mousedown(function(){
            defaultState = 'pressed'
            transition()
        })
        outterRect.mouseup(function(event){
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
                progressBar.move(x, y);
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            },
            src: function() {
                return textbox;
            },
            size: function(w, h) {
                if (w > 10) {
                    // attr.width = w
                }
                if (h > 3) {
                    // attr.height = h;
                }
            },
            setProgress: function(value){
                innerRect.width(value)
            },

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

return {Button, CheckBox, RadioButtons, TextBox, ScrollBar, ProgressBar, ToggleSwitch}


}());

export{MyToolkit}