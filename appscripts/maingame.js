;require(
	[],
	function () {
            
        console.log("yo, I'm alive!");
        var SVGcanvas=document.getElementById("mySVGCanvas");
        var clearscreenButton = document.getElementById("clearscreenButton")       
        var addButton = document.getElementById("addButton")
        var resetButton = document.getElementById("resetButton")

        //add listeners for button
        clearscreenButton.addEventListener('click', function(){}
            );
        addButton.addEventListener('click', function(){}
            );
        resetButton.addEventListener('click', function(){}
            );
        
        var paper = new Raphael(SVGcanvas);
        // Find get paper dimensions
        var dimX = paper.canvas.offsetWidth;
        var dimY = paper.canvas.offsetHeight;

        var simtime=100;

        //Environment variables
        var env={
            drag:0.1,//px/s
            xlimit:dimX,
            ylimit:dimY
        };

        //control input
        var aoe=20;
        var ptradius=2;


        //control object
        function baseObj(){
            //shape
            this.shape='circle',
            this.radius=5,

            //dynamics
            this.appliedforceX=0,
            this.appliedforceY=0,
            this.mass=50,
            //this.ipositionX=0,
            //this.ipositionY=0,
            this.ivelocityX=0,
            this.ivelocityY=0,
            this.iaccelerationX=0,
            this.iaccelerationY=0
            //this.cpositionX=0,
            //this.cpositionY=0,
            this.cvelocityX=0,
            this.cvelocityY=0,
            this.caccelerationX=0,
            this.caccelerationY=0,
            this.npositionX=0,
            this.npositionY=0,
            this.nvelocityX=0,
            this.nvelocityY=0,
            this.naccelerationX=0
            this.naccelerationY=0
        };

        baseObj.prototype.whereAmi=function(){
            console.log("(" + this.cpositionX + "," + this.cpositionY + ")");
        }


        //calculate new positions
        baseObj.prototype.nextframe=function(appliedforceX,appliedforceY){
            this.naccelerationX=(appliedforceX-this.cvelocityX*env.drag)/this.mass;
            this.nvelocityX=this.cpositionX+this.naccelerationX*simtime/1000;
            this.npositionX=this.cpositionX*simtime/1000+0.5*this.naccelerationX*Math.pow(simtime/1000,2);

            this.naccelerationY=(appliedforceY-this.cvelocityX*env.drag)/this.mass;
            this.nvelocityY=this.cpositionY+this.naccelerationY*simtime/1000;
            this.npositionY=this.cpositionY*simtime/1000+0.5*this.naccelerationY*Math.pow(simtime/1000,2);

            console.log(this.npositionX,this.npositionY);
        }

        baseObj.prototype.update=function(){
            this.caccelerationX=this.naccelerationX;
            this.cvelocityX=this.nvelocityX;
            this.cpositionX=this.npositionX;

            this.caccelerationY=this.naccelerationY;
            this.cvelocityY=this.nvelocityY;
            this.cpositionY=this.npositionY;

//            console.log(this.npositionX,this.npositionY);
        }


        CreateObj.prototype = new baseObj();




        //Build Simulation
        //place object in random place
        b1 = new CreateObj();
        b2 = new CreateObj();
        
        //draw object
        b1.ref=drawObj(b1);
        b2.ref=drawObj(b2);


        function CreateObj(){
            var posx    =   Math.floor((Math.random() * dimX) + 1);
            var posy    =   Math.floor((Math.random() * dimY) + 1);
            this.ipositionX=posx;
            this.ipositionX=posy;
            this.cpositionX=posx;
            this.cpositionY=posy;
        }


        //draw object
        function drawObj(context){
            if (context.shape == 'circle'){
            var objnew = paper.circle(context.cpositionX,context.cpositionY,context.radius).attr({fill:"white"});                
            return objnew
            }            
            
        }



        //bezierpt.attr({cx: event.offsetX, cy: event.offsetY})
             
        

        //Update sim
        var simTimer = setInterval(function(){ updateSim() }, simtime);

        function updateSim() {
            b1.nextframe(0.01,0.01);
            b1.ref.attr({cx: b1.npositionX,cy: b1.npositionY});
            b1.update();

            //b1.whereAmi();
            //b2.whereAmi();
        }

        function myStopFunction() {
            clearInterval(simTimer);
        }



        
   
});