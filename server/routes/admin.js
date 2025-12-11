const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Classroom = require('../models/Classroom');
const Course = require('../models/Course');
const LiveSession = require('../models/LiveSession');
const LearningPath = require('../models/LearningPath');
const { auth, adminOnly } = require('../middleware/auth');
const bcrypt = require('bcryptjs');

// Apply admin middleware to all routes
router.use(auth);
router.use(adminOnly);

// Get admin dashboard stats
router.get('/dashboard-stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalInstructors = await User.countDocuments({ role: 'instructor' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalClassrooms = await Classroom.countDocuments();
    const totalCourses = await Course.countDocuments();
    
    // Count live sessions from courses
    const courses = await Course.find({});
    let totalLiveSessions = 0;
    courses.forEach(course => {
      if (course.liveSessions && course.liveSessions.length > 0) {
        totalLiveSessions += course.liveSessions.length;
      }
    });
    
    const totalLearningPaths = await LearningPath.countDocuments();

    res.json({
      totalUsers,
      totalStudents,
      totalInstructors,
      totalAdmins,
      totalClassrooms,
      totalCourses,
      totalLiveSessions,
      totalLearningPaths
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all users with pagination and filtering
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    let query = {};
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const users = await User.find(query)
      .select('-password')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('createdBy', 'name email');

    const total = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new instructor
router.post('/create-instructor', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create instructor
    const instructor = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'instructor',
      createdBy: req.user.id,
      permissions: ['create_course', 'manage_classroom', 'view_students']
    });

    res.status(201).json({
      message: 'Instructor created successfully',
      instructor: {
        _id: instructor._id,
        name: instructor.name,
        email: instructor.email,
        role: instructor.role,
        createdAt: instructor.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new admin
router.post('/create-admin', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
      createdBy: req.user.id,
      permissions: ['all']
    });

    res.status(201).json({
      message: 'Admin created successfully',
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        createdAt: admin.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new student
router.post('/create-student', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create student
    const student = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'student',
      createdBy: req.user.id,
      permissions: ['view_courses', 'join_classroom', 'participate_sessions']
    });

    res.status(201).json({
      message: 'Student created successfully',
      student: {
        _id: student._id,
        name: student.name,
        email: student.email,
        role: student.role,
        createdAt: student.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user
router.put('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, role, isActive, permissions } = req.body;

    const updateData = { name, email, role, isActive, permissions };
    
    // Remove undefined fields
    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user
router.delete('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Prevent admin from deleting themselves
    if (userId === req.user.id) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all classrooms with instructor details
router.get('/classrooms', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, instructor, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (instructor) {
      query.instructor = instructor;
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const classrooms = await Classroom.find(query)
      .populate('instructor', 'name email')
      .populate('students', 'name email')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Classroom.countDocuments(query);

    res.json({
      classrooms,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new classroom
router.post('/classrooms', async (req, res) => {
  try {
    const { name, description, capacity, instructor } = req.body;
    
    const classroomData = {
      name,
      description,
      capacity: capacity || 30
    };
    
    if (instructor) {
      classroomData.instructor = instructor;
    }

    const classroom = await Classroom.create(classroomData);

    res.status(201).json({
      message: 'Classroom created successfully',
      classroom
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update classroom
router.put('/classrooms/:classroomId', async (req, res) => {
  try {
    const { classroomId } = req.params;
    const { name, description, capacity } = req.body;

    const updateData = { name, description, capacity };
    
    // Remove undefined fields
    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );

    const classroom = await Classroom.findByIdAndUpdate(
      classroomId,
      updateData,
      { new: true, runValidators: true }
    ).populate('instructor', 'name email');

    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }

    res.json({
      message: 'Classroom updated successfully',
      classroom
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete classroom
router.delete('/classrooms/:classroomId', async (req, res) => {
  try {
    const { classroomId } = req.params;
    
    const classroom = await Classroom.findByIdAndDelete(classroomId);
    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }

    res.json({ message: 'Classroom deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Assign instructor to classroom
router.put('/classrooms/:classroomId/assign-instructor', async (req, res) => {
  try {
    const { classroomId } = req.params;
    const { instructorId } = req.body;

    // Verify instructor exists and has instructor role
    const instructor = await User.findOne({ _id: instructorId, role: 'instructor' });
    if (!instructor) {
      return res.status(400).json({ error: 'Invalid instructor ID' });
    }

    const classroom = await Classroom.findByIdAndUpdate(
      classroomId,
      { instructor: instructorId },
      { new: true }
    ).populate('instructor', 'name email');

    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }

    res.json({
      message: 'Instructor assigned successfully',
      classroom
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add student to classroom
router.post('/classrooms/:classroomId/add-student', async (req, res) => {
  try {
    const { classroomId } = req.params;
    const { studentId } = req.body;

    // Verify student exists and has student role
    const student = await User.findOne({ _id: studentId, role: 'student' });
    if (!student) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }

    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }

    // Check if student is already in the classroom
    if (classroom.students && classroom.students.includes(studentId)) {
      return res.status(400).json({ error: 'Student is already in this classroom' });
    }

    // Add student to classroom
    if (!classroom.students) {
      classroom.students = [];
    }
    classroom.students.push(studentId);
    await classroom.save();

    const updatedClassroom = await Classroom.findById(classroomId)
      .populate('instructor', 'name email')
      .populate('students', 'name email');

    res.json({
      message: 'Student added to classroom successfully',
      classroom: updatedClassroom
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove student from classroom
router.delete('/classrooms/:classroomId/remove-student/:studentId', async (req, res) => {
  try {
    const { classroomId, studentId } = req.params;

    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }

    // Remove student from classroom
    if (classroom.students) {
      classroom.students = classroom.students.filter(id => id.toString() !== studentId);
      await classroom.save();
    }

    const updatedClassroom = await Classroom.findById(classroomId)
      .populate('instructor', 'name email')
      .populate('students', 'name email');

    res.json({
      message: 'Student removed from classroom successfully',
      classroom: updatedClassroom
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get classroom details with students and instructor
router.get('/classrooms/:classroomId', async (req, res) => {
  try {
    const { classroomId } = req.params;

    const classroom = await Classroom.findById(classroomId)
      .populate('instructor', 'name email')
      .populate('students', 'name email');

    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }

    res.json({ classroom });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove instructor from classroom
router.delete('/classrooms/:classroomId/remove-instructor', async (req, res) => {
  try {
    const { classroomId } = req.params;

    const classroom = await Classroom.findByIdAndUpdate(
      classroomId,
      { $unset: { instructor: 1 } },
      { new: true }
    ).populate('instructor', 'name email')
     .populate('students', 'name email');

    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }

    res.json({
      message: 'Instructor removed from classroom successfully',
      classroom
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all courses
router.get('/courses', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    let query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const courses = await Course.find(query)
      .populate('instructor', 'name email')
      .populate('classroom', 'name')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Course.countDocuments(query);

    res.json({
      courses,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new course
router.post('/courses', async (req, res) => {
  try {
    const { title, description, instructor, classroom, duration, difficulty } = req.body;
    
    const courseData = {
      title,
      description,
      duration: duration || 60,
      difficulty: difficulty || 'beginner'
    };
    
    if (instructor) {
      courseData.instructor = instructor;
    }
    
    if (classroom) {
      courseData.classroom = classroom;
    }

    const course = await Course.create(courseData);

    const populatedCourse = await Course.findById(course._id)
      .populate('instructor', 'name email')
      .populate('classroom', 'name');

    res.status(201).json({
      message: 'Course created successfully',
      course: populatedCourse
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update course
router.put('/courses/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description, instructor, classroom, duration, difficulty } = req.body;

    const updateData = { title, description, instructor, classroom, duration, difficulty };
    
    // Remove undefined fields
    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );

    const course = await Course.findByIdAndUpdate(
      courseId,
      updateData,
      { new: true, runValidators: true }
    ).populate('instructor', 'name email')
     .populate('classroom', 'name');

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({
      message: 'Course updated successfully',
      course
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete course
router.delete('/courses/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all live sessions from courses
router.get('/live-sessions', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    // Get all courses with live sessions
    const courses = await Course.find({})
      .populate('instructor', 'name email')
      .populate('classroom', 'name');
    
    let allSessions = [];
    
    courses.forEach(course => {
      if (course.liveSessions && course.liveSessions.length > 0) {
        course.liveSessions.forEach(session => {
          const sessionData = {
            ...session.toObject(),
            courseId: { _id: course._id, name: course.name },
            classroom: course.classroom,
            instructor: course.instructor
          };
          
          // Apply search filter if provided
          if (search) {
            const searchRegex = new RegExp(search, 'i');
            if (sessionData.title && searchRegex.test(sessionData.title)) {
              allSessions.push(sessionData);
            } else if (sessionData.description && searchRegex.test(sessionData.description)) {
              allSessions.push(sessionData);
            }
          } else {
            allSessions.push(sessionData);
          }
        });
      }
    });
    
    // Sort sessions
    allSessions.sort((a, b) => {
      const aValue = a[sortBy] || a.createdAt;
      const bValue = b[sortBy] || b.createdAt;
      return sortOrder === 'desc' ? new Date(bValue) - new Date(aValue) : new Date(aValue) - new Date(bValue);
    });
    
    // Apply pagination
    const total = allSessions.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedSessions = allSessions.slice(startIndex, endIndex);

    res.json({
      liveSessions: paginatedSessions,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    console.error('Error fetching live sessions:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create new live session
router.post('/live-sessions', async (req, res) => {
  try {
    const { title, description, instructor, classroom, scheduledDate, duration, maxParticipants } = req.body;
    
    const sessionData = {
      title,
      description,
      scheduledDate: scheduledDate || new Date(),
      duration: duration || 60,
      maxParticipants: maxParticipants || 50
    };
    
    if (instructor) {
      sessionData.instructor = instructor;
    }
    
    if (classroom) {
      sessionData.classroom = classroom;
    }

    const liveSession = await LiveSession.create(sessionData);

    const populatedSession = await LiveSession.findById(liveSession._id)
      .populate('instructor', 'name email')
      .populate('classroom', 'name');

    res.status(201).json({
      message: 'Live session created successfully',
      liveSession: populatedSession
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update live session
router.put('/live-sessions/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { title, description, instructor, classroom, scheduledDate, duration, maxParticipants } = req.body;

    const updateData = { title, description, instructor, classroom, scheduledDate, duration, maxParticipants };
    
    // Remove undefined fields
    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );

    const liveSession = await LiveSession.findByIdAndUpdate(
      sessionId,
      updateData,
      { new: true, runValidators: true }
    ).populate('instructor', 'name email')
     .populate('classroom', 'name');

    if (!liveSession) {
      return res.status(404).json({ error: 'Live session not found' });
    }

    res.json({
      message: 'Live session updated successfully',
      liveSession
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete live session
router.delete('/live-sessions/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const liveSession = await LiveSession.findByIdAndDelete(sessionId);
    if (!liveSession) {
      return res.status(404).json({ error: 'Live session not found' });
    }

    res.json({ message: 'Live session deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all learning paths
router.get('/learning-paths', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    let query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const learningPaths = await LearningPath.find(query)
      .populate('instructor', 'name email')
      .populate('classroom', 'name')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await LearningPath.countDocuments(query);

    res.json({
      learningPaths,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new learning path
router.post('/learning-paths', async (req, res) => {
  try {
    const { title, description, instructor, classroom, steps, estimatedDuration } = req.body;
    
    const pathData = {
      title,
      description,
      steps: steps || [],
      estimatedDuration: estimatedDuration || 120
    };
    
    if (instructor) {
      pathData.instructor = instructor;
    }
    
    if (classroom) {
      pathData.classroom = classroom;
    }

    const learningPath = await LearningPath.create(pathData);

    const populatedPath = await LearningPath.findById(learningPath._id)
      .populate('instructor', 'name email')
      .populate('classroom', 'name');

    res.status(201).json({
      message: 'Learning path created successfully',
      learningPath: populatedPath
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update learning path
router.put('/learning-paths/:pathId', async (req, res) => {
  try {
    const { pathId } = req.params;
    const { title, description, instructor, classroom, steps, estimatedDuration } = req.body;

    const updateData = { title, description, instructor, classroom, steps, estimatedDuration };
    
    // Remove undefined fields
    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );

    const learningPath = await LearningPath.findByIdAndUpdate(
      pathId,
      updateData,
      { new: true, runValidators: true }
    ).populate('instructor', 'name email')
     .populate('classroom', 'name');

    if (!learningPath) {
      return res.status(404).json({ error: 'Learning path not found' });
    }

    res.json({
      message: 'Learning path updated successfully',
      learningPath
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete learning path
router.delete('/learning-paths/:pathId', async (req, res) => {
  try {
    const { pathId } = req.params;
    
    const learningPath = await LearningPath.findByIdAndDelete(pathId);
    if (!learningPath) {
      return res.status(404).json({ error: 'Learning path not found' });
    }

    res.json({ message: 'Learning path deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// System health check
router.get('/system-health', async (req, res) => {
  try {
    const dbStatus = 'connected'; // You can add actual DB connection check here
    const serverUptime = process.uptime();
    const memoryUsage = process.memoryUsage();
    
    res.json({
      status: 'healthy',
      database: dbStatus,
      serverUptime: Math.floor(serverUptime),
      memoryUsage: {
        rss: Math.round(memoryUsage.rss / 1024 / 1024) + ' MB',
        heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024) + ' MB',
        heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024) + ' MB'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
