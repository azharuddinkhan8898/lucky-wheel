$(function(){
    //set default degree (360*5)

    function getRotationDegrees(obj) {
        var matrix = obj.css("-webkit-transform") ||
        obj.css("-moz-transform")    ||
        obj.css("-ms-transform")     ||
        obj.css("-o-transform")      ||
        obj.css("transform");
        if(matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        } else { var angle = 0; }
        return (angle < 0) ? angle + 360 : angle;
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    var randomNumberPromise = new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(Math.floor((Math.random() * 4) + 1));
        }, 3000);
      });


    var degree = 1800;
    //number of clicks = 0
    var clicks = 0;
    var cleartimeout;
    $('#spin').click(function(){
        if(cleartimeout){
            clearTimeout(cleartimeout)
        }
        $(".spinner-ring").addClass("spin")
		
		//add 1 every click
		
		cleartimeout = setTimeout(function(){
            clicks ++;
            
            var randomNum = Math.floor((Math.random() * 4) + 1);
            console.log("value ----> ", randomNum)
            var extraDegree;
            $(".spinner-ring").removeClass("spin");
            var newDegree = degree*clicks;
            switch (randomNum) {
                case 1:
                    extraDegree = getRandomArbitrary(1, 89)
                    break;
                case 2:
                    extraDegree = getRandomArbitrary(91, 179)
                    break;
                case 3:
                    extraDegree = getRandomArbitrary(181, 269)
                    break;
                case 4:
                    extraDegree = getRandomArbitrary(271, 359)
                    break;
                default:
                    console.log("invalid number")
            }
            totalDegree = newDegree+extraDegree;
            console.log(totalDegree)
            var angle = getRotationDegrees($('.spinner-ring'));
            $('.spinner-ring').css({
                'transform' : 'scale(1.16) rotate(' + totalDegree + 'deg)'			
            });
        }, 3000)
		/*multiply the degree by number of clicks
	  generate random number between 1 - 360, 
    then add to the new degree*/
		
        
	});
})