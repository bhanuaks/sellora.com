import { connectDb } from '../../../../../lib/dbConnect';
import CareerJob from '../../../../../lib/career/CareerJob';
import CareerCategory from '../../../../../lib/career/CareerCategory';
import Locations from '../../../../../lib/career/Locations';

export async function POST(req) {
  try {
    await connectDb();
    
    const data = await req.formData();
    const id = data.get('id')!='null' ? data.get('id') : '';
   
    const categoryId = data.get('categoryId');
    const locationId = data.get('locationId');
    const jobTitle = data.get('jobTitle');
    const slug = slugify(data.get('jobTitle'));
    const jobDescription = data.get('jobDescription');
    const skills = data.get('skills');
    const jobRole = data.get('jobRole');
    const location = data.get('location');
    const aboutTheRole = data.get('aboutTheRole');
    const aboutTheTeam = data.get('aboutTheTeam');
    const toSucceedInThisRole = data.get('toSucceedInThisRole');
    const whyWorkWithUs = data.get('whyWorkWithUs');
    const status = data.get('status');
    
    if(id){
        const data = await CareerJob.findById(id);
        if (categoryId) data.categoryId    = categoryId;
        if (locationId) data.locationId    = locationId;
        if (jobTitle) data.jobTitle      = jobTitle;
        if (slug) data.slug      = slug;
        if (jobDescription) data.jobDescription = jobDescription;
        if (skills) data.skills = skills;
        if (jobRole) data.jobRole = jobRole;
        if (location) data.location = location;
        if (aboutTheRole) data.aboutTheRole = aboutTheRole;
        if (aboutTheTeam) data.aboutTheTeam = aboutTheTeam;
        if (toSucceedInThisRole) data.toSucceedInThisRole = toSucceedInThisRole;
        if (whyWorkWithUs) data.whyWorkWithUs = whyWorkWithUs;
        if (status) data.status = status;

        await data.save();
        return new Response(
            JSON.stringify({ success: true, message: 'Job updated successfully' }),
            { status: 200 }
          );
    }
    const newEntry = await CareerJob.create({
                    categoryId,
                    locationId,
                    jobTitle,
                    slug,
                    jobDescription,
                    skills,
                    jobRole,
                    location,
                    aboutTheRole,
                    aboutTheTeam,
                    toSucceedInThisRole,
                    whyWorkWithUs,
                    status
            });
    
    return new Response(
        JSON.stringify({ success: true, message: 'Job Created successfully' }),
        { status: 200 }
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
    // Extract query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get("status");

    const categorySlug = searchParams.get("categorySlug");
    const jobSlug     = searchParams.get("productSlug");
    const jobTitle     = searchParams.get("jobTitle");
    const location     = searchParams.get("location");
    const categoryF     = searchParams.get("categoryF");

    // Build the query based on the status parameter
    let query = {};
    if (statusFilter === "Active") {
      query.status = "Active";
    }
    if (categorySlug && jobSlug) {
      query.slug = jobSlug;
      const category = await CareerCategory.findOne({ slug: categorySlug }).select("_id");
      if (category) {
        query.categoryId = category._id;
      }

    }
    
    

    if(location){
      query.locationId = location;
    }
    if(jobTitle){
      query.jobTitle = { $regex: jobTitle, $options: "i" };
    }
    if(categoryF){
      const category = await CareerCategory.findOne({ slug: categoryF }).select("_id");
      if (category) {
        query.categoryId = category._id;
      }
    }

     // Fetch data based on the query
     const data = await CareerJob.find(query)
                  .populate("categoryId", "name slug")
                  .populate("locationId", "name") 
                  .sort( { createdAt: -1 });

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


 export async function DELETE(req) {

  const {id} = await req.json()

    try {
     
      const data = await CareerJob.findById(id);
      if (!data) {
        return new Response(
          JSON.stringify({ success: false, message: 'Job not found' }),
          { status: 404 }
        );
      }
  
      
  
      await CareerJob.findByIdAndDelete(id);
  
      return new Response(
        JSON.stringify({ success: true, message: 'Job  deleted successfully' }),
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting Job:', error);
      return new Response(
        JSON.stringify({ success: false, message: 'Error deleting Job', error: error.message }),
        { status: 500 }
      );
    }
  }

  const slugify = (text) => {
    return text
        .toLowerCase() // Convert to lowercase
        .trim() // Remove whitespace from both ends
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Remove multiple hyphens
};