;require(
	[],
	function () {
            
        console.log("yo, I'm alive!");
        var SVGcanvas=document.getElementById("mySVGCanvas");

        var paper = new Raphael(SVGcanvas);
        // Find get paper dimensions
        var dimX = paper.canvas.offsetWidth;
        var dimY = paper.canvas.offsetHeight;

        //create face
        var face = paper.circle(275,200,150).attr({fill:"#FAFA34"});

        //create mouth
        var bx1=275;
        var by1=350;
        var by2=200;
        var mouthLx=200;
        var mouthLy=250;
        var mouthRx=350;
        var mouthRy=250;
        var mouth = paper.path('M '+ mouthLx + ', '+ mouthLy +' Q ' + bx1 + ',' + by1 + ' ' + mouthRx + ',' + mouthRy).attr({"stroke-width":5});
        
        //create sides
        var mouthsidethickness=2.5;
        var mouthsidelength=20;
        var angle=Math.atan2(mouthLy-by1,bx1-mouthLx)/Math.PI*-180-90;
        var mouthLangle=['r'+ angle , 'r' + (angle-90)];
        var mouthRangle=['r'+ angle*-1 , 'r' + (angle-90)*-1];
        var mouthsideL=paper.ellipse(mouthLx, mouthLy,mouthsidelength,mouthsidethickness).transform(mouthLangle[0]).attr({fill:"black"});
        var mouthsideR=paper.ellipse(mouthRx, mouthRy,mouthsidelength,mouthsidethickness).transform(mouthRangle[0]).attr({fill:"black"});

        //create button for toggling mouth
        var mouthButton = document.getElementById("myButton");
        var smiling = true;//mouth state
        
        //addlistener for button
        mouthButton.addEventListener('click', function(ev){
        	if (smiling) {
                        drawmouth(bx1,by2);
                	console.log("this is a frown")
        		smiling=false;
                        }

                else {
                        drawmouth(bx1,by1);
                        console.log("changing to a smile")
                	smiling=true;
                        };      
                 });

        //create eyes
        var eyeopening=30; //height of eyes
        var eyeleft = paper.ellipse(225,150,10,eyeopening).attr({fill:"black"});
        var eyeright = paper.ellipse(325,150,10,eyeopening).attr({fill:"black"});
        var mouthanimationdelay=200;
        
        function drawmouth(bx,by){
                mouth.animate({path: 'M ' + mouthLx + ', ' + mouthLy +' Q ' + bx + ', ' + by + ' ' + mouthRx +','+ mouthRy},mouthanimationdelay,"linear");

                //Roundabout way of using boolean value of smiling to modify eyeopening variable. 
                //May not be efficient since a math operator is used
                //Using Number() function to convert boolean value to integer to be used in the Math.pow() method may also be inefficient?

                eyeleft.animate({ry: Math.pow(eyeopening, Number(!smiling))},200,"linear");
                eyeright.animate({ry: Math.pow(eyeopening, Number(!smiling))},200,"linear");
                bezierpt.animate({cx: (bx+200), cy: by},mouthanimationdelay,"linear")
                mouthsideL.animate({transform: mouthLangle[Number(smiling)] + "," + mouthLx + "," + mouthLy},mouthanimationdelay,"linear");
                mouthsideR.animate({transform: mouthRangle[Number(smiling)] + "," + mouthRx + "," + mouthRy},mouthanimationdelay,"linear");

                /*
                //following code is quite brute force
                if (smiling){
                        eyeleft.animate({ry: '1'},200,"linear");
                        eyeright.animate({ry: '1'},200,"linear");
                }

                else {
                        eyeleft.animate({ry: '20'},200,"linear");
                        eyeright.animate({ry: '20'},200,"linear");
                }*/
                }

        //create drag function for mouth
        
        //create control point 
        var bezierpt = paper.circle(bx1+200,by1,5).attr({fill:"white"}); /* circle must be filled so that clicking the area enclosed 
        will fire an event. Without a fill, only clicking the outline will fire the event >.<" */

        

        //Using drag method from raphael.js 
        bezierpt.drag(mousemove,mousedown,mouserelease);

        function mousedown (){
                bezierpt.attr({fill:'black'}); //change color of fill to give user feedback that control point has been clicked
        }

        function mousemove (){
                //update position of control point to mouse pointer
                bezierpt.attr({cx: event.offsetX, cy: event.offsetY})
                //update smiley face attributes
                var mouseX = event.offsetX - 200;
                var mousesideangleL=Math.atan2(mouthLy-event.offsetY,mouseX-mouthLx)/Math.PI*-180-90;
                var mousesideangleR=mousesideangleL*-1;
                console.log(mousesideangleL)
                mouth.animate({path: 'M ' +mouthLx+', '+mouthLy+' Q ' + mouseX + ', ' + event.offsetY + ' ' + mouthRx+', '+mouthRy})
                mouthsideR.animate({transform: 'r' + mousesideangleR + ',' + mouthRx + ',' + mouthRy});
                mouthsideL.animate({transform: 'r' + mousesideangleL + ',' + mouthLx + ',' + mouthLy});
        }

        function mouserelease (){
                bezierpt.attr({fill:'white'}); //return color of fill to original
        }


        /*
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
        */
        
   
});