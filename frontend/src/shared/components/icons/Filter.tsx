export default function Filter({
  onClick,
  size = 18,
  className = "fill-theme",
}: {
  onClick: () => void;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      height={size}
      width={size}
      className={className}
    >
      <path d="M384-264v-72h192v72H384ZM240-444v-72h480v72H240Zm-96-180v-72h672v72H144Z" />
    </svg>
  );
}
