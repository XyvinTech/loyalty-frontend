import {
  BoltIcon,
  HeartIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

const iconMap = {
  lightning: BoltIcon,
  heart: HeartIcon,
  payment: CreditCardIcon,
};

const CriteriaCard = ({ title, description, icon }) => {
  const Icon = iconMap[icon];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-6">
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
          <Icon className="w-6 h-6 text-green-600" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <button className="text-green-600 text-sm font-medium hover:text-green-700">
        View details
      </button>
    </div>
  );
};

export default CriteriaCard;
