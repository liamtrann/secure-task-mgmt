interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

export const Label = ({ htmlFor, children }: LabelProps) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
    {children}
  </label>
);