$(function() {

  var baseUrl = "https://cryptic-reef-39583.herokuapp.com/kalie-studio-mail/";
  // wake heroku dyno for contact form
  $.ajax({
    url: baseUrl
  }).done(function(data) {
    //woke heroku dyno for contact form
  });

  jQuery(function($) {
    var emailPhone = $("#emailAddress,#phoneNumber");
    emailPhone.on('input', function() {
      emailPhone.not(this).prop("required", !$(this).val().length);
    });
  });

  //$("#contactButton").click(function() {
  $("#contactForm").submit(function() {
    event.preventDefault();
    $("#buttonFeedback").html("<img src='img/spinner.gif' />");
    var feedbackMessage = "Please fill out the form as completely as possible before submitting.";
    var data = {
      "name": $("#firstName").val() ? encodeURIComponent($("#firstName").val()+" "+$("#lastName").val()) : "x",
      "email": $("#emailAddress").val() ? encodeURIComponent($("#emailAddress").val()) : "x",
      "phone": $("#phoneNumber").val() ? encodeURIComponent($("#phoneNumber").val()) : "x",
      "preferContact": document.forms.contactForm.preferContact.value ? encodeURIComponent(document.forms.contactForm.preferContact.value) : "x",
      "voiceType": document.forms.contactForm.voiceType.value ? encodeURIComponent(document.forms.contactForm.voiceType.value) : "x",
      "age": $("#age").val() ? encodeURIComponent($("#age").val()) : "x",
      "source": $("#source").val() ? encodeURIComponent($("#source").val()) : "x",
      "whyMe": $("#whyMe").val() ? encodeURIComponent($("#whyMe").val()) : "x",
      "questions": $("#questions").val() ? encodeURIComponent($("#questions").val()) : "x"
    }
    console.log(data);
    // AJAX
    var queryString = data.name+"/"+data.email+"/"+data.phone+"/"+data.preferContact+"/"+data.voiceType;
    queryString += "/"+data.age+"/"+data.source+"/"+data.whyMe+"/"+data.questions;
    $.ajax({
      url: baseUrl+queryString,
    })
      .done(function() {
        console.log("email sent");
        feedbackMessage = "The email sent to me successfully. I'll get in touch with you soon!";
      })
      .fail(function() {
        console.log("email failed");
        feedbackMessage = "Mail not sent for some reason. Try again?";
      })
      .always(function(msg) {
        console.log("mailer responds: " + msg);
        $("#buttonFeedback").html(feedbackMessage);
      });
  });




  function verifyInputS() {
    if (!document.forms.practiceForm.singerName.value) {
      return false;
    } else if (!document.forms.practiceForm.numberHoursPracticed.value) {
      return false;
    } else if (!document.forms.practiceForm.exercisesDone.value) {
      return false;
    } else if (!document.forms.practiceForm.repertoireDone.value) {
      return false;
    } else if (!document.forms.practiceForm.repertoireScale.value) {
      return false;
    } else if (!document.forms.practiceForm.toWorkOn.value) {
      return false;
    } else if (!document.forms.practiceForm.openQuestion.value) {
      return false;
    } else {
      return true;
    }
  }

  $("#practiceButton").click(function() {
    event.preventDefault();
    console.log("button clicked");
    $("#buttonFeedback").html("<img src='img/spinner.gif' />");
    var feedbackMessage = "";
    if (!verifyInputS()) {
      feedbackMessage = "Please fill out the form completely before submitting. Just a few words on each question will work great.";
      $("#buttonFeedback").html(feedbackMessage);
      return false;
    }
    $.ajax({
      method: "POST",
      url: "http://www.kaliemartinvoicestudio.com/wp-content/themes/kalies-theme/assets/php/new-students.php",
      data: {
        singerName: document.forms.practiceForm.singerName.value,
        numberHoursPracticed: document.forms.practiceForm.numberHoursPracticed.value,
        exercisesDone: document.forms.practiceForm.exercisesDone.value,
        repertoireDone: document.forms.practiceForm.repertoireDone.value,
        repertoireScale: document.forms.practiceForm.repertoireScale.value,
        toWorkOn: document.forms.practiceForm.toWorkOn.value,
        openQuestion: document.forms.practiceForm.openQuestion.value
      }
    })
      .done(function() {
        console.log("email sent");
        feedbackMessage = "The email sent successfully to me. See you at our lesson!";
      })
     .fail(function() {
        console.log("email failed");
        feedbackMessage = "Mail didn't send for some reason. Try again?";
      })
     .always(function(msg) {
        console.log("php responds: " + msg);
        $("#buttonFeedback").html(feedbackMessage);
      });
  });

});