// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../../utils/database_connection";
const Community = require("../../../../models/communities.model");
import communityType from "../../../../types/Communities";
//Function that checks If University Exists and returns an Array Of Communities
async function checkIfUniversityExists(req: NextApiRequest) {
  const communityExists = await Community.find({
    university_id: req.body.university,
  });
  return communityExists;
}
//Function that checks for duplication of Communities and returns boolean
async function checkIfDuplicateExists(req: NextApiRequest) {
  const universityCommunities = await checkIfUniversityExists(req);
  const { Communities } = universityCommunities[0];
  let duplicateExists = false;

  const filteredData = Communities.map((community: any) => {
    const {
      university,
      community_category,
      community_description,
      community_name,
    } = community;
    return {
      community_category,
      community_description,
      community_name,
      university,
    };
  });
  filteredData.map((com: communityType) => {
    if (
      com.community_name === req.body.community_name &&
      com.university === req.body.university &&
      com.community_category === req.body.community_category
    ) {
      duplicateExists = true;
      return true;
    }
    duplicateExists = false;
  });
  return duplicateExists;
}
export default async function addCommunityHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    university,
    community_category,
    community_description,
    community_name,
  } = req.body;
  const containsUpperCase = /[A-Z]/;
  if (
    containsUpperCase.test(university) ||
    containsUpperCase.test(community_category) ||
    containsUpperCase.test(community_name)
  ) {
    
  
   // const university:string = university.toLowerCase()
    
  }
  try {
    await connectMongo()
      .then(() => {
        console.log("Connected to database");
      })
      .catch((error) => {
        console.log("Cannot connect to database" + error);
      });

    const communityExists = await checkIfUniversityExists(req);
    /* This block of code uses result from `checkIfUniversityExists` Function To create a new Community under a University if not Found */
    if (communityExists.length === 0) {
      const newCommunity = new Community({
        university_id: req.body.university,
        Communities: [
          {
            community_name: req.body.community_name,
            community_description: req.body.community_description,
            community_category: req.body.community_category,
            university: req.body.university,
          },
        ],
      });
      const dataCommunity = await newCommunity.save(); // This line save news community to the database
      console.log(dataCommunity);
      return res.json({
        Success: true,
        message: `${req.body.university} SuccessFully Created`,
      });
      /* If University is found this block of code uses results from the `checkIfDuplicateExists` function to check for duplication of communities under a University and returns a response to user if true if false adds the community to the Arrays of Community Objects and returns a response to the user  */
    } else {
      const isDuplicate = await checkIfDuplicateExists(req);
      console.log(isDuplicate + "from else block");
      if (isDuplicate) {
        return res.json({
          Success: false,
          message: `${req.body.community_name} Community Is Already Listed In ${req.body.university}`,
        });
      }
      const data = {
        community_name: req.body.community_name.toLowerCase() as string,
        community_description: req.body.community_description as string,
        community_category: req.body.community_category as string,
        university: req.body.university as string,
      };
      //This block of code determines the university name  updates the communities array and saves it
      await Community.findOneAndUpdate(
        { university_id: req.body.university },
        { $addToSet: { Communities: data } },
        { new: true }
      );

      //This block of code returns a response to the user
      res.json({
        Success: true,
        message: `Community Created Succesfully`,
      });
    }
    //This block of code catches error if connection to database could not be made
  } catch (error) {
    console.log(error);
  }
}
