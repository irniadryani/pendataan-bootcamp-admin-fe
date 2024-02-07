import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import SecureRoute from "@/components/SecureRoute";
import AuthorizeLayout from "@/components/Layout/AuthorizeLayout";
import NoAuthorizeLayout from "@/components/Layout/NoAuthorizeLayout";

//  Anonymous Route
import Login from "@/pages/Auth/Login";

//  Logged In Route
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
      {/* route untuk halaman yang udah punya token / sudah login */}
      <Route
        element={
          <SecureRoute>
            <AuthorizeLayout />
          </SecureRoute>
        }
      >
        {/* route route nya */}
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
        {/* <Route path={"/grading"} element={<Grading />} /> */}
        <Route path={"/grading/:id"} element={<Grading />} />
        <Route
          path={"/addparticipanttable"}
          element={<AddParticipantTable />}
        />
         <Route path={"/setting"} element={<Setting />} />
      </Route>

      <Route element={<NoAuthorizeLayout />}>
        <Route path={"/login"} element={<Login />} />
      </Route>
    </>
  )
);
export default Router;
