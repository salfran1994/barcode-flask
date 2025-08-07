let html5QrCode;
let isScanning = false;

function onScanSuccess(decodedText) {
  const resultBox = document.getElementById("result-box");
  const resultText = document.getElementById("result");

  resultText.innerText = `Scanned Code: ${decodedText}`;
  resultBox.style.display = "block";

  stopScanner();
}

function startScanner() {
  const readerDiv = document.getElementById("reader");
  const loading = document.getElementById("loading");
  const startBtn = document.getElementById("start-btn");
  const stopBtn = document.getElementById("stop-btn");

  readerDiv.style.display = "block";
  loading.style.display = "block";
  startBtn.style.display = "none";
  stopBtn.style.display = "inline-block";

  html5QrCode = new Html5Qrcode("reader");
  const config = {
    fps: 10,
    qrbox: 250,
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    formatsToSupport: [
      Html5QrcodeSupportedFormats.EAN_13,
      Html5QrcodeSupportedFormats.CODE_128,
      Html5QrcodeSupportedFormats.UPC_A,
      Html5QrcodeSupportedFormats.UPC_E,
      Html5QrcodeSupportedFormats.CODE_39
    ]
  };

  html5QrCode
    .start(
      { facingMode: "environment" },
      config,
      onScanSuccess
    )
    .then(() => {
      loading.style.display = "none";
      isScanning = true;
    })
    .catch(err => {
      console.error("Scanner start failed:", err);
      loading.innerText = "Failed to start camera.";
    });
}

function stopScanner() {
  const readerDiv = document.getElementById("reader");
  const startBtn = document.getElementById("start-btn");
  const stopBtn = document.getElementById("stop-btn");

  if (html5QrCode && isScanning) {
    html5QrCode.stop().then(() => {
      html5QrCode.clear();
      isScanning = false;
      readerDiv.style.display = "none";
      startBtn.style.display = "inline-block";
      stopBtn.style.display = "none";
    });
  }
}

document.getElementById("start-btn").addEventListener("click", startScanner);
document.getElementById("stop-btn").addEventListener("click", stopScanner);

document.getElementById("copy-btn").addEventListener("click", () => {
  const codeText = document.getElementById("result").innerText.replace("Scanned Code: ", "");
  navigator.clipboard.writeText(codeText).then(() => {
    alert("Copied to clipboard!");
  });
});
