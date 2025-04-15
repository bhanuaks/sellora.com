import { connectDb } from '../../../../../../lib/dbConnect';
import ItemHeight from '../../../../../../lib/variant/ItemHeightModel';

export async function POST(req) {
  try {
    await connectDb();
    
    const data = await req.formData();
    const id = data.get('id')!='undefined' ? data.get('id') : '';
    const name = data.get('name');
    const status = data.get('status');
    if(id){
        const data = await ItemHeight.findById(id);
        if (name) data.name = name;
        if (status) data.status = status;
        await data.save();
        return new Response(
            JSON.stringify({ success: true, message: 'Item Height updated successfully' }),
            { status: 200 }
          );
    }
    const newEntry = await ItemHeight.create({ name, status });
    
    return new Response(
        JSON.stringify({ success: true, message: 'Item Height Created successfully' }),
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

    const data = await ItemHeight.find().sort({
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
     
      const data = await ItemHeight.findById(id);
      if (!data) {
        return new Response(
          JSON.stringify({ success: false, message: 'Item Height not found' }),
          { status: 404 }
        );
      }
  
      
  
      await ItemHeight.findByIdAndDelete(id);
  
      return new Response(
        JSON.stringify({ success: true, message: 'Item Height deleted successfully' }),
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting ItemHeight:', error);
      return new Response(
        JSON.stringify({ success: false, message: 'Error deleting Item Height', error: error.message }),
        { status: 500 }
      );
    }
  }