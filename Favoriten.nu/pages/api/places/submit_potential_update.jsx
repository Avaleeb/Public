import { init, collections } from '../../../lib/db/mongo';

export default async (req, res) => {
  if (req.method === 'POST') {
    await init();
    const insertData = {
      placeID: req.body.place_id,
      email: req.body.email_address,
      gift_card_url: req.body.gift_card_url,
    };

    const { newPotentialUpdate } = collections();

    newPotentialUpdate.insertOne(insertData,
      (err, result) => {
        if (err) {
          res.status(404).json({ err });
        } else {
          res.status(200).json({ result });
        }
      });
  } else {
    res.status(404).json({ err: 'Use Post' });
  }
};
