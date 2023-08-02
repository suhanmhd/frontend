import { axiosAdminInstance, axiosDoctorInstance, axiosUserInstance } from "../axios";

export const getUserInfo = async (token) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  // console.log("before sednign requeest");
  const { data } = await axiosAdminInstance.get("/users", config);
  // console.log("IN admin service fetch users");
  // console.log(data);
  if (data) {
    return data;
  }
};

export const blockUser = async (token, userId) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  console.log("request blocking");
  const { data } = await axiosAdminInstance.get(`/blockUser/${userId}`, config);
  if (data) {
    return data;
  }
};

export const unblockUser = async (token, userId) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  console.log("request unblocking");
  const { data } = await axiosAdminInstance.get(
    `/unblockUser/${userId}`,
    config
  );
  if (data) {
    return data;
  }
};

export const getDoctorInfo = async (token) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  // console.log("before sednign requeest");
  const { data } = await axiosAdminInstance.get("/doctors", config);
  // console.log("IN admin service fetch doctors");
  // console.log(data);
  if (data) {
    return data;
  }
};

export const blockDoctor = async (token, id) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosAdminInstance.get(
    `/blockDoctor/${id}`,
    config
  );
  if (data) {
    return data;
  }
};

export const unblockDoctor = async (token, id) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosAdminInstance.get(
    `/unblockDoctor/${id}`,
    config
  );
  if (data) {
    return data;
  }
};

export const pendingApprovals = async (token) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosAdminInstance.get("/pendingApprovals", config);
  console.log(data);
  if (data) {
    return data;
  }
};

export const approve = async (approvalData, token) => {
  console.log(token);
  console.log(approvalData)
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosAdminInstance.post(`/approve`, approvalData, config);
  if (data) {
    return data;
  }
};

export const addCategory = async (departmentName, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosAdminInstance.post(
    `/add/department`,
    {departmentName},
    
   config
  );
  if (data) {
    return data;
  }
};

//GET DEPARTMENTS FOR ADMIN
export const getCategories = async (token) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosAdminInstance.get(`/departments`,config);
    
     if(data){
      console.log(data);
     
      return data;

     }
};


//GET DEPARTMENTS FOR Doctor Signup
export const getDepartments = async () => {
 
  const { data } = await axiosAdminInstance.get(`/department`);
    
     if(data){
      console.log(data);
     
      return data;

     }
};




// export const getCategory = async (token) => {
//   const config = {
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   };
//   const { data } = await axiosUserInstance.get(`/getdepartments`,config);
    
//      if(data){
//       console.log(data);
     
//       return data;

//      }


     

//   // if (data.status) {
 
   
//   // }
// };


//GET DEPARTMENTS FOR USER
export const getCategory = async () => {
 
  const { data } = await axiosUserInstance.get(`/getdepartments`);
    
     if(data){
      console.log(data);
     
      return data;

     }


     

  // if (data.status) {
 
   
  // }
};





// export const getDepartmentById = async (token, id) => {
//   try {
//     const response = await axiosAdminInstance.get(`/department/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching department details:', error);
//     throw error;
//   }
// };

export const deleteCategory = async (token, id) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosAdminInstance.get(
    `/delete/department/${id}`,
    config
  );
  // if (data.status) {
    return data;
  // }
};

export const getAllAppointments = async (token) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosAdminInstance.get(`/allAppointments`, config);
  if (data.status) {
    return data;
  }
};

export const getPaidAppointments = async (token) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosAdminInstance.get(`/getPaidAppointments`, config);
  if (data.status) {
    return data;
  } 
}

export const getAllDetails = async (token) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosAdminInstance.get(`/getAllDetails`, config);
  if (data) {
    return data;
  } 
}
