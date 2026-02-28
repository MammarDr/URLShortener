import { Component } from "react";
import { redirect } from "react-router-dom";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  {
    hasError: boolean;
  }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (!this.props.fallback) redirect("/404");
      return this.props.fallback;
    }
    return this.props.children;
  }
}
