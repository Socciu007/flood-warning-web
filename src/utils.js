// Convert slug to name (Create SEO URL)
export const convertToSlug = (text) => {
  return text
    .toLowerCase() // Convert to lowercase
    .normalize('NFD') // Separate diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[đĐ]/g, 'd') // Replace đ/Đ with d
    .replace(/([^0-9a-z-\s])/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove duplicate hyphens
    .replace(/^-+|-+$/g, ''); // Remove hyphens at the beginning and end
};

// Convert date to string "15:30 25/04/2024"
export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Wait time
export const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const isJsonString = (data) => {
  try {
    JSON.parse(data)
  } catch (error) {
    return false;
  }
  return true;
}

//
export const renderString = (positive, name, value, note) => {
  return positive < 0.5 ? `${name}: ${value} (${note})` : `${name}: ${value} (Stability)`
};

// Get base64 from image
export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export const renderOptions = (arr) => {
  let results = []
  if (arr) {
    results = arr?.map((opt) => {
      return {
        value: opt,
        label: opt
      }
    })
  }
  results.push({
    label: 'Loại sản phẩm khác',
    value: 'add_type'
  })
  return results
}

export const convertPrice = (price) => {
  try {
    const result = price?.toLocaleString()
    return `${result} đ`
  } catch (error) {
    return null
  }
}

export const initFacebookSDK = () => {
  if (window.FB) {
    window.FB.XFBML.parse();
  }
  let locale = "vi_VN";
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: process.env.REACT_APP_FB_ID,// You App ID
      cookie: true, // enable cookies to allow the server to access
      // the session
      xfbml: true, // parse social plugins on this page
      version: "v2.1" // use version 2.1
    });
  };
  // Load the SDK asynchronously
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = `//connect.facebook.net/${locale}/sdk.js`;
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
};