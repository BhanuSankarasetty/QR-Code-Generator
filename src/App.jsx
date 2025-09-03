import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [text, setText] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [qrSize, setQrSize] = useState(200);
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  const qrRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      setQrValue(text);
      toast.success("🎉 QR Code generated successfully!");
    }
  };

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    a.click();
    toast.success("✅ QR Code downloaded!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  relative overflow-hidden text-white">
      {/* glows */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* card */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-4">
        <div className="rounded-2xl shadow-2xl  backdrop-blur-md border border-gray-700">
          
          {/* header */}
          <div className="flex flex-col space-y-1.5 p-6 text-center">
            <h3 className="tracking-tight text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              QR Code Generator 
            </h3>
            <p className="text-gray-400 mt-2">
              Transform text into stunning, customizable QR codes
            </p>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-4">
            <input
              type="text"
              placeholder="Enter text, URL, or message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex h-12 w-full rounded-md px-3 py-2 border  focus:border-purple-500 transition-all  text-lg text-black"
            />
            <button
              type="submit"
              disabled={!text.trim()}
              className="w-full py-3 text-lg font-semibold rounded-md bg-purple-600 hover:bg-purple-700 transition-all disabled:opacity-50"
            >
              Generate QR Code
            </button>
          </form>

          {/* customization */}
          <div className="px-6 pb-6 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-400">Size: {qrSize}px</label>
              <input
                type="range"
                min="150"
                max="400"
                value={qrSize}
                onChange={(e) => setQrSize(Number(e.target.value))}
                className="w-40"
              />
            </div>
          </div>

          {/* QR preview + download */}
          {qrValue && (
            <div className="flex flex-col items-center gap-4 p-6" ref={qrRef}>
              <QRCodeCanvas
                value={qrValue}
                size={qrSize}
                fgColor={qrColor}
                bgColor={bgColor}
                level="H"
                includeMargin={true}
              />
              <button
                onClick={handleDownload}
                className="px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-all text-white font-medium"
              >
                ⬇️ Download PNG
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Toast container */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
