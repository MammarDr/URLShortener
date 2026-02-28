export default function SkipPrev({
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
      <path d="M288-288v-384h72v384h-72Zm384 0L480-480l192-192 51 51-141 141 141 141-51 51Z" />
    </svg>
  );
}
