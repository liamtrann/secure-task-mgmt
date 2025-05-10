interface TaskPriorityBadgeProps {
  priority: 'low' | 'medium' | 'high';
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

export const PriorityBadge = ({ priority }: TaskPriorityBadgeProps) => {
  return (
    <span
      className={`text-xs px-2 py-1 rounded-full inline-block ${priorityColors[priority]}`}
    >
      {priority}
    </span>
  );
};
