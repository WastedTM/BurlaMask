document.addEventListener('DOMContentLoaded',()=>{
  const button = document.getElementById("submitButton");
  button.addEventListener('click', () => {
    const file1 = document.getElementById('imageInput1').files[0];
    const file2 = document.getElementById('imageInput2').files[0];
  
    if (!file1 || !file2) {
      alert('Будь ласка, виберіть обидва зображення.');
      return;
    }
  
    const formData = new FormData();
    formData.append('image1', file1);
    formData.append('image2', file2);
  
    fetch('/sendData', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Помилка під час відправки зображень на сервер.');
      }
    })
    .then(data => {
      displayResultImages(data);
      console.log('Отримано відповідь від сервера');
    })
    .catch(error => {
      console.error('Помилка:', error);
    });
  })
});

function displayResultImages(data) {
  const resultPhoto1 = document.getElementById("resultPhoto1");
  const resultPhoto2 = document.getElementById("resultPhoto2");

  if (data.image1 !== null && data.image2 !== null) {
    resultPhoto1.src = "../drawable/" + data.image1;
    resultPhoto2.src = "../drawable/" + data.image2;
    console.log(data.message)
  } else {
    console.log("Замало зображень");
  }
}