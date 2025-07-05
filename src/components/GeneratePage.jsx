import { useState, useRef , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Global.css";
import "./CSS/GeneratePage.css";
import logo from "./resources/Logo.svg";
// import QRCodePage from "./QRCodePage";


function GeneratePage() {
  const [url, setUrl] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Generate QR Code";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value.trim();
    if (value) {
      setUrl(value);
      navigate(`/qrcode?url=${encodeURIComponent(value)}`);
    }
  };

  return (
    <div className="wrapper">
      <div>
        <img src={logo} alt="" />
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="form">
              <input
                type="url"
                name=""
                id="qrcode"
                placeholder="Enter an url"
                ref={inputRef}
              />
              <button type="submit">QR Code</button>
            </div>
          </form>
        </div>
        {/* {url && <QRCodePage url={url} />} */}
      </div>
    </div>
  );
}

export default GeneratePage;
