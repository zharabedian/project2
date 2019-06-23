// Make sure we wait to attach our handlers until the DOM is fully loaded.

// $(document).ready(function () {

// TO DO
// Need to get notes from the form
// Need to make form show only upon add/edit click

var username = localStorage.getItem("username");
$(function () {

  // Assign a dummy username in order to get all candidates to appear with no notes at page load
  if (username == "" || username == null) {
    username = "dummy";
  }

  $.ajax("/data/" + username, {
    type: "GET"
  }).then(function (data) {

    $("#candidateData").empty();
    for (var i = 0; i < data.candidates.length; i++) {

      if (data.candidates[i].notes == null) {
        data.candidates[i].notes = "";
      }

      if (data.candidates[i].funding_total == null) {
        data.candidates[i].funding_total = "unavailable";
      }

      // To allow funding to be shown in dollar format
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      });

      // $("#candidateData").append('<tr> \n <td><strong>' + data.candidates[i].name + '</strong></td> \n <td>' + data.candidates[i].age + '</td> \n <td>' + data.candidates[i].state + '</td> \n <td>' + data.candidates[i].party + '</td> + <td>' + formatter.format(data.candidates[i].funding_total) + '</td> + <td><i>' + data.candidates[i].notes + '</i></td> \n </tr>');
      // $("#candidateData").append('<div class="editMode"> <button type="submit" class="btn btn-primary" data-id="addEditBtn" data-thenoteid="' + data.candidates[i].notes_id + '" data-thecandidateid="' + data.candidates[i].candidate_id + '">Make Note for:  ' + data.candidates[i].name + '</button>');
      // $("#candidateData").append('<label for ="' + data.candidates[i].candidate_id + '">Enter Note here</label> \n <textarea class="form-control" id="' + data.candidates[i].candidate_id + '" rows ="3" placeholder=' + data.candidates[i].notes + '></textarea>');
      // $("#candidateData").append('<button type="submit" class="btn btn-secondary" data-id="deleteBtn" data-thenoteid="' + data.candidates[i].notes_id + '">Delete Note for:  ' + data.candidates[i].name + '</button></div>');

      $("#candidateData").append('<tr> \n <td><strong>' +
        data.candidates[i].name +
        '</strong></td> \n <td>' +
        data.candidates[i].age +
        '</td> \n <td>' +
        data.candidates[i].state +
        '</td> \n <td>' +
        data.candidates[i].party +
        '</td> + <td>' +
        formatter.format(data.candidates[i].funding_total) +
        '</td> + <td><i>' +
        data.candidates[i].notes +
        '</i></td> \n </tr>');
      $("#candidateData").append('<div class="editMode"> <button type="submit" class="btn btn-primary" data-id="addEditBtn" data-thenoteid="' +
        data.candidates[i].notes_id +
        '" data-thecandidateid="' +
        data.candidates[i].candidate_id +
        '">Make Note for:  ' +
        data.candidates[i].name +
        '</button> <label for ="' +
        data.candidates[i].candidate_id +
        '">Enter Note here</label> \n <textarea class="form-control" id="' +
        data.candidates[i].candidate_id +
        '" rows ="3" >' + data.candidates[i].notes +
        '</textarea> <button type="submit" class="btn btn-secondary" data-id="deleteBtn" data-thenoteid="' +
        data.candidates[i].notes_id +
        '">Delete Note for:  ' +
        data.candidates[i].name +
        '</button></div>');

      // $("#candidateData").append(databaseNote + i);
      // $("#candidateData").append('<div data-notecandidate' + i + '=muffins">' + data.candidates[i].notes + '</div>');
    };

    // $(".editMode").hide();

    $(document).on("click", ".btn", function () {

      // Show the .editMode div when the edit mode button is clicked
      if ($(this).data("id") === "editModeBtn") {
        $(".editMode").show();
      };

      // If the delete button is clicked, call the Delete request
      if ($(this).data("id") === "deleteBtn") {

        if (username == "dummy") {
          alert("Please enter a username to proceed");
          return;
        }

        var notes_id = $(this).data("thenoteid");
        $.ajax("/api/cats/" + notes_id, {
          type: "DELETE"
        }).then(function () {
          location.reload();
        });
      };

      // If the add/edit button is clicked, enter this function
      if ($(this).data("id") === "addEditBtn") {

        if (username == "dummy") {
          alert("Please enter a username to proceed");
          return;
        }

        // Get the note ID, and store it in the notes_id variable
        var notes_id = $(this).data("thenoteid");

        // If the notes_id is null, meaning this is a new note, call the POST request
        if (notes_id == null) {
          var candidate_id = $(this).data("thecandidateid");
          var newCat = {
            candidate_id: candidate_id,
            username: localStorage.getItem("username"),
            notes: "testing"
          };
          $.ajax("/api/cats", {
            type: "POST",
            data: newCat
          }).then(function () {
            location.reload();
          });
        }

        // If the notes_id is not null, meaning this is a change to an existing note, call the PUT request
        else if (notes_id !== null) {
          var newCat = {
            notes: "these notes shouldnt appear"
          };
          var notes_id = $(this).data("thenoteid");
          $.ajax("/api/cats/" + notes_id, {
            type: "PUT",
            data: newCat
          }).then(function () {
            location.reload();
          });
        };
      };
    });
  });
});


