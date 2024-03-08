let clipList = [];
let img = document.querySelector("img");
let image = document.querySelector(".image-div");
let finished = document.querySelector("#finished");
let generate = document.querySelector("#generate");
let clipContent = document.querySelector("#clip-content");
let success = document.querySelector("#success");
let fileInput = document.getElementById("imageInput");
let imgElement = document.getElementById("displayedImg");
let startOver = document.getElementById("startOver");

function displayImage() {
  
  imgElement.style.width = "100%";
  imgElement.style.margin = "0 auto";
  image.style.width = "100%";
  image.style.margin = "0 auto";
  imgElement.style.display = "inline";

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      imgElement.src = e.target.result;
    };

    reader.readAsDataURL(fileInput.files[0]);
  }
  fileInput.style.display = "none";
  fileInput.value = null;
  finished.style.display = "block";
  startOver.style.display = "inline-block";
}

startOver.addEventListener("click", (event) => {
  location.reload();
});

image.addEventListener("click", (event) => {
  const x = Math.round((event.offsetX / Number(img.width)) * 100);
  const y = Math.round((event.offsetY / Number(img.height)) * 100);

  // console.log(`X: ${x}, Y: ${y}`);
  clipList.push(x + "% " + y + "%");

  const dot = document.createElement("div");
  dot.classList.add("dot");
  dot.style.left = event.offsetX - 2.5 + "px"; // Subtracting half of dot's size for centering
  dot.style.top = event.offsetY - 2.5 + "px"; // Subtracting half of dot's size for centering
  image.appendChild(dot);
});

finished.addEventListener("click", (event) => {
  let output = "polygon(" + clipList.join() + ")";
  image.style.clipPath = output;

  // grab all dots and remove each one
  document.querySelectorAll(".dot").forEach(() => {
    document.querySelector(".dot").remove();
  });
  finished.style.display = "none";
  generate.style.display = "block";
});

generate.addEventListener("click", (event) => {
  clipContent.innerHTML = "clip-path: " + image.style.clipPath + ";";
  selection = window.getSelection();
  range = document.createRange();
  range.selectNodeContents(clipContent);
  selection.removeAllRanges();
  selection.addRange(range);
  navigator.clipboard.writeText(clipContent.innerText);
  document.querySelector('h2').style.width = "300px";
  document.querySelector('h2').style.margin = "0 auto";
  success.style.display = "block";
});
