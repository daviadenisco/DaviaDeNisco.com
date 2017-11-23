$(document).ready(function () {

  window.currentView = $(".home");

  window.swapContent = function (event) {
    event.preventDefault();
    window.currentView.fadeOut(300, function () {
      var newContentClass = event.currentTarget.id;
      window.currentView.toggleClass("hidden");
      window.currentView = $("." + newContentClass);
      window.currentView.fadeIn(300, function () {
        window.currentView.toggleClass("hidden");
      })
    });
  };

  $(".page-link").on("click", window.swapContent);
})
