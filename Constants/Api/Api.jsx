import axios from "axios";
import https from 'https';
const BASE_URL = "https://node.mystorybank.info:4000/api/v1";


export const getLocalStorageItem = (key) => {
  if (typeof window !== 'undefined') {

    return localStorage.getItem(key);
  }
  return null;
};


export const removeLocalStorageItem = (key) => {
  if (typeof window !== 'undefined') {
    return localStorage.removeItem(key);
  }
  return null;
};
const storedValue = getLocalStorageItem("UserLoginToken");

// ************SEND OTP API****************
export const SendOTPAPI = async (
  value1
) => {
  let config = {
    email: value1,
    type: "email_verification"
  };
  return await axios.post("https://node.mystorybank.info:4000/api/v1/auth/otp", config);
};


export const ForgetSendOTPAPI = async (
  value1
) => {
  let config = {
    email: value1,
    type: "forget_password"
  };
  return await axios.post("https://node.mystorybank.info:4000/api/v1/auth/otp", config);
};



// ************Verify OTP API****************

export const VerifyOtpAPI = async (
  value1,
  value2
) => {
  let config = {
    email: value1,
    otp: value2,
    type: "email_verification"
  };
  return await axios.post("https://node.mystorybank.info:4000/api/v1/auth/verify-otp", config);
};
// ************User Register API****************

export const UserRegisterAPI = async (
  value1,
  value2,
  value3,
  value4,
  value5
) => {
  let config = {
    name: value1,
    email: value2,
    // dialing_code: value3,
    mobile: value3,
    password: value4,
    confirm_password: value5,
  };
  return await axios.post("https://node.mystorybank.info:4000/api/v1/auth/register", config);
};
// ************User Login API****************

export const UserLoginAPI = async (
  value1,
  value2
) => {
  let config = {
    email: value1,
    password: value2,
  };
  return await axios.post("https://node.mystorybank.info:4000/api/v1/auth/login", config);
};
// ************User Logout API****************

export const UserLogOutAPI = async (
) => {

  return await axios.post("https://node.mystorybank.info:4000/api/v1/auth/logout", {
    headers: {
      "x-access-token": storedValue,
    },
  });
};
// ************All Category API****************

export const AllCategoryAPI = async () => {
  try {
    const response = await axios.get("https://node.mystorybank.info:4000/api/v1/category/all");
    return response.data;
  } catch (error) {
    console.error("API response error:", error);
    throw error;
  }
};


// ************blog by Category API****************
export const BlogByCategoryApi = async (
  value1
) => {
  let config = {
    category_slug: value1
  };
  return await axios.post("https://node.mystorybank.info:4000/api/v1/user/get-blog-from-category", config
    // , {
    //   headers: {
    //     "x-access-token": storedValue,
    //   },
    // }
  );
};

// ************Getprofile API****************


export const GetProfile = async (value) => {
  try {
    const response = await axios.get("https://node.mystorybank.info:4000/api/v1/user/profile", {
      headers: {
        "x-access-token": value,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API response error:", error);
    throw error;
  }
};

// ************Profile Edit API****************

export const UserEditProfileAPI = async (
  value1,
  value2,
  value3,
) => {
  let config = {
    name: value1,
    images: value2,
    mobile: value3,
  };

  return await axios.put("https://node.mystorybank.info:4000/api/v1/user/updateProfile", config, {
    headers: {
      "x-access-token": storedValue,
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
};
// ************Change Password API****************

export const ChangePasswordAPI = async (
  value1,
  value2,
  value3,
) => {
  let config = {
    old_password: value1,
    new_password: value2,
    confirm_password: value3,
  };

  return await axios.post("https://node.mystorybank.info:4000/api/v1/auth/reset-password", config, {
    headers: {
      "x-access-token": storedValue,
    },
  });
};
// ************Forgot Password API****************

export const ForgotPassword = async (value1, value2, value3, value4) => {
  let config = {
    email: value1,
    otp: value2,
    password: value3,
    confirm_Password: value4
  };
  return await axios.post("https://node.mystorybank.info:4000/api/v1/auth/forgot-password", config);
};
// ************Get Blog API****************

export const GetBlog = async () => {
  try {
    const response = await axios.get("https://node.mystorybank.info:4000/api/v1/blog/getAllBlogs");
    return response.data;
  } catch (error) {
    console.error("API response error:", error);
    throw error;
  }
};

axios.defaults.httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

// ************BlogDetail API****************

export const BlogDetailAPI = async (value1) => {

  try {
    const response = await axios.post(`https://node.mystorybank.info:4000/api/v1/blog/${value1}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
// ************Like API****************

export const LikeApi = async (
  value1
) => {
  let config = {
    blog_id: value1
  };
  return await axios.post("https://node.mystorybank.info:4000/api/v1/blog/like", config, {
    headers: {
      "x-access-token": storedValue,
    },
  });
};

// ************Search API****************

export const SearchAPI = async (value) => {
  try {
    const response = await axios.get(`https://node.mystorybank.info:4000/api/v1/user/blog/search?query=${value}`);
    return response.data;
  } catch (error) {
    console.error("API response error:", error);
    throw error;
  }
};