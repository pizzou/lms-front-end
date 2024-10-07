import axiosInstance from "@/api/axiosInstance";

// Registration Service
export async function registerService(formData) {
  try {
    const { data } = await axiosInstance.post('/auth/register', {
      ...formData,
      role: 'user',
    });
    return data;
  } catch (error) {
    console.error('Register service error:', error);
    throw error;
  }
}

// Login Service
export async function loginService(formData) {
  try {
    const { data } = await axiosInstance.post('/auth/login', formData);
    return data;
  } catch (error) {
    console.error('Login service error:', error);
    throw error;
  }
}

// Check Auth Service
export async function checkAuthService() {
  try {
    const { data } = await axiosInstance.get('/auth/check-auth');
    return data;
  } catch (error) {
    console.error('Check auth service error:', error);
    throw error;
  }
}

// Media Upload Service (Example)
export async function mediaUploadService(formData, onProgressCallback) {
  try {
    const { data } = await axiosInstance.post('/media/upload', formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgressCallback(percentCompleted);
      },
    });
    return data;
  } catch (error) {
    console.error('Media upload service error:', error);
    throw error;
  }
}


export async function mediaDeleteService(id) {
  try {
    const { data } = await axiosInstance.delete(`/media/delete/${id}`);
    return data;
  } catch (error) {
    console.error('Media delete service error:', error);
    throw error;
  }
}

export async function fetchInstructorCourseListService() {
  try {
    const { data } = await axiosInstance.get(`/instructor/course/get`);
    return data;
  } catch (error) {
    console.error('Fetch instructor course list service error:', error);
    throw error;
  }
}

export async function addNewCourseService(formData) {
  try {
    const { data } = await axiosInstance.post(`/instructor/course/add`, formData);
    return data;
  } catch (error) {
    console.error('Add new course service error:', error);
    throw error;
  }
}

export async function fetchInstructorCourseDetailsService(id) {
  try {
    const { data } = await axiosInstance.get(`/instructor/course/get/details/${id}`);
    return data;
  } catch (error) {
    console.error('Fetch instructor course details service error:', error);
    throw error;
  }
}

export async function updateCourseByIdService(id, formData) {
  try {
    const { data } = await axiosInstance.put(`/instructor/course/update/${id}`, formData);
    return data;
  } catch (error) {
    console.error('Update course by ID service error:', error);
    throw error;
  }
}

export async function mediaBulkUploadService(formData, onProgressCallback) {
  try {
    const { data } = await axiosInstance.post('/media/bulk-upload', formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgressCallback(percentCompleted);
      },
    });
    return data;
  } catch (error) {
    console.error('Media bulk upload service error:', error);
    throw error;
  }
}

export async function fetchStudentViewCourseListService(query) {
  try {
    const { data } = await axiosInstance.get(`/student/course/get?${query}`);
    return data;
  } catch (error) {
    console.error('Fetch student view course list service error:', error);
    throw error;
  }
}

export async function fetchStudentViewCourseDetailsService(courseId) {
  try {
    const { data } = await axiosInstance.get(`/student/course/get/details/${courseId}`);
    return data;
  } catch (error) {
    console.error('Fetch student course details service error:', error);
    throw error;
  }
}

export async function checkCoursePurchaseInfoService(courseId, studentId) {
  try {
    const { data } = await axiosInstance.get(`/student/course/purchase-info/${courseId}/${studentId}`);
    return data;
  } catch (error) {
    console.error('Check course purchase info service error:', error);
    throw error;
  }
}

export async function createPaymentService(formData) {
  try {
    const { data } = await axiosInstance.post(`/student/order/create`, formData);
    return data;
  } catch (error) {
    console.error('Create payment service error:', error);
    throw error;
  }
}

export async function captureAndFinalizePaymentService(paymentId, payerId, orderId) {
  try {
    const { data } = await axiosInstance.post(`/student/order/capture`, {
      paymentId,
      payerId,
      orderId,
    });
    return data;
  } catch (error) {
    console.error('Capture and finalize payment service error:', error);
    throw error;
  }
}

export async function fetchStudentBoughtCoursesService(studentId) {
  try {
    const { data } = await axiosInstance.get(`/student/courses-bought/get/${studentId}`);
    return data;
  } catch (error) {
    console.error('Fetch student bought courses service error:', error);
    throw error;
  }
}

export async function getCurrentCourseProgressService(userId, courseId) {
  try {
    const { data } = await axiosInstance.get(`/student/course-progress/get/${userId}/${courseId}`);
    return data;
  } catch (error) {
    console.error('Get current course progress service error:', error);
    throw error;
  }
}

export async function markLectureAsViewedService(userId, courseId, lectureId) {
  try {
    const { data } = await axiosInstance.post(`/student/course-progress/mark-lecture-viewed`, {
      userId,
      courseId,
      lectureId,
    });
    return data;
  } catch (error) {
    console.error('Mark lecture as viewed service error:', error);
    throw error;
  }
}

export async function resetCourseProgressService(userId, courseId) {
  try {
    const { data } = await axiosInstance.post(`/student/course-progress/reset-progress`, {
      userId,
      courseId,
    });
    return data;
  } catch (error) {
    console.error('Reset course progress service error:', error);
    throw error;
  }
}
