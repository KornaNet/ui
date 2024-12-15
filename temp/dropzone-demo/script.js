const dropzoneBox = document.getElementsByClassName("dropzone-box")[0];
const inputFiles = document.querySelectorAll(
  ".dropzone-area input[type='file']"
);
const inputElement = inputFiles[0];
const dropZoneElement = inputElement.closest(".dropzone-area");
const fileLimit = 25000000;


inputElement.addEventListener("change", (e) => {
  if(inputElement.files[0].size > fileLimit) {
    inputElement.setCustomValidity("File is over 25MB!");
    return
  }

  if (inputElement.files.length) {
    updateDropzoneFileList(dropZoneElement, inputElement.files[0]);
  }
});

dropZoneElement.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZoneElement.classList.add("dropzone--over");
});

["dragleave", "dragend"].forEach((type) => {
  dropZoneElement.addEventListener(type, (e) => {
    dropZoneElement.classList.remove("dropzone--over");
  });
});

dropZoneElement.addEventListener("drop", (e) => {
  e.preventDefault();

  if(e.dataTransfer.files[0].size > fileLimit) {
    inputElement.setCustomValidity("File is over 25MB!");
    dropZoneElement.classList.remove("dropzone--over");

    return
  }

  if (e.dataTransfer.files.length) {
    inputElement.files = e.dataTransfer.files;

    updateDropzoneFileList(dropZoneElement, e.dataTransfer.files[0]);
  }

  dropZoneElement.classList.remove("dropzone--over");
});

const updateDropzoneFileList = (dropzoneElement, file) => {
  let dropzoneFileMessage = dropzoneElement.querySelector(".file-info");

  dropzoneFileMessage.innerHTML = `
        ${file.name}, ${file.size} bytes
    `;
};

dropzoneBox.addEventListener("reset", (e) => {
  let dropzoneFileMessage = dropZoneElement.querySelector(".file-info");

  dropzoneFileMessage.innerHTML = `No Files Selected`;
});

dropzoneBox.addEventListener("submit", (e) => {
  e.preventDefault();
  const myFiled = document.getElementById("upload-file");

  if(myFiled.files[0].size > fileLimit) {
    inputElement.setCustomValidity("File is over 25MB!");
  }
  inputElement.setCustomValidity("This is just demo, no files were uploaded.");
});
