import { init, collections } from '../../../lib/db/mongo';

export default async (req, res) => {
  if (req.method === 'POST') {
    await init();
    const insertData = {
      google_data: {
        description: req.body.place_details.description,
        id: req.body.place_details.id,
        place_id: req.body.place_details.place_id,
        formatted: req.body.place_details.structured_formatting,
        types: req.body.place_details.types,
      },
      email: req.body.email,
      gift_card_url: req.body.gift_card_url,
      love_message: req.body.love_message,
    };

    const { newPotentialPlace } = collections();

    newPotentialPlace.insertOne(insertData,
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
