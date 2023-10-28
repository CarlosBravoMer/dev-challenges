const urlContainer = document.querySelector(".container");
const qrContainer = document.querySelector(".container-qr");
const qrBtn = document.querySelector(".qr-btn");
let urlInput;
const backBtn = document.querySelector(".back-button");
const downloadBtn = document.querySelector(".download-button");
const shareBtn = document.querySelector(".share-button");

function showQr(input) {
  var qrcode = new QRCode(document.getElementById("qrcode"), {
    text: "${input}",
    width: 200,
    height: 200,
    colorDark: "#364153",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
  qrcode.makeCode(input);
}

qrBtn.addEventListener("click", function () {
  if (document.querySelector(".url-input").value === "") {
    alert("Please enter a valid URL");
    return;
  }
  urlInput = document.querySelector(".url-input").value;
  showQr(urlInput);

  urlContainer.setAttribute("style", "display: none");
  qrContainer.setAttribute("style", "display: flex");
});

backBtn.addEventListener("click", function () {
  urlContainer.setAttribute("style", "display: flex");
  qrContainer.setAttribute("style", "display: none");
  qrcode.innerHTML = "";
  urlInput = "";
});

downloadBtn.addEventListener("click", function () {
  var canvas = document.querySelector("canvas");
  var image = canvas
    .toDataURL("image/png", 1.0)
    .replace("image/png", "image/octet-stream");
  var link = document.createElement("a");
  link.download = "my-qr.png";
  link.href = image;
  link.click();
});

shareBtn.addEventListener("click", function () {
  navigator.clipboard.writeText(urlInput).then(
    function () {
      alert("Copied to clipboard");
    },
    function () {
      alert("Failed to copy");
    }
  );
});
