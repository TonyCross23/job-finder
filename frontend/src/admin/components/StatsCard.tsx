interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export const StatsCard = ({ title, value, icon }: StatsCardProps) => (
  <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
    {icon && <div>{icon}</div>}
    <div>
      <div className="text-gray-500">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  </div>
);
