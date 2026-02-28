export default function SkipNext({
  size = 20,
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
      <path d="m336-288-51-51 141-141-141-141 51-51 192 192-192 192Zm312 0v-384h72v384h-72Z" />
    </svg>
  );
}
