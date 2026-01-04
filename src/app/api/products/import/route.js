  import { dbConnect } from "@/lib/db";
  import Product from "@/models/productSchema";


  export async function POST(request) {
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
      return Response.json({ error: "Invalid Excel format" }, { status: 400 });
    }
    await Product.insertMany(validateProduct);
    return Response.json({success:true})
  }
