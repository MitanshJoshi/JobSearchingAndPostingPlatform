import express from "express"
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { postJob, getAllJobs, getMyJobs, deleteJob , getSingleJob} from "../controllers/jobController.js";

const router = express.Router();

router.post("/postjob",isAuthenticated,isAuthorized("Employer"),postJob)

router.get("/getall",getAllJobs)

router.get("/getmyjobs",isAuthenticated,isAuthorized("Employer"),getMyJobs)

router.delete("/delete/:id",isAuthenticated,isAuthorized("Employer"),deleteJob)

router.get("/get/:id",getSingleJob);

export default router;