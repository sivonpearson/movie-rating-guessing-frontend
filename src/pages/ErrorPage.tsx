import React from "react";

const ErrorPage: React.FC<{ error_message: string }> = ({ error_message }) => {
  return (
    <div className="flex h-screen items-center justify-center bg-red-600 text-4xl text-white">
      {error_message}
    </div>
  );
};

export default ErrorPage;
