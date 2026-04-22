import React, { useState } from 'react';
import './ProductForm.css';

const CATEGORIES = ['Men', 'Women', 'Baby & Kids', 'Accessories'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COLORS = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Gray', hex: '#9E9E9E' },
  { name: 'Navy', hex: '#001F3F' },
  { name: 'Beige', hex: '#F5F5DC' },
  { name: 'Brown', hex: '#8B4513' },
  { name: 'Red', hex: '#FF0000' },
  { name: 'Blue', hex: '#0074D9' },
  { name: 'Green', hex: '#2ECC40' },
  { name: 'Pink', hex: '#FF69B4' },
];

const ProductForm = ({ product = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || '',
    price: product?.price || '',
    oldPrice: product?.oldPrice || '',
    brand: product?.brand || '',
    description: product?.description || '',
    stock: product?.stock || '',
    image: product?.image || '',
    sizes: product?.sizes || [],
    colors: product?.colors || [],
    status: product?.status || 'active',
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(product?.image || '');
  const [imageMode, setImageMode] = useState('url');
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, image: value }));
    setImagePreview(value);
    setImageFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData((prev) => ({ ...prev, image: '' }));
      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: '' }));
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData((prev) => ({ ...prev, image: '' }));
      setImageMode('upload');
      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: '' }));
      }
    }
  };

  const toggleSize = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const toggleColor = (color) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.stock || formData.stock < 0) newErrors.stock = 'Valid stock quantity is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.image.trim() && !imageFile) newErrors.image = 'Product image is required';
    if (formData.sizes.length === 0) newErrors.sizes = 'Select at least one size';
    if (formData.colors.length === 0) newErrors.colors = 'Select at least one color';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const submitData = { ...formData, imageFile };
      console.log('Product Form Submit Data:', submitData);
      onSubmit(submitData);
    }
  };

  return (
    <div className='product-form-modal'>
      <div className='product-form-overlay' onClick={onCancel} />
      <div className='product-form-container'>
        <div className='product-form-header'>
          <h2 className='product-form-title'>
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button className='product-form-close' onClick={onCancel}>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          </button>
        </div>

        <form className='product-form' onSubmit={handleSubmit}>
          <div className='product-form-content'>
            {/* Left Column */}
            <div className='product-form-col'>
              {/* Product Name */}
              <div className='form-group'>
                <label className='form-label'>
                  Product Name <span className='required'>*</span>
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='e.g., Classic White T-Shirt'
                  className={`form-input ${errors.name ? 'error' : ''}`}
                />
                {errors.name && <span className='form-error'>{errors.name}</span>}
              </div>

              {/* Category */}
              <div className='form-group'>
                <label className='form-label'>
                  Category <span className='required'>*</span>
                </label>
                <select
                  name='category'
                  value={formData.category}
                  onChange={handleChange}
                  className={`form-select ${errors.category ? 'error' : ''}`}
                >
                  <option value=''>Select category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && <span className='form-error'>{errors.category}</span>}
              </div>

              {/* Price and Old Price */}
              <div className='form-row'>
                <div className='form-group'>
                  <label className='form-label'>
                    Price (৳) <span className='required'>*</span>
                  </label>
                  <input
                    type='number'
                    name='price'
                    value={formData.price}
                    onChange={handleChange}
                    placeholder='1299'
                    min='0'
                    className={`form-input ${errors.price ? 'error' : ''}`}
                  />
                  {errors.price && <span className='form-error'>{errors.price}</span>}
                </div>

                <div className='form-group'>
                  <label className='form-label'>
                    Old Price (৳)
                  </label>
                  <input
                    type='number'
                    name='oldPrice'
                    value={formData.oldPrice}
                    onChange={handleChange}
                    placeholder='1599'
                    min='0'
                    className='form-input'
                  />
                </div>
              </div>

              {/* Stock and Brand */}
              <div className='form-row'>
                <div className='form-group'>
                  <label className='form-label'>
                    Stock <span className='required'>*</span>
                  </label>
                  <input
                    type='number'
                    name='stock'
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder='50'
                    min='0'
                    className={`form-input ${errors.stock ? 'error' : ''}`}
                  />
                  {errors.stock && <span className='form-error'>{errors.stock}</span>}
                </div>

                <div className='form-group'>
                  <label className='form-label'>
                    Brand Name
                  </label>
                  <input
                    type='text'
                    name='brand'
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder='e.g., Aarong, Yellow'
                    className='form-input'
                  />
                </div>
              </div>

              {/* Description */}
              <div className='form-group'>
                <label className='form-label'>
                  Description <span className='required'>*</span>
                </label>
                <textarea
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  placeholder='Describe the product details, materials, care instructions...'
                  rows='5'
                  className={`form-textarea ${errors.description ? 'error' : ''}`}
                />
                {errors.description && <span className='form-error'>{errors.description}</span>}
              </div>

              {/* Status */}
              <div className='form-group'>
                <label className='form-label'>Status</label>
                <select name='status' value={formData.status} onChange={handleChange} className='form-select'>
                  <option value='active'>Active</option>
                  <option value='draft'>Draft</option>
                  <option value='out_of_stock'>Out of Stock</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className='product-form-col'>
              {/* Product Image */}
              <div className='form-group'>
                <label className='form-label'>
                  Product Image <span className='required'>*</span>
                </label>
                <div className='image-mode-tabs'>
                  <button
                    type='button'
                    className={`image-mode-tab ${imageMode === 'url' ? 'active' : ''}`}
                    onClick={() => setImageMode('url')}
                  >
                    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                      <path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' />
                      <path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' />
                    </svg>
                    Image URL
                  </button>
                  <button
                    type='button'
                    className={`image-mode-tab ${imageMode === 'upload' ? 'active' : ''}`}
                    onClick={() => setImageMode('upload')}
                  >
                    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                      <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                      <polyline points='17 8 12 3 7 8' />
                      <line x1='12' y1='3' x2='12' y2='15' />
                    </svg>
                    File Upload
                  </button>
                </div>

                {imageMode === 'url' ? (
                  <input
                    type='url'
                    name='image'
                    value={formData.image}
                    onChange={handleImageChange}
                    placeholder='https://example.com/image.jpg'
                    className={`form-input ${errors.image ? 'error' : ''}`}
                  />
                ) : (
                  <div
                    className={`file-upload-area ${errors.image ? 'error' : ''} ${imageFile ? 'has-file' : ''}`}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleFileChange}
                      className='file-upload-input'
                      id='product-image-upload'
                    />
                    <label htmlFor='product-image-upload' className='file-upload-label'>
                      {imageFile ? (
                        <span className='file-upload-name'>{imageFile.name}</span>
                      ) : (
                        <>
                          <svg width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
                            <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
                            <circle cx='8.5' cy='8.5' r='1.5' />
                            <polyline points='21 15 16 10 5 21' />
                          </svg>
                          <span>Click to upload or drag & drop</span>
                          <span className='file-upload-hint'>PNG, JPG, WEBP (max 5MB)</span>
                        </>
                      )}
                    </label>
                  </div>
                )}
                {errors.image && <span className='form-error'>{errors.image}</span>}
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className='image-preview'>
                  <img src={imagePreview} alt='Product preview' className='image-preview__img' />
                </div>
              )}

              {/* Sizes */}
              <div className='form-group'>
                <label className='form-label'>
                  Available Sizes <span className='required'>*</span>
                </label>
                <div className='size-grid'>
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      type='button'
                      onClick={() => toggleSize(size)}
                      className={`size-btn ${formData.sizes.includes(size) ? 'active' : ''}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {errors.sizes && <span className='form-error'>{errors.sizes}</span>}
              </div>

              {/* Colors */}
              <div className='form-group'>
                <label className='form-label'>
                  Available Colors <span className='required'>*</span>
                </label>
                <div className='color-grid'>
                  {COLORS.map((color) => (
                    <button
                      key={color.name}
                      type='button'
                      onClick={() => toggleColor(color.name)}
                      className={`color-btn ${formData.colors.includes(color.name) ? 'active' : ''}`}
                      title={color.name}
                    >
                      <span className='color-swatch' style={{ background: color.hex }} />
                      <span className='color-name'>{color.name}</span>
                    </button>
                  ))}
                </div>
                {errors.colors && <span className='form-error'>{errors.colors}</span>}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className='product-form-footer'>
            <button type='button' className='form-btn form-btn--cancel' onClick={onCancel}>
              Cancel
            </button>
            <button type='submit' className='form-btn form-btn--submit'>
              {product ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
