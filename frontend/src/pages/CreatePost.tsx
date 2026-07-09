import { useNavigate } from "react-router-dom";
import { PostForm } from "../components/PostForm";
import type { PostFormData } from "../components/PostForm";
import { addPost } from "../services/post.service";
import { showToast } from "../utils/toast.utils";
import { useAuth } from "../hooks/useAuth";

export const CreatePost = () => {
  const navigate = useNavigate();

  const { user } = useAuth()

  const handleSubmit = async (data: PostFormData) => {
    try {
      const post = await addPost(data.title, data.coverImage, data.content, data.status, data.categories)
      navigate(`/post/${post._id}`);
    } catch (error: any) {
      showToast(error, "error")
    }
  };

  return (
    <PostForm
      author={user!}
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
    />
  );
};