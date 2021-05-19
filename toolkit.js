import {SVG} from './svg.min.js';
import {Colors} from './colors.js';

var MyToolkit = (function() {
    var Button = class{
        // REQUIREMENTS:
        // Visually change for at least 3 states (e.g., color change on hover)
        // Expose a custom label property to set the text on the button
        // Expose an event handler that notifies consuming code when the button is clicked
        // Expose an event handler that notifies consuming code when the widget state has changed

        //create button component
        constructor(draw, w=125, h=40){
            this.draw = draw;
            this.width = w;
            this.height = h;
            this.button = this.draw.group();
            this.input = 'Button'
            this.rect = this.button.rect(this.width, this.height)
                .fill({color: Colors.lightblue})
                .radius(10);
            this.buttonText = this.button.text(this.input)
                .font({family: 'Roboto',
                        size: 14,
                        anchor: 'middle'})
                .move(this.width/3, this.height/4);

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
            this.checkbox = this.draw.group();
            this.input = 'Checkbox'
            this.rect = this.checkbox.rect(this.width, this.height)
                .fill({color: 'white'})
                .stroke({ color: 'gray', width: 1});
            this.checkBoxText = this.checkbox.text(this.input)
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

        update(){
            if(this.checkBoxText != null){
                this.checkBoxText.text(this.input)
            }
        }


        move(x, y) {
            this.checkbox.move(x, y);
        }
        onclick(eventHandler) {
            this.checkedEvent = eventHandler
        }
        stateChanged(eventHandler) {
            this.stateEvent = eventHandler
        }
        src() {
            return this.checkbox;
        }
        set text(text) {
            this.input = text;
            this.update();
        }
        
    }

    var RadioButton = class {
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
        // function(draw, msg, isChecked, heightIncr=0)
        constructor(draw, radioAttr){
            // appearance
            this.width = 20;
            this.height = 20;
            this.whitespace = 3;
            this.heightIncr = 30;

            // radio attributes
            this.attributes = [...radioAttr];
            
            // create group of radio buttons
            this.radioButtonList = [];
            this.radioButtonGroup = draw.group();
            for (var i = 0; i < this.attributes.length; i++){
                //create radio button
                this.radioButton = this.radioButtonGroup.group();
                this.input = this.attributes[i][0]
                this.circle = this.radioButton.circle(this.width)
                    .fill({color: Colors.white})
                    .stroke({color:'gray', width: 1})
                    .move(0, this.heightIncr*i);
                this.radioButtonText = this.radioButton.text(this.input)
                    .font({family: 'Roboto', size: 14})
                    .move(this.width*1.5+this.whitespace, this.heightIncr*i);
                this.registerEvent(this.circle)
                this.radioButtonList.push(this.radioButton)
                // console.log(this.radioButtonList)
        
            }
            

            // define widget states
            // this.checkedEvent = null
            // this.checkedState = isChecked
            this.stateEvent = null
            this.defaultState = 'idle'
            
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
                            obj.fill({color: Colors.blue})
                            obj.stroke({color: Colors.blue})
                        }
                        else {
                            this.checkedState = 'unchecked'
                            obj.fill({color: Colors.white})
                            obj.stroke({color: 'gray'})
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

        update(){
            if(this.radioButtonText != null){
                this.radioButtonText.text(this.input)
            }
        }


        move(x, y) {
            this.radioButtonGroup.move(x, y);
        }
        onclick(eventHandler) {
            this.clickEvent = eventHandler
        }
        stateChanged(eventHandler) {
            this.stateEvent = eventHandler
        }
        src() {
            return this.radioButton;
        }
        set text(text) {
            this.input = text;
            this.update();
        }


        // var width = 20;
        // var height = 20;
        // var whitespace = 3;
        // var radioButton  = draw.group();
        // var circle = radioButton.circle(width, height)
        //     .fill({color: 'white'})
        //     .stroke({ color: Colors.black, width: 1})
        //     .move(whitespace, heightIncr+whitespace);
        // var text = radioButton.text(msg)
        //     .font({family: 'Roboto', size: 14})
        //     .move(width*1.5+whitespace, heightIncr+whitespace);

        // // define state vars
        // var clickEvent = null;
        // var checkedState = isChecked; // true if checked; false otherwise
        // var stateEvent = null;
        // var defaultState = 'idle';

        // // action states
        // circle.mouseover(function(){
        //     defaultState = 'hover'
        //     transition()
        // })
        // circle.mouseout(function(){
        //     defaultState = 'idle'
        //     transition()
        // })
        // circle.mousedown(function(){
        //     defaultState = 'pressed'
        //     transition()
        // })
        // circle.mouseup(function(event){
        //     if(defaultState == 'pressed'){
        //         if(clickEvent != null)
        //             clickEvent(event)
        //             checkedState = !checkedState;

        //             // modify appearance
        //             if(checkedState){
        //                 this.fill({color: Colors.blue})
        //                 this.stroke({color: Colors.blue})
        //             }
        //             else {
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
        //         radioButton.move(x, y);
        //     },
        //     onclick: function(eventHandler){
        //         checkedEvent = eventHandler
        //     },
        //     stateChanged: function(eventHandler){
        //         stateEvent = eventHandler                
        //     },
        //     setText: function(msg) {
        //         text.clear();
        //         text.text(msg);
        //     },
        //     src: radioButton,
        //     getCheckedState: checkedState
        // }
    }

    // var RadioButtons = function(draw, radioAttr){
    //     // attributes
    //     var frameWidth = 150;
    //     var frameHeight = 30;
    //     var heightIncr = 30;
    //     var attributes = [...radioAttr]; //clone array
    //     var activeButton = -1; // -1 if none selected or the value of the button (starting from 0)

    //     var clickEvent = null;
    //     var checkedState = isChecked; // true if checked; false otherwise
    //     var stateEvent = null;
    //     var defaultState = 'idle';

    //     // frame
    //     var frame = draw.group();
    //     var rect = frame.rect(frameWidth, frameHeight*radioAttr.length).fill({color: Colors.seafoam, opacity: 100});

    //     // create a list of radio buttons
    //     var radioButtonList = [];
    //     for (var i = 0; i < attributes.length; i++){
    //         var msg = attributes[i][0];
    //         var isChecked = attributes[i][1];
    //         var radioButton = new RadioButton(draw, msg, isChecked, heightIncr*i);
    //         radioButtonList.push(radioButton);
    //     }

    //     for(var i = 0; i < radioButtonList.length; i++) {
    //         radioButtonList[i].src.addEventListener('click', bindClick(i));
    //         radioButtonList[i].src.addEventListener('mouseover', bindMouseOver(i));
    //         radioButtonList[i].src.addEventListener('mouseout', bindMouseOut(i));
    //         radioButtonList[i].src.addEventListener('mousedown', bindMouseDown(i));
    //         radioButtonList[i].src.addEventListener('mouseup', e => {bindMouseUp(i, e)});
    //     }
     
    //     function bindClick(i) {
    //         // console.log("you clicked region number " + i);
    //     }

    //     function bindMouseOver(i){
    //         defaultState = 'hover'
    //         transition()
    //     }
    //     function bindMouseOut(i){
    //         defaultState = 'idle'
    //         transition()
    //     }
    //     function bindMouseDown(i){
    //         defaultState = 'pressed'
    //         transition()
    //     }
    //     function bindMouseUp(i, event){
    //         if(defaultState == 'pressed'){
    //             console.log('hi there');
    //             if(clickEvent != null)
    //                 clickEvent(event)
    //                 checkedState = !checkedState;

    //                 // modify appearance
    //                 if(checkedState){
    //                     this.fill({color: Colors.blue})
    //                     this.stroke({color: Colors.blue})
    //                 }
    //                 else {
    //                     this.fill({color: Colors.white})
    //                     this.stroke({color: Colors.black})
    //                 }
    //                 console.log('checked state is:' + checkedState)
    //         }
    //         defaultState = 'up'
    //         transition()
    //     }

    //     function transition(){
    //         if(stateEvent != null)
    //             stateEvent(defaultState)
    //     }

        

    //     // function: get a dict of position: checkedState(true or false)
    //     function getCheckedStates(){
    //         var states = {}; 
    //         for (var i = 0; i < radioButtonList.length; i++){
    //             states[i] = radioButtonList[i].getCheckedState;
    //         }
    //         return states;
    //     }

    //     // when the mouse is up, check if a radio button has been pressed
    //     // if true, uncheck the previous button
    //     // change activeButton var
    //     // check new button
    //     // frame.mouseup(function(event){
    //         // console.log('mouseup');
    //         // this.fill({ color: Colors.lightblue})
    //         // if the radio group has been pressed...
    //         // if(defaultState == 'pressed'){
    //             // if a radio button has been pressed...
    //             // loop thru and check on click?????? how does onclick/check actually work??
    //             // var states = getCheckedStates();
    //             // for (var i = 0; i < states.length; i++){
    //             //     states[i]
    //             // }
    //             // if(checkedState == 'unchecked'){
    //             //     checkedState = 'checked'
    //             //     this.fill({color: Colors.blue})
    //             //     this.stroke({color: Colors.blue})
    //             // }
    //             // else {
    //             //     checkedState = 'unchecked'
    //             //     this.fill({color: Colors.white})
    //             //     this.stroke({color: Colors.black})
    //             // }
    //     //     }
    //     //     defaultState = 'up'
    //     //     transition()
    //     // })

    //     return {
    //         move: function(x, y) {
    //             frame.move(x, y);
    //             for (var i = 0; i < radioButtonList.length; i++){
    //                 radioButtonList[i].move(x, y + (heightIncr*i));
    //             }
    //         },
    //         onclick: function(){
    //             for (var rb in radioButtonList){
    //                 console.log(rb.getCheckedState);
    //                 rb.onclick;
    //             }
    //         },
    //         stateChanged: function(eventHandler){
    //             stateEvent = eventHandler;
    //         },
    //         src: function() {
    //             return radioButtonList;
    //         },
    //         setText: function(buttonNumber, msg) {
    //             //takes a number from 1 to n
    //             radioButtonList[buttonNumber-1].setText(msg);
    //         }
    //     }
    // }

    var TextBox = class{
        // REQUIREMENTS:
        // Visually support a caret | that informs the user about the position of the cursor. 
        //      The caret should only be visually present when the widget has hover focus.
        // Expose a custom property to get the text entered by the user.
        // Expose an event handler that notifies consuming code when the text has changed.
        // Expose an event handler that notifies consuming code when the widget state has changed.

        //create textbox component
        constructor(draw){
            this.draw = draw;
            this.width = 200;
            this.height = 30;
            this.textbox = draw.group();
            this.rect = this.textbox.rect(200, 30).fill('white').stroke('black');
            this._text = this.textbox.text('').move(5, 0);
            this.caret = this.textbox.rect(2, 16).move(this._text.length()+6, 7);
            this.runner = this.caret.animate().width(0)
            this.runner.loop(1000, 1, 0)

            // define widget states
            this.keyEvent = null
            this.stateEvent = null
            this.defaultState = 'idle'
            this.registerEvent(this.textbox);
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
                    if(this.clickEvent != null)
                        this.clickEvent(event)
                }
                this.defaultState = 'up'
                this.transition()
            })
            SVG.on(window, 'keyup', (event) => {
                // text can go to the end and then stop
                // console.log(event)
                if(this.keyEvent != null)
                    this.keyEvent(event)
                
                var key = event.key
                if (key == 'Backspace'){
                    var msg = this._text.text()
                    this._text.text(msg.substring(0, msg.length-1))	
                }
                else if (event.altKey || event.ctrlKey) {
                    // do nothing
                    // otherwise, the letter will print
                }
                else if (event.key.length == 1){
                    if (this._text.length() < 186) {
                        if (event.shiftKey){
                            this._text.text(this._text.text() + event.key.toUpperCase())
                        }
                        else {
                            this._text.text(this._text.text() + event.key)
                        }
                    }
                }
                this.caret.x(this.textbox.x()+this._text.length()+6)
            })
        }
        transition(){
            if(this.stateEvent != null)
                this.stateEvent(this.defaultState)
        }

        update(){
            if(this.buttonText != null){
                this.buttonText.text(this._text)
            }
        }


        move(x, y) {
            this.textbox.move(x, y);
        }
        onkeypress(eventHandler) {
            this.keyEvent = eventHandler
        }
        stateChanged(eventHandler) {
            // console.log(eventHandler)
            this.stateEvent = eventHandler
        }
        src() {
            return this.textbox;
        }
        get text() {
            return this._text.text()
        }
    }

    var ScrollBar = class {
        // REQUIREMENTS:
        // Expose a custom property to set the height of the scroll bar.
        // Expose a custom property to get the position of the scroll thumb.
        // Expose an event handler that notifies consuming code when the scroll thumb has moved and in which direction.
        // Expose an event handler that notifies consuming code when the widget state has changed.

        constructor(draw, w=20, h=150){
            this.draw = draw;
            this._width = w;
            this._height = h;
            this._scrollHeight = h/6;
            this.arrowArray = [[3, this._width-5],[this._width/2, 3], [this._width-3, this._width-5]];
            this.currentY = 0;

            this.progressBar = draw.group();
            this.outterRect = this.progressBar.rect(this._width, this._height).fill('white').stroke('black');
            this.innerRect = this.progressBar.rect(this._width, this._scrollHeight).move(0, this._width-1).fill(Colors.gray);

            // up arrow button
            this.upArrowButton = this.progressBar.group();
            this.upArrowRect = this.upArrowButton.rect(this._width-2, this._width-2)
                .move(1, 1)
                .fill(Colors.lightgray);
            this.upArrow = this.upArrowButton.polygon()
            this.upArrow.plot(this.arrowArray)

            // down arrow button
            this.downArrowButton = this.progressBar.group();
            this.downArrowRect = this.downArrowButton.rect(this._width-2, this._width-2)
                .move(1, this._height-this._width+1)
                .fill(Colors.lightgray);
            this.downArrow = this.downArrowButton.polygon()
            this.downArrow.plot(this.arrowArray).move(3, this._height-15).rotate(180)

            // define widget states
            this.scrollEvent = null
            this.scrollDirection = 'none'
            this.stateEvent = null
            this.defaultState = 'idle'
            this.registerEvent(this.outterRect);
            this.registerEvent(this.innerRect);
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
                this.currentY = event.clientY
            })
            obj.mousemove((event) => {
                if (this.defaultState == 'pressed'){
                    if(this.scrollEvent != null)
                        this.scrollEvent(event)

                    var lowerBoundary = this.outterRect.y() + this._height - this._width
                    var lowerScrollThumbPosition = this.innerRect.y() + this._scrollHeight - 1

                    var upperBoundary = this.outterRect.y() + this._width
                    var upperScrollThumbPosition = this.innerRect.y() + 1

                    var diff = event.clientY - this.currentY
                    if (lowerScrollThumbPosition >= lowerBoundary){
                        if (diff < 0) {
                            this.innerRect.dy(diff)
                        }
                    }
                    else if (upperScrollThumbPosition <= upperBoundary){
                        if (diff > 0) {
                            this.innerRect.dy(diff)
                        }
                    }
                    else {
                        this.innerRect.dy(diff)
                    }

                    if (diff < 0) {
                        this.scrollDirection = 'up'
                    }
                    else if (diff > 0) {
                        this.scrollDirection = 'down'
                    }
                    this.currentY = event.clientY

                }

            })
            obj.mouseup((event) => {
                console.log('up')
                this.defaultState = 'up'
                this.transition()
            })
        }
        transition(){
            if(this.stateEvent != null)
                this.stateEvent(this.defaultState)
        }

        update(){
            if(this._width != null){
                this.progressBar.width(this._width)
            }
            if(this._height != null){
                this.progressBar.height(this._height)
            }
            if(this._inc != null){
                this.innerRect.width(this._inc)
            }
        }


        move(x, y) {
            this.progressBar.move(x, y);
        }
        onscroll(eventHandler) {
            this.scrollEvent = eventHandler
            
        }
        stateChanged(eventHandler) {
            this.stateEvent = eventHandler
        }
        src() {
            return this.textbox;
        }
        set width(value) {
            this._width = value;
            this.update();
        }
        set height(value) {
            this._height = value;
            this.update();
        }
        set increment(value) {
            this._inc = value;
            this.update();
        }
        get increment() {
            return this._inc
        }
        get direction() {
            return this.scrollDirection
        }
        get thumbPosition() {
            return [this.innerRect.x(), this.innerRect.y()]
        }
        size(w, h) {
            this._width = w;
            this._height = h;
            this.update();
        }
        setProgress(value) {
            this._inc = value
            this.update()
        }
    }

    var ProgressBar = class {
        // REQUIREMENTS:
        // Expose a custom property to set the width of the progress bar.
        // Expose a custom property to set the increment value of the progress bar.
        // Expose a custom property to get the increment value of the progress bar.
        // Expose a custom method to increment the value of the progress bar. The method should support an arbitrary numerical value from 0-100.
        // Expose an event handler that notifies consuming code when the progress bar has incremented.
        // Expose an event handler that notifies consuming code when the widget state has changed.

        constructor(draw, w=200, h=15){
            this.draw = draw;
            this._width = w;
            this._height = h;
            this._inc = w;

            this.progressBar = draw.group();
            this.outterRect = this.progressBar.rect(this._width, this._height).fill('white').stroke('black');
            this.innerRect = this.progressBar.rect(this._inc, this._height).fill('green');

            // define widget states
            this.incrEvent = null
            this.stateEvent = null
            this.defaultState = 'idle'
            this.registerEvent(this.outterRect);
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
                this.defaultState = 'up'
                this.transition()
            })
        }
        transition(){
            if(this.stateEvent != null)
                this.stateEvent(this.defaultState)
        }

        update(){
            if(this._width != null){
                this.progressBar.width(this._width)
            }
            if(this._height != null){
                this.progressBar.height(this._height)
            }
            if(this._inc != null){
                this.innerRect.width(this._inc)
                if(this.incrEvent != null)
                    this.incrEvent('incremented')
            }
        }


        move(x, y) {
            this.progressBar.move(x, y);
        }
        onincrement(eventHandler){
            this.incrEvent = eventHandler
        }
        stateChanged(eventHandler) {
            this.stateEvent = eventHandler
        }
        src() {
            return this.textbox;
        }
        set width(value) {
            this._width = value;
            this.update();
        }
        set height(value) {
            this._height = value;
            this.update();
        }
        set increment(value) {
            this._inc = value;
            this.update();
        }
        get increment() {
            return this._inc
        }
        size(w, h) {
            this._width = w;
            this._height = h;
            this.update();
        }
        setProgress(value) {
            this._inc = value
            this.update()
        }
    }

    // custom widget
    var ToggleSwitch = class{
        constructor(draw){
            this.draw = draw;
            this.width = 35;
            this.height = 20;
            this.toggleSwitch = draw.group();
            this.rect = this.toggleSwitch.rect(this.width, this.height)
                .fill({color: 'white'})
                .stroke({ color: Colors.gray, width: 1})
                .radius(10);
            this.circle = this.toggleSwitch.circle(this.height-4)
                .move(2,2)
                .fill(Colors.gray);


            // define widget states
            this.checkedEvent = null
            this.checkedState = 'off'
            this.stateEvent = null
            this.defaultState = 'idle'
            this.registerEvent(this.toggleSwitch)
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
                    if(this.checkedState == 'off'){
                        this.checkedState = 'on'
                        this.update()
                    }
                    else {
                        this.checkedState = 'off'
                        this.update()
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

        update(){
            if(this.checkedState == 'on') {
                this.rect.fill({color: Colors.lightblue})
                this.rect.stroke({color: Colors.lightblue})
                this.circle.fill({color: Colors.white})
                this.runner = this.circle.animate({duration: 300}).dx(15)
            }
            else if(this.checkedState == 'off') {
                this.rect.fill({color: Colors.white})
                this.rect.stroke({color: Colors.gray})
                this.circle.fill({color: Colors.gray})
                this.runner = this.circle.animate({duration: 300}).dx(-15)
            }
        }


        move(x, y) {
            this.toggleSwitch.move(x, y);
        }
        onclick(eventHandler) {
            this.clickEvent = eventHandler
        }
        stateChanged(eventHandler) {
            this.stateEvent = eventHandler
        }
        src() {
            return this.toggleSwitch;
        }
    }

return {Button, CheckBox, RadioButton, TextBox, ScrollBar, ProgressBar, ToggleSwitch}


}());

export{MyToolkit}