import { axiosDoctorInstance, axiosUserInstance,axiosBookingInstance } from "../axios";

export const getDoctorByCategory = async (token,departmentName) => {
  console.log(departmentName);
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer "+ token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosUserInstance.get(`/getDoctorByCategory/${departmentName}`,config);
    if (data) {
      return data;
    }
  };

  export const getDoctorProfile = async (token, docId) => {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosDoctorInstance.get(`/getDoctorProfile/${docId}`, config);
    if (data) {
      return data;
    }
  };

  export const updateDoctorProfile = async ( formData, token ) => {
    console.log(formData);
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " +token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosDoctorInstance.post(`/updateDoctorProfile`, formData, config);
    if (data) {
      return data;
    }
  }


export const addMedicinePrescription = async(formData,token)=>{
  console.log(formData);

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " +token,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosDoctorInstance.post(`/addPrescription`, formData, config);
  if (data) {
    return data;
  }

}
  export const getSingleDoctor = async (docId) => {
    const { data } = await axiosUserInstance.get(`/getSingleDoctor/${docId}`);
    if (data) {
      return data;
    }
  }

  export const bookAppointment = async (token, appointmentData ) => {
    console.log(appointmentData)
    console.log("above is doc services data")
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosUserInstance.post('/book-appointment', appointmentData, config );
    if (data.status) {
      return data;
    }
  }

  export const checkAvailability = async (token, appointmentData ) => {
    console.log(token);
    console.log(appointmentData)
    console.log("above is doc services check data")
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosUserInstance.post('/check-availability', appointmentData, config );
    if (data) {
      console.log(data);
      return data;
    }
  }

  export const getAppointmentRequests = async (token, docId ) => {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await  axiosBookingInstance.get(`/getAppointmentRequests/${docId}`, config);
    if (data) {
      return data;
    }
  }

  export const getTodaysAppointmentRequests = async (token, docId ) => {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await  axiosBookingInstance.get(`/getTodaysAppointmentRequests/${docId}`, config);
    if (data) {
      console.log("hel");
      console.log(data);
      return data;
    }
  }

  export const updateStatus = async (appointmentData, token) => {
        const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    console.log(appointmentData)
    const { data } = await axiosBookingInstance.post(`/update-appointment-status`,appointmentData, config)
    if(data){
      return data
    }
  }

  export const rejectFunction = async (appointmentData, token) => {
    const config = {
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  },
};
console.log(appointmentData)
const { data } = await axiosDoctorInstance.post(`/reject`,appointmentData, config)
if(data.status){
  return data
}
}

  export const getDoctorDetails = async (docId) => {
    const { data } = await axiosDoctorInstance.get(`/getDoctorDetails/${docId}`)
    if(data.status){
      return data
    }
  }

  export const getDoctorDashDetails = async (token, docId) => {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosBookingInstance.get(`/getDoctorDashDetails/${docId}`)
    if(data){
      console.log(data);
      return data
    }
  }

  export const getMyPaidAppointments = async (token, docId) => {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosDoctorInstance.get(`/getMyPaidAppointments/${docId}`, config)
    if(data){
      return data
    }
  }

  export const getDoctorScheduledTimes= async(token,docId)=>{
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
      const { data } = await axiosDoctorInstance.get(`/getAvailableSlots/${docId}`, config)
      if(data){
        return data
      }
    };

  export const addDoctorScheduledTimes= async(token,scheduleData)=>{
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    console.log(scheduleData)
      const { data } = await axiosDoctorInstance.post(`/addBookingSlot`,scheduleData, config)
      if(data){
        return data
      }
    };


    export const deleteDoctorScheduledTimes= async(token,slotId)=>{
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };
      console.log(slotId,token)
        const { data } = await axiosDoctorInstance.delete(`/deleteSlot/${slotId}`, config)
        if(data){
          return data
        }
      };


      
      export const getUserById = async (token, userId) => {
        const config = {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        };
        const { data } = await axiosDoctorInstance.get(`/getSingleUser/${userId}`, config)
        if(data){
          return data
        }
      }


      export const getUserAppointmentDetailsToDoctor = async (token, userId) => {
        const config = {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        };
        const { data } = await axiosBookingInstance.get(`/getUserAppointments/${userId}`,config)
        if(data){
          return data
        }
      }

      export const getPatientPrescription = async(token, userId)=>{

        const config = {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        };
        const { data } = await axiosDoctorInstance.get(`/getPatientPrecsription/${userId}`,config)
        if(data){
          return data
        }

      }


export const addPrescription = async(formData,token)=>{
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
    console.log(formData);
  const { data } = await axiosDoctorInstance.post(`/prescription`,formData,config)
  if(data){
    return data
  }



}