// -----------------------------------------------------------------------------------------------------

  // else {
  //   console.log("I've been clicked");
  //   console.log("Candidate Id is " + $(this).data("thecandidateid"));

  //   console.log($("#" + $(this).data("thecandidateid")).val());

  //   var thecanid = $(this).data("thecandidateid");
  //   var nodeObject = document.querySelectorAll('[data-notecandidate' + thecanid + ']');
  //   console.log(nodeObject);

  //   console.log(nodeObject[0].innerText);

  //   $("#candidateData").append('<div data-notecandidate' + i + '=muffins">' + databaseNote + '</div>');

  //   var newCat = {
  //     name: $("#" + $(this).data("thecandidateid")).val(),


  //   };

  //   $.ajax("/api/cats", {
  //     type: "POST",
  //     data: newCat
  //   }).then(function () {
  //     console.log(data.newCat);
  //     console.log("created new cat");
  //     // Reload the page to get the updated list
  //     location.reload();
  //   });

  //   // if ($(this).data("id") === "buttonClearDiv") {
  //   //   weatherQueryURLArray.splice(weatherQueryURLArray.indexOf($(this).data("weatherqueryurl")), 1);
  //   //   queryURLArray.splice(queryURLArray.indexOf($(this).data("queryurl")), 1);
  //   //   buttonArray.splice(buttonArray.indexOf($(this).data("buttonHtml")), 1);
  //   //   $(this).closest('.DestroyMe').remove();

  //   //   localStorage.setItem("weatherQueryURLArray", JSON.stringify(weatherQueryURLArray));
  //   //   localStorage.setItem("queryURLArray", JSON.stringify(queryURLArray));
  //   //   localStorage.setItem("buttonArray", JSON.stringify(buttonArray));

  //   // }
  // }


  // <label for="exampleFormControlTextarea1">Example textarea</label>
  // <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>


  // <input type="username" class="form-control" id="exampleInputusername1" aria-describedby="usernameHelp"
  // placeholder="Enter username">

  // // data-queryurl =" + queryURLComplete + ">Clear Above Search</button><hr></div>";
  // // $("#candidateData" + data.candidates[i].candidate_id)




  // $("#AwesomeNewDiv" + divId).append($(buttonHtml));
  // <button type="submit" class="btn btn-primary">Submit</button>


  // buttonHtml = "<div class = 'buttonCenter'><button class = 'btn red' data-id = 'buttonClearDiv' data-weatherqueryurl =" + weatherQueryURL + " data-queryurl =" + queryURLComplete + ">Clear Above Search</button><hr></div>";





  // for (var i = 0; i < len; i++) {
  //   var new_elem =
  //     "<li>" +
  //     cats[i].id +
  //     ". " + cats[i].name +
  //     "<button class='change-sleep' data-id='" +
  //     cats[i].id +
  //     "' data-newsleep='" +
  //     !cats[i].sleepy +
  //     "'>";

  //   if (cats[i].sleepy) {
  //     new_elem += "SLEEP TIME!";
  //   } else {
  //     new_elem += "WAKE UP!";
  //   }

  //   new_elem += "</button>";

  //   new_elem +=
  //     "<button class='delete-cat' data-id='" +
  //     cats[i].id +
  //     "'>DELETE!</button></li>";

  //   if (cats[i].sleepy) {
  //     sleepyElem.append(new_elem);
  //   } else {
  //     nosleepyElem.append(new_elem);
  //   }
  // }


  // $(document).on("click", ".change-sleep", function (event) {
  //   var id = $(this).data("id");
  //   var newSleep = $(this).data("newsleep");

  //   var newSleepState = {
  //     sleepy: newSleep
  //   };

  //   // Send the PUT request.
  //   function AJAXCall() {
  //     var newCat = {
  //       name: $(this).data("thecandidateid")
  //         .val()
  //         .trim(),
  //       sleepy: "bbbllalalalabala"
  //     };
  //     $.ajax("/api/cats/" + id, {
  //       type: "PUT",
  //       data: newSleepState
  //     }).then(function () {
  //       console.log("changed sleep to", newSleep);
  //       // Reload the page to get the updated list
  //       location.reload();
  //     });
  //   }


  //   $.ajax("/api/cats/" + id, {
  //     type: "PUT",
  //     data: newSleepState
  //   }).then(function () {
  //     console.log("changed sleep to", newSleep);
  //     // Reload the page to get the updated list
  //     location.reload();
  //   });
  // });

  // $(".create-form").on("submit", function (event) {
  //   // Make sure to preventDefault on a submit event.
  //   event.preventDefault();

  //   var newCat = {
  //     name: $(this).data("thecandidateid")
  //       .val()
  //       .trim(),
  //     sleepy: "bbbllalalalabala"

  //   };

  //   // Send the POST request.
  //   $.ajax("/api/cats", {
  //     type: "POST",
  //     data: newCat
  //   }).then(function () {
  //     console.log(data.newCat);
  //     console.log("created new cat");
  //     // Reload the page to get the updated list
  //     location.reload();
  //   });
  // });


  // $(document).on("click", ".deleteBtn", function (event) {
  //   console.log("delete button has been clicked");
  //   var notes_id = $(this).data("thenoteID");
  //   console.log(notes_id);

  //   // Send the DELETE request.
  //   $.ajax("/api/cats/" + id, {
  //     type: "DELETE"
  //   }).then(function () {
  //     console.log("deleted cat", notes_id);
  //     // Reload the page to get the updated list
  //     location.reload();
  //   });
  // });

// });
