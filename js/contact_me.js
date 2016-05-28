$(function() {

    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();

            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(" ") >= 0) {
                firstName = name.split(" ").slice(0, -1).join(" ");
            }
            $.ajax({
                url: encodeURI("https://formspree.io/trungk18@gmail.com"),
                type: "POST",
                data: $("#contactForm").serialize(),
                dataType: "json",
                success: function(data) {
                    // Enable button & show success message
                    $("#btnSubmit").attr("disabled", false);
                    $("#success").html("<div class='alert alert-success'>");
                    $("#success > .alert-success").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $("#success > .alert-success")
                        .append("<strong>Your message has been sent. I will check and reply you as early as possible. </strong>");
                    $("#success > .alert-success")
                        .append("</div>");

                    //clear all fields
                    $("#contactForm").trigger("reset");
                },
                error: function(error) {
                    // Fail message
                    $("#success").html("<div class='alert alert-danger'>");
                    $("#success > .alert-danger").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $("#success > .alert-danger").append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $("#success > .alert-danger").append("</div>");
                    //clear all fields
                    $("#contactForm").trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$("#name").focus(function() {
    $("#success").html("");
});
