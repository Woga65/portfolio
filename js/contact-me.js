/* wait until all elements are present in the DOM */
document.addEventListener('DOMContentLoaded', () => {


  const endPoint = 'https://your-website.xyz/php/mail.php';
  const myForm = document.getElementById('contact-form');
  const submit = document.querySelector('.contact-form .submit-button');
  const dataSent = document.querySelector('.contact .form-data-sent');
  const formFields = document.querySelectorAll('.contact-form .form-field');
  const isDirty = new Array(formFields.length).fill(false);


  /* let the sent notification fade out */
  ['click', 'keyup', 'touchstart'].forEach(ev => dataSent.addEventListener(ev, e => {
    dataSent.style.opacity = '0';
    setTimeout(()=> dataSent.style.display = 'none' ,400);
  }));


  /* check whether invalid data has been entered into a form field */
  formFields.forEach((ff, i) => {
    ['blur', 'keyup'].forEach(ev => ff.addEventListener(ev, e => {
      if (e.type == 'blur') {
        isDirty[i] = ff.value ? true : false;
      }
      !ff.value || !isDirty[i] ? ff.classList.toggle('invalid', false) : ff.classList.toggle('invalid', !ff.checkValidity());
    }));
  });


  /* on submit button clicked, check if all required data has been entered correctly */
  submit.addEventListener('click', e => {
    let invalidField = null;
    formFields.forEach(ff => {
      invalidField = ff.required ? (ff.checkValidity() ? invalidField :  invalidField ? invalidField : ff) : invalidField;
      ff.classList.toggle('invalid', !ff.checkValidity());
    });
    if (invalidField) {
      e.preventDefault();
      invalidField.focus();
    }
  });


  /* on submit send form data to the end point */
  myForm.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(myForm);
    const formDataObject = Object.fromEntries(formData);
    try {
      const response = await fetch(endPoint, {
        method: 'POST',
        body: JSON.stringify(formDataObject),
        headers: {
          'Content-Type': 'application/json',  //'text/plain' also works
        },
      });
      console.log('result: ', await response.text());
    } catch (e) {
      console.error(e);
    }
    formDataSent();
  });


  /* initialize form data and show notification */
  function formDataSent() {
    formFields.forEach((ff, i) => {
      ff.value = '';
      isDirty[i] = false;
    });
    dataSent.style.display = 'flex';
    dataSent.style.opacity = '1';
    dataSent.focus();
  }


});
