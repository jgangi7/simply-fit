"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, register, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/userHome");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const result = await register(username, password, email);
      if (!result.success) {
        setError(result.error || "Registration failed");
      }
    } catch (error) {
      setError("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="text-[#0082c8] text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#0082c8] mb-8 mt-4 text-center">
        Create Account
      </h1>
      <div className="w-40 h-24 bg-gray-300 flex items-center justify-center mb-8 rounded shadow-md">
        <span className="text-gray-600 font-semibold">logo</span>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-xs gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded bg-[#d4f4fc] font-bold shadow focus:outline-none focus:ring-2 focus:ring-[#0082c8]"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded bg-[#d4f4fc] font-bold shadow focus:outline-none focus:ring-2 focus:ring-[#0082c8]"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded bg-[#d4f4fc] font-bold shadow focus:outline-none focus:ring-2 focus:ring-[#0082c8]"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 rounded bg-[#d4f4fc] font-bold shadow focus:outline-none focus:ring-2 focus:ring-[#0082c8]"
          required
        />
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 mt-2 rounded bg-[#d4f4fc] text-[#0082c8] font-bold shadow hover:bg-[#bde8f7] transition-colors text-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
      <div className="mt-4 text-sm text-gray-600 text-center">
        Already have an account?{" "}
        <Link href="/" className="text-[#0082c8] hover:underline">
          Log in
        </Link>
      </div>
    </div>
  );
} 