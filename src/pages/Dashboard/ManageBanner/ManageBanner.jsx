import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import bannerService from '../../../services/bannerService';
import { successToast, errorToast } from '../../../utils/toastStyles';

const INITIAL_FORM = {
  title: '',
  imageUrl: '',
  imageFile: null,
  previewUrl: '',
};

const getBannerImage = (banner) => {
  if (!banner) return '';
  if (Array.isArray(banner.images) && banner.images.length > 0) {
    return banner.images[0]?.url || '';
  }
  return banner.image || '';
};

const ManageBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const fileInputRef = useRef(null);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await bannerService.getAllBanners();
      const payload = res?.data;
      const list =
        payload?.data?.banners ||
        payload?.data ||
        payload?.banners ||
        (Array.isArray(payload) ? payload : []);
      setBanners(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error('Failed to fetch banners', err);
      toast.error('Failed to load banners', errorToast);
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleOpenAdd = () => {
    setEditingBanner(null);
    setFormData(INITIAL_FORM);
    setShowForm(true);
  };

  const handleOpenEdit = (banner) => {
    setEditingBanner(banner);
    const existingUrl = getBannerImage(banner);
    setFormData({
      title: banner.title || banner.name || '',
      imageUrl: existingUrl,
      imageFile: null,
      previewUrl: existingUrl,
    });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingBanner(null);
    setFormData(INITIAL_FORM);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'imageUrl') {
      setFormData((prev) => ({
        ...prev,
        imageUrl: value,
        imageFile: null,
        previewUrl: value,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file', errorToast);
      return;
    }
    const localUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      imageUrl: '',
      previewUrl: localUrl,
      title: prev.title || file.name.replace(/\.[^/.]+$/, ''),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Title is required', errorToast);
      return;
    }
    if (!formData.imageFile && !formData.imageUrl.trim()) {
      toast.error('Image is required', errorToast);
      return;
    }
    setSubmitting(true);
    try {
      let payload;
      if (formData.imageFile) {
        // multipart/form-data for file upload
        payload = new FormData();
        payload.append('title', formData.title);
        payload.append('isActive', 'true');
        payload.append('images', formData.imageFile);
      } else {
        // plain JSON for URL
        payload = {
          title: formData.title,
          isActive: true,
          images: [{ url: formData.imageUrl }],
        };
      }

      if (editingBanner) {
        const id = editingBanner._id || editingBanner.id;
        await bannerService.updateBanner(id, payload);
        toast.success('Banner updated successfully', successToast);
      } else {
        await bannerService.createBanner(payload);
        toast.success('Banner created successfully', successToast);
      }
      handleCloseForm();
      fetchBanners();
    } catch (err) {
      console.error('Failed to save banner', err);
      const msg = err?.response?.data?.message || 'Failed to save banner';
      toast.error(msg, errorToast);
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const id = deleteTarget._id || deleteTarget.id;
    setDeleting(true);
    try {
      await bannerService.deleteBanner(id);
      toast.success('Banner deleted successfully', successToast);
      setBanners((prev) => prev.filter((b) => (b._id || b.id) !== id));
      setDeleteTarget(null);
    } catch (err) {
      console.error('Failed to delete banner', err);
      const msg = err?.response?.data?.message || 'Failed to delete banner';
      toast.error(msg, errorToast);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className='animate-[fadeIn_0.4s_ease]'>
      {/* Header */}
      <div className='flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8'>
        <div>
          <h1 className="font-['Cormorant_Garamond',Georgia,serif] text-3xl md:text-4xl font-semibold text-[#1c1c1a] mb-1">
            Manage Banners
          </h1>
          <p className="font-['Outfit',system-ui,sans-serif] text-sm text-[#5a5a56]">
            Configure homepage hero images • {banners.length} items
          </p>
        </div>
        <button
          type='button'
          onClick={handleOpenAdd}
          className="flex items-center gap-2 font-['Outfit',system-ui,sans-serif] text-sm font-semibold text-white bg-linear-to-br from-emerald-500 to-emerald-600 border-0 px-6 py-3 rounded-[10px] cursor-pointer transition-all duration-200 shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)]"
        >
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <line x1='12' y1='5' x2='12' y2='19' />
            <line x1='5' y1='12' x2='19' y2='12' />
          </svg>
          Add Banner
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className='flex items-center justify-center py-20'>
          <div className='w-10 h-10 border-4 border-[#eeeeec] border-t-[#c17f3a] rounded-full animate-spin' />
        </div>
      )}

      {/* Empty State */}
      {!loading && banners.length === 0 && (
        <div className='flex flex-col items-center justify-center py-20 text-center'>
          <svg width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' className='text-[#9e9e9a] mb-6'>
            <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
            <circle cx='8.5' cy='8.5' r='1.5' />
            <polyline points='21 15 16 10 5 21' />
          </svg>
          <h3 className="font-['Cormorant_Garamond',Georgia,serif] text-2xl font-semibold text-[#1c1c1a] mb-2">
            No banners yet
          </h3>
          <p className="font-['Outfit',system-ui,sans-serif] text-sm text-[#5a5a56]">
            Click "Add Banner" to upload your first hero image
          </p>
        </div>
      )}

      {/* Banners Grid */}
      {!loading && banners.length > 0 && (
        <div className='grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
          {banners.map((banner) => {
            const id = banner._id || banner.id;
            return (
              <div
                key={id}
                className='bg-white/95 backdrop-blur-xl border border-black/6 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]'
              >
                <div className='relative aspect-video overflow-hidden bg-[#eeeeec]'>
                  {getBannerImage(banner) ? (
                    <img
                      src={getBannerImage(banner)}
                      alt={banner.title || 'Banner'}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center text-[#9e9e9a]'>
                      No Image
                    </div>
                  )}
                </div>

                <div className='p-5'>
                  <h3 className="font-['Outfit',system-ui,sans-serif] text-base font-semibold text-[#1c1c1a] mb-4 truncate">
                    {banner.title || 'Untitled'}
                  </h3>

                  <div className='flex gap-2'>
                    <button
                      type='button'
                      onClick={() => handleOpenEdit(banner)}
                      className="flex-1 flex items-center justify-center gap-2 font-['Outfit',system-ui,sans-serif] text-sm font-medium text-[#1c1c1a] bg-[#f7f7f5] hover:bg-[#f5ebe0] hover:text-[#c17f3a] border-0 py-2.5 rounded-lg cursor-pointer transition-all duration-200"
                    >
                      <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                        <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' />
                        <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' />
                      </svg>
                      Edit
                    </button>
                    <button
                      type='button'
                      onClick={() => setDeleteTarget(banner)}
                      className="flex-1 flex items-center justify-center gap-2 font-['Outfit',system-ui,sans-serif] text-sm font-medium text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white border-0 py-2.5 rounded-lg cursor-pointer transition-all duration-200"
                    >
                      <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                        <polyline points='3 6 5 6 21 6' />
                        <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div
          className='fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease]'
          onClick={handleCloseForm}
        >
          <div
            className='w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex items-center justify-between p-6 border-b border-black/6 sticky top-0 bg-white z-10'>
              <h2 className="font-['Cormorant_Garamond',Georgia,serif] text-2xl font-semibold text-[#1c1c1a]">
                {editingBanner ? 'Edit Banner' : 'Add New Banner'}
              </h2>
              <button
                type='button'
                onClick={handleCloseForm}
                className='w-9 h-9 flex items-center justify-center rounded-full bg-[#f7f7f5] hover:bg-[#eeeeec] text-[#5a5a56] border-0 cursor-pointer transition-colors'
              >
                <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <line x1='18' y1='6' x2='6' y2='18' />
                  <line x1='6' y1='6' x2='18' y2='18' />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className='p-6 space-y-5'>
              {/* Image Name / Title */}
              <div>
                <label className="block font-['Outfit',system-ui,sans-serif] text-sm font-medium text-[#1c1c1a] mb-2">
                  Image Name <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                  placeholder='e.g. Summer Sale Banner'
                  className="w-full font-['Outfit',system-ui,sans-serif] text-sm text-[#1c1c1a] bg-[#f7f7f5] border border-transparent focus:border-[#c17f3a] focus:ring-2 focus:ring-[#c17f3a]/10 rounded-lg px-4 py-3 outline-none transition-all"
                />
              </div>

              {/* Image Link */}
              <div>
                <label className="block font-['Outfit',system-ui,sans-serif] text-sm font-medium text-[#1c1c1a] mb-2">
                  Image Link <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='imageUrl'
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder='https://example.com/image.jpg'
                  className="w-full font-['Outfit',system-ui,sans-serif] text-sm text-[#1c1c1a] bg-[#f7f7f5] border border-transparent focus:border-[#c17f3a] focus:ring-2 focus:ring-[#c17f3a]/10 rounded-lg px-4 py-3 outline-none transition-all"
                />
              </div>

              {/* OR Separator */}
              <div className='flex items-center gap-3'>
                <div className='flex-1 h-px bg-[#eeeeec]' />
                <span className="font-['Outfit',system-ui,sans-serif] text-xs font-medium text-[#9e9e9a] uppercase tracking-wider">
                  or
                </span>
                <div className='flex-1 h-px bg-[#eeeeec]' />
              </div>

              {/* Select from Folder */}
              <div>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  onChange={handleFileSelect}
                  className='hidden'
                />
                <button
                  type='button'
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 font-['Outfit',system-ui,sans-serif] text-sm font-medium text-[#c17f3a] bg-[#f5ebe0] hover:bg-[#c17f3a] hover:text-white border-2 border-dashed border-[#c17f3a]/40 hover:border-[#c17f3a] py-4 rounded-lg cursor-pointer transition-all duration-200"
                >
                  <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                    <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                    <polyline points='17 8 12 3 7 8' />
                    <line x1='12' y1='3' x2='12' y2='15' />
                  </svg>
                  Select from Folder
                </button>
              </div>

              {/* Preview */}
              {formData.previewUrl && (
                <div>
                  <label className="block font-['Outfit',system-ui,sans-serif] text-sm font-medium text-[#1c1c1a] mb-2">
                    Preview {formData.imageFile && <span className='text-[#9e9e9a] text-xs font-normal'>({formData.imageFile.name})</span>}
                  </label>
                  <div className='relative aspect-video rounded-lg overflow-hidden bg-[#eeeeec] border border-[#eeeeec]'>
                    <img
                      src={formData.previewUrl}
                      alt='Preview'
                      className='w-full h-full object-cover'
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className='flex gap-3 pt-4 border-t border-black/6'>
                <button
                  type='button'
                  onClick={handleCloseForm}
                  disabled={submitting}
                  className="flex-1 font-['Outfit',system-ui,sans-serif] text-sm font-semibold text-[#5a5a56] bg-[#f7f7f5] hover:bg-[#eeeeec] border-0 py-3 rounded-lg cursor-pointer transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={submitting}
                  className="flex-1 font-['Outfit',system-ui,sans-serif] text-sm font-semibold text-white bg-linear-to-br from-[#c17f3a] to-[#a86a2c] border-0 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-[0_6px_20px_rgba(193,127,58,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Saving...' : editingBanner ? 'Update Banner' : 'Create Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          className='fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease]'
          onClick={() => !deleting && setDeleteTarget(null)}
        >
          <div
            className='w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='p-6 text-center'>
              <div className='mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-red-100 mb-4'>
                <svg width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='#ef4444' strokeWidth='2'>
                  <polyline points='3 6 5 6 21 6' />
                  <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
                  <line x1='10' y1='11' x2='10' y2='17' />
                  <line x1='14' y1='11' x2='14' y2='17' />
                </svg>
              </div>
              <h3 className="font-['Cormorant_Garamond',Georgia,serif] text-2xl font-semibold text-[#1c1c1a] mb-2">
                Delete Banner?
              </h3>
              <p className="font-['Outfit',system-ui,sans-serif] text-sm text-[#5a5a56] mb-1">
                Are you sure you want to delete
              </p>
              <p className="font-['Outfit',system-ui,sans-serif] text-base font-semibold text-[#1c1c1a] mb-6">
                "{deleteTarget.title || deleteTarget.name || 'this banner'}"?
              </p>
              <p className="font-['Outfit',system-ui,sans-serif] text-xs text-[#9e9e9a] mb-6">
                This action cannot be undone.
              </p>
              <div className='flex gap-3'>
                <button
                  type='button'
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleting}
                  className="flex-1 font-['Outfit',system-ui,sans-serif] text-sm font-semibold text-[#5a5a56] bg-[#f7f7f5] hover:bg-[#eeeeec] border-0 py-3 rounded-lg cursor-pointer transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type='button'
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="flex-1 font-['Outfit',system-ui,sans-serif] text-sm font-semibold text-white bg-red-500 hover:bg-red-600 border-0 py-3 rounded-lg cursor-pointer transition-colors shadow-[0_4px_12px_rgba(239,68,68,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBanner;
