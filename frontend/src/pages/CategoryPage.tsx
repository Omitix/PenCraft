import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PostCard } from "../components/PostCard";
import { Pagination } from "../components/Pagination";
import { usePosts } from "../hooks/usePosts";
import { LoadingScreen } from "../components/LoadingScreen";
import type { Category } from "../types/category.types";
import { getCategoryByTitle } from "../services/category.service";
import { showToast } from "../utils/toast.utils";

export const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts, total, isLoading: postsLoading, loadPostsByCategory } = usePosts();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const [category, setCategory] = useState<Category>();
  const [categoryLoading, setCategoryLoading] = useState(true);

  useEffect(() => {
    getCategoryByTitle(slug!).then((cat) => {
      setCategory(cat)
    }).catch((err) => {
      showToast(err)
    }).finally(() => { setCategoryLoading(false) })
      ;
  }, [slug]);


  useEffect(() => {
    if (category?._id) {
      loadPostsByCategory(category._id, currentPage, limit);
    }
  }, [category, currentPage]);

  const handlePageChange = (p: number) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (categoryLoading || postsLoading) {
    return <LoadingScreen message="Loading posts..." />;
  }

  if (!category) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Category not found</h2>
        <Link to="/categories" className="btn btn-primary mt-4">
          Browse Categories
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <Link
          to="/categories"
          className="text-sm link link-hover text-primary flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          All Categories
        </Link>
        <div className="flex items-center gap-3">
          {category.icon && <span className="text-3xl">{category.icon}</span>}
          <div>
            <h1 className="text-3xl font-bold">{category.title}</h1>
            <p className="text-base-content/60 mt-1">
              {total} {total === 1 ? "post" : "posts"}
            </p>
          </div>
        </div>
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-base-content/20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          <h2 className="text-xl font-bold mt-4">No posts yet</h2>
          <p className="text-base-content/60 mt-1">
            Be the first to write in this category
          </p>
          <Link to="/create-post" className="btn btn-primary mt-4">
            Write a Post
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} variant="vertical" />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        total={total}
        limit={limit}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};