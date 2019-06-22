// Make sure we wait to attach our handlers until the DOM is fully loaded.
var username = localStorage.getItem("username");
$(function () {

if (username == "" || username == null) {
  username = "dummy";
}

  $.ajax("/data/" + username, {
    type: "GET"

  }).then(function (data) {


    $("#candidateData").empty();
    for (var i = 0; i < data.candidates.length; i++) {
      $("#candidateData").append('<tr> \n <td>' + data.candidates[i].name + '</td> \n <td>' + data.candidates[i].age + '</td> \n <td>' + data.candidates[i].state + '</td> \n <td>' + data.candidates[i].party + '</td> + <td>' + data.candidates[i].notes + '</td> \n </tr>');
      $("#candidateData").append('<button type="submit" class="btn btn-primary" data-thecandidateid="' + data.candidates[i].candidate_id + '">Make Note for:  ' + data.candidates[i].name + '</button>');
      $("#candidateData").append('<label for ="' + data.candidates[i].candidate_id + '">Enter Note here</label> \n <textarea class="form-control" id="' + data.candidates[i].candidate_id + '" rows ="3"></textarea>');
      // $("#candidateData").append(databaseNote + i);
      // $("#candidateData").append('<div data-notecandidate' + i + '=muffins">' + data.candidates[i].notes + '</div>');
    };

    $(document).on("click", ".btn", function () {
      console.log("I've been clicked");
      console.log("Candidate Id is " + $(this).data("thecandidateid"));

      console.log($("#" + $(this).data("thecandidateid")).val());

      var thecanid = $(this).data("thecandidateid");


      // console.log(document.querySelectorAll('[data-notecandidate0][0].innerText'));

      var nodeObject = document.querySelectorAll('[data-notecandidate' + thecanid + ']');
      console.log(nodeObject);

      console.log(nodeObject[0].innerText);

      $("#candidateData").append('<div data-notecandidate' + i + '=muffins">' + databaseNote + '</div>');

      var newCat = {
        name: $("#" + $(this).data("thecandidateid")).val(),
        username: "test1"
        // username: localStorage.getItem("username")
        ///add username here
      };
      // $.ajax("/data", {
      $.ajax("/api/cats", {
        type: "POST",
        data: newCat
      }).then(function () {
        console.log(data.newCat);
        console.log("created new cat");
        // Reload the page to get the updated list
        location.reload();
      });

      // if ($(this).data("id") === "buttonClearDiv") {
      //   weatherQueryURLArray.splice(weatherQueryURLArray.indexOf($(this).data("weatherqueryurl")), 1);
      //   queryURLArray.splice(queryURLArray.indexOf($(this).data("queryurl")), 1);
      //   buttonArray.splice(buttonArray.indexOf($(this).data("buttonHtml")), 1);
      //   $(this).closest('.DestroyMe').remove();

      //   localStorage.setItem("weatherQueryURLArray", JSON.stringify(weatherQueryURLArray));
      //   localStorage.setItem("queryURLArray", JSON.stringify(queryURLArray));
      //   localStorage.setItem("buttonArray", JSON.stringify(buttonArray));

      // }
    });

    // <label for="exampleFormControlTextarea1">Example textarea</label>
    // <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>


    // <input type="username" class="form-control" id="exampleInputusername1" aria-describedby="usernameHelp"
    // placeholder="Enter username">

    // // data-queryurl =" + queryURLComplete + ">Clear Above Search</button><hr></div>";
    // // $("#candidateData" + data.candidates[i].candidate_id)




    // $("#AwesomeNewDiv" + divId).append($(buttonHtml));
    // <button type="submit" class="btn btn-primary">Submit</button>


    // buttonHtml = "<div class = 'buttonCenter'><button class = 'btn red' data-id = 'buttonClearDiv' data-weatherqueryurl =" + weatherQueryURL + " data-queryurl =" + queryURLComplete + ">Clear Above Search</button><hr></div>";





    for (var i = 0; i < len; i++) {
      var new_elem =
        "<li>" +
        cats[i].id +
        ". " + cats[i].name +
        "<button class='change-sleep' data-id='" +
        cats[i].id +
        "' data-newsleep='" +
        !cats[i].sleepy +
        "'>";

      if (cats[i].sleepy) {
        new_elem += "SLEEP TIME!";
      } else {
        new_elem += "WAKE UP!";
      }

      new_elem += "</button>";

      new_elem +=
        "<button class='delete-cat' data-id='" +
        cats[i].id +
        "'>DELETE!</button></li>";

      if (cats[i].sleepy) {
        sleepyElem.append(new_elem);
      } else {
        nosleepyElem.append(new_elem);
      }
    }
  });

  $(document).on("click", ".change-sleep", function (event) {
    var id = $(this).data("id");
    var newSleep = $(this).data("newsleep");

    var newSleepState = {
      sleepy: newSleep
    };

    // Send the PUT request.
    function AJAXCall() {
      var newCat = {
        name: $(this).data("thecandidateid")
          .val()
          .trim(),
        sleepy: "bbbllalalalabala"
      };
      $.ajax("/api/cats/" + id, {
        type: "PUT",
        data: newSleepState
      }).then(function () {
        console.log("changed sleep to", newSleep);
        // Reload the page to get the updated list
        location.reload();
      });
    }


    $.ajax("/api/cats/" + id, {
      type: "PUT",
      data: newSleepState
    }).then(function () {
      console.log("changed sleep to", newSleep);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newCat = {
      name: $(this).data("thecandidateid")
        .val()
        .trim(),
      sleepy: "bbbllalalalabala"

    };

    // Send the POST request.
    $.ajax("/api/cats", {
      type: "POST",
      data: newCat
    }).then(function () {
      console.log(data.newCat);
      console.log("created new cat");
      // Reload the page to get the updated list
      location.reload();
    });
  });


  $(document).on("click", ".delete-cat", function (event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/cats/" + id, {
      type: "DELETE"
    }).then(function () {
      console.log("deleted cat", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
