export default function Next({
  size = 18,
  className = "fill-theme",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      height={size}
      width={size}
      className={`${className}`}
    >
      <path d="M522-480 333-669l51-51 240 240-240 240-51-51 189-189Z" />
    </svg>
  );
}
