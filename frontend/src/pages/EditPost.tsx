import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostForm } from "../components/PostForm";
import type { PostFormData } from "../components/PostForm";
import { deletePost, getPost, updatePost } from "../services/post.service";
import { showToast } from "../utils/toast.utils";
import { useAuth } from "../hooks/useAuth";

export const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<PostFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuth();

  const fetchPost = async () => {
    try {
      setLoading(true);
      const post = await getPost(id!);
      setInitialData({
        categories: post.categories.map((c) => c._id),
        content: post.content,
        coverImage: post.coverImage || "",
        status: post.status,
        title: post.title,
      });
    } catch (error: any) {
      showToast(error, "error");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleSubmit = async (data: PostFormData) => {
    try {
      await updatePost(id!, {
        title: data.title,
        coverImage: data.coverImage,
        content: data.content,
        status: data.status,
        categories: data.categories,
      });
      showToast("Post updated!", "success");
      navigate(`/post/${id}`);
    } catch (error: any) {
      showToast(error, "error");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post? This action cannot be undone."
    );
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await deletePost(id!);
      showToast("Post deleted", "success");
      navigate("/");
    } catch (error: any) {
      showToast(error, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="space-y-4 text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-base-content/60">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <PostForm
      initialData={initialData!}
      isEditing
      isDeleting={isDeleting}
      author={user!}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      onCancel={() => navigate(-1)}
    />
  );
};