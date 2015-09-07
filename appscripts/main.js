require(
    [],
    function () {
    	
    	console.log("yo");

    	var fontFamily = document.getElementById("nicki").style.fontFamily = "Georgia, sans-serif";

		var makehslString = function(ih, is, il) {
			var hslString = "hsl(" + ih + ", " + is + "%, " + il + "%)"; //hsl(angle,%,%)
			return hslString;
			}

    	//creating listener for each slider
 		 		
 		hue.addEventListener("input", function(ev){
 				nicki.style.backgroundColor = makehslString(hue.value, saturation.value, light.value); //Brute force method. Should have a single update function for all 3 sliders to refer to. 
 				})
        
        saturation.addEventListener("input", function(ev){
                nicki.style.backgroundColor = makehslString(hue.value, saturation.value, light.value);
                })
        
        light.addEventListener("input", function(ev){
                nicki.style.backgroundColor = makehslString(hue.value, saturation.value, light.value);
                })
		
    	}
);