import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import QRCode from "qrcodejs2";
import "./CSS/Global.css";
import "./CSS/QRCodePage.css";
import logo from "./resources/Logo-small.svg";
import link from "./resources/link_alt.svg"
import load from "./resources/Load_circle_duotone.svg"

function QRCodePage() {
  const qrRef = useRef(null);
  const canvasRef = useRef(null);
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");

  console.log("Received URL:", url);

  useEffect(() => {
    if (!url || !qrRef.current) return;

    qrRef.current.innerHTML = ""; // Clear previous QR

    new QRCode(qrRef.current, {
      text: url,
      width: 200,
      height: 200,
    });

    setTimeout(() => {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        canvasRef.current = canvas;
      }
    }, 100);
  }, [url]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return ;

    const link = document.createElement("a");
    link.download = "qr-code.png"
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  const handleShare = async () => {
    if (navigator.share) {
      try{
        await navigator.share({
          title : "Scan this QR",
          text: "Scan this QR code or open the link below.",
          url: url,
        });
      } catch (err){
          console.error("Error sharing : ", err);
      }
    } else {
      alert("Sharing is not supported in this browser.");
    }
  }

  return (
    <div className="wrapper">
      <div>
        <img src={logo} alt="" />
        <div className="bg">
          <div ref={qrRef} className="QR"></div>
        </div>
        <div className="option">
            <button type="button" className="load" onClick={handleDownload}>Download<img src={load} alt="" /></button>
            <button type="button" className="link" onClick={handleShare}>Share<img src={link} alt="" /></button>
        </div>
      </div>
    </div>
  );
}

export default QRCodePage;
