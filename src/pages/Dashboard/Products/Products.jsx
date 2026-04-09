import React, { useState } from 'react';
import toast from 'react-hot-toast';
import './Products.css';
import ProductForm from '../ProductForm/ProductForm';
import { successToast } from '../../../utils/toastStyles';

// Mock product data
const MOCK_PRODUCTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=400&fit=crop',
    name: 'Classic White T-Shirt',
    category: 'Men',
    price: 1299,
    stock: 45,
    status: 'active',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop',
    name: 'Summer Floral Dress',
    category: 'Women',
    price: 2499,
    stock: 23,
    status: 'active',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=400&fit=crop',
    name: 'Running Sneakers',
    category: 'Accessories',
    price: 3999,
    stock: 12,
    status: 'active',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=400&fit=crop',
    name: 'Denim Jacket',
    category: 'Men',
    price: 3499,
    stock: 0,
    status: 'out_of_stock',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=300&h=400&fit=crop',
    name: 'Leather Handbag',
    category: 'Accessories',
    price: 4599,
    stock: 8,
    status: 'active',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=300&h=400&fit=crop',
    name: 'Baby Romper Set',
    category: 'Baby & Kids',
    price: 1899,
    stock: 34,
    status: 'active',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1598032895397-b9a29e57348a?w=300&h=400&fit=crop',
    name: 'Formal Blazer',
    category: 'Women',
    price: 5999,
    stock: 15,
    status: 'active',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&h=400&fit=crop',
    name: 'Sunglasses',
    category: 'Accessories',
    price: 1599,
    stock: 67,
    status: 'active',
  },
];

const CATEGORIES = ['All', 'Men', 'Women', 'Baby & Kids', 'Accessories'];
const STATUSES = ['All', 'active', 'out_of_stock', 'draft'];

