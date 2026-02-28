export default function Prev({
  size = 18,
  className = "fill-theme",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 -960 960 960"
      width={size}
      className={`${className}`}
    >
      <path d="M576-240 336-480l240-240 51 51-189 189 189 189-51 51Z" />
    </svg>
  );
}
