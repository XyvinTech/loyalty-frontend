import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import CriteriaCard from "../components/CriteriaCard";
import AddPointCriteriaModal from "../components/AddPointCriteriaModal";
import { CodeBracketIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import Modal from "../components/common/Modal";

const pointsCriteria = [
  {
    id: 1,
    name: "Recharge",
    description: "Points earned for mobile recharge transactions",
    type: "service",
    pointsFormula: "1:1 OMR",
    icon: "📱",
    integration: {
      method: "POST",
      endpoint: "/api/v1/services/recharge",
      sdkMethod: "khedmah.rechargeService()",
      parameters: {
        serviceProvider: "string (required) - Provider name",
        mobileNumber: "string (required) - Format: 968XXXXXXXX",
        amount: "number (required) - Amount in OMR",
        customerId: "string (required) - Customer ID",
      },
    },
  },
  {
    id: 2,
    name: "Telecom",
    description: "Points earned for telecom bill payments",
    type: "service",
    pointsFormula: "2:1 OMR",
    icon: "📞",
    integration: {
      method: "POST",
      endpoint: "/api/v1/services/telecom-payment",
      sdkMethod: "khedmah.payTelecomBill()",
      parameters: {
        provider: "string (required) - Telecom provider name",
        accountNumber: "string (required) - Customer account number",
        amount: "number (required) - Bill amount",
        billReference: "string (required) - Bill reference number",
      },
      example: {
        request: `{
  "provider": "Ooredoo",
  "accountNumber": "TEL987654",
  "amount": 45.500,
  "billReference": "BILL456",
  "customerId": "CUST123"
}`,
        response: `{
  "success": true,
  "pointsEarned": 91,
  "transactionId": "TEL456",
  "billStatus": "paid",
  "receipt": {
    "number": "RCP789012",
    "amount": 45.500,
    "currency": "OMR",
    "timestamp": "2024-01-25T14:30:00Z"
  }
}`,
      },
      notes: [
        "Points awarded after successful recharge",
        "Available for prepaid and postpaid numbers",
        "Minimum recharge amount may vary by provider",
      ],
    },
  },
  {
    id: 3,
    name: "Electricity",
    description: "Points earned for electricity bill payments",
    type: "utility",
    pointsFormula: "2:1 OMR",
    icon: "⚡",
    integration: {
      method: "POST",
      endpoint: "/api/v1/services/electricity-payment",
      sdkMethod: "khedmah.payElectricityBill()",
      parameters: {
        provider: "string (required) - Electricity provider name",
        accountNumber: "string (required) - Customer account number",
        amount: "number (required) - Bill amount",
        billReference: "string (required) - Bill reference number",
      },
      example: {
        request: `{
  "provider": "Muscat Electricity",
  "accountNumber": "ELEC123456",
  "amount": 75.000,
  "billReference": "BILL123",
  "customerId": "CUST123"
}`,
        response: `{
  "success": true,
  "pointsEarned": 150,
  "transactionId": "ELEC456",
  "billStatus": "paid",
  "receipt": {
    "number": "RCP456789",
    "amount": 75.000,
    "currency": "OMR",
    "timestamp": "2024-01-25T15:45:00Z"
  }
}`,
      },
      notes: [
        "Points awarded after successful recharge",
        "Available for prepaid and postpaid numbers",
        "Minimum recharge amount may vary by provider",
      ],
    },
  },
  {
    id: 4,
    name: "Donations",
    description: "Points earned for charitable donations",
    type: "charity",
    pointsFormula: "5:1 OMR",
    icon: "🤲",
    integration: {
      method: "POST",
      endpoint: "/api/v1/services/donation",
      sdkMethod: "khedmah.donate()",
      parameters: {
        amount: "number (required) - Donation amount",
        customerId: "string (required) - Customer's unique identifier",
        charityId: "string (required) - Charity's unique identifier",
      },
      example: {
        request: `{
  "amount": 50.000,
  "customerId": "CUST123",
  "charityId": "CHR789",
  "description": "Education Fund"
}`,
        response: `{
  "success": true,
  "pointsEarned": 250,
  "transactionId": "DON789",
  "donationStatus": "completed",
  "receipt": {
    "number": "RCP123456",
    "amount": 50.000,
    "currency": "OMR"
  }
}`,
      },
      notes: [
        "Points awarded after successful donation",
        "Available for any charity",
        "Minimum donation amount may vary by charity",
      ],
    },
  },
  {
    id: 5,
    name: "Pay Bills",
    description: "Points earned for utility bill payments",
    type: "utility",
    pointsFormula: "2:1 OMR",
    icon: "💰",
    integration: {
      method: "POST",
      endpoint: "/api/v1/services/bill-payment",
      sdkMethod: "khedmah.payBill()",
      parameters: {
        provider: "string (required) - Bill provider name",
        accountNumber: "string (required) - Customer account number",
        amount: "number (required) - Bill amount",
        billReference: "string (required) - Bill reference number",
      },
      example: {
        request: `{
  "serviceProvider": "Omantel",
  "mobileNumber": "96812345678",
  "amount": 10.00,
  "customerId": "CUST123"
}`,
        response: `{
  "success": true,
  "pointsEarned": 20,
  "transactionId": "RCH789",
  "rechargeStatus": "completed"
}`,
      },
      notes: [
        "Points awarded after successful recharge",
        "Available for prepaid and postpaid numbers",
        "Minimum recharge amount may vary by provider",
      ],
    },
  },
  {
    id: 6,
    name: "Water",
    description: "Points earned for water bill payments",
    type: "utility",
    pointsFormula: "2:1 OMR",
    icon: "💧",
    integration: {
      method: "POST",
      endpoint: "/api/v1/services/water-payment",
      sdkMethod: "khedmah.payWaterBill()",
      parameters: {
        provider: "string (required) - Water provider name",
        accountNumber: "string (required) - Customer account number",
        amount: "number (required) - Bill amount",
        billReference: "string (required) - Bill reference number",
      },
      example: {
        request: `{
  "provider": "Water Authority",
  "accountNumber": "WAT123456",
  "amount": 35.500,
  "billReference": "BILL789",
  "customerId": "CUST123"
}`,
        response: `{
  "success": true,
  "pointsEarned": 71,
  "transactionId": "WAT456",
  "billStatus": "paid",
  "receipt": {
    "number": "RCP789012",
    "amount": 35.500,
    "currency": "OMR",
    "timestamp": "2024-01-25T14:30:00Z"
  }
}`,
      },
      notes: [
        "Points awarded after successful recharge",
        "Available for prepaid and postpaid numbers",
        "Minimum recharge amount may vary by provider",
      ],
    },
  },
  {
    id: 7,
    name: "SPF",
    description: "Points earned for SPF-related payments",
    type: "government",
    pointsFormula: "3:1 OMR",
    icon: "🏛️",
    integration: {
      method: "POST",
      endpoint: "/api/v1/services/spf-payment",
      sdkMethod: "khedmah.paySPF()",
      parameters: {
        provider: "string (required) - SPF provider name",
        accountNumber: "string (required) - Customer account number",
        amount: "number (required) - Payment amount",
        billReference: "string (required) - Bill reference number",
      },
      example: {
        request: `{
  "provider": "SPF",
  "serviceType": "VEHICLE_INSURANCE",
  "civilId": "9123456789",
  "amount": 120.000,
  "vehicleDetails": {
    "plateNumber": "12345",
    "make": "Toyota",
    "model": "Camry",
    "year": "2023"
  }
}`,
        response: `{
  "success": true,
  "pointsEarned": 360,
  "transactionId": "SPF789",
  "policyNumber": "POL123456",
  "validUntil": "2025-01-25",
  "receipt": {
    "number": "SPF987654",
    "amount": 120.000,
    "currency": "OMR"
  }
}`,
      },
      notes: [
        "Points awarded after successful payment",
        "Available for prepaid and postpaid numbers",
        "Minimum payment amount may vary by provider",
      ],
    },
  },
  {
    id: 8,
    name: "Dhofar",
    description: "Points earned for Dhofar insurance services",
    type: "insurance",
    pointsFormula: "2:1 OMR",
    icon: "🛡️",
    integration: {
      method: "POST",
      endpoint: "/api/v1/services/dhofar-insurance",
      sdkMethod: "khedmah.payDhofarInsurance()",
      parameters: {
        provider: "string (required) - Insurance provider name",
        accountNumber: "string (required) - Customer account number",
        amount: "number (required) - Payment amount",
        billReference: "string (required) - Bill reference number",
      },
      example: {
        request: `{
  "provider": "Dhofar Insurance",
  "policyType": "TRAVEL",
  "civilId": "9123456789",
  "amount": 85.000,
  "travelDetails": {
    "destination": "UAE",
    "duration": "30",
    "startDate": "2024-02-01"
  }
}`,
        response: `{
  "success": true,
  "pointsEarned": 170,
  "transactionId": "DHO456",
  "policyNumber": "TRV123456",
  "validUntil": "2024-03-01",
  "receipt": {
    "number": "DH789012",
    "amount": 85.000,
    "currency": "OMR",
    "timestamp": "2024-01-25T16:20:00Z"
  }
}`,
      },
      notes: [
        "Points awarded after successful payment",
        "Available for prepaid and postpaid numbers",
        "Minimum payment amount may vary by provider",
      ],
    },
  },
  {
    id: 9,
    name: "ROP",
    description: "Points earned for ROP services",
    type: "government",
    pointsFormula: "2:1 OMR",
    icon: "👮",
    integration: {
      method: "POST",
      endpoint: "/api/v1/services/rop-service",
      sdkMethod: "khedmah.payROP()",
      parameters: {
        provider: "string (required) - ROP provider name",
        accountNumber: "string (required) - Customer account number",
        amount: "number (required) - Payment amount",
        billReference: "string (required) - Bill reference number",
      },
      example: {
        request: `{
  "serviceType": "TRAFFIC_FINE",
  "civilId": "9123456789",
  "amount": 25.000,
  "fineReference": "TF123456",
  "vehiclePlate": "12345"
}`,
        response: `{
  "success": true,
  "pointsEarned": 50,
  "transactionId": "ROP456",
  "clearanceStatus": "completed",
  "receipt": {
    "number": "ROP789012",
    "amount": 25.000,
    "currency": "OMR",
    "timestamp": "2024-01-25T10:15:00Z"
  }
}`,
      },
      notes: [
        "Points awarded after successful payment",
        "Available for prepaid and postpaid numbers",
        "Minimum payment amount may vary by provider",
      ],
    },
  },
];

const PointsCriteria = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCriteria, setSelectedCriteria] = useState(null);

  const CriteriaDetailModal = ({ criteria, onClose }) => {
    if (!criteria) return null;

    return (
      <Modal isOpen={true} onClose={onClose} maxWidth="4xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                <span className="text-2xl">{criteria.icon}</span>
                {criteria.name}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {criteria.description}
              </p>
            </div>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
              {criteria.type}
            </span>
          </div>

          {/* Points Formula */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900">
              Points Formula
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              {criteria.pointsFormula}
            </p>
          </div>

          {/* Integration Details */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              Integration Details
            </h3>

            {/* API Details */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <CodeBracketIcon className="w-4 h-4" />
                  API Endpoint
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                    {criteria.integration.method}
                  </span>
                  <code className="text-sm text-gray-600">
                    {criteria.integration.endpoint}
                  </code>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <DocumentTextIcon className="w-4 h-4" />
                  SDK Method
                </div>
                <code className="mt-2 block text-sm text-gray-600">
                  {criteria.integration.sdkMethod}
                </code>
              </div>
            </div>

            {/* Parameters */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Parameters
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                {Object.entries(criteria.integration.parameters).map(
                  ([param, desc]) => (
                    <div key={param}>
                      <code className="text-sm font-medium text-purple-600">
                        {param}
                      </code>
                      <span className="text-sm text-gray-600 ml-2">{desc}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Example - Only show if exists */}
            {criteria.integration.example && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Example
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Request</div>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                      {criteria.integration.example.request}
                    </pre>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Response</div>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                      {criteria.integration.example.response}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Notes - Only show if exists */}
            {criteria.integration.notes && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Important Notes
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {criteria.integration.notes.map((note, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Points Criteria
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2.5 w-64 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span>
            Add Points Criteria
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pointsCriteria.map((criteria) => (
          <div
            key={criteria.id}
            onClick={() => setSelectedCriteria(criteria)}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{criteria.icon}</div>
              <div>
                <h3 className="font-medium text-gray-900">{criteria.name}</h3>
                <p className="text-sm text-gray-500">{criteria.description}</p>
              </div>
            </div>

            {/* Points formula and type */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-medium text-green-600">
                {criteria.pointsFormula}
              </span>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {criteria.type}
              </span>
            </div>
          </div>
        ))}
      </div>

      <AddPointCriteriaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {selectedCriteria && (
        <CriteriaDetailModal
          criteria={selectedCriteria}
          onClose={() => setSelectedCriteria(null)}
        />
      )}
    </div>
  );
};

export default PointsCriteria;
