  import { dbConnect } from "@/lib/db";
  import Product from "@/models/productSchema";


  export async function POST(request) {
    try {
      await dbConnect();
      const { product } = await request.json();
      console.log("product in backend", product);

      const validateProduct = product.filter(
        (p) =>
          p.title &&
          p.category &&
          p.subCategory &&
          !isNaN(p.price) &&
          !isNaN(p.stock) &&
          p.image
      );
      console.log(validateProduct);

      if(validateProduct.length === 0){
        return Response.json({ error: "Invalid Excel format", success: false }, { status: 400 });
      }
      
      // Use insertMany with ordered: false to continue inserting even if some documents fail
      const result = await Product.insertMany(validateProduct, { ordered: false });
      return Response.json({success: true, inserted: result.length});
    } catch (error) {
      console.error("Import error:", error);
      
      // Handle duplicate key errors
      if (error.code === 11000) {
        return Response.json({ 
          error: "Some products already exist. Duplicate entries were skipped.", 
          success: false,
          code: 11000 
        }, { status: 400 });
      }
      
      // Handle other errors
      return Response.json({ 
        error: error.message || "Failed to import products", 
        success: false 
      }, { status: 500 });
    }
  }
