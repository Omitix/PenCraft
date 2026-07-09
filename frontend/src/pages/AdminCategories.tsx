import { useEffect, useState } from "react";
import { useCategories } from "../hooks/useCategories";
import { createCategory, deleteCategory, updateCategory } from "../services/category.service";
import { showToast } from "../utils/toast.utils";
import { ConfirmModal } from "../components/ConfirmModal";

export const AdminCategories = () => {
  const { categories, loadCategories } = useCategories();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", icon: "" });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  useEffect(() => {
    loadCategories()
  }, []);

  const filteredCategories = categories.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({ title: "", description: "", icon: "" });
    setShowModal(true);
  };

  const handleOpenEdit = (cat: (typeof categories)[0]) => {
    setEditingId(cat._id);
    setForm({
      title: cat.title,
      description: cat.description || "",
      icon: cat.icon || "",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm({ title: "", description: "", icon: "" });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    try {
      if (editingId) {
        await updateCategory(editingId, form.title, form.icon, form.description);
      } else {
        await createCategory(form.title, form.icon, form.description);
      }
      await loadCategories();
      showToast(editingId ? "Category updated!" : "Category created!", "success");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Something went wrong";
      showToast(message, "error");
    }
    handleCloseModal();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      await loadCategories();
      showToast("Category deleted", "success");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Something went wrong";
      showToast(message, "error");
    } finally {
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Categories</h2>
          <p className="text-base-content/60 mt-1">{categories.length} total categories</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={handleOpenAdd}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Category
        </button>
      </div>

      {/* Search */}
      <div className="form-control max-w-sm">
        <div className="relative">
          <input
            type="text"
            placeholder="Search categories..."
            className="input input-bordered w-full pl-10 outline-0 focus:border-primary transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Table */}
      <div className="card bg-base-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-8 text-base-content/50">
                    No categories found
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat) => (
                  <tr key={cat._id} className="hover:bg-base-200/50">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary/10 text-lg">
                          {cat.icon }
                        </div>
                        <span className="font-semibold">{cat.title}</span>
                      </div>
                    </td>
                    <td>
                      <p className="text-sm text-base-content/60 max-w-xs truncate">
                        {cat.description || "—"}
                      </p>
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => handleOpenEdit(cat)}
                          title="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          className="btn btn-ghost btn-xs text-error"
                          onClick={() => setDeleteConfirm(cat._id)}
                          title="Delete"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={handleCloseModal}>
          <div className="card bg-base-100 shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="card-body p-6">
              <h3 className="card-title">{editingId ? "Edit Category" : "Add Category"}</h3>
              <form onSubmit={handleSave} className="space-y-4 mt-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Icon (Emoji)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 💻"
                    className="input input-bordered w-full outline-0 focus:border-primary transition-colors text-center text-2xl"
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    maxLength={2}
                  />
                  <label className="label">
                    <span className="label-text-alt">
                      Press <kbd className="kbd kbd-xs">Win</kbd> + <kbd className="kbd kbd-xs">.</kbd> for emoji picker
                    </span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Technology"
                    className="input input-bordered w-full outline-0 focus:border-primary transition-colors"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    autoFocus
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Description</span>
                  </label>
                  <textarea
                    placeholder="Brief description..."
                    className="textarea textarea-bordered w-full outline-0 focus:border-primary transition-colors resize-none"
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>

                <div className="card-actions justify-end gap-2">
                  <button type="button" className="btn btn-ghost btn-sm" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    {editingId ? "Save Changes" : "Add Category"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => handleDelete(deleteConfirm!)}
        title="Delete Category?"
        message="This action cannot be undone. Posts in this category will not be deleted."
      />
    </div>
  );
};