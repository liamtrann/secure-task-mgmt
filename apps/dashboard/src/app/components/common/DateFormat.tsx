interface DateFormat {
  dueDate: string;
  title: string;
}

export const DateFormat = ({ dueDate, title }: DateFormat) => {
  return (
    <p className="text-sm text-gray-500 mt-2">
      {title}: {new Date(dueDate).toLocaleDateString()}
    </p>
  );
};
