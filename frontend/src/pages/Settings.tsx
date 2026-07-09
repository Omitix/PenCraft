import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { updateUser, uploadAvatar } from "../services/user.service";
import { showToast } from "../utils/toast.utils";
import { getUserInitials } from "../utils/initials.utils";

export const Settings = () => {
    const navigate = useNavigate();
    const { user, setAuthenticatedUser } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [bio, setBio] = useState(user?.bio || "");
    const [loading, setLoading] = useState(false);
    const [avatarLoading, setAvatarLoading] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    if (!user) {
        navigate("/auth");
        return null;
    }

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => setAvatarPreview(e.target?.result as string);
        reader.readAsDataURL(file);

        setAvatarLoading(true);
        try {
            const updatedUser = await uploadAvatar(user._id, file);
            setAuthenticatedUser(updatedUser);
            setAvatarPreview(null);
            showToast("Profile photo updated!", "success");
        } catch (error: any) {
            showToast(error?.response?.data?.message || "Upload failed", "error");
            setAvatarPreview(null);
        } finally {
            setAvatarLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const newUser = await updateUser(user._id, { bio });
            setAuthenticatedUser(newUser);
            showToast("Profile updated!", "success");
            navigate(`/profile/${user._id}`);
        } catch (error: any) {
            showToast(error?.response?.data?.message || "Update failed", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Hero Header */}
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-secondary/10 p-8 mb-8">
                <div className="relative z-10 flex items-center gap-6">
                    {/* Avatar */}
                    <div className="relative group shrink-0">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-base-100 shadow-xl">
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : user.avatar ? (
                                <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-primary flex items-center justify-center">
                                    <span className="text-3xl font-bold text-primary-content">
                                        {getUserInitials(user.username)}
                                    </span>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={avatarLoading}
                            className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-primary-content rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                        >
                            {avatarLoading ? (
                                <span className="loading loading-spinner loading-xs"></span>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{user.username}</h1>
                        <p className="text-base-content/60 text-sm">{user.email}</p>
                    </div>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                    disabled={avatarLoading}
                />
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Bio Section */}
            <form onSubmit={handleSubmit}>
                <div className="card bg-base-200 shadow-sm border border-base-300">
                    <div className="card-body p-6">
                        <h3 className="card-title text-lg">About You</h3>
                        <p className="text-sm text-base-content/60">
                            A short bio to let readers know who you are
                        </p>

                        <div className="form-control mt-4">
                            <textarea
                                placeholder="I write about..."
                                className="textarea textarea-bordered w-full outline-0 focus:border-primary transition-colors resize-none text-base"
                                rows={4}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                maxLength={200}
                            />
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-base-content/40">
                                    {bio.length}/200
                                </span>
                                <span className="text-xs text-base-content/40">
                                    {200 - bio.length} characters remaining
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mt-6 pt-6 border-t border-base-300">
                            <button
                                type="button"
                                className="btn btn-ghost btn-sm"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary btn-sm flex-1"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};