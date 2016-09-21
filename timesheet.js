  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD_6_GUQmiN7r8pmN81wsM9Y-W9yZMKoec",
    authDomain: "myfirstproject-b8495.firebaseapp.com",
    databaseURL: "https://myfirstproject-b8495.firebaseio.com",
    storageBucket: "myfirstproject-b8495.appspot.com",
    messagingSenderId: "987361683260"
  };

  firebase.initializeApp(config);
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
      employeeData.push(newEmp);// this is new. uploads data to database with push

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
})







