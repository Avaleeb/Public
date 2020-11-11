import { ObjectId } from 'mongodb';
import { init, collections } from '../../../lib/db/mongo';

export default async (req, res) => {
  await init();
  const { newPotentialPlace } = collections();
  const result = await newPotentialPlace.updateOne(
    {
      // eslint-disable-next-line no-underscore-dangle
      _id: ObjectId(req.body),
    },
    {
      $set: {
        processed: true,
      },
    },
  );
  console.log('Result: Delete');
  console.log(result.count);
  res.status(200).send('ok');
};
