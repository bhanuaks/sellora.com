import { connectDb } from '../../../../../../lib/dbConnect';
import Size from '../../../../../../lib/variant/SizeModel';

export async function POST(req) {
  try {
    await connectDb();
    
    const data = await req.formData();
    const id = data.get('id')!='undefined' ? data.get('id') : '';
    const name = data.get('name');
    const status = data.get('status');
    if(id){
        const data = await Size.findById(id);
        if (name) data.name = name;
        if (status) data.status = status;
        await data.save();
        return new Response(
            JSON.stringify({ success: true, message: 'SIze updated successfully' }),
            { status: 200 }
          );
    }
    const newEntry = await Size.create({ name, status });
    
    return new Response(
        JSON.stringify({ success: true, message: 'Size Created successfully' }),
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

    const data = await Size.find().sort({
      createdAt:-1
    });
   
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
     
      const data = await Size.findById(id);
      if (!data) {
        return new Response(
          JSON.stringify({ success: false, message: 'Size not found' }),
          { status: 404 }
        );
      }
  
      
  
      await Size.findByIdAndDelete(id);
  
      return new Response(
        JSON.stringify({ success: true, message: 'Size deleted successfully' }),
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting size:', error);
      return new Response(
        JSON.stringify({ success: false, message: 'Error deleting size', error: error.message }),
        { status: 500 }
      );
    }
  }