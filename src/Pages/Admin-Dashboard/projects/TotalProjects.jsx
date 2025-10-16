import { useNavigate, useParams, Routes, Route,  } from "react-router-dom";
import Workordergeneratedproject from "./workordergeneratedproject";
import ProjectProfile from "./ProjectProfile";
import AddProject from "./AddProject";
const TotalProjects = ({dashboardName}) => {
  return(
    <Routes>
      <Route path="/" element={<Workordergeneratedproject dashboardName={dashboardName} />}/>
      <Route path="profile/:projectId" element={<ProjectProfile/>}/>
      <Route path="addproject/:id" element={<AddProject />} />     
    </Routes>
  )
}

export default TotalProjects;