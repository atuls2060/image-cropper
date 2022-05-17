import { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function App() {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);

  const selectImage = (file) => {
    setSrc(URL.createObjectURL(file));
  };

  function handleCroppChange(c) {
    setCrop(c);
  }

  const cropImageNow = () => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Converting to base64
    const base64Image = canvas.toDataURL("image/jpeg");
    setOutput(base64Image);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          selectImage(e.target.files[0]);
        }}
      />
      <p>
        x: {crop.x}, y: {crop.y}, width: {crop.width}, height: {crop.height}
      </p>
      <div>
        {src && (
          <div>
            <ReactCrop crop={crop} onChange={handleCroppChange}>
              <img src={src} onLoad={(e) => setImage(e.target)} alt="loaded" />
            </ReactCrop>
            <button onClick={cropImageNow}>Crop</button>
          </div>
        )}
      </div>
      <div>{output && <img src={output} alt="cropped" />}</div>
    </div>
  );
}

export default App;
