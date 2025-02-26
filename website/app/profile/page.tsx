"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CustomButton from "@/app/components/controls/CustomButton";
import InputField from "@/app/components/controls/InputField";
import Header from "@/app/components/header";

interface UserProfile {
  name: string;
  email: string;
  isLoggedIn: boolean;
  provider?: string;
  profilePicture?: string;
}

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [changesMade, setChangesMade] = useState(false);

  // Add usage stats for the UI
  const [usageStats] = useState({
    used: 12,
    total: 15,
    percentage: 80,
    plan: "Free",
  });

  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem("user");

    if (userString) {
      try {
        const userData = JSON.parse(userString) as UserProfile;
        setUser(userData);
        setName(userData.name);
        setEmail(userData.email);
      } catch (error) {
        console.error("Failed to parse user data", error);
        router.push("/auth/login");
      }
    } else {
      router.push("/auth/login");
    }

    setIsLoading(false);
  }, [router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (field === "name") {
      setName(e.target.value);
    } else if (field === "email") {
      setEmail(e.target.value);
    }

    setChangesMade(true);
  };

  const handleSave = () => {
    setIsLoading(true);

    // Simulate API call to update profile
    setTimeout(() => {
      if (user) {
        const updatedUser = {
          ...user,
          name,
          email,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }

      setIsEditing(false);
      setChangesMade(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }

    setIsEditing(false);
    setChangesMade(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="pt-28 pb-16 bg-white dark:bg-gray-900 min-h-screen">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!user) {
    router.push("/auth/login");
    return null;
  }

  return (
    <>
      <Header />
      <main className="pt-28 pb-16 bg-white dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Profile Header */}
            <div className="px-6 py-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-24 h-24 relative">
                  <Image
                    src={user.profilePicture || "/profile-placeholder.png"}
                    alt="Profile"
                    width={96}
                    height={96}
                    className="rounded-full border-4 border-white shadow-md object-cover"
                  />
                  {isEditing && (
                    <div className="absolute bottom-0 right-0">
                      <button
                        className="bg-white text-blue-500 rounded-full p-1.5 shadow-md"
                        aria-label="Edit profile picture"
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p>{user.email}</p>
                  <p className="text-sm text-blue-100 mt-1">
                    {user.provider
                      ? `Connected with ${user.provider}`
                      : "Email account"}
                  </p>
                </div>
              </div>
            </div>

            {/* Usage Statistics */}
            <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Usage Overview
              </h2>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 dark:text-gray-300">
                    Explanations used this month
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {usageStats.used}/{usageStats.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-4">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${usageStats.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Current plan:{" "}
                    <span className="font-medium">{usageStats.plan}</span>
                  </span>
                  <CustomButton
                    variant="default"
                    onClick={() => router.push("/#pricing")}
                  >
                    Upgrade Plan
                  </CustomButton>
                </div>
              </div>
            </div>

            {/* Profile Information */}
            <div className="px-6 py-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Profile Information
                </h2>
                {!isEditing && (
                  <CustomButton
                    variant="default"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </CustomButton>
                )}
              </div>

              <div className="space-y-6">
                <InputField
                  label="Name"
                  value={name}
                  onChange={(e) => handleInputChange(e, "name")}
                  disabled={!isEditing}
                />

                <InputField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => handleInputChange(e, "email")}
                  disabled={!isEditing || !!user.provider}
                  helperText={
                    user.provider
                      ? `Your email is managed by ${user.provider}`
                      : ""
                  }
                />

                {isEditing && (
                  <div className="flex space-x-4 pt-4">
                    <CustomButton
                      variant="primary"
                      onClick={handleSave}
                      disabled={!changesMade}
                    >
                      Save Changes
                    </CustomButton>
                    <CustomButton variant="default" onClick={handleCancel}>
                      Cancel
                    </CustomButton>
                  </div>
                )}
              </div>
            </div>

            {/* Account Actions */}
            <div className="px-6 py-6 bg-gray-50 dark:bg-gray-700/50">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Account Actions
              </h3>
              <div className="space-y-3">
                <CustomButton
                  variant="primary"
                  className="text-gray-700 dark:text-gray-300 w-full sm:w-auto justify-start"
                  onClick={() => router.push("/")}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7m-7-7v14"
                    />
                  </svg>
                  Back to Home
                </CustomButton>

                <CustomButton
                  variant="danger"
                  className="w-full sm:w-auto justify-start"
                  onClick={handleLogout}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Log Out
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
