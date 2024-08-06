import express from "express"
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { deleteApplication, employerGetAllApplications, jobSeekerGetAllApplications, postApplication } from "../controllers/applicationController.js";


const router = express.Router();

router.post("/post/:id",isAuthenticated,isAuthorized("Job Seeker"),postApplication);

router.get("/employer/getall",isAuthenticated,isAuthorized("Employer"),employerGetAllApplications);

router.get("/jobseeker/getall",isAuthenticated,isAuthorized("Job Seeker"),jobSeekerGetAllApplications);

router.delete("/delete/:id",isAuthenticated,deleteApplication)


export default router;