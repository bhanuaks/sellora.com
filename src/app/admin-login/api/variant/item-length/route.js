import { connectDb } from '../../../../../../lib/dbConnect';
import ItemLength from '../../../../../../lib/variant/ItemLengthModel';

export async function POST(req) {
  try {
    await connectDb();
    
    const data = await req.formData();
    const id = data.get('id')!='undefined' ? data.get('id') : '';
    const name = data.get('name');
    const status = data.get('status');
    if(id){
        const data = await ItemLength.findById(id);
        if (name) data.name = name;
        if (status) data.status = status;
        await data.save();
        return new Response(
            JSON.stringify({ success: true, message: 'Item Length updated successfully' }),
            { status: 200 }
          );
    }
    const newEntry = await ItemLength.create({ name, status });
    
    return new Response(
        JSON.stringify({ success: true, message: 'Item Length Created successfully' }),
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

    const data = await ItemLength.find().sort({
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
     
      const data = await ItemLength.findById(id);
      if (!data) {
        return new Response(
          JSON.stringify({ success: false, message: 'Item Length not found' }),
          { status: 404 }
        );
      }
  
      
  
      await ItemLength.findByIdAndDelete(id);
  
      return new Response(
        JSON.stringify({ success: true, message: 'Item Length deleted successfully' }),
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting ItemLength:', error);
      return new Response(
        JSON.stringify({ success: false, message: 'Error deleting Item Length', error: error.message }),
        { status: 500 }
      );
    }
  }