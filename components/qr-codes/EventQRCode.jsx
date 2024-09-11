"use client";
import React, { useRef, useState, useEffect } from "react";
import Accordion from "../customization/Accordion";
import QRCodeColors from "../customization/QRCodeColors";
import QRCodeShapes from "../customization/QRCodeShapes";
import LogoOptions from "../customization/LogoOptions";

export default function EventQRCode(){
    const [eventTitle, setEventTitle] = useState("");
    const [eventSummary, setEventSummary] = useState("");
    const [eventStartDate, setEventStartDate] = useState("");
    const [eventEndDate, setEventEndDate] = useState("");
    const [eventTimezone, setEventTimezone] = useState("");
    const [services, setServices] = useState({
      wifi: false,
      bathroom: false,
      handicapped: false,
      babiesAllowed: false,
      dogsAllowed: false,
      parking: false,
      food: false,
    });
    const [address, setAddress] = useState({
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    });
    const [contact, setContact] = useState({
      name: "",
      phone: "",
      email: "",
      website: "",
    });
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
      const data =
      eventTitle || eventSummary || eventStartDate
          ? `  Title: ${eventTitle}
      Summary: ${eventSummary}
      Start Date: ${eventStartDate}
      End Date: ${eventEndDate}
      Timezone: ${eventTimezone}
      Services: ${Object.entries(services)
        .filter(([_, checked]) => checked)
        .map(([service]) => service)
        .join(", ")}
      Address: ${address.street}, ${address.city}, ${address.state}, ${
      address.zip
    }, ${address.country}
      Contact: ${contact.name}, ${contact.phone}, ${contact.email}, ${
      contact.website
    }
    `.trim()
          : "";
      qrCode.current.update({
        data:data,
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
    eventTitle,
    eventSummary,
    eventStartDate,
    eventEndDate,
    eventTimezone,
    services,
    address,
    contact,
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

  const handleServiceChange = (service) => (event) => {
    setServices({ ...services, [service]: event.target.checked });
  };

  const handleAddressChange = (field) => (event) => {
    setAddress({ ...address, [field]: event.target.value });
  };

  const handleContactChange = (field) => (event) => {
    setContact({ ...contact, [field]: event.target.value });
  };

    return( 
        <div className="flex flex-col md:flex-row md:justify-between w-full space-y-5 md:space-y-0 md:space-x-5 items-start">
        <div className="w-full md:w-1/2 max-w-lg">
          <h1 className="text-2xl mb-2">Event</h1>
          <div className="space-y-3">
          <label >Event Title</label>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
              placeholder="Enter Event Title"
            />
          <label >Summary</label>
          <textarea
              value={eventSummary}
              onChange={(e) => setEventSummary(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
              placeholder="Enter Event Summary"
            />
             <h3  className="text-2xl">Details</h3>
            <label >
              Date of the event
            </label>
            <input
              type="date"
              value={eventStartDate}
              onChange={(e) => setEventStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
              placeholder="Enter Start Date"
            />

            <input
              type="date"
              value={eventEndDate}
              onChange={(e) => setEventEndDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
              placeholder="Enter End Date"
            />
            <input
              type="text"
              value={eventTimezone}
              onChange={(e) => setEventTimezone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
              placeholder="Enter Timezone"
            />
            <div className="my-2">
              <p>Choose the services available at the event</p>
              {Object.keys(services).map((service) => (
                <div key={service} >
                  <input
                    type="checkbox"
                    checked={services[service]}
                    onChange={handleServiceChange(service)}
                  />
                  <label htmlFor={service} className="form-check-label">
                    {service.charAt(0).toUpperCase() +
                      service.slice(1).replace(/([A-Z])/g, " $1")}
                  </label>
                </div>
              ))}
            </div>
            <h3>Address</h3>
            <label >Street</label>
            <input
              type="text"
              value={address.street}
              onChange={handleAddressChange("street")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
              placeholder="Street"
            />
            <label >City</label>
            <input
              type="text"
              value={address.city}
              onChange={handleAddressChange("city")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
              placeholder="City"
            />
            <label >State</label>
            <input
              type="text"
              value={address.state}
              onChange={handleAddressChange("state")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
              placeholder="State"
            />
            <label >Zip</label>
            <input
              type="text"
              value={address.zip}
              onChange={handleAddressChange("zip")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
              placeholder="Zip"
            />
            <label >Country</label>
            <input
              type="text"
              value={address.country}
              onChange={handleAddressChange("country")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
              placeholder="Country"
            />
            <h3>Contact</h3>
            <label >Name</label>
            <input
              type="text"
              value={contact.name}
              onChange={handleContactChange("name")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
              placeholder="Name"
            />
            <label >Phone</label>
            <input
              type="text"
              value={contact.phone}
              onChange={handleContactChange("phone")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
              placeholder="Phone"
            />
            <label >Email</label>
            <input
              type="email"
              value={contact.email}
              onChange={handleContactChange("email")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
              placeholder="Email"
            />
            <label >Website</label>
            <input
              type="text"
              value={contact.website}
              onChange={handleContactChange("website")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
              placeholder="Website"
            />
          </div>
  
          <p className="text-slate-500 mt-1">Your QR code will open this URL.</p>
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
    )
}