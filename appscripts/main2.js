require(
    [],
    function () {
    	
    	console.log("yo");

    	var fontFamily = document.getElementById("nicki").style.fontFamily = "Georgia, sans-serif";

		
    	//creating listener for each slider
 		 		
 		hue.addEventListener("input", articleupdate);
        saturation.addEventListener("input",articleupdate);
        light.addEventListener("input", articleupdate);
		
    	
            var makehslString = function(ih, is, il) {
                var hslString = "hsl(" + ih + ", " + is + "%, " + il + "%)"; //hsl(hue,saturation%,light%). Has optional component alpha, i.e. hsl(h,s,l,alpha), which controls transparency.
                return hslString;

                /* Hue is a degree on the color wheel (from 0 to 360) - 0 (or 360) is red, 120 is green, 240 is blue. 
                Saturation is a percentage value; 0% means a shade of gray and 100% is the full color. 
                Lightness is also a percentage; 0% is black, 100% is white. 
                */
                };

            function articleupdate() {
                nicki.style.backgroundColor = makehslString(hue.value, saturation.value, light.value); //note that "nicki" element is hardcoded in. Limits functionality if you need to use it for some other code
            }

        /* note that functions for the hslstring and slider event handler is nested within require() function and hence will not be accessible by other functions. This will limit functionality if you need to use it for some other code*/

        $('.panel-primary').on('mouseenter',function(){
            var panelId= $(this).attr('id');
            //alert(panelId + '-body')
            $('#' + panelId + '-body').slideToggle(100);
        });
        $('.panel-primary').on('mouseleave',function(){
            var panelId= $(this).attr('id');
            $('#' + panelId + '-body').slideUp(100);
        });



        }

        
        
);

