import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import InstructorDashboard from './pages/InstructorDashboard';
import StudentDashboard from './pages/StudentDashboard';
import SkillPage from './pages/SkillPage';
import LiveSession from './pages/LiveSession';
import ProtectedRoute from './components/ProtectedRoute';
import StudentSessions from './pages/StudentSessions';
import CreateLiveSession from './pages/CreateLiveSession';
import JoinLiveSession from './pages/JoinLiveSession';
import '@livekit/components-styles';
import CreateClassroom from './pages/CreateClassroom';
import CreateCourse from './pages/CreateCourse';
import InstructorCourses from './pages/InstructorCourses';
import Classrooms from './pages/Classrooms';
import InstructorClassrooms from './pages/InstructorClassrooms';
import StudentInfo from './pages/StudentInfo';
import JoinClassroom from './pages/JoinClassroom';
import StudentClassrooms from './pages/StudentClassrooms';
import StudentClassroomDetail from './pages/StudentClassroomDetail';
import InstructorClassroomCourses from './pages/InstructorClassroomCourses';
import CourseDetail from './pages/CourseDetail';
import LiveSessionRoom from './pages/LiveSessionRoom';
import ClassroomDetail from './pages/ClassroomDetail';
import CreateLearningPath from './pages/CreateLearningPath';
import ViewLearningPaths from './pages/ViewLearningPaths';
import ReadingStatisticsDashboard from './pages/ReadingStatisticsDashboard';
import LearningSession from './pages/LearningSession';
import EditCourse from './pages/EditCourse';
import Profile from './pages/Profile';
import StudentDownloads from './pages/StudentDownloads';
import AllLiveSessions from './pages/AllLiveSessions';
import StudentCourses from './pages/StudentCourses';
import InstructorDoubts from './pages/InstructorDoubts';
import StudentDoubts from './pages/StudentDoubts';
import CourseDoubts from './pages/CourseDoubts';
import Notifications from './pages/Notifications';
import AssessmentDashboard from './pages/AssessmentDashboard';
import InstructorReviews from './pages/InstructorReviews';
import LiveSessionsDashboard from './pages/LiveSessionsDashboard';
import DownloadsDashboard from './pages/DownloadsDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminUserManagement from './pages/AdminUserManagement';
import AdminClassroomManagement from './pages/AdminClassroomManagement';
import AdminClassroomDetail from './pages/AdminClassroomDetail';
import AdminCourseCreate from './pages/AdminCourseCreate';
import AdminClassroomCreate from './pages/AdminClassroomCreate';
import AllAssignments from './pages/AllAssignments';
import AllQuizzes from './pages/AllQuizzes';


function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-sessions" element={<StudentSessions />} />
        <Route path="/live-sessions" element={<LiveSessionsDashboard />} />
        <Route path="/skills/:id" element={<SkillPage />} />
        <Route path="/live-session" element={<LiveSession />} />
        <Route path="/instructor/create" element={<CreateLiveSession />} />
        <Route path="/student/join/:roomName/:username" element={<JoinLiveSession />} />

        <Route path="/join/:roomName/:username" element={<JoinLiveSession />} />
        <Route
          path="/create-classroom"
          element={
            <ProtectedRoute role="instructor">
              <CreateClassroom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-course"
          element={
            <ProtectedRoute role="instructor">
              <CreateCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-course/:classroomId"
          element={
            <ProtectedRoute role="instructor">
              <CreateCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-learning-path"
          element={
            <ProtectedRoute role="instructor">
              <CreateLearningPath />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning-paths"
          element={
            <ProtectedRoute>
              <ViewLearningPaths />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning-session/:pathId"
          element={
            <ProtectedRoute>
              <LearningSession />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/downloads"
          element={
            <ProtectedRoute role="student">
              <StudentDownloads />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/live-sessions"
          element={
            <ProtectedRoute role="student">
              <AllLiveSessions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-courses"
          element={
            <ProtectedRoute role="student">
              <StudentCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reading-statistics"
          element={
            <ProtectedRoute role="student">
              <ReadingStatisticsDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/courses"
          element={
            <ProtectedRoute role="instructor">
              <InstructorCourses />
            </ProtectedRoute>
          }
        />
        <Route path="/classrooms" element={<Classrooms />} />
        <Route path="/student-info" element={<StudentInfo />} />
        <Route path="/join-classrooms" element={<JoinClassroom />} />
        <Route path="/student/classrooms" element={<StudentClassrooms />} />

        <Route
          path="/instructor/classrooms"
          element={
            <ProtectedRoute role="instructor">
              <InstructorClassrooms />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/instructor"
          element={
            <ProtectedRoute role="instructor">
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/reviews"
          element={
            <ProtectedRoute role="instructor">
              <InstructorReviews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/classroom/:id"
          element={
            <ProtectedRoute role="instructor">
              <ClassroomDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/classroom/:classroomId/courses"
          element={
            <ProtectedRoute role="instructor">
              <InstructorClassroomCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/classroom/:id"
          element={
            <ProtectedRoute role="student">
              <ClassroomDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/classroom/:classroomId/courses"
          element={
            <ProtectedRoute role="student">
              <StudentClassroomDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:id"
          element={
            <ProtectedRoute>
              <CourseDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-course/:id"
          element={
            <ProtectedRoute role="instructor">
              <EditCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/live-session/:roomName"
          element={
            <ProtectedRoute>
              <LiveSessionRoom />
            </ProtectedRoute>
          }
        />
        
        {/* Doubt Routes */}
        <Route
          path="/instructor/doubts"
          element={
            <ProtectedRoute role="instructor">
              <InstructorDoubts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/doubts"
          element={
            <ProtectedRoute role="student">
              <StudentDoubts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:courseId/doubts"
          element={
            <ProtectedRoute role="student">
              <CourseDoubts />
            </ProtectedRoute>
          }
        />
        

        
        {/* Notification Routes */}
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        
        {/* Assessment Routes */}
        <Route
          path="/assessments"
          element={
            <ProtectedRoute role="student">
              <AssessmentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Live Sessions Dashboard Routes */}
        <Route
          path="/live-sessions-dashboard"
          element={
            <ProtectedRoute>
              <LiveSessionsDashboard />
            </ProtectedRoute>
          }
        />

        {/* Downloads Dashboard Routes */}
        <Route
          path="/downloads"
          element={
            <ProtectedRoute role="student">
              <DownloadsDashboard />
            </ProtectedRoute>
          }
        />

        {/* Global Assignments/Quizzes pages */}
        <Route
          path="/assignments"
          element={
            <ProtectedRoute>
              <AllAssignments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quizzes"
          element={
            <ProtectedRoute>
              <AllQuizzes />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <AdminUserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/classrooms"
          element={
            <ProtectedRoute role="admin">
              <AdminClassroomManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/classrooms/:classroomId/detail"
          element={
            <ProtectedRoute role="admin">
              <AdminClassroomDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses/create"
          element={
            <ProtectedRoute role="admin">
              <AdminCourseCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/classrooms/create"
          element={
            <ProtectedRoute role="admin">
              <AdminClassroomCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/live-sessions"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/learning-paths"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/system-health"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
