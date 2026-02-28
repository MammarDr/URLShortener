// src/components/SignupModal.tsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../features/auth/hooks/useAuth";
import UserForm from "../features/auth/components/UserForm";

export default function UserModal({
  formType,
}: {
  formType: "login" | "signup";
}) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      onClick={() => navigate("../..")}
      className="fixed inset-0 w-full h-full flex items-center justify-center bg-black/65 backdrop-blur-sm transition-opacity z-50"
    >
      <UserForm type={formType} />
    </div>
  );
}
