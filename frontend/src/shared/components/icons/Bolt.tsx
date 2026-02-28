export default function Bolt({
  size = 20,
  className = "fill-white",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 -960 960 960"
      height={size}
      width={size}
      className={className}
    >
      <path d="m437-249 183-231H471l26-221-173 269h146l-33 183ZM336-96l48-264H192l324-504h72l-36 312h216L408-96h-72Zm136-379Z" />
    </svg>
  );
}
