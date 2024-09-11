"use client";
import React, { useRef, useState, useEffect } from "react";
import Accordion from "../customization/Accordion";
import QRCodeColors from "../customization/QRCodeColors";
import QRCodeShapes from "../customization/QRCodeShapes";
import LogoOptions from "../customization/LogoOptions";

export default function PDFQRCode() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [logo, setLogo] = useState(null);
  const [dotsColor, setDotsColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [markerBorderColor, setMarkerBorderColor] = useState("#000000");
  const [markerCenterColor, setMarkerCenterColor] = useState("#000000");
  const [dotsType, setDotsType] = useState("rounded");
  const [cornersType, setCornersType] = useState("square");
  const [cornersDotType, setCornersDotType] = useState("dot");
  const ref = useRef(null);
  const qrCode = useRef(null);
  // QR code initialization
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("qr-code-styling").then((QRCodeStylingModule) => {
        const QRCodeStyling = QRCodeStylingModule.default;
        qrCode.current = new QRCodeStyling({
          width: 250,
          height: 250,
          image: logo || "",
          dotsOptions: {
            color: dotsColor,
            type: dotsType,
          },
          backgroundOptions: {
            color: backgroundColor,
          },
          cornersSquareOptions: {
            color: markerBorderColor,
            type: cornersType,
          },
          cornersDotOptions: {
            color: markerCenterColor,
            type: cornersDotType,
          },
          imageOptions: {
            crossOrigin: "anonymous",
          },
        });

        if (ref.current) {
          qrCode.current.append(ref.current);
        }
      });
    }
  }, []);
 
  // Update QR code when state changes
  useEffect(() => {

    
    if (qrCode.current) {
      qrCode.current.update({
        data: pdfUrl,
        image: logo || "", // Ensure the logo state is correctly passed
        dotsOptions: {
          color: dotsColor,
          type: dotsType,
        },
        backgroundOptions: {
          color: backgroundColor,
        },
        cornersSquareOptions: {
          color: markerBorderColor,
          type: cornersType,
        },
        cornersDotOptions: {
          color: markerCenterColor,
          type: cornersDotType,
        },
      });
    }
  }, [
    pdfUrl,
    logo,
    dotsColor,
    backgroundColor,
    markerBorderColor,
    markerCenterColor,
    dotsType,
    cornersType,
    cornersDotType,
  ]);

  // Function to handle logo selection
  const handleLogoSelect = (selectedLogo) => {
    setLogo(selectedLogo); // Update state with the selected logo
  };

  const onLogoSelect = (select) => {
    setLogo(select);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // Items for  the Accordion component
  const items = [
    {
      title: "Color",
      content: (
        <QRCodeColors
          setDotsColor={setDotsColor}
          setBackgroundColor={setBackgroundColor}
          setMarkerBorderColor={setMarkerBorderColor}
          setMarkerCenterColor={setMarkerCenterColor}
        />
      ),
    },
    {
      title: "Shapes",
      content: (
        <QRCodeShapes
          setDotsType={setDotsType}
          setCornersType={setCornersType}
          setCornersDotType={setCornersDotType}
        />
      ),
    },
    {
      title: "Logo",
      content: (
        <LogoOptions
          handleLogoSelect={handleLogoSelect}
          onLogoSelect={onLogoSelect}
          onFileChange={handleFileChange}
        />
      ),
    },
  ];

  // Download QR code as an image
  const onDownloadClick = (extension) => {
    if (qrCode.current) {
      qrCode.current.download({ extension });
    }
  };
  return (
    <div className="flex flex-col md:flex-row md:justify-between w-full space-y-5 md:space-y-0 md:space-x-5 items-start">
      <div className="w-full md:w-1/2 max-w-lg">
        <h1 className="text-2xl mb-2">Enter Google Drive PDF URL</h1>
        <input
          type="text"
          value={pdfUrl}
          onChange={(e) => setPdfUrl(e.target.value)}
          placeholder="Enter Google Drive PDF Url"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
        />
        <p className="text-slate-500 mt-1">
          Enter the URL of a PDF file from Google Drive to generate the QR code.
        </p>
        <Accordion items={items} />
      </div>

      <div className="flex flex-col items-center justify-center md:sticky md:top-5 md:self-start md:w-1/2 m-5 md:m-0">
        <div ref={ref} className="mb-5 md:mb-0">
          {/* QR Code will be appended here */}
        </div>
        <div className="text-center md:flex-col justify-center items-center my-5">
          <button
            onClick={() => onDownloadClick("png")}
            className="px-3 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition my-3 mx-3"
          >
            Download PNG
          </button>

          <button
            onClick={() => onDownloadClick("svg")}
            className="px-3 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition mx-3"
         >
            Download SVG
          </button>
        </div>
      </div>
    </div>
  );
}
