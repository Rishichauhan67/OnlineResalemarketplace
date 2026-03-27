import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: UserProfile;
  onSave: (data: UserProfile) => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  initialData,
  onSave,
}: EditProfileModalProps) {

  const { toast } = useToast();

  const [formData, setFormData] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  // Sync form with initial data when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
    }
  }, [initialData, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    const { name, value } = e.target;

    // Limit bio length
    if (name === "bio" && value.length > 500) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Name is required.",
      });
      return;
    }

    if (!formData.email.trim()) {
      toast({
        title: "Error",
        description: "Email is required.",
      });
      return;
    }

    setIsSaving(true);

    // Simulate API request
    setTimeout(() => {

      onSave(formData);

      toast({
        title: "Success",
        description: "Your profile has been updated successfully.",
      });

      setIsSaving(false);
      onClose();

    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">

      <div className="bg-background rounded-lg border border-border max-w-md w-full max-h-[90vh] overflow-y-auto">

        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-background">

          <h2 className="text-2xl font-bold text-foreground">
            Edit Profile
          </h2>

          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Name */}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Full Name *
            </label>

            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Email */}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email Address *
            </label>

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Phone */}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Phone Number
            </label>

            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Location */}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Location
            </label>

            <input
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Bio */}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Bio
            </label>

            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Tell other users about yourself..."
              className="w-full px-4 py-2 border border-border rounded bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />

            <p className="text-xs text-muted-foreground mt-1">
              {formData.bio.length}/500 characters
            </p>
          </div>

          {/* Buttons */}

          <div className="flex gap-3 pt-4">

            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-border text-foreground px-4 py-2 rounded font-medium hover:bg-secondary transition-colors"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}