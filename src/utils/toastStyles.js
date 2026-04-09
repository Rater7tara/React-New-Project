const baseStyle = {
  background: '#1a1a2e',
  color: '#fff',
  fontFamily: "'Outfit', system-ui, sans-serif",
  fontWeight: '500',
  borderRadius: '12px',
  padding: '14px 20px',
  boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
  border: '1px solid rgba(255,255,255,0.08)',
};

export const successToast = {
  duration: 2500,
  position: 'bottom-right',
  icon: '✅',
  style: baseStyle,
};

export const errorToast = {
  duration: 3500,
  position: 'bottom-right',
  icon: '❌',
  style: baseStyle,
};

export const infoToast = {
  duration: 2500,
  position: 'bottom-right',
  icon: 'ℹ️',
  style: baseStyle,
};

export const cartToast = {
  duration: 2500,
  position: 'bottom-right',
  icon: '🛒',
  style: baseStyle,
};

export const wishlistToast = {
  duration: 2500,
  position: 'bottom-right',
  icon: '❤️',
  style: baseStyle,
};

export default { successToast, errorToast, infoToast, cartToast, wishlistToast };
