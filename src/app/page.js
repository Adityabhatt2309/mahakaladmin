"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import Dashboard from "./components/Dashboard";
import Login from "./login/page";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("authToken"); // Get the authentication token from cookies
    const userrole = getCookie("role"); // Get the authentication token from cookies
    if (token) {
      setIsAuthenticated(true);
      if (userrole === "admin") {
        router.push("/superadmin/dashboard");
      } else {
        router.push("/");
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <div>
      {isAuthenticated ? (
        <main>
          <Dashboard />
        </main>
      ) : (
        <Login />
      )}
    </div>
  );
}
