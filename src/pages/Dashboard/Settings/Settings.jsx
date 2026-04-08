import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    storeName: 'GlowBerry',
    storeEmail: 'contact@glowberry.com',
    storePhone: '+880 1712-345678',
    storeAddress: 'Dhaka, Bangladesh',
    currency: 'BDT',
    timezone: 'Asia/Dhaka',
    language: 'en',

    // Notification Settings
    orderNotifications: true,
    customerNotifications: true,
    productNotifications: false,
    emailNotifications: true,
    smsNotifications: false,

    // Shipping Settings
    freeShippingThreshold: 1000,
    shippingCost: 60,
    expressShippingCost: 150,

    // Payment Settings
    enableCOD: true,
    enableBkash: true,
    enableNagad: true,
    enableRocket: true,
    enableCard: false,
  });

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const TABS = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'shipping', label: 'Shipping', icon: '📦' },
    { id: 'payment', label: 'Payment', icon: '💳' },
  ];

  return (
    <div className='settings-page'>
      {/* Header */}
      <div className='settings-header'>
        <div>
          <h1 className='settings-title'>Settings</h1>
          <p className='settings-subtitle'>Manage your store preferences and configurations</p>
        </div>
        <button className='settings-save-btn' onClick={handleSave}>
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <path d='M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z' />
            <polyline points='17 21 17 13 7 13 7 21' />
            <polyline points='7 3 7 8 15 8' />
          </svg>
          Save Changes
        </button>
      </div>

      <div className='settings-content'>
        {/* Tabs */}
        <div className='settings-tabs'>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className='settings-tab__icon'>{tab.icon}</span>
              <span className='settings-tab__label'>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Settings Panels */}
        <div className='settings-panel'>
          {activeTab === 'general' && (
            <div className='settings-section'>
              <h2 className='settings-section__title'>General Settings</h2>
              <div className='settings-section__content'>
                <div className='setting-group'>
                  <label className='setting-label'>Store Name</label>
                  <input
                    type='text'
                    value={settings.storeName}
                    onChange={(e) => handleChange('storeName', e.target.value)}
                    className='setting-input'
                  />
                </div>

                <div className='setting-group'>
                  <label className='setting-label'>Store Email</label>
                  <input
                    type='email'
                    value={settings.storeEmail}
                    onChange={(e) => handleChange('storeEmail', e.target.value)}
                    className='setting-input'
                  />
                </div>

                <div className='setting-group'>
                  <label className='setting-label'>Store Phone</label>
                  <input
                    type='tel'
                    value={settings.storePhone}
                    onChange={(e) => handleChange('storePhone', e.target.value)}
                    className='setting-input'
                  />
                </div>

                <div className='setting-group'>
                  <label className='setting-label'>Store Address</label>
                  <textarea
                    value={settings.storeAddress}
                    onChange={(e) => handleChange('storeAddress', e.target.value)}
                    rows='3'
                    className='setting-textarea'
                  />
                </div>

                <div className='setting-row'>
                  <div className='setting-group'>
                    <label className='setting-label'>Currency</label>
                    <select value={settings.currency} onChange={(e) => handleChange('currency', e.target.value)} className='setting-select'>
                      <option value='BDT'>BDT - Bangladeshi Taka</option>
                      <option value='USD'>USD - US Dollar</option>
                      <option value='EUR'>EUR - Euro</option>
                    </select>
                  </div>

                  <div className='setting-group'>
                    <label className='setting-label'>Timezone</label>
                    <select value={settings.timezone} onChange={(e) => handleChange('timezone', e.target.value)} className='setting-select'>
                      <option value='Asia/Dhaka'>Asia/Dhaka</option>
                      <option value='Asia/Kolkata'>Asia/Kolkata</option>
                      <option value='UTC'>UTC</option>
                    </select>
                  </div>
                </div>

                <div className='setting-group'>
                  <label className='setting-label'>Language</label>
                  <select value={settings.language} onChange={(e) => handleChange('language', e.target.value)} className='setting-select'>
                    <option value='en'>English</option>
                    <option value='bn'>Bengali</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className='settings-section'>
              <h2 className='settings-section__title'>Notification Settings</h2>
              <div className='settings-section__content'>
                <div className='setting-group'>
                  <div className='setting-toggle'>
                    <div className='setting-toggle__info'>
                      <label className='setting-label'>Order Notifications</label>
                      <p className='setting-desc'>Receive notifications for new orders</p>
                    </div>
                    <label className='toggle-switch'>
                      <input
                        type='checkbox'
                        checked={settings.orderNotifications}
                        onChange={(e) => handleChange('orderNotifications', e.target.checked)}
                      />
                      <span className='toggle-slider'></span>
                    </label>
                  </div>
                </div>

                <div className='setting-group'>
                  <div className='setting-toggle'>
                    <div className='setting-toggle__info'>
                      <label className='setting-label'>Customer Notifications</label>
                      <p className='setting-desc'>Receive notifications for new customer registrations</p>
                    </div>
                    <label className='toggle-switch'>
                      <input
                        type='checkbox'
                        checked={settings.customerNotifications}
                        onChange={(e) => handleChange('customerNotifications', e.target.checked)}
                      />
                      <span className='toggle-slider'></span>
                    </label>
                  </div>
                </div>

                <div className='setting-group'>
                  <div className='setting-toggle'>
                    <div className='setting-toggle__info'>
                      <label className='setting-label'>Product Notifications</label>
                      <p className='setting-desc'>Receive notifications for low stock products</p>
                    </div>
                    <label className='toggle-switch'>
                      <input
                        type='checkbox'
                        checked={settings.productNotifications}
                        onChange={(e) => handleChange('productNotifications', e.target.checked)}
                      />
                      <span className='toggle-slider'></span>
                    </label>
                  </div>
                </div>

                <div className='setting-group'>
                  <div className='setting-toggle'>
                    <div className='setting-toggle__info'>
                      <label className='setting-label'>Email Notifications</label>
                      <p className='setting-desc'>Receive email notifications</p>
                    </div>
                    <label className='toggle-switch'>
                      <input
                        type='checkbox'
                        checked={settings.emailNotifications}
                        onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                      />
                      <span className='toggle-slider'></span>
                    </label>
                  </div>
                </div>

                <div className='setting-group'>
                  <div className='setting-toggle'>
                    <div className='setting-toggle__info'>
                      <label className='setting-label'>SMS Notifications</label>
                      <p className='setting-desc'>Receive SMS notifications</p>
                    </div>
                    <label className='toggle-switch'>
                      <input
                        type='checkbox'
                        checked={settings.smsNotifications}
                        onChange={(e) => handleChange('smsNotifications', e.target.checked)}
                      />
                      <span className='toggle-slider'></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className='settings-section'>
              <h2 className='settings-section__title'>Shipping Settings</h2>
              <div className='settings-section__content'>
                <div className='setting-group'>
                  <label className='setting-label'>Free Shipping Threshold (৳)</label>
                  <input
                    type='number'
                    value={settings.freeShippingThreshold}
                    onChange={(e) => handleChange('freeShippingThreshold', Number(e.target.value))}
                    className='setting-input'
                    placeholder='1000'
                  />
                  <p className='setting-desc'>Orders above this amount will get free shipping</p>
                </div>

                <div className='setting-group'>
                  <label className='setting-label'>Standard Shipping Cost (৳)</label>
                  <input
                    type='number'
                    value={settings.shippingCost}
                    onChange={(e) => handleChange('shippingCost', Number(e.target.value))}
                    className='setting-input'
                    placeholder='60'
                  />
                </div>

                <div className='setting-group'>
                  <label className='setting-label'>Express Shipping Cost (৳)</label>
                  <input
                    type='number'
                    value={settings.expressShippingCost}
                    onChange={(e) => handleChange('expressShippingCost', Number(e.target.value))}
                    className='setting-input'
                    placeholder='150'
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className='settings-section'>
              <h2 className='settings-section__title'>Payment Methods</h2>
              <div className='settings-section__content'>
                <div className='setting-group'>
                  <div className='setting-toggle'>
                    <div className='setting-toggle__info'>
                      <label className='setting-label'>Cash on Delivery (COD)</label>
                      <p className='setting-desc'>Allow customers to pay on delivery</p>
                    </div>
                    <label className='toggle-switch'>
                      <input
                        type='checkbox'
                        checked={settings.enableCOD}
                        onChange={(e) => handleChange('enableCOD', e.target.checked)}
                      />
                      <span className='toggle-slider'></span>
                    </label>
                  </div>
                </div>

                <div className='setting-group'>
                  <div className='setting-toggle'>
                    <div className='setting-toggle__info'>
                      <label className='setting-label'>bKash</label>
                      <p className='setting-desc'>Accept payments via bKash</p>
                    </div>
                    <label className='toggle-switch'>
                      <input
                        type='checkbox'
                        checked={settings.enableBkash}
                        onChange={(e) => handleChange('enableBkash', e.target.checked)}
                      />
                      <span className='toggle-slider'></span>
                    </label>
                  </div>
                </div>

                <div className='setting-group'>
                  <div className='setting-toggle'>
                    <div className='setting-toggle__info'>
                      <label className='setting-label'>Nagad</label>
                      <p className='setting-desc'>Accept payments via Nagad</p>
                    </div>
                    <label className='toggle-switch'>
                      <input
                        type='checkbox'
                        checked={settings.enableNagad}
                        onChange={(e) => handleChange('enableNagad', e.target.checked)}
                      />
                      <span className='toggle-slider'></span>
                    </label>
                  </div>
                </div>

                <div className='setting-group'>
                  <div className='setting-toggle'>
                    <div className='setting-toggle__info'>
                      <label className='setting-label'>Rocket</label>
                      <p className='setting-desc'>Accept payments via Rocket</p>
                    </div>
                    <label className='toggle-switch'>
                      <input
                        type='checkbox'
                        checked={settings.enableRocket}
                        onChange={(e) => handleChange('enableRocket', e.target.checked)}
                      />
                      <span className='toggle-slider'></span>
                    </label>
                  </div>
                </div>

                <div className='setting-group'>
                  <div className='setting-toggle'>
                    <div className='setting-toggle__info'>
                      <label className='setting-label'>Credit/Debit Cards</label>
                      <p className='setting-desc'>Accept Visa, Mastercard payments</p>
                    </div>
                    <label className='toggle-switch'>
                      <input
                        type='checkbox'
                        checked={settings.enableCard}
                        onChange={(e) => handleChange('enableCard', e.target.checked)}
                      />
                      <span className='toggle-slider'></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
