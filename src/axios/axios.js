import axios from 'axios';

// export const axiosUserInstance = axios.create({
//   baseURL: 'http://localhost:5000',
// });
// export const axiosAdminInstance = axios.create({
//   baseURL: 'http://localhost:5000/admin',
// });
// export const axiosDoctorInstance = axios.create({
//   baseURL: 'http://localhost:5000/doctor',
// });
// export const axiosMessageInstance = axios.create({
//   baseURL: 'http://localhost:5000/message',
// });
// export const axiosConversationInstance = axios.create({
//   baseURL: 'http://localhost:5000/conversation',
// });


export const axiosDoctorInstance = axios.create({
  baseURL: 'http://localhost:9090/doctor', 
});

export const axiosAdminInstance = axios.create({
  baseURL: 'http://localhost:9090/admin',
});


export const axiosAuthInstance = axios.create({
  baseURL: 'http://localhost:9090/auth',
});


export const axiosUserInstance = axios.create({
  baseURL: 'http://localhost:9090/user', 
});


export const axiosBookingInstance = axios.create({
  baseURL: 'http://localhost:9090/appointment', 
});
// export const axiosAdminInstance = axios.create({
//   baseURL: 'https://click-n-visit.onrender.com/admin',
// });
// export const axiosDoctorInstance = axios.create({
//   baseURL: 'https://click-n-visit.onrender.com/doctor',
// });
export const axiosMessageInstance = axios.create({
  baseURL: 'https://click-n-visit.onrender.com/message',
});
export const axiosConversationInstance = axios.create({
  baseURL: 'http://localhost:9090/appointment',
});


