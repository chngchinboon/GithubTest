require(
	[],
	function () {
            
        console.log("yo, I'm alive!");
        var SVGcanvas=document.getElementById("mySVGCanvas");

        var paper = new Raphael(SVGcanvas);
        // Find get paper dimensions
        var dimX = paper.canvas.offsetWidth;
        var dimY = paper.canvas.offsetHeight;

        //create mouth
        var mouth = paper.path("M 50, 200 Q 125, 300, 200, 200");
        //create button for toggling mouth
        var mouthButton = document.getElementById("myButton");
        var smiling = true;//mouth state
        
        //addlistener for button
        mouthButton.addEventListener('click', function(ev){
        	if (smiling) {
                        drawmouth(125,100);                        
                	console.log("this is a frown")
        		smiling=false;
                        }

                else {
                        drawmouth(125,300);
                        console.log("changing to a smile")
                	smiling=true;
                        };      
                 });

        //create eyes
        var eyeopening=20; //height of eyes
        var eyeleft = paper.ellipse(50,100,30,eyeopening);
        var eyeright = paper.ellipse(200,100,30,eyeopening);
        
        function drawmouth(bx,by){
                mouth.animate({path: 'M 50, 200 Q ' + bx + ', ' + by + ' 200, 200'},2000,"linear");
                
                //Roundabout way of using boolean value of smiling to modify eyeopening variable. 
                //May not be efficient since a math operator is used
                //Using Number() function to convert boolean value to integer to be used in the Math.pow() method may also be inefficient?

                /*
                eyeleft.animate({ry: Math.pow(eyeopening, Number(!smiling))},200,"linear");
                eyeright.animate({ry: Math.pow(eyeopening, Number(!smiling))},200,"linear");
                */

                
                //following code is quite brute force
                if (smiling){
                        eyeleft.animate({ry: '1'},200,"linear");
                        eyeright.animate({ry: '1'},200,"linear");
                }

                else {
                        eyeleft.animate({ry: '20'},200,"linear");
                        eyeright.animate({ry: '20'},200,"linear");
                }
                }

        //create drag function for mouth
        
        //create control point 
        var bezierpt = paper.circle(125,300,5).attr({fill:"white"}); /* circle must be filled so that clicking the area enclosed 
        will fire an event. Without a fill, only clicking the outline will fire the event >.<" */

        

        //Using drag method from raphael.js 

        /*
        bezierpt.drag(mousemove,mousedown,mouserelease);

        function mousedown (){
                bezierpt.attr({fill:'black'}); //change color of fill to give user feedback that control point has been clicked
        }

        function mousemove (){
                //update position of control point to mouse pointer
                bezierpt.attr({cx: event.offsetX, cy: event.offsetY})
                //update smiley face attributes
                mouth.animate({path: 'M 50, 200 Q ' + event.offsetX + ', ' + event.offsetY + ' 200, 200'})
        }

        function mouserelease (){
                bezierpt.attr({fill:'white'}); //return color of fill to original
        }
*/

        
        //Self written code for dragging as suggested in tutorial hints
        //Initialize a variable containing the state of the mouse
        var mouseclicked = false; //2 states: released = false and clicked = true

        //add listener for mousedown over the control point
        bezierpt.mousedown(function(){  //method in raphae.js
                mouseclicked='true'; 
                console.log(mouseclicked)
                });

        SVGcanvas.addEventListener('mousemove', function(e){
                //check state of mouse
                if (mouseclicked){

                        // update position of control point to mouse
                        bezierpt.attr({cx: e.offsetX, cy:e.offsetY});// using event.offsetX <- browser specific. Doesn't work in firefox i think
                        
                        //update smiley face attributes
                        mouth.animate({path: 'M 50, 200 Q ' + e.offsetX + ', ' + e.offsetY + ' 200, 200'});//no animation time so it works instantaneously
                        }

        })
        
        //reset status of mouse on release so as to stop mousemove function from activating
        SVGcanvas.addEventListener('mouseup',function(){
                mouseclicked=false; 
                })
        
        
   
});