const Products = () => {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDelete = (id) => {
    const product = products.find((p) => p.id === id);
    if (product) setDeleteTarget(product);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    toast.success(
      `"${deleteTarget.name}" removed successfully`,
      successToast
    );
    setDeleteTarget(null);
  };

  const cancelDelete = () => setDeleteTarget(null);

  const handleEdit = (id) => {
    const product = products.find((p) => p.id === id);
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map((p) => (p.id === editingProduct.id ? { ...p, ...formData } : p)));
      toast.success('Product updated successfully', successToast);
    } else {
      // Add new product
      const newProduct = {
        id: Math.max(...products.map((p) => p.id)) + 1,
        ...formData,
      };
      setProducts([...products, newProduct]);
      toast.success('Product added successfully', successToast);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className='products-page'>
      {/* Header */}
      <div className='products-header'>
        <div className='products-header__left'>
          <h1 className='products-title'>Products</h1>
          <p className='products-subtitle'>
            Manage your product catalog • {filteredProducts.length} items
          </p>
        </div>
        <button className='products-add-btn' onClick={handleAddNew}>
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <line x1='12' y1='5' x2='12' y2='19' />
            <line x1='5' y1='12' x2='19' y2='12' />
          </svg>
          Add Product
        </button>
      </div>

      {/* Controls */}
      <div className='products-controls'>
        <div className='products-search'>
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <circle cx='11' cy='11' r='8' />
            <path d='m21 21-4.35-4.35' />
          </svg>
          <input
            type='text'
            placeholder='Search products...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='products-search__input'
          />
        </div>

        <div className='products-filters'>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className='products-filter'
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className='products-filter'
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status === 'All' ? 'All Status' : status.replace('_', ' ')}
              </option>
            ))}
          </select>

          <div className='products-view-toggle'>
            <button
              className={`products-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title='Grid view'
            >
              <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <rect x='3' y='3' width='7' height='7' />
                <rect x='14' y='3' width='7' height='7' />
                <rect x='14' y='14' width='7' height='7' />
                <rect x='3' y='14' width='7' height='7' />
              </svg>
            </button>
            <button
              className={`products-view-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title='Table view'
            >
              <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <line x1='3' y1='12' x2='21' y2='12' />
                <line x1='3' y1='6' x2='21' y2='6' />
                <line x1='3' y1='18' x2='21' y2='18' />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Products Display */}
      {viewMode === 'grid' ? (
        <div className='products-grid'>
          {filteredProducts.map((product) => (
            <div key={product.id} className='product-card'>
              <div className='product-card__img-wrap'>
                <img src={product.image} alt={product.name} className='product-card__img' />
                <div className='product-card__overlay'>
                  <button className='product-card__action' onClick={() => handleEdit(product.id)} title='Edit'>
                    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                      <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' />
                      <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' />
                    </svg>
                  </button>
                  <button
                    className='product-card__action product-card__action--delete'
                    onClick={() => handleDelete(product.id)}
                    title='Delete'
                  >
                    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                      <polyline points='3 6 5 6 21 6' />
                      <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
                    </svg>
                  </button>
                </div>
                <span className={`product-card__status product-card__status--${product.status}`}>
                  {product.status === 'active' ? 'Active' : product.status === 'out_of_stock' ? 'Out of Stock' : 'Draft'}
                </span>
              </div>
              <div className='product-card__info'>
                <p className='product-card__category'>{product.category}</p>
                <h3 className='product-card__name'>{product.name}</h3>
                <div className='product-card__bottom'>
                  <p className='product-card__price'>৳{product.price.toLocaleString()}</p>
                  <p className='product-card__stock'>Stock: {product.stock}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='products-table-wrap'>
          <table className='products-table'>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className='products-table__product'>
                      <img src={product.image} alt={product.name} className='products-table__img' />
                      <span className='products-table__name'>{product.name}</span>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td className='products-table__price'>৳{product.price.toLocaleString()}</td>
                  <td>
                    <span className={`products-table__stock ${product.stock === 0 ? 'out' : ''}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td>
                    <span className={`products-status products-status--${product.status}`}>
                      {product.status === 'active' ? 'Active' : product.status === 'out_of_stock' ? 'Out of Stock' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <div className='products-table__actions'>
                      <button className='products-action-btn' onClick={() => handleEdit(product.id)} title='Edit'>
                        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                          <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' />
                          <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' />
                        </svg>
                      </button>
                      <button
                        className='products-action-btn products-action-btn--delete'
                        onClick={() => handleDelete(product.id)}
                        title='Delete'
                      >
                        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                          <polyline points='3 6 5 6 21 6' />
                          <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className='products-empty'>
          <svg width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
            <circle cx='9' cy='21' r='1' />
            <circle cx='20' cy='21' r='1' />
            <path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6' />
          </svg>
          <h3 className='products-empty__title'>No products found</h3>
          <p className='products-empty__desc'>Try adjusting your filters or search term</p>
        </div>
      )}

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          className='fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease]'
          onClick={cancelDelete}
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
                Delete Product?
              </h3>
              <p className="font-['Outfit',system-ui,sans-serif] text-sm text-[#5a5a56] mb-1">
                Are you sure you want to delete
              </p>
              <p className="font-['Outfit',system-ui,sans-serif] text-base font-semibold text-[#1c1c1a] mb-6">
                "{deleteTarget.name}"?
              </p>
              <p className="font-['Outfit',system-ui,sans-serif] text-xs text-[#9e9e9a] mb-6">
                This action cannot be undone.
              </p>
              <div className='flex gap-3'>
                <button
                  type='button'
                  onClick={cancelDelete}
                  className="flex-1 font-['Outfit',system-ui,sans-serif] text-sm font-semibold text-[#5a5a56] bg-[#f7f7f5] hover:bg-[#eeeeec] border-0 py-3 rounded-lg cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type='button'
                  onClick={confirmDelete}
                  className="flex-1 font-['Outfit',system-ui,sans-serif] text-sm font-semibold text-white bg-red-500 hover:bg-red-600 border-0 py-3 rounded-lg cursor-pointer transition-colors shadow-[0_4px_12px_rgba(239,68,68,0.3)]"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
