import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  XMarkIcon,
  DocumentDuplicateIcon,
  QrCodeIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";

const GenerateReferralLinkModal = ({ isOpen, onClose, customerId }) => {
  const [copied, setCopied] = useState(false);
  const [linkType, setLinkType] = useState("default"); // default, custom, campaign
  const [showQR, setShowQR] = useState(false);
  const [previewMode, setPreviewMode] = useState("qr"); // qr, mobile, desktop
  const [qrColor, setQrColor] = useState("#2B5C3F"); // Khedmah green

  const referralLink = `https://khedmah.com/refer/${customerId}${
    linkType === "campaign" ? "?campaign=spring2024" : ""
  }`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("referral-qr");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `referral-qr-${customerId}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const shareVia = (platform) => {
    const shareData = {
      title: "Join Khedmah Loyalty Program",
      text: "Use my referral link to join and get bonus points!",
      url: referralLink,
    };

    switch (platform) {
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(
            `${shareData.text} ${shareData.url}`
          )}`
        );
        break;
      case "email":
        window.open(
          `mailto:?subject=${encodeURIComponent(
            shareData.title
          )}&body=${encodeURIComponent(
            `${shareData.text}\n\n${shareData.url}`
          )}`
        );
        break;
      default:
        if (navigator.share) {
          navigator.share(shareData);
        }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative bg-white rounded-lg w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-medium text-gray-900">
              Generate Referral Link
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Link Type
              </label>
              <select
                value={linkType}
                onChange={(e) => setLinkType(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              >
                <option value="default">Default Link</option>
                <option value="custom">Custom Link</option>
                <option value="campaign">Campaign Link</option>
              </select>
            </div>

            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Referral Link
              </label>
              <button
                onClick={() => setShowQR(!showQR)}
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <QrCodeIcon className="w-5 h-5" />
                {showQR ? "Hide QR Code" : "Show QR Code"}
              </button>
            </div>

            {showQR ? (
              <div className="space-y-6">
                <div className="flex justify-center gap-4 border-b border-gray-200 pb-4">
                  <button
                    onClick={() => setPreviewMode("qr")}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      previewMode === "qr"
                        ? "bg-green-50 text-green-700"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    QR Code
                  </button>
                  <button
                    onClick={() => setPreviewMode("mobile")}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      previewMode === "mobile"
                        ? "bg-green-50 text-green-700"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Mobile Preview
                  </button>
                  <button
                    onClick={() => setPreviewMode("desktop")}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      previewMode === "desktop"
                        ? "bg-green-50 text-green-700"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Desktop Preview
                  </button>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  {previewMode === "qr" ? (
                    <>
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <QRCodeSVG
                          id="referral-qr"
                          value={referralLink}
                          size={200}
                          level="H"
                          includeMargin
                          fgColor={qrColor}
                          imageSettings={{
                            src: "/logo.svg",
                            x: undefined,
                            y: undefined,
                            height: 24,
                            width: 24,
                            excavate: true,
                          }}
                        />
                      </div>
                      <div className="w-full space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          QR Code Color
                        </label>
                        <input
                          type="color"
                          value={qrColor}
                          onChange={(e) => setQrColor(e.target.value)}
                          className="block w-full h-10 rounded-md"
                        />
                      </div>
                    </>
                  ) : previewMode === "mobile" ? (
                    <div className="w-[320px] h-[640px] bg-white rounded-3xl shadow-lg p-4 border-8 border-gray-800">
                      <div className="h-full bg-gray-50 rounded-2xl p-4 overflow-y-auto">
                        <div className="text-center space-y-4">
                          <img
                            src="/logo.svg"
                            alt="Khedmah"
                            className="h-12 mx-auto"
                          />
                          <h3 className="text-lg font-medium">
                            Join Khedmah Loyalty
                          </h3>
                          <p className="text-sm text-gray-600">
                            You've been invited to join Khedmah's loyalty
                            program. Sign up now and get bonus points!
                          </p>
                          <button className="w-full py-2 bg-green-600 text-white rounded-lg text-sm font-medium">
                            Join Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
                      <div className="text-center space-y-6">
                        <img
                          src="/logo.svg"
                          alt="Khedmah"
                          className="h-16 mx-auto"
                        />
                        <h2 className="text-2xl font-semibold">
                          Welcome to Khedmah Loyalty
                        </h2>
                        <p className="text-gray-600 max-w-md mx-auto">
                          You've been invited to join our exclusive loyalty
                          program. Sign up now to start earning points and
                          enjoying special rewards!
                        </p>
                        <button className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium">
                          Create Account
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-center gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => shareVia("whatsapp")}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                    title="Share via WhatsApp"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => shareVia("email")}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                    title="Share via Email"
                  >
                    <EnvelopeIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => shareVia("native")}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                    title="More sharing options"
                  >
                    <ShareIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={downloadQRCode}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <ArrowDownTrayIcon className="w-5 h-5" />
                    Download QR Code
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 text-sm bg-gray-50"
                />
                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <DocumentDuplicateIcon className="w-5 h-5" />
                </button>
              </div>
            )}
            {copied && (
              <p className="mt-2 text-sm text-green-600">Link copied!</p>
            )}

            {linkType === "campaign" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Campaign Name
                  </label>
                  <input
                    type="text"
                    placeholder="Spring 2024 Campaign"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Campaign Duration
                  </label>
                  <div className="mt-1 grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      placeholder="Start Date"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                    />
                    <input
                      type="date"
                      placeholder="End Date"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bonus Points
                  </label>
                  <input
                    type="number"
                    placeholder="Additional points for campaign referrals"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              Close
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md">
              Generate Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateReferralLinkModal;
