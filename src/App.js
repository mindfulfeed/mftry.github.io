import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp.jsx";
import LogIn from "./pages/LogIn/LogIn.jsx";
import Home from "./pages/Channels/Channels.jsx";
import Feed from "./pages/Feed/Feed.jsx";
import Congratulations from "./pages/Congratulations/Congratulations.jsx";
import NotFound from "./pages/404/404.jsx"; // Import the 404 component
import Channels from "./pages/Channels/Channels.jsx";
import Channel from "./pages/Channel/Channel.jsx";
import Landing from './pages/Landing/Landing.jsx';
import Why from './pages/Why/Why.jsx';
import How from './pages/How/How.jsx';


function App() {
  const user = localStorage.getItem("token");

  console.log(user)
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate replace to="/home" /> : <Navigate replace to="/Landing" />
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/congratulations" element={<Congratulations />} />
        <Route path="/view" element={<Channels />} />
        <Route path="/channels">
          <Route path=":id" element={<Channel />} />
        </Route>
        <Route path="/landing" element={<Landing />} /> {/* Add a route for Landing.jsx */}
      <Route path="/Why" element={<Why />} /> {/* Add a route for Landing.jsx */}
    <Route path="/How" element={<How />} /> {/* Add a route for Landing.jsx */}
        <Route path="*" element={<NotFound />} /> {/* Add a catch-all route for 404 */}
      </Routes>
    </Router>
  );
}

export default App;
