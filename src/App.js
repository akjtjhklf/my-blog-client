import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/SignIn";
import Register from "./pages/SignUp";
import PostDetail from "./pages/PostDetail";
import Friends from "./pages/Friends";
import AboutUs from "./pages/AboutUs";
import MyProfile from "./pages/MyProfile";
import UserProfile from "./pages/UserProfile";
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/userprofile/:userId" element={<UserProfile />} />
            <Route path="/auth/signin" element={<Login />} />
            <Route path="/auth/signup" element={<Register />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="*" element={<h1>Page not found</h1>} />
          </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
