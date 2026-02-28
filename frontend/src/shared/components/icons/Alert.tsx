export default function Alert({
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
      <path d="m48-144 432-720 432 720H48Zm127-72h610L480-724 175-216Zm330.5-58.29q10.5-10.29 10.5-25.5t-10.29-25.71q-10.29-10.5-25.5-10.5t-25.71 10.29q-10.5 10.29-10.5 25.5t10.29 25.71q10.29 10.5 25.5 10.5t25.71-10.29ZM444-384h72v-192h-72v192Zm36-86Z" />
    </svg>
  );
}
