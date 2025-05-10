import React from "react";

interface HeadingProps {
  title: string;
  className?: string;
}

export const Heading = ({ title, className = "" }: HeadingProps) => {
  return (
    <h3 className={`text-lg font-semibold ${className}`}>
      {title}
    </h3>
  );
};