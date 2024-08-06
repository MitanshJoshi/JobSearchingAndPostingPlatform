import cron from "node-cron";
import { Job } from "../models/jobSchema.js";
import { User } from "../models/userSchema.js";
import { sendEmail } from "../utils/snedEmail.js";

export const newsLetterCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    const jobs = await Job.find({ newsLettersSent: false });
    for (const job of jobs) {
      try {
        const filteredUsers = await User.find({
          $or: [
            { "niches.firstNiche": job.jobNiche },
            { "niches.secondNiche": job.jobNiche },
            { "niches.thirdNiche": job.jobNiche },
          ],
        });

        for (const user of filteredUsers) {
          const subject = "Exciting New Job Opportunity Just For You!";
          const message = `
Hello ${user.name},

We’re thrilled to let you know that a new job opportunity has just become available that matches your profile!

Here are the details:
- **Job Title:** ${job.title}
- **Company:** ${job.companyName}
- **Location:** ${job.location}
- **Requirement:** ${job.jobNiche}

Don’t miss out on this chance to advance your career. Click [here] to apply now or visit our website for more information.

Best regards,
Jobify Team
`;

          sendEmail({
            email: user.email,
            subject,
            message,
          });
        }
        job.newsLettersSent=true;
        await job.save();
      } catch (error) {}
    }
  });
};
