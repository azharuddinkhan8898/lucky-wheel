$(function() {
  var isFormSub = false;
  var userName;
  $(".spinner").show();
  $(".loader").hide();
  $("#user-form").on("submit", function(e) {
    e.preventDefault();
    $(".loader").show();
    //make AJAX request
    isFormSub = true;
    userName = $("#name").val()
    setTimeout(function() {
      $(".details-form").hide();
      $(".loader").hide();
      $(".spinner").show();
    }, 2000);
  });

  function getRotationDegrees(obj) {
    var matrix =
      obj.css("-webkit-transform") ||
      obj.css("-moz-transform") ||
      obj.css("-ms-transform") ||
      obj.css("-o-transform") ||
      obj.css("transform");
    if (matrix !== "none") {
      var values = matrix
        .split("(")[1]
        .split(")")[0]
        .split(",");
      var a = values[0];
      var b = values[1];
      var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    } else {
      var angle = 0;
    }
    return angle < 0 ? angle + 360 : angle;
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  var randomNumberPromise = new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(Math.floor(Math.random() * 4 + 1));
    }, 3000);
  });

  var degree = 1440;
  //number of clicks = 0
  var clicks = 0;
  var cleartimeout;
  var cssClearTimeout;
  var blinkClearInterval;
  $("#spin").click(function() {
    if(!isFormSub){
      $(".details-form").show();
      $(".spinner").hide();
      return false;
    }

    $(this).attr("disabled", "disabled");
    $(this).text("SPINNING...").css({"background":"transparent", "color":"#fff"});
    $(".finger-wrapper").hide();
    $(".spinner-ring .green-arrow").show();
    if (cleartimeout) {
      clearTimeout(cleartimeout);
    }
    if (cssClearTimeout) {
      clearTimeout(cssClearTimeout);
    }
    if (blinkClearInterval) {
      clearInterval(blinkClearInterval);
    }
    $(".spinner-ring").addClass("spin");
    cleartimeout = setTimeout(function() {
      clicks++;
      var randomNum = Math.floor(Math.random() * 4 + 1);
      console.log("value ----> ", randomNum);
      var extraDegree;
      $(".spinner-ring").removeClass("spin");
      var newDegree = degree * clicks;
      switch (randomNum) {
        case 1:
          extraDegree = getRandomArbitrary(1, 89);
          break;
        case 2:
          extraDegree = getRandomArbitrary(91, 179);
          break;
        case 3:
          extraDegree = getRandomArbitrary(181, 269);
          break;
        case 4:
          extraDegree = getRandomArbitrary(271, 359);
          break;
        default:
          console.log("invalid number");
      }
      totalDegree = newDegree + extraDegree;
      console.log(totalDegree);
      var angle = getRotationDegrees($(".spinner-ring"));
      $(".spinner-ring").css({
        transform: "scale(1.16) rotate(" + totalDegree + "deg)"
      });
      cssClearTimeout = setTimeout(function() {
        $("#spin").hide();
        var check = true;
        var css = $(
          ".spinner-inner > .spinner-sec[data-id=" +
            randomNum +
            "] .spinner-sec-wrapper"
        ).css("background");
        var cssAfter = "#287b3d url(./images/pattern.png) no-repeat center";
        blinkClearInterval = setInterval(function() {
          if (check) {
            $(
              ".spinner-inner > .spinner-sec[data-id=" +
                randomNum +
                "] .spinner-sec-wrapper"
            ).css("background", cssAfter);
            check = false;
          } else {
            $(
              ".spinner-inner > .spinner-sec[data-id=" +
                randomNum +
                "] .spinner-sec-wrapper"
            ).css("background", css);

            check = true;
          }
        }, 500);
        setTimeout(function() {
          popupApear("text");
        }, 2000);
      }, 6000);
    }, 3000);
  });

  function popupApear(val) {
    $(".popup."+val).show();
    setTimeout(function() {
      $(".popup."+val+" .popup-container, .popup."+val+" .popup-layer").addClass("go");
    }, 10);
  }
  function popupClose(val) {
    $(".popup."+val+" .popup-container, .popup."+val+" .popup-layer").removeClass("go");

    setTimeout(function() {
      $(".popup."+val).hide();
    }, 410);
  }

  $(".popup.text .popup-layer, .popup.text .popup-close").click(function() {
    popupClose("common");
    setTimeout(function(){
      popupApear("gif");
      setTimeout(function(){
        doit();
      }, 500)
    }, 500)
  });

  $(".popup.gif .popup-layer, .popup.gif .popup-close").click(function() {
    popupClose("gif");
    
  });


  function doit() {
    var previewContainer = document.getElementById("previewContainer");
    //var textImage = document.getElementById("textImage");
    var templateImage = document.getElementById("templateImage");
    
    var w = templateImage.width;
    var h = templateImage.height;
    console.log(w,h)
    //previewContainer.removeChild(previewContainer.children[1]);
  
    var gif = new SuperGif({
      gif: templateImage,
      progressbar_height: 0,
      auto_play: true,
      loop_mode: true,
      draw_while_loading: true
    });
  
    gif.load();
  
    var gif_canvas = gif.get_canvas(); // the lib canvas
    // a copy of this canvas which will be appended to the doc
    var canvas = gif_canvas.cloneNode();
    var context = canvas.getContext('2d');
  
    function anim(t) { // our animation loop
      context.clearRect(0,0,canvas.width,canvas.height); // in case of transparency ?
      context.drawImage(gif_canvas, 0, 0, canvas.width, canvas.height); // draw the gif frame
      context.font = canvas.height/100 * 3 + "px Arial";
      context.fillStyle = "#5ead48";
      context.textAlign = "center";
      context.fillText(userName, canvas.height/100 * 50, canvas.width/100 * 43); // then the text
      requestAnimationFrame(anim);
    };
    anim();
  
    previewContainer.replaceChild(canvas, previewContainer.children[0]);
  }

  // setTimeout(function(){
  //   doit()
  // }, 500)

  $(".share-on-facebook").click(function(){
    var link = document.createElement('a');
    link.download = 'Certificate.png';
    link.href = document.querySelector("#previewContainer canvas").toDataURL()
    link.click();
  })

  
});
