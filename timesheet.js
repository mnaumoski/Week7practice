  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyDZIBk1N1VLk4UQPoXZ_nQXBEJ7pj6xZTk",
      authDomain: "employeedata-4a108.firebaseapp.com",
      databaseURL: "https://employeedata-4a108.firebaseio.com",
      storageBucket: "",
      messagingSenderId: "818698221016"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  // 2. Button for adding Employees
  $("#addEmployeeBtn").on("click", function() {
      // grab inputs
      var empName = $("#employeeNameInput").val().trim();
      var empRole = $("#roleInpute").val().trim();
      var empRate = $("#rateInput").val().trim();
      var empStart = moment($("#startInput").val().trim(), "DD/MM/YY").format("x");

      var newEmp = {
          name: empName,
          role: empRole,
          start: empStart,
          rate: empRate
      }
      database.ref().push(newEmp); // this is new. uploads data to database with push

      // print to console
      console.log(newEmp.name);
      console.log(newEmp.role);
      console.log(newEmp.start);
      console.log(newEmp.rate);

      alert("Employee successfully added.");

      // clear all text inputs
      $("#employeeNameInput").val("");
      $("#roleInput").val("");
      $("#startInput").val("");
      $("#rateInput").val("");

      return false;
  });
  // create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
      console.log(childSnapshot.val());
      console.log(childSnapshot.val().name);

      var empName = childSnapshot.val().name;
      var empRole = childSnapshot.val().role;
      var empStart = childSnapshot.val().start;
      var empRate = childSnapshot.val().rate;

      console.log(empName);
      console.log(empRate);
      console.log(empStart);
      console.log(empRole);


  })
