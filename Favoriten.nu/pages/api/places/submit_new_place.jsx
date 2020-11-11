import { ObjectId } from 'mongodb';
import axios from 'axios';
import addDataFromHitta from '../../../lib/utils/hittaApi';
import { init, collections } from '../../../lib/db/mongo';

export default async (req, res) => {
  await init();
  const currentData = JSON.parse(req.body);
  const { placeCollection } = collections();
  const { newPotentialPlace } = collections();

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${currentData.google_data.place_id}&key=${process.env.GoogleAPIKey}`;
  const googleDetails = await (await axios.get(url)).data;
  currentData.google_details = googleDetails;

  const hittaData = await addDataFromHitta({
    name: currentData.google_data.formatted.main_text,
    where: currentData.google_data.formatted.main_text.split(','),
  });

  if (hittaData.result.companies.company) {
    [currentData.hitta_data] = hittaData.result.companies.company;
  }

  const insertResult = await placeCollection.insertOne(currentData);
  const result = await newPotentialPlace.updateOne(
    {
      // eslint-disable-next-line no-underscore-dangle
      _id: ObjectId(currentData._id),
    },
    {
      $set: {
        processed: true,
      },
    },
  );

  console.log(insertResult.insertedCount);
  console.log(result.modifiedCount);
  res.status(200).send('ok');
};
