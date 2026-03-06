
import { useLocation, useNavigate } from "react-router-dom";
import URLEditor from "../features/url/components/URLEditor";
import type { IUrl } from "../features/url/types";
export default function UrlModal({url}: {url: IUrl | null | undefined}) {
  const navigate = useNavigate();
  const location = useLocation();
  if(!url) {
    url = location.state?.url;
    if(!url) {
        navigate("../..");
        return null;
    }
  }
  return (
    <div
      onClick={() => navigate("../..")}
      className="fixed inset-0 w-full h-full flex items-center justify-center backdrop-blur-sm transition-opacity z-50"
    >
      <URLEditor url={url} />
    </div>
  );
}