"use server";

import { auth } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import Query from "@/models/queryModel";

export const askQuery = async (prevState, formData) => {
  try {
    const query = formData.get("query");

    if (!query || query.trim().length === 0) {
      return {
        success: false,
        message: "Please ask a query",
      };
    }

    await dbConnect();
    const session = await auth();
    console.log(session);
    const userid = session?.user?.id;

    if (!userid) {
      return {
        success: false,
        message: "Please sign in to ask a question",
      };
    }

    console.log("query", query);

    const newQuery = await Query.create({
      user: userid,
      query: query,
    });

    return {
      success: true,
      data: JSON.stringify(newQuery),
      message: "Query sent successfully",
    };
  } catch (error) {
    console.error("Error creating query:", error);
    return {
      success: false,
      message: "Failed to send query. Please try again.",
    };
  }
};

export const getQuery = async () => {
  try {
    await dbConnect();
    const AllQuery = await Query.find({}).populate("user", "username email");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(AllQuery)),
    };
  } catch (error) {
    console.error("Error fetching queries:", error);
    return {
      success: false,
      data: [],
      message: "Failed to fetch queries",
    };
  }
};

export const ResponseQuery = async (PrevState, formData) => {
  try {
    await dbConnect();
    const authResult = await auth();
    const user = authResult?.user;
    const query = formData.get("query");
    const queryId = formData.get("queryId");

    console.log("session in res", user);
    console.log(query, queryId);
    if (!user || user.role != "admin") {
      return {
        success: false,
        message: "only Admin can Response",
      };
    }
    const QueryDetails = await Query.findOne({ _id: queryId });
    if (!QueryDetails) {
      return {
        success: false,
        message: "query not found",
      };
    }
    const updateQuery = await Query.findByIdAndUpdate(
      queryId,
      { response: query, status: "answered" },
      { new: true }
    );
    return {
      success: true,
      data: JSON.parse(JSON.stringify(updateQuery)),
      message: "Response sent successfully",
    };
  } catch (err) {
    console.log(err);
  }
};

export const DeleteQuery = async(id)=>{
  try{
    const deletedQuery = await Query.findByIdAndDelete(id);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(deletedQuery)),
      message: "Query deleted successfully",
    };
  }catch(err){
    console.log(err);
  }
}
