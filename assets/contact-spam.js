/***************************************************************
PLEASE NOTE: Do not change this file! 
This theme is managed by the Replica app. 
Any manual changes may be automatically overwritten at any time.
3rd PARTY APP DEVELOPERS BEWARE WITH INSTALLS!
Modify at your own peril, a broken website is the likely result.
/***************************************************************

/*
  Spam Prevention Script for Contact Form
  This script implements basic front-end anti-spam checks:
    1. Honeypot check — blocks bots that fill hidden fields.
    2. Time check — blocks submissions made in under 2 seconds.
    3. Simple math check — user must solve a math problem (7 expected) to submit.
  These checks help reduce automated spam without relying on external services.
*/

document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('contact_form');
  if (!form) {
    return;
  }

  form.setAttribute('novalidate', '');

  var startTime = Date.now();
  var mathError = document.getElementById('math_error');
  var mathInput = document.getElementById('contact_math');

  // Disable submit button until all required fields are filled
  var submitBtn = form.querySelector('input[type="submit"]');
  // Only include required fields that are present in the DOM
  var requiredFieldIds = [
    'contactFormName',
    'contactFormEmail',
    'contactFormPhone',
    'contactFormMessage',
    'contact_math'
  ];
  var requiredFields = requiredFieldIds
    .map(function(id) { return document.getElementById(id); })
    .filter(function(field) { return field !== null; });

  function checkFields() {
    var allFilled = requiredFields.every(function(field) {
      return field.value && field.value.trim() !== '';
    });
    submitBtn.disabled = !allFilled;
  }

  requiredFields.forEach(function(field) {
    field.addEventListener('input', checkFields);
  });
  checkFields();

  // populate timestamp
  document.getElementById('contact_timestamp').value = startTime;

  form.addEventListener('submit', function(e) {
    // 1) honeypot should be blank
    if (document.getElementById('contact_spam_check').value.trim()) {
      e.preventDefault();
      return;
    }

    // 2) must take at least 2 seconds
    if (Date.now() - startTime < 2000) {
      e.preventDefault();
      return;
    }

   // 3) math must equal 7
   console.log('Math input value:', mathInput.value);
  var ans = parseInt(mathInput.value, 10);
  if (ans !== 7) {
  e.preventDefault();
  e.stopImmediatePropagation(); // This stops any other submit handlers
  mathError.style.display = 'block';
  mathInput.focus();
  return false;
} else {
  mathError.style.display = 'none';
}
  });
});