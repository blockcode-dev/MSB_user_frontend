import axios from "axios";
import https from 'https';
const BASE_URL = "https://node.mystorybank.info:4000/api/v1";


export const getLocalStorageItem = (key) => {
  if (typeof window !== 'undefined') {
    // console.log(key,"checkkkk")
    // console.log("checkkk22",localStorage.getItem(key))
    return localStorage.getItem(key);
  }
  return null;
};

const storedValue = getLocalStorageItem("UserLoginToken");
// console.log(storedValue, "storedValue")

// const token = localStorage.getItem("UserLoginToken")
// console.log(token,"tokrn")

export const SendOTPAPI = async (
  value1
) => {
  let config = {
    email: value1,
    type: "email_varification"
  };
  return await axios.post("https://node.mystorybank.info:4000/api/v1/auth/otp", config);
};
export const VerifyOtpAPI = async (
  value1,
  value2
) => {
  let config = {
    email: value1,
    otp: value2,
    type: "email_varification"
  };
  return await axios.post("https://node.mystorybank.info:4000/api/v1/auth/verify-otp", config);
};
export const UserRagisterAPI = async (
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
export const AllCategoryAPI = async () => {
  try {
    const response = await axios.get("https://node.mystorybank.info:4000/api/v1/category/all");
    return response.data;
  } catch (error) {
    console.error("API response error:", error);
    throw error;
  }
};

export const GetProfile = async () => {
  try {
    const response = await axios.get("https://node.mystorybank.info:4000/api/v1/user/profile", {
      headers: {
        "x-access-token": storedValue,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API response error:", error);
    throw error;
  }
};

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
  // console.log(storedValue,"storedValueedit")

  return await axios.put("https://node.mystorybank.info:4000/api/v1/user/updateProfile", config, {
    headers: {
      "x-access-token": storedValue,
    },
  });
};

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

export const BlogDetailAPI = async (value1) => {

  try {
    const response = await axios.post(`https://node.mystorybank.info:4000/api/v1/blog/${value1}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

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


