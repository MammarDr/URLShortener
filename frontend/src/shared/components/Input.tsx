import React from "react";

export default function Input({
  displayName,
  id,
  name,
  type = "text",
  value,
  placeholder,
  autoComplete = "off",
  svg,
  onChange: _onChange,
}: {
  displayName: string;
  id: string;
  name: string;
  type?: string;
  value?: string;
  placeholder?: string;
  autoComplete?: string;
  svg: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="group">
      <label
        htmlFor={id}
        className="text-theme/70 text-sm font-bold tracking-tight"
      >
        {displayName}
      </label>
      <div className="relative flex items-center gap-x-2 mt-1 mb-5 text-theme">
        <input
          id={id}
          name={name}
          type={type}
          className="w-full py-4 pl-12 placeholder:text-sm placeholder:text-theme/80 dark:placeholder:text-theme/60 rounded-xl border border-theme border-solid shadow-md focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent peer"
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={false}
          value={value}
        />
        {React.cloneElement(svg, {
          viewBox: "0 -960 960 960",
          height: "20px",
          width: "20px",
          className:
            "absolute left-3 pointer-events-none fill-theme peer-focus:fill-primary",
        })}
      </div>
    </div>
  );
}
