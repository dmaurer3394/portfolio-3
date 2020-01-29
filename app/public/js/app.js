$(function() {
  $(window).scroll(function() {
    if ($(window).scrollTop() >= 100) {
      $("nav").addClass("scrolled");
      $("#about-item").html("<i class='fas fa-user'></i>");
      $("#projects-item").html("<i class='fas fa-briefcase'></i>");
      $("#education-item").html("<i class='fas fa-university'></i>");
      $("#contact-item").html("<i class='fas fa-edit'></i>");
      $("#to-top")
        .show()
        .html("<i class='fas fa-angle-double-up'></i>");
      $(".linkedIn").html("<i class='fab fa-linkedin fa-2x'></i>");
      $(".gitHub").html("<i class='fab fa-github fa-2x'></i>");
    } else {
      $("nav").removeClass("scrolled");
      $("#about-item").html("<i class='fas fa-user'></i> About");
      $("#projects-item").html("<i class='fas fa-briefcase'></i> Projects");
      $("#education-item").html("<i class='fas fa-university'></i> Education");
      $("#contact-item").html("<i class='fas fa-edit'></i> Contact");
      $("#to-top").hide();
      $(".linkedIn").html("<i class='fab fa-linkedin fa-3x'></i>");
      $(".gitHub").html("<i class='fab fa-github fa-3x'></i>");
    }
  });

  getProjects = () => {
    $.get("/api/projects").then(res => {
      const projectArray = res;

      projectArray.forEach(i => {
        const projectCard = `
        <div class="card mb-3 shadow-sm p-2 bg-white rounded">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img src="${i.picture}" class="card-img" alt="${i.name}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h2 class="card-title">${i.name}</h2>
                <hr/>
                <div class="row">
                  <div class="col-8">
                    <p class="card-text">${i.description}</p>
                  </div>
                  <div class="col-4">
                    <a href="${i.link}" target="_blank"><button id="${i.go}" class="btn btn-dark btn card-btn">${i.button}</button></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;

        $("#projects").append(projectCard);
        $("#stop").attr("disabled", true);
      });
    });
  };

  emptyError = () => {
    // $("#error").hide();
    $("#email").removeClass("input-error");
    $("#email").addClass("no-error");
  };

  errorTimeout = () => {
    $("#error")
      .show()
      .html("Please enter a valid email address");
    $("#email").removeClass("no-error");
    $("#email").addClass("input-error");
    setTimeout(emptyError, 5000);
  };

  emptyInputs = () => {
    $("#name").val("");
    $("#email").val("");
    $("#message").val("");
  };

  buttonDisable = () => {
    if (
      $("#name").val() === "" ||
      $("#email").val() === "" ||
      $("#message").val() === ""
    ) {
      $("#submit").attr("disabled", true);
    } else {
      $("#submit").attr("disabled", false);
    }
  };

  updateCountdown = () => {
    let remaining = 255 - $("#message").val().length;
    $("#countdown").text(remaining);
  };

  $("#submit").on("click", function(event) {
    event.preventDefault();

    var messageToMe = {
      name: $("#name")
        .val()
        .trim(),
      email: $("#email")
        .val()
        .trim(),
      note: $("#message")
        .val()
        .trim()
    };
    $.post("/api/message", messageToMe, () => {})
      .then(res => {
        if (res) {
          $("#error").hide();
          emptyInputs();
          console.log("success");
          alert("Message sent");
        }
      })
      .catch(error => {
        if (error) {
          console.log(error);
          errorTimeout();
          console.log("Please enter a valid email address");
        }
      });
  });

  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: target.offset().top
            },
            1000,
            function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) {
                // Checking if the target was focused
                return false;
              } else {
                $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            }
          );
        }
      }
    });

  $("#error").hide();
  getProjects();
  updateCountdown();
  $("#message").keyup(updateCountdown);
  buttonDisable();
  $(".my-input").keyup(buttonDisable);
  // $("#stop").attr("disabled", true);
});
