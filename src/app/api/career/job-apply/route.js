import { connectDb } from '../../../../../lib/dbConnect';
import ApplyJob from '../../../../../lib/career/ApplyJob';
import CareerJob from '../../../../../lib/career/CareerJob';
import CareerCategory from '../../../../../lib/career/CareerCategory';
import Locations from '../../../../../lib/career/Locations';
import path from "path";
import { writeFile } from "fs/promises";

export async function POST(req) {
  try {
    await connectDb();

    const data = await req.formData();
    const formObject = {};

    for (const [key, value] of data.entries()) {
      formObject[key] = value;
    }
   

    // Handle File Upload (if resume is provided)
    let resumeFileName = "";
    const resumeFile = data.get("uploadResume");

    if (resumeFile && resumeFile.name) {
      // Generate unique filename
      const ext = path.extname(resumeFile.name);
      resumeFileName = `resume_${Date.now()}${ext}`;
      // Define save path
      const filePath = path.join(process.cwd(), "public/uploads/resumes", resumeFileName);

      // Convert file to buffer and save
      const fileBuffer = Buffer.from(await resumeFile.arrayBuffer());
      await writeFile(filePath, fileBuffer);
    }
    
    const jobSlug = formObject.jobSlug;
    console.log("Job Slug:", jobSlug);

    const jobData = await CareerJob.findOne({ slug: jobSlug })
      .populate("categoryId", "name slug")
      .populate("locationId", "name");

    if (!jobData) {
      return new Response(
        JSON.stringify({ success: false, message: "Job not found" }),
        { status: 404 }
      );
    }

    const formData = {
      uploadResume: `uploads/resumes/${resumeFileName}`,
      name: data.get('name') || '',
      email: data.get('email') || '',
      phoneNumber: data.get('phoneNumber') || '',
      totalExperience: data.get('totalExperience') || '',
      gender: data.get('gender') || '',
      currentLocation: data.get('currentLocation') || '',
      qualification: data.get('qualification') || '',
      collegeName: data.get('collegeName') || '',
      yearOfPassing: data.get('yearOfPassing') || '',
      currentIndustry: data.get('currentIndustry') || '',
      currentCompanyName : data.get('currentCompanyName') || '',
      roleAppliedfor: data.get('roleAppliedfor') || '',
      fixedCompensation: data.get('fixedCompensation') || '',
      variableCompensation: data.get('variableCompensation') || '',
      categoryId: jobData.categoryId?._id,
      jobId:      jobData._id,
      userId:     formObject.userId,
    };

    const id = data.get('id') !== 'undefined' && data.get('id') !== null ? data.get('id') : '';

    if (id) {
      const existingEntry = await ApplyJob.findById(id);
      if (!existingEntry) {
        return new Response(
          JSON.stringify({ success: false, message: 'Entry not found' }),
          { status: 404 }
        );
      }

      Object.keys(formData).forEach((key) => {
        if (formData[key]) existingEntry[key] = formData[key];
      });

      await existingEntry.save();

      return new Response(
        JSON.stringify({ success: true, message: 'Job application updated successfully' }),
        { status: 200 }
      );
    }

    const newEntry = await ApplyJob.create(formData);

    return new Response(
      JSON.stringify({ success: true, message: 'Job application created successfully' }),
      { status: 201 }
    );

  } catch (error) {
    console.error('Error in POST request:', error);
    return new Response(
      JSON.stringify({ message: 'Internal Server Error', error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }


}



export async function GET(req) {
  try {
    await connectDb();
    
      // Fetch data based on the query
      const data = await ApplyJob.find().sort({ createdAt: -1 });

    return new Response(
      JSON.stringify({ success: true, data: data }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET request:', error);
    return new Response(
      JSON.stringify({ message: 'Internal Server Error', error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}