  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyAozUBLknvseKg0Ika4lQvM7tYNIDQdMpo",
      authDomain: "brain-4b37c.firebaseapp.com",
      databaseURL: "https://brain-4b37c.firebaseio.com",
      storageBucket: "brain-4b37c.appspot.com",
      messagingSenderId: "804931057770"
  };
  firebase.initializeApp(config);

  // reference for firebase
  var database = firebase.database();
  // initial variables
  var initialBidder = "Nobody";
  var initialBid = 0;

  var highBidder = initialBidder;
  var highPrice = initialBid;

  var viewCounter = 0;

  var connections = database.ref("/connections"); //dir in database
  var connected = database.ref(".info/connected"); //is there a connection?

  connected.on("value", function(status) {

      if (status.val()) {
          var con = connections.push(true);
          con.onDisconnect().remove();

      };
  });
  connections.on("value", function(status) {
      $("#watchers").html(status.numChildren());
  })


  // ======================================= = = ===============================
  // AT initial load - get status
  database.ref("/bidderData").on("value", function(status) {
      //if firebase has stored values for highBidder and highPrice
      if (status.child("highBidder").exists() && status.child("highPrice").exists()) {

          //set the initial vars to highbudder to the stored ones
          highBidder = status.val().highBidder;
          highPrice = status.val().highPrice;
          // these initial values need to be displayed in their divs
          $("#highestBidder").html(status.val().highBidder);
          $("#highestPrice").html("$" + status.val().highPrice);
          // print to console
          console.log(status.val().highBidder);
          console.log(status.val().highPrice);
      }
      // keep the initial vars equal to initial values of zero and nobody
      else {
          $("#highestBidder").html(highBidder);
          $("#highestPrice").html("$" + highPrice);
          console.log('Current High Price: ' + " " + highBidder + " " + highPrice);
          console.log("-------------------------------------------------------");
      }
      // watch for errors
  }, function(errorObject) {
      console.log('The read failed ' + errorObject.code);
  });

  //when a user clicks the button
  $("#submitBid").on("click", function() {
      // get the input values
      var bidderName = $("#bidderName").val().trim();
      var bidderPrice = $("#bidderPrice").val().trim();
      // print to console
      console.log(bidderName);
      console.log(bidderPrice);

      if (bidderPrice > highPrice) {
          alert("You are now the highest bidder!");
          // save it to firebase
          database.ref("/bidderData").set({
              highBidder: bidderName,
              highPrice: bidderPrice
          });
          console.log('New High Price: ' + " " + highBidder + " " + highPrice);
          console.log("-------------------------------------------------------");

          highBidder = bidderName;
          highPrice = parseInt(bidderPrice);

          $("#highestPrice").html(bidderName);
          $("#highestBidder").html("$" + bidderPrice);

      } else {
          alert("Sorry that bid is too low. Try again!");
      }

      return false;
  })
