$(function() {
  var isFormSub = false;
  $(".spinner").show();
  $(".loader").hide();
  $("#user-form").on("submit", function(e) {
    e.preventDefault();
    $(".loader").show();
    //make AJAX request
    isFormSub = true;
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
    }, 500)
  });

  $(".popup.gif .popup-layer, .popup.gif .popup-close").click(function() {
    popupClose("gif");
  });


});
