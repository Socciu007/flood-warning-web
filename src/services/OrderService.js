import { axiosJWT } from "./UserService"

// export const createProduct = async (data) => {
//   const res = await axios.post(`${process.env.REACT_APP_API_KEY}/product/create`, data)
//   return res.data
// // }
// http://localhost:3001/api/order/get-order-details/639724669c6dda4fa11edcde
export const createOrder = async (data,access_token) => {
  const res = await axiosJWT.post(`${process.env.REACT_APP_API_KEY}/order/create/${data.user}`, data, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}

export const getOrderByUserId = async (id,access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_KEY}/order/get-all-order/${id}`, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}

export const getDetailsOrder = async (id,access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_KEY}/order/get-details-order/${id}`, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}

export const cancelOrder = async (id, access_token, orderItems, userId ) => {
  const data = {orderItems, orderId: id}
  const res = await axiosJWT.delete(`${process.env.REACT_APP_API_KEY}/order/cancel-order/${userId}`, {data}, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}

export const getAllOrder = async (access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_KEY}/order/get-all-order`, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}