import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import SecureRoute from "@/components/SecureRoute";
import AuthorizeLayout from "@/components/Layout/AuthorizeLayout";
import NoAuthorizeLayout from "@/components/Layout/NoAuthorizeLayout";
import Login from "@/pages/Auth/Login";
import Dashboard from "@/pages/Dashboard";
import Batch from "@/pages/Batch/index";
import Grading from "@/pages/Grading/index";
import CreateAccount from "@/pages/CreateAccount";
import Participants from "@/pages/Participants/index";
import DetailParticipant from "@/pages/Participants/detailparticipant";
import EditParticipant from "@/pages/Participants/editparticipant";
import DetailBatch from "@/pages/Batch/DetailBatch";
import AddParticipantTable from "@/pages/Participants/AddParticipantTable";
import EditProfile from "@/components/Layout/EditProfile";
import Setting from "@/pages/Setting/index";

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route  //route yang dapat diakses oleh user jika berhasil login
        element={
          <SecureRoute>
            <AuthorizeLayout />
          </SecureRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path={"/batch"} element={<Batch />} />
        <Route path={"/createaccount"} element={<CreateAccount />} />
        <Route path={"/participants"} element={<Participants />} />
        <Route
          path={"/detail-participant/:id"}
          element={<DetailParticipant />}
        />
        <Route path={"/edit-participant/:id"} element={<EditParticipant />} />
        <Route path={"/edit-profile/:id"} element={<EditProfile />} />
        <Route path={"/batch/:id"} element={<DetailBatch />} />
        <Route path={"/grading/:id"} element={<Grading />} />
        <Route path={"/addparticipanttable"} element={<AddParticipantTable />}/>
         <Route path={"/setting"} element={<Setting />} />
      </Route>

      {/* route yang dapat diakses jika user tidak bisa login */}
      <Route element={<NoAuthorizeLayout />}> 
        <Route path={"/login"} element={<Login />} />
      </Route>
    </>
  )
);
export default Router;
