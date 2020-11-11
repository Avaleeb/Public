import {NextApiRequest, NextApiResponse} from 'next';
import { collections, init } from '../../../../lib/db/mongo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const {placeID} = req.query;
        const {emailContact, giftCardURL} = req.body;

        console.log(placeID, emailContact, giftCardURL);

        await init();
        const {placeCollection} = collections();

        const update = await placeCollection.update({_id: placeID}, {
            $set: {
                gift_card_url: giftCardURL,
                email: emailContact
            }
        });


        res.status(200).json(update.result);
    }
}