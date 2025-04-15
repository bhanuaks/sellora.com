import { connectDb } from '../../../../../../lib/dbConnect';
import Color from '../../../../../../lib/variant/ColorModel';

export async function POST(req) {
  try {
    await connectDb();
    
    const data = await req.formData();
    const id = data.get('id')!='undefined' ? data.get('id') : '';
    const name = data.get('name');
    const colorMap = data.get('colorMap');
    
    const status = data.get('status');
    if(id){
        const data = await Color.findById(id);
        if (name) data.name = name;
        if (colorMap) data.colorMap = colorMap;
        if (status) data.status = status;
        await data.save();
        return new Response(
            JSON.stringify({ success: true, message: 'Color updated successfully' }),
            { status: 200 }
          );
    }
    const newEntry = await Color.create({ name,colorMap, status });
    
    return new Response(
        JSON.stringify({ success: true, message: 'Color Created successfully' }),
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

    const data = await Color.find().sort({
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
     
      const data = await Color.findById(id);
      if (!data) {
        return new Response(
          JSON.stringify({ success: false, message: 'Color not found' }),
          { status: 404 }
        );
      }
  
      
  
      await Color.findByIdAndDelete(id);
  
      return new Response(
        JSON.stringify({ success: true, message: 'Color deleted successfully' }),
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting Color:', error);
      return new Response(
        JSON.stringify({ success: false, message: 'Error deleting Color', error: error.message }),
        { status: 500 }
      );
    }
  }