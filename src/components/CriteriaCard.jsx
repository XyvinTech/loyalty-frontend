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

const CriteriaCard = ({
  title,
  description,
  icon,
  services,
  pointsFormula,
}) => {
  const Icon = iconMap[icon];

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-green-50 rounded-lg">
          <Icon className="w-6 h-6 text-green-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>

          {services && (
            <div className="mt-3 flex flex-wrap gap-2">
              {services.map((service) => (
                <span
                  key={service}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                >
                  {service}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 text-sm font-medium text-green-600">
            {pointsFormula}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriteriaCard;
