
import { useState } from "react";
import { Camera, Lock, Mail, Save, User } from "lucide-react";

import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Modal from "../components/common/Modal";

const INITIAL_PROFILE = {
  fullName: "Aman Kumar Jha",
  username: "aman_jha01",
  email: "admin@example.com",
  phone: "+91 98765 43210",
  role: "Super Admin",
  bio: "Platform administrator responsible for managing content, users and platform settings.",
};

const INITIAL_PASSWORD = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const Profile = () => {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [passwordData, setPasswordData] = useState(INITIAL_PASSWORD);

  const [editMode, setEditMode] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const getInitials = (name) => {
    if (!name?.trim()) {
      return "U";
    }

    const words = name.trim().split(/\s+/);

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
  };

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));

    setProfileErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordData((current) => ({
      ...current,
      [name]: value,
    }));

    setPasswordErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validateProfile = () => {
    const errors = {};

    if (!profile.fullName.trim()) {
      errors.fullName = "Full name is required.";
    }

    if (!profile.username.trim()) {
      errors.username = "Username is required.";
    }

    if (!profile.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      errors.email = "Enter a valid email address.";
    }

    if (
      profile.phone.trim() &&
      !/^[+]?[\d\s()-]{10,15}$/.test(profile.phone)
    ) {
      errors.phone = "Enter a valid phone number.";
    }

    setProfileErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const validatePassword = () => {
    const errors = {};

    if (!passwordData.currentPassword) {
      errors.currentPassword = "Current password is required.";
    }

    if (!passwordData.newPassword) {
      errors.newPassword = "New password is required.";
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters.";
    }

    if (!passwordData.confirmPassword) {
      errors.confirmPassword = "Please confirm your new password.";
    } else if (
      passwordData.newPassword !== passwordData.confirmPassword
    ) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setPasswordErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSaveProfile = (event) => {
    event.preventDefault();

    if (!validateProfile()) {
      return;
    }

    setSaving(true);

    setTimeout(() => {
      setSaving(false);
      setEditMode(false);
    }, 500);

    // Backend integration:
    // await updateProfile(profile);
  };

  const handleChangePassword = (event) => {
    event.preventDefault();

    if (!validatePassword()) {
      return;
    }

    setChangingPassword(true);

    setTimeout(() => {
      setChangingPassword(false);
      setPasswordModalOpen(false);
      setPasswordData(INITIAL_PASSWORD);
      setPasswordErrors({});
    }, 500);

    // Backend integration:
    // await changePassword(passwordData);
  };

  const handleCancelEdit = () => {
    setProfile(INITIAL_PROFILE);
    setProfileErrors({});
    setEditMode(false);
  };

  return (
    <section className="profile-page">
      <div className="profile-page__header">
        <div>
          <h1 className="profile-page__title">My Profile</h1>

          <p className="profile-page__description">
            Manage your personal information and account security.
          </p>
        </div>

        {!editMode && (
          <Button
            type="button"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </Button>
        )}
      </div>

      <div className="profile-page__grid">
        <div className="profile-page__card profile-page__card--overview">
          <div className="profile-page__avatar-wrapper">
            <div className="profile-page__avatar">
              {getInitials(profile.fullName)}
            </div>

            {editMode && (
              <button
                type="button"
                className="profile-page__avatar-button"
                aria-label="Change profile photo"
              >
                <Camera size={15} aria-hidden="true" />
              </button>
            )}
          </div>

          <h2 className="profile-page__name">
            {profile.fullName}
          </h2>

          <p className="profile-page__username">
            @{profile.username}
          </p>

          <span className="profile-page__role">
            {profile.role}
          </span>

          <p className="profile-page__bio">
            {profile.bio}
          </p>
        </div>

        <div className="profile-page__card">
          <div className="profile-page__card-header">
            <div>
              <h2 className="profile-page__card-title">
                Personal Information
              </h2>

              <p className="profile-page__card-description">
                Your basic account information.
              </p>
            </div>

            <User size={20} aria-hidden="true" />
          </div>

          <form
            className="profile-page__form"
            onSubmit={handleSaveProfile}
          >
            <div className="profile-page__form-grid">
              <Input
                label="Full Name"
                name="fullName"
                value={profile.fullName}
                onChange={handleProfileChange}
                error={profileErrors.fullName}
                disabled={!editMode}
                required
              />

              <Input
                label="Username"
                name="username"
                value={profile.username}
                onChange={handleProfileChange}
                error={profileErrors.username}
                disabled={!editMode}
                required
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleProfileChange}
                error={profileErrors.email}
                disabled={!editMode}
                required
              />

              <Input
                label="Phone Number"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                error={profileErrors.phone}
                disabled={!editMode}
              />
            </div>

            <div className="profile-page__bio-field">
              <label
                htmlFor="profile-bio"
                className="profile-page__label"
              >
                Bio
              </label>

              <textarea
                id="profile-bio"
                name="bio"
                value={profile.bio}
                onChange={handleProfileChange}
                disabled={!editMode}
                rows={4}
                className="profile-page__textarea"
                maxLength={300}
              />
            </div>

            {editMode && (
              <div className="profile-page__actions">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCancelEdit}
                  disabled={saving}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  icon={Save}
                  loading={saving}
                >
                  Save Changes
                </Button>
              </div>
            )}
          </form>
        </div>

        <div className="profile-page__card">
          <div className="profile-page__card-header">
            <div>
              <h2 className="profile-page__card-title">
                Account Information
              </h2>

              <p className="profile-page__card-description">
                Your account and access details.
              </p>
            </div>

            <Mail size={20} aria-hidden="true" />
          </div>

          <div className="profile-page__info-list">
            <div className="profile-page__info-item">
              <span>Email</span>
              <strong>{profile.email}</strong>
            </div>

            <div className="profile-page__info-item">
              <span>Phone</span>
              <strong>{profile.phone || "Not provided"}</strong>
            </div>

            <div className="profile-page__info-item">
              <span>Role</span>
              <strong>{profile.role}</strong>
            </div>

            <div className="profile-page__info-item">
              <span>Username</span>
              <strong>@{profile.username}</strong>
            </div>
          </div>
        </div>

        <div className="profile-page__card">
          <div className="profile-page__card-header">
            <div>
              <h2 className="profile-page__card-title">
                Security
              </h2>

              <p className="profile-page__card-description">
                Keep your account secure by using a strong password.
              </p>
            </div>

            <Lock size={20} aria-hidden="true" />
          </div>

          <div className="profile-page__security">
            <div>
              <strong>Password</strong>

              <p>
                Change your password regularly to keep your account secure.
              </p>
            </div>

            <Button
              type="button"
              variant="secondary"
              onClick={() => setPasswordModalOpen(true)}
            >
              Change Password
            </Button>
          </div>
        </div>
      </div>

      <Modal
        open={passwordModalOpen}
        onClose={() => {
          if (!changingPassword) {
            setPasswordModalOpen(false);
            setPasswordData(INITIAL_PASSWORD);
            setPasswordErrors({});
          }
        }}
        title="Change Password"
        size="md"
      >
        <form
          className="profile-page__password-form"
          onSubmit={handleChangePassword}
        >
          <Input
            label="Current Password"
            name="currentPassword"
            type="password"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.currentPassword}
            autoComplete="current-password"
            required
          />

          <Input
            label="New Password"
            name="newPassword"
            type="password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.newPassword}
            helperText="Use at least 8 characters."
            autoComplete="new-password"
            required
          />

          <Input
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.confirmPassword}
            autoComplete="new-password"
            required
          />

          <div className="profile-page__actions">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setPasswordModalOpen(false);
                setPasswordData(INITIAL_PASSWORD);
                setPasswordErrors({});
              }}
              disabled={changingPassword}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              loading={changingPassword}
              icon={Lock}
            >
              Update Password
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default Profile;


