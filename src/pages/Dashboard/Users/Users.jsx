import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import './Users.css';
import userService from '../../../services/userService';
import { successToast, errorToast, infoToast } from '../../../utils/toastStyles';

const ROLE_OPTIONS = ['customer', 'seller', 'admin'];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [busyId, setBusyId] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await userService.getAllUsers();
      const payload = res?.data;
      const list =
        payload?.data?.users ||
        payload?.data ||
        payload?.users ||
        (Array.isArray(payload) ? payload : []);
      setUsers(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setError(err?.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    const prev = users;
    setBusyId(userId);
    setUsers((list) =>
      list.map((u) => ((u._id || u.id) === userId ? { ...u, role: newRole } : u))
    );
    try {
      await userService.updateUserRole(userId, newRole);
      toast.success(`Role updated to ${newRole}`, successToast);
    } catch (err) {
      console.error('Role update failed:', err);
      setUsers(prev);
      toast.error(
        err?.response?.data?.message || 'Failed to update role',
        errorToast
      );
    } finally {
      setBusyId(null);
    }
  };

  const handleToggleBlock = async (userItem) => {
    const userId = userItem._id || userItem.id;
    const wasBlocked = !!userItem.isBlocked;
    setBusyId(userId);
    setUsers((list) =>
      list.map((u) =>
        (u._id || u.id) === userId ? { ...u, isBlocked: !wasBlocked } : u
      )
    );
    try {
      await userService.toggleBlockUser(userId);
      toast(
        wasBlocked ? 'User unblocked' : 'User blocked',
        wasBlocked ? successToast : infoToast
      );
    } catch (err) {
      console.error('Block toggle failed:', err);
      setUsers((list) =>
        list.map((u) =>
          (u._id || u.id) === userId ? { ...u, isBlocked: wasBlocked } : u
        )
      );
      toast.error(
        err?.response?.data?.message || 'Failed to update block status',
        errorToast
      );
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (userItem) => {
    const userId = userItem._id || userItem.id;
    if (
      !window.confirm(
        `Delete user "${userItem.name || userItem.email}"? This cannot be undone.`
      )
    ) {
      return;
    }
    setBusyId(userId);
    const prev = users;
    setUsers((list) => list.filter((u) => (u._id || u.id) !== userId));
    try {
      await userService.deleteUser(userId);
      toast.success('User deleted', successToast);
    } catch (err) {
      console.error('Delete failed:', err);
      setUsers(prev);
      toast.error(
        err?.response?.data?.message || 'Failed to delete user',
        errorToast
      );
    } finally {
      setBusyId(null);
    }
  };

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const s = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !s ||
        (u.name || '').toLowerCase().includes(s) ||
        (u.email || '').toLowerCase().includes(s) ||
        (u.phone || '').includes(s);
      const matchesRole = roleFilter === 'All' || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  const stats = useMemo(() => {
    return {
      total: users.length,
      admins: users.filter((u) => u.role === 'admin').length,
      sellers: users.filter((u) => u.role === 'seller').length,
      customers: users.filter((u) => u.role === 'customer' || u.role === 'user')
        .length,
      blocked: users.filter((u) => u.isBlocked).length,
    };
  }, [users]);

  const formatDate = (d) => {
    if (!d) return '—';
    try {
      return new Date(d).toLocaleDateString('en-GB');
    } catch {
      return '—';
    }
  };

  const getInitial = (name, email) => {
    const src = name || email || '?';
    return src.charAt(0).toUpperCase();
  };

  return (
    <div className='users-page'>
      <div className='users-header'>
        <div>
          <h1 className='users-title'>Users</h1>
          <p className='users-subtitle'>
            Manage all users • {filtered.length} of {users.length}
          </p>
        </div>
        <button
          type='button'
          className='users-refresh'
          onClick={fetchUsers}
          disabled={loading}
        >
          <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <polyline points='23 4 23 10 17 10' />
            <polyline points='1 20 1 14 7 14' />
            <path d='M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15' />
          </svg>
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className='users-stats'>
        <div className='users-stat'>
          <span className='users-stat__label'>Total</span>
          <span className='users-stat__value'>{stats.total}</span>
        </div>
        <div className='users-stat users-stat--admin'>
          <span className='users-stat__label'>Admins</span>
          <span className='users-stat__value'>{stats.admins}</span>
        </div>
        <div className='users-stat users-stat--seller'>
          <span className='users-stat__label'>Sellers</span>
          <span className='users-stat__value'>{stats.sellers}</span>
        </div>
        <div className='users-stat users-stat--customer'>
          <span className='users-stat__label'>Customers</span>
          <span className='users-stat__value'>{stats.customers}</span>
        </div>
        <div className='users-stat users-stat--blocked'>
          <span className='users-stat__label'>Blocked</span>
          <span className='users-stat__value'>{stats.blocked}</span>
        </div>
      </div>

      {/* Controls */}
      <div className='users-controls'>
        <div className='users-search'>
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <circle cx='11' cy='11' r='8' />
            <path d='m21 21-4.35-4.35' />
          </svg>
          <input
            type='text'
            placeholder='Search by name, email or phone...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='users-search__input'
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className='users-filter'
        >
          <option value='All'>All Roles</option>
          <option value='admin'>Admin</option>
          <option value='seller'>Seller</option>
          <option value='customer'>Customer</option>
          <option value='user'>User</option>
        </select>
      </div>

      {/* Content */}
      {loading && (
        <div className='users-state'>
          <div className='users-spinner' />
          <p>Loading users...</p>
        </div>
      )}

      {!loading && error && (
        <div className='users-state users-state--error'>
          <p>{error}</p>
          <button type='button' onClick={fetchUsers} className='users-retry'>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className='users-state'>
          <svg width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
            <path d='M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
            <circle cx='9' cy='7' r='4' />
          </svg>
          <h3>No users found</h3>
          <p>Try adjusting your search or filter</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className='users-table-wrap'>
          <table className='users-table'>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => {
                const userId = u._id || u.id;
                const disabled = busyId === userId;
                return (
                  <tr key={userId} className={u.isBlocked ? 'users-row--blocked' : ''}>
                    <td>
                      <div className='users-cell-user'>
                        <div className='users-avatar'>
                          {u.profileImg ? (
                            <img src={u.profileImg} alt={u.name} />
                          ) : (
                            <span>{getInitial(u.name, u.email)}</span>
                          )}
                        </div>
                        <div>
                          <p className='users-cell-user__name'>{u.name || '—'}</p>
                          <p className='users-cell-user__id'>{userId?.slice(-8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className='users-cell-email'>{u.email || '—'}</td>
                    <td>{u.phone || '—'}</td>
                    <td>
                      <select
                        value={u.role || 'customer'}
                        onChange={(e) => handleRoleChange(userId, e.target.value)}
                        disabled={disabled}
                        className={`users-role-select users-role-select--${u.role || 'customer'}`}
                      >
                        {ROLE_OPTIONS.map((r) => (
                          <option key={r} value={r}>
                            {r.charAt(0).toUpperCase() + r.slice(1)}
                          </option>
                        ))}
                        {u.role && !ROLE_OPTIONS.includes(u.role) && (
                          <option value={u.role}>
                            {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                          </option>
                        )}
                      </select>
                    </td>
                    <td>
                      <span
                        className={`users-status users-status--${
                          u.isBlocked ? 'blocked' : 'active'
                        }`}
                      >
                        {u.isBlocked ? 'Blocked' : 'Active'}
                      </span>
                    </td>
                    <td className='users-cell-date'>
                      {formatDate(u.createdAt || u.joinDate)}
                    </td>
                    <td>
                      <div className='users-actions'>
                        <button
                          type='button'
                          className='users-action-btn'
                          onClick={() => handleToggleBlock(u)}
                          disabled={disabled}
                          title={u.isBlocked ? 'Unblock' : 'Block'}
                        >
                          {u.isBlocked ? (
                            <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                              <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
                              <path d='M7 11V7a5 5 0 019.9-1' />
                            </svg>
                          ) : (
                            <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                              <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
                              <path d='M7 11V7a5 5 0 0110 0v4' />
                            </svg>
                          )}
                        </button>
                        <button
                          type='button'
                          className='users-action-btn users-action-btn--danger'
                          onClick={() => handleDelete(u)}
                          disabled={disabled}
                          title='Delete'
                        >
                          <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                            <polyline points='3 6 5 6 21 6' />
                            <path d='M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2' />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
