"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Trash2, Upload } from "lucide-react";
import { changeUserEmail, changeUserName } from "@/app/action/setting";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
function GeneralSetting({ user }) {
  const router = useRouter();
  const [isNameChangeModalOpen, setIsNameChangeModalOpen] = useState(false);
  const [isEmailChangeModal, setIsEmailChangeModal] = useState(false);
  const [nameValue, setNameValue] = useState(user.username);
  const [emailValue, setEmailValue] = useState(user.email);
  console.log("user in general", user);
  const {theme,setTheme} = useTheme();

  const { update } = useSession();
  const handleNameChange = async (userId, newName) => {
    const res = await changeUserName(userId, newName);
    console.log(res);
    if (res.success) {
      await update({ name: newName });
      toast.success("Name updated successfully!");
      setIsNameChangeModalOpen(false);
    }
  };

  const handleEmailChange = async (userId, newEmail) => {
    const res = await changeUserEmail(userId, newEmail);
    if (res.success) {
      await update({ email: newEmail });
      toast.success("Email updated successfully!");
      setIsEmailChangeModal(false);
    }
  };
  return (
    <div className="flex-1 ml-8 bg-background p-6 space-y-8 overflow-auto">
      {/* Profile Header */}
      <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full overflow-hidden bg-muted border-4 border-background shadow-lg">
              <Image
                src={user.profileImage}
                alt="Profile picture"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full shadow-md">
              <Upload className="w-4 h-4" />
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-card-foreground mb-2">{user.username}</h1>
            <p className="text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground mt-1">Member since {new Date().getFullYear()}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="hover:bg-muted">
              <Upload className="w-4 h-4 mr-2" />
              Upload Photo
            </Button>
            <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Cards */}
      <div className="space-y-6">
        {/* Name Section */}
        {isNameChangeModalOpen ? (
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm animate-in slide-in-from-left duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <h3 className="text-lg font-semibold text-card-foreground">Edit Your Name</h3>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  className="w-full bg-background text-foreground border border-border rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 placeholder:text-muted-foreground"
                  placeholder="Enter your full name"
                  autoFocus
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={() => handleNameChange(user.id, nameValue)}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 transition-all duration-200 hover:shadow-md"
                >
                  💾 Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setNameValue(user.username);
                    setIsNameChangeModalOpen(false);
                  }}
                  className="flex-1 border-border hover:bg-muted text-muted-foreground font-medium py-2.5 transition-all duration-200"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-card-foreground">Name</h3>
                <p className="text-muted-foreground">{nameValue}</p>
              </div>
              <Button 
                onClick={() => setIsNameChangeModalOpen(true)}
                variant="outline"
                size="sm"
                className="hover:bg-muted"
              >
                Edit
              </Button>
            </div>
          </div>
        )}
        
        {/* Email Section */}
        {isEmailChangeModal ? (
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm animate-in slide-in-from-left duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <h3 className="text-lg font-semibold text-card-foreground">Edit Your Email</h3>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  className="w-full bg-background text-foreground border border-border rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 placeholder:text-muted-foreground"
                  placeholder="Enter your email address"
                  autoFocus
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={() => handleEmailChange(user.id, emailValue)}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 transition-all duration-200 hover:shadow-md"
                >
                  💾 Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEmailValue(user.email);
                    setIsEmailChangeModal(false);
                  }}
                  className="flex-1 border-border hover:bg-muted text-muted-foreground font-medium py-2.5 transition-all duration-200"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-card-foreground">Email Address</h3>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              <Button 
                onClick={() => setIsEmailChangeModal(true)}
                variant="outline"
                size="sm"
                className="hover:bg-muted"
              >
                Edit
              </Button>
            </div>
          </div>
        )}
        
        {/* Language & Currency Section */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-card-foreground">Language & Currency</h3>
              <p className="text-muted-foreground">English, USA ($)</p>
            </div>
            <Button 
              variant="outline"
              size="sm"
              className="hover:bg-muted"
            >
              Edit
            </Button>
          </div>
        </div>
        
        {/* Theme Section */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-card-foreground">Theme Preference</h3>
              <p className="text-muted-foreground">Choose your preferred appearance</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="bg-background text-foreground border border-border rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent appearance-none cursor-pointer hover:bg-muted transition-colors duration-200"
                >
                  <option value="light">☀️ Light Mode</option>
                  <option value="dark">🌙 Dark Mode</option>
                  <option value="system">💻 System</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralSetting;
