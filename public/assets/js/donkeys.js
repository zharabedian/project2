// Make sure we wait to attach our handlers until the DOM is fully loaded.

$(document).ready(function () {

  var username = localStorage.getItem("username");
  var sorter = "";


  $(function () {

    // Assign a dummy username in order to get all candidates to appear with no notes at page load
    if (username == "" || username == null) {
      username = "default user";
    }

    // display username
    $("#usernameDisplay").html(username);

    // // Used for sorting
    // $(document).on("click", "#sortingButton", function () {
    //   sorter = $(this).data("id");
    // });

    $.ajax("/data/" + username, {
      type: "GET"
    }).then(function (data) {

      $("#candidateData").empty();
      for (var i = 0; i < data.candidates.length; i++) {

        if (data.candidates[i].notes == null) {
          data.candidates[i].notes = "";
        }

        $("#candidateData").append('<tr> \n <td><strong>' +
          data.candidates[i].name +
          '</strong></td> \n <td>' +
          data.candidates[i].age +
          '</td> \n <td>' +
          data.candidates[i].state +
          '</td> \n <td>' +
          data.candidates[i].party +
          '</td> + <td><i>' +
          data.candidates[i].notes +
          '</i></td> \n </tr>');
        $("#candidateData").append('<div class="editMode"> <button type="submit" class="btn btn-primary" data-id="addEditBtn" data-thenoteid="' +
          data.candidates[i].notes_id +
          '" data-thecandidateid="' +
          data.candidates[i].candidate_id +
          '">Add or Edit Note for  ' +
          data.candidates[i].name +
          '</button> <label for ="' +
          data.candidates[i].candidate_id +
          '">Enter Note here</label> \n <textarea class="form-control" id="' +
          data.candidates[i].candidate_id +
          '" rows ="3" >' + data.candidates[i].notes +
          '</textarea> <button type="submit" class="btn btn-secondary" data-id="deleteBtn" data-thenoteid="' +
          data.candidates[i].notes_id +
          '">Delete Note for  ' +
          data.candidates[i].name +
          '</button></div>');
      };

      $(".editMode").hide();

      $(document).on("click", ".btn", function () {


        if ($(this).data("id") === "usernameButton") {
          var usernameLocal = $("#usernameInput").val();
          localStorage.setItem("username", usernameLocal);
        };

        // Show the .editMode div when the edit mode button is clicked
        if ($(this).data("id") === "editModeBtn") {
          event.preventDefault();
          $(".editMode").toggle();
        };

        // If the delete button is clicked, call the Delete request
        if ($(this).data("id") === "deleteBtn") {

          if (username == "default user") {
            alert("Please enter an email address to proceed");
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

          if (username == "default user") {
            alert("Please enter a username to proceed");
            return;
          }

          // Get the note ID, and store it in the notes_id variable
          var notes_id = $(this).data("thenoteid");

          // If the notes_id is null, meaning this is a new note, call the POST request
          var newNotes = ($("#" + $(this).data("thecandidateid")).val());

          if (notes_id == null) {
            var candidate_id = $(this).data("thecandidateid");
            var newCat = {
              candidate_id: candidate_id,
              username: localStorage.getItem("username"),
              notes: newNotes
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
              notes: newNotes
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
});
