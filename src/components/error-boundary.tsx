"use client";

import { Component, ReactNode } from "react";
import { Heading, Text } from "@/components/ui/typography";
import { AppButton } from "@/components/ui/app-button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary component to catch and handle React errors gracefully
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    // In production, you might want to log to an error reporting service
    // Example: logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  handleReload = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="text-6xl mb-6">⚠️</div>
            <Heading size="lg" className="mb-4">
              Something went wrong
            </Heading>
            <Text variant="muted" className="mb-8">
              We encountered an unexpected error. Please try again or reload the
              page.
            </Text>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-small text-muted-foreground mb-2">
                  Error Details (Development)
                </summary>
                <pre className="text-xs bg-muted p-4 rounded overflow-auto">
                  {this.state.error.message}
                  {"\n"}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AppButton variant="primary" onClick={this.handleRetry}>
                Try Again
              </AppButton>
              <AppButton variant="outline" onClick={this.handleReload}>
                Reload Page
              </AppButton>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Hook to throw errors from function components
 */
export function useErrorHandler() {
  return (error: Error) => {
    if (process.env.NODE_ENV === "development") {
      console.error("Error thrown from useErrorHandler:", error);
    }
    throw error;
  };
}
