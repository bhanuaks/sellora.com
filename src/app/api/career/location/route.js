import { connectDb } from '../../../../../lib/dbConnect';
import Locations from '../../../../../lib/career/Locations';
import CareerJob from '../../../../../lib/career/CareerJob';

export async function POST(req) {
  try {
    await connectDb();
    
    const data = await req.formData();
    const id = data.get('id')!='undefined' ? data.get('id') : '';
    const name = data.get('name');
    const status = data.get('status');
    
    if(id){
        const data = await Locations.findById(id);
        if (name) data.name = name;
        if (status) data.status = status;
        await data.save();
        return new Response(
            JSON.stringify({ success: true, message: 'Location updated successfully' }),
            { status: 200 }
          );
    }
    const newEntry = await Locations.create({ name, status });
    
    return new Response(
        JSON.stringify({ success: true, message: 'Location Created successfully' }),
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
 
     // Build the query based on the status parameter
     let query = {};
     if (statusFilter === "Active") {
       query.status = "Active";
     }

      // Fetch data based on the query
      const data = await Locations.find(query).sort(statusFilter === "Active" ? { name: 1 } : { createdAt: -1 });


   
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
     
      const data = await Locations.findById(id)
;
      if (!data) {
        return new Response(
          JSON.stringify({ success: false, message: 'Location not found' }),
          { status: 404 }
        );
      } 
      const CareerData = await CareerJob.find({locationId : id});
      if (CareerData) {
        return new Response(
          JSON.stringify({ success: false, message: 'This category already exists for the job.' }),
          { status: 404 }
        );
      }    
  
      await Locations.findByIdAndDelete(id);
  
      return new Response(
        JSON.stringify({ success: true, message: 'Location deleted successfully' }),
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting Location:', error);
      return new Response(
        JSON.stringify({ success: false, message: 'Error deleting Location', error: error.message }),
        { status: 500 }
      );
    }
  }

