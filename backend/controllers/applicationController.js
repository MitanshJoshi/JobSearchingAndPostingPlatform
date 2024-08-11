import {catchAsyncError} from "../middlewares/catchAsyncErrors.js"

import ErrorHandler from "../middlewares/error.js"

import { Application } from "../models/applicationSchema.js"

import { v2 as cloudinary } from "cloudinary";

import { Job } from "../models/jobSchema.js"

import app from "../app.js";

export const postApplication = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { name, email, phone, address, coverLetter } = req.body;
    
    if (!name || !email || !phone || !address || !coverLetter) {
        return next(new ErrorHandler("All fields are required.", 400));
    }

    const jobSeekerInfo = {
        id: req.user._id,
        name,
        email,
        phone,
        address,
        coverLetter,
        role: "Job Seeker"
    };

    const jobDetails = await Job.findById(id);

    if (!jobDetails) {
        return next(new ErrorHandler("Job not found", 400));
    }

    const isApplied = await Application.findOne({
        "jobInfo.jobId": id,
        "jobSeekerInfo.id": req.user._id
    });

    if (isApplied) {
        return next(new ErrorHandler("Already Applied!", 400));
    }

    if (req.files && req.files.resume) {
        const { resume } = req.files;
        try {
            const cloudinaryResponse = await cloudinary.uploader.upload(
                resume.tempFilePath,
                {
                    folder: "Job_Seekers_Resume",
                }
            );
            if (!cloudinaryResponse || cloudinaryResponse.error) {
                return next(
                    new ErrorHandler("Failed to upload resume to cloudinary.", 500)
                );
            }
            jobSeekerInfo.resume = {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            };
        } catch (error) {
            return next(new ErrorHandler("Failed to upload resume", 500));
        }
    } else {
        if (req.user && !req.user.resume.url) {
            return next(new ErrorHandler("Please upload your resume.", 400));
        }
        jobSeekerInfo.resume = {
            public_id: req.user && req.user.resume.public_id,
            url: req.user && req.user.resume.url,
        };
    }

    const employerInfo = {
        id: jobDetails.postedBy,
        role: "Employer",
    };

    const jobInfo = {
        jobId: id,
        jobTitle: jobDetails.title,
    };

    const application = await Application.create({
        jobSeekerInfo,
        employerInfo,
        jobInfo
    });

    res.status(201).json({
        success: true,
        message: "Application Created",
        application
    });
});

export const employerGetAllApplications =catchAsyncError(async(req,res,next)=>{

    const id = req.user.id;

    const applications = await Application.find({
         "employerInfo.id": id,
         "deletedBy.employer":false
        });

    res.status(200).json({
        success:true,
        applications,
        Count:applications.length
    })

})

export const jobSeekerGetAllApplications =catchAsyncError(async(req,res,next)=>{
    const id = req.user.id;

    const applications = await Application.find({
         "jobSeekerInfo.id": id,
         "deletedBy.jobSeeker":false
        });

    res.status(200).json({
        success:true,
        applications,
        Count:applications.length
    })
})

export const deleteApplication =catchAsyncError(async(req,res,next)=>{
    const {id} = req.params;

    const application = await Application.findById(id);

    if(!application)
    {
        return next(new ErrorHandler("application does not exist",400))
    }

    const {role} = req.user;
    console.log(req.user.id);
    console.log(application.jobSeekerInfo.id);
    

    switch (role) {
        case "Employer":
            if(application.employerInfo.id.toString() === req.user.id)
                {
                    application.deletedBy.employer=true;
                }
                else
                {
                    return next(new ErrorHandler("You cannot delete this application",400))
                }
            await application.save();
            break;
        case "Job Seeker":
            if(application.jobSeekerInfo.id.toString() === req.user.id)
            {
                application.deletedBy.jobSeeker=true;
            }
            else
            {
                return next(new ErrorHandler("You cannot delete this application",400))
            }
            await application.save();
            break;
    
        default:
            break;
    }

    if(application.deletedBy.jobSeeker===true && application.deletedBy.employer===true)
    {
        await application.deleteOne();
    }

    res.status(200).json({
        success:true,
        message:"Application deleted successfully"
    })
})