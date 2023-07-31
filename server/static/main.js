var form = document.forms.namedItem("fileinfo");
var lastImage;

form.addEventListener("submit", function (ev) {
  ev.preventDefault();

  document.getElementById("loader").style.visibility = "visible";
  let formdata = new FormData(form);

  var requestOptions = {
    method: "POST",
    body: formdata,
  };

  var loc = window.location;

  fetch(
    `${loc.protocol}//${loc.hostname}:${loc.port}/predict`,
    requestOptions
  ).then((response) =>
    response.text().then((result) => {
      console.log(result);
      DisplayResult(result);
      document.getElementById("loader").style.visibility = "hidden";
    })
  );
});

//On Image Uploaded
form.addEventListener("change", function (ev) {
  lastImage = URL.createObjectURL(ev.target.files[0]);
  document.getElementById("uploadedImg").src = lastImage;
});

function DisplayResult(result) {
  /*I have created some CSS classes to make this look half decent.*/
  resultDiv = document.getElementById("results");

  divContainer = document.createElement("div");
  divContainer.className = "result";

  divImage = document.createElement("div");
  divImage.className = "image";
  divImage.style.backgroundImage = "url('" + lastImage + "')";

  divText = document.createElement("div");
  divText.appendChild(document.createTextNode(result));
  divText.className = "text";

  divContainer.appendChild(divImage);
  divContainer.appendChild(divText);
  resultDiv.prepend(divContainer);
}
///////////////////////////////////////////////////////////////////

// let takephoto = document.getElementById("take");
// takephoto.addEventListener("click", (e) => {
//   const firstdiv = document.querySelector(".first");
//   const wrapper = document.createElement("div");
//   wrapper.classList.add("video-wrapper");
//   const video = document.createElement("video");
//   const canvas = document.createElement("canvas");
//   const fileInput = document.querySelector("input[type=file]");

//   // Access the camera
//   navigator.mediaDevices
//     .getUserMedia({ video: true })
//     .then((stream) => {
//       video.srcObject = stream;
//       video.play();
//     })
//     .catch((err) => console.error(err));
//   captureButton = document.createElement("button");
//   firstdiv.append(wrapper);
//   wrapper.append(video);
//   wrapper.append(canvas);
//   captureButton.textContent = "Capture";
//   wrapper.append(captureButton);
//   captureButton.addEventListener("click", () => {
//     const context = canvas.getContext("2d");
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const dataURL = canvas.toDataURL();
//     const uploadedImg = document.querySelector("#uploadedImg");
//     uploadedImg.src = dataURL;
//     firstdiv.removeChild(wrapper);

//     const blob = dataURItoBlob(dataURL);
//     const file = new File([blob], "image.jpg", { type: "image/jpeg" });
//     fileInput.files = [file];
//     // form.submit();
//   });
// });

// function dataURLToBlob(dataURL) {
//   const parts = dataURL.split(";base64,");
//   const contentType = parts[0].split(":")[1];
//   const raw = window.atob(parts[1]);
//   const rawLength = raw.length;
//   const uInt8Array = new Uint8Array(rawLength);

//   for (let i = 0; i < rawLength; ++i) {
//     uInt8Array[i] = raw.charCodeAt(i);
//   }

//   return new Blob([uInt8Array], { type: contentType });
// }
