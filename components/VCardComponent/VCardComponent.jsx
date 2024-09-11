"use client";
import React, { useRef, useState, useEffect } from "react";
import Accordion from "../customization/Accordion";
import QRCodeColors from "../customization/QRCodeColors";
import QRCodeShapes from "../customization/QRCodeShapes";
import LogoOptions from "../customization/LogoOptions";
import Link from "next/link";
import { useSession } from "next-auth/react"; // Import useSession

export default function VCardComponent() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(""); // Base64 image
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [company, setCompany] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
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
  const { data: session, status } = useSession();

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
    name,
    image,
    number,
    email,
    url,
    company,
    street,
    city,
    zip,
    country,
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
  const handleImgChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Ensure the Base64 string includes the correct prefix
        setImage(reader.result); // Set Base64 encoded image with data URL prefix
      };
      reader.readAsDataURL(file); // Convert the file to Base64
    }
  };

  // const handleSubmit = async () => {
  //   if (!name || !email) {
  //     alert("Name and email are required!");
  //     return;
  //   }

  //   const response = await fetch("/api/uploads", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name,
  //       image, // Send Base64 encoded image
  //       number,
  //       email,
  //       url,
  //       company,
  //       street,
  //       city,
  //       zip,
  //       country,
  //     }),
  //   });

  //   const result = await response.json();
  //   if (result.id) {
  //     const qrDataUrl = `${window.location.origin}/users/${result.id}`;

  //     // Call the shortener API
  //     const shortenerResponse = await fetch("/api/shorten", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ originalUrl: qrDataUrl }),
  //     });

  //     const shortenerResult = await shortenerResponse.json();

  //     if (shortenerResult.shortUrl) {
  //       qrCode.current.update({ data: shortenerResult.shortUrl });
  //     } else {
  //       console.error("Error shortening URL:", shortenerResult.error);
  //     }
  //   } else {
  //     console.error("Error:", result.error);
  //   }
  // };

  // const saveQRCodeToDB = async () => {
  //   if (!qrCode.current) return;

  //   // Convert the QR code canvas to Base64
  //   const canvas = ref.current.querySelector("canvas");
  //   if (!canvas) {
  //     alert("QR code is not generated yet.");
  //     return;
  //   }

  //   const imageData = canvas.toDataURL("image/png"); // Get Base64 string of QR code

  //   try {
  //     const response = await fetch("/api/saveQRCode", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         qrImage: imageData,

  //       }),
  //     });

  //     if (response.ok) {
  //       alert("QR Code saved successfully!");
  //     } else {
  //       alert("Failed to save QR Code.");
  //     }
  //   } catch (error) {
  //     console.error("Error saving QR Code:", error);
  //     alert("Error saving QR Code.");
  //   }
  // };

  // /////////////////////////////////////////////////////////////////////////////////////

  // const saveQRCodeToDB = async () => {
  //   if (!qrCode.current) return;

  //   // Ensure the QR code is fully rendered before capturing the image
  //   setTimeout(async () => {
  //     const canvas = ref.current.querySelector("canvas");
  //     if (!canvas) {
  //       alert("QR code is not generated yet.");
  //       return;
  //     }

  //     // Convert the canvas to a Base64 encoded image
  //     const imageData = canvas.toDataURL("image/png"); // Capture the canvas as PNG with all styles intact

  //     try {

  //       const response = await fetch("/api/saveQRCode", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           qrImage: imageData,
  //         }),
  //       });

  //       if (response.ok) {
  //         alert("QR Code saved successfully!");
  //       } else {
  //         alert("Failed to save QR Code.");
  //       }
  //     } catch (error) {
  //       console.error("Error saving QR Code:", error);
  //       alert("Error saving QR Code.");
  //     }
  //   }, 500); // Adjust the timeout duration as necessary
  // };

  useEffect(() => {
    if (status === "loading") {
      // Session is still loading; do nothing
      return;
    }
    if (!session || !session.user?.id) {
      console.error("User is not authenticated");
    }
  }, [session, status]);

  const saveQRCodeToDB = async () => {
    if (!ref.current) return;

    setTimeout(async () => {
      const canvas = ref.current.querySelector("canvas");
      if (!canvas) {
        alert("QR code is not generated yet.");
        return;
      }

      const imageData = canvas.toDataURL("image/png");

      try {
        // Check session status and user ID
        if (status !== "authenticated" || !session?.user?.id) {
          throw new Error("User is not authenticated");
        }

        const userId = session.user.id;

        const response = await fetch("/api/saveQRCode", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            qrImage: imageData,
            userId, // Pass the user ID along with the QR code data
          }),
        });

        if (response.ok) {
          alert("QR Code saved successfully!");
        } else {
          alert("Failed to save QR Code.");
        }
      } catch (error) {
        console.error("Error saving QR Code:", error);
        alert("Error saving QR Code.");
      }
    }, 500); // Adjust the timeout as needed
  };

  const handleSubmit = async () => {
    if (!name || !email) {
      alert("Name and email are required!");
      return;
    }

    const response = await fetch("/api/uploads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        image, // Send Base64 encoded image
        number,
        email,
        url,
        company,
        street,
        city,
        zip,
        country,
      }),
    });

    const result = await response.json();
    if (result.id) {
      const qrDataUrl = `${window.location.origin}/users/${result.id}`;

      // Call the shortener API
      const shortenerResponse = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl: qrDataUrl }),
      });

      const shortenerResult = await shortenerResponse.json();

      if (shortenerResult.shortUrl) {
        qrCode.current.update({ data: shortenerResult.shortUrl });

        // Save QR code to the database after updating with the shortened URL
        await saveQRCodeToDB();
      } else {
        console.error("Error shortening URL:", shortenerResult.error);
      }
    } else {
      console.error("Error:", result.error);
    }
  };

  return (
    <div>
      <div className="flex  justify-around items-center p-5">
        <div>
          <Link href={"/"} className="text-xl">
            Logo
          </Link>
        </div>
        <div>
          <Link
            href="/dashboard"
            className="bg-blue-500 text-white px-3 py-2 flex items-center rounded hover:bg-blue-600 transition"
            aria-label="Dashboard"
          >
            Dashboard
          </Link>{" "}
        </div>
      </div>
      <h1 className="text-2xl mb-2 text-center">Generate VCard QRCode</h1>
      <div className="m-10 flex flex-col md:flex-row md:justify-between w-full space-y-5 md:space-y-0 md:space-x-5 items-start">
        <div className="w-full md:w-1/2 max-w-lg">
          <div className="space-y-3 mb-5">
            <div>
              <label> Full Name</label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="profileImage"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Image
              </label>
              <input
                type="file"
                id="profileImage"
                onChange={handleImgChange} // Convert to Base64
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label> Phone Number</label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter your contact number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
              />
            </div>

            <div>
              <label> E-mail Address</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label>Website</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your website url"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
              />
            </div>
            <div>
              <label> Company Name</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Enter your company"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
              />
            </div>
            <div>
              <label> Street Address</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Enter your Street"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
              />
            </div>
            <div>
              <label>City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
              />
            </div>
            <div>
              <label> Zip Code</label>
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="Enter your zip code"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label>Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter your country"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
              />
            </div>
          </div>

          <Accordion items={items} />
        </div>

        <div className="flex flex-col items-center justify-center md:sticky md:top-5 md:self-start md:w-1/2 m-5 md:m-0">
          <div ref={ref} className="mb-5 md:mb-0">
            {/* QR Code will be appended here */}
          </div>
          <div className="text-center md:flex-col justify-center items-center my-5 ">
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
            <button
              onClick={handleSubmit}
              className="mt-5 px-3 py-2 bg-green-700 text-white rounded-lg shadow-md hover:bg-green-600 transition mx-3"
            >
              Generate QR Code
            </button>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
