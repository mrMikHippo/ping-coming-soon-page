var hasError = function(field) {
  // Get validity
  var validity = field.validity;

  // If valid, return null
  if (validity.valid) return;

  if (validity.patternMismatch) return 'Please provide a valid email address';

  // If all else fails, return a generic catchall error
  return 'The value you entered for this field is invalid.';
};

var showError = function(field, error) {
  // Add error class to field
  field.classList.add("error");

  // Get field id or name
  var id = field.id || field.name;
  if (!id) return;

  // Check if error message already exist
  // If not, create one
  var message = field.form.querySelector(".error-message");
  if (!message) {
    message = document.createElement('div');
    message.classList.add('error-message');
    field.parentNode.insertBefore(message, field.nextSibling);
  }

  // Add ARIA role to the field
  field.setAttribute('aria-describedby', 'email-input-error');

  // Update error message
  message.innerHTML = error;

  // Show error message
  message.style.display = "block";
  message.style.visibility = "visible";

};


// Remove the error message
var removeError = function(field) {
  // Remove error class to field
  field.classList.remove('error');

  // Remove ARIA role from the field
   field.removeAttribute('aria-describedby');

  // Check if an error message in DOM
  var message = field.form.querySelector(".error-message");
  if (!message) return;

  // If so, Hide it
  message.innerHTML = "";
  message.style.display = "none";
  message.style.visibility = "hidden";

};

var cleanInput = function(field) {
  field.value = "";
};

// Listen submit event
document.querySelector("form").addEventListener("submit", function(event) {
  // Check for all items
  for (var i = 0; i < event.target.length; i++) {
    if (event.target[i].type == "email") {
      // Validate the field
      var error = hasError(event.target[i]);

      if (error) {
        showError(event.target[i], error);
        event.preventDefault();
        return;
      }

      console.log("No error");

      // Otherwise, remove existing error message
      removeError(event.target[i]);
      // Clean input field
      cleanInput(event.target[i]);
    }
  }

}, true);
