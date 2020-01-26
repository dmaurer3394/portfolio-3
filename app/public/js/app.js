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
                <p class="card-text">${i.description}</p>
                <a href="${i.link}" target="_blank"><button id="go" class="btn btn-dark btn card-btn">See More</button></a>
              </div>
            </div>
          </div>
        </div>
        `;

        $("#projects").append(projectCard);
      });
    });
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
      message: $("#message")
        .val()
        .trim()
    };

    console.log(messageToMe);

    $.post("/api/message", messageToMe, function(res, err) {
      console.log(res);
      console.log(err);
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

  getProjects();
});
