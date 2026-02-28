export default function Delete({
  onClick,
  size = 18,
  className = "fill-red-500",
}: {
  onClick?: () => void | null;
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
      className={`cursor-pointer ${className}`}
    >
      <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
    </svg>
  );
}
