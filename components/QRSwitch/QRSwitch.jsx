"use client";

import {
  FaLink,
  FaWhatsapp,
  FaWifi,
  FaPaypal,
  FaFilePdf,
  FaImages,
  FaPlayCircle,
  FaShareAlt,
} from "react-icons/fa";
import { FaCommentSms } from "react-icons/fa6";
import { MdEmail, MdCall, MdOutlinePhoneAndroid } from "react-icons/md";
import { CiTextAlignJustify } from "react-icons/ci";
import { BsPersonVcard, BsFillCalendar2EventFill } from "react-icons/bs";
import { useState } from "react";

import LinkQRCode from "../qr-codes/LinkQRCode";
import EmailQRCode from "../qr-codes/EmailQRCode";
import TextQRCode from "../qr-codes/TextQRCode";
import CallQRCode from "../qr-codes/CallQRCode";
import SMSQRCode from "../qr-codes/SMSQRCode";
import VCardQRCode from "../qr-codes/VCardQRCode";
import WhatsappQRCode from "../qr-codes/WhatsappQRCode";
import WifiQRCode from "../qr-codes/WifiQRCode";
import PayPalQRCode from "../qr-codes/PayPalQRCode";
import EventQRCode from "../qr-codes/EventQRCode";
import PDFQRCode from "../qr-codes/PDFQRCode";
import AppQRCode from "../qr-codes/AppQRCode";
import ImageQRcode from "../qr-codes/ImageQRcode";
import VideoQRCode from "../qr-codes/VideoQRCode";
import SocialMediaQRCode from "../qr-codes/SocialMediaQRCode";

export default function QRSwitch() {
  const [activeComponent, setActiveComponent] = useState("link");

  const toggleComponent = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="m-5 ">
      {/* QR Component switch */}
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 w-full max-w-6xl mx-auto">
          <a
            onClick={() => toggleComponent("link")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer ${
              activeComponent === "link" ? "text-green-700 bg-slate-300" : ""
            }`}
          >
            <FaLink className="mx-2" />
            Link
          </a>
          <a
            onClick={() => toggleComponent("email")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer ${
              activeComponent === "email" ? "text-green-700 bg-slate-300" : ""
            }`}
          >
            <MdEmail className="mx-2" /> E-mail
          </a>
          <a
            onClick={() => toggleComponent("text")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer ${
              activeComponent === "text" ? "text-green-700 bg-slate-300" : ""
            }`}
          >
            <CiTextAlignJustify className="mx-2" /> Text
          </a>
          <a
            onClick={() => toggleComponent("call")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer ${
              activeComponent === "call" ? "text-green-700 bg-slate-300" : ""
            }`}
          >
            <MdCall className="mx-2" /> Call
          </a>
          <a
            onClick={() => toggleComponent("sms")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer ${
              activeComponent === "sms" ? "text-green-700 bg-slate-300" : ""
            }`}
          >
            <FaCommentSms className="mx-2" /> SMS
          </a>
          <a
            onClick={() => toggleComponent("vcard")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer ${
              activeComponent === "vcard" ? "text-green-700 bg-slate-300" : ""
            }`}
          >
            <BsPersonVcard className="mx-2" /> VCard
          </a>
          <a
            onClick={() => toggleComponent("whatsapp")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer ${
              activeComponent === "whatsapp"
                ? "text-green-700 bg-slate-300"
                : ""
            }`}
          >
            <FaWhatsapp className="mx-2" /> Whatsapp
          </a>
          <a
            onClick={() => toggleComponent("wifi")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer ${
              activeComponent === "wifi" ? "text-green-700 bg-slate-300" : ""
            }`}
          >
            <FaWifi className="mx-2" /> Wifi
          </a>
          <a
            onClick={() => toggleComponent("paypal")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer ${
              activeComponent === "paypal" ? "text-green-700 bg-slate-300" : ""
            }`}
          >
            <FaPaypal className="mx-2" /> PayPal
          </a>
          <a
            onClick={() => toggleComponent("event")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer ${
              activeComponent === "event" ? "text-green-700 bg-slate-300" : ""
            }`}
          >
            <BsFillCalendar2EventFill className="mx-2" /> Event
          </a>
          <a
            onClick={() => toggleComponent("pdf")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer ${
              activeComponent === "pdf" ? "text-green-700 bg-slate-300" : ""
            }`}
          >
            <FaFilePdf className="mx-2" /> PDF
          </a>
          <a
            onClick={() => toggleComponent("app")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer ${
              activeComponent === "app" ? "text-green-700 bg-slate-300" : ""
            }`}
          >
            <MdOutlinePhoneAndroid className="mx-2" /> App
          </a>
          <a
            onClick={() => toggleComponent("image")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer ${
              activeComponent === "image" ? "text-green-700 bg-slate-300" : ""
            }`}
          >
            <FaImages className="mx-2" /> Image
          </a>
          <a
            onClick={() => toggleComponent("video")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer ${
              activeComponent === "video" ? "text-green-700 bg-slate-300" : ""
            }`}
          >
            <FaPlayCircle className="mx-2" /> Video
          </a>
          <a
            onClick={() => toggleComponent("social")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer ${
              activeComponent === "social" ? "text-green-700 bg-slate-300" : ""
            }`}
          >
            <FaShareAlt className="mx-2" /> Social
          </a>
        </div>

        {/* QR Components */}
        <div className="grid w-full max-w-[1120px] mx-auto my-11">
          {activeComponent === "link" && <LinkQRCode />}
          {activeComponent === "email" && <EmailQRCode />}
          {activeComponent === "text" && <TextQRCode />}
          {activeComponent === "call" && <CallQRCode />}
          {activeComponent === "sms" && <SMSQRCode />}
          {activeComponent === "vcard" && <VCardQRCode />}
          {activeComponent === "whatsapp" && <WhatsappQRCode />}
          {activeComponent === "wifi" && <WifiQRCode />}
          {activeComponent === "paypal" && <PayPalQRCode />}
          {activeComponent === "event" && <EventQRCode />}
          {activeComponent === "pdf" && <PDFQRCode />}
          {activeComponent === "app" && <AppQRCode />}
          {activeComponent === "image" && <ImageQRcode />}
          {activeComponent === "video" && <VideoQRCode />}
          {activeComponent === "social" && <SocialMediaQRCode />}
        </div>
      </div>
    </div>
  );
}
