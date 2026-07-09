interface CoverImageUploadProps {
  imageUrl: string;
  onChange: (url: string) => void;
}

export const CoverImageUpload = ({ imageUrl, onChange }: CoverImageUploadProps) => {
  return (
    <details className="collapse collapse-arrow bg-base-200">
      <summary className="collapse-title font-medium text-sm">
        Cover Image (optional)
      </summary>
      <div className="collapse-content">
        <div className="form-control">
          <input
            type="url"
            placeholder="Paste image URL or upload..."
            className="input input-bordered w-full outline-0 focus:border-primary transition-colors"
            value={imageUrl}
            onChange={(e) => {
              onChange(e.target.value)
            }}
          />
        </div>
        {imageUrl && (
          <div className="mt-3 rounded-xl overflow-hidden bg-base-300">
            <img
              src={imageUrl}
              alt="Cover preview"
              className="w-full h-48 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
      </div>
    </details>
  );
};