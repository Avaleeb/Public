import {NextApiRequest, NextApiResponse} from 'next';
import { collections, init } from '../../../lib/db/mongo';

type Place = {
    emailContact: string
    placeID: string,
    giftCardURL: string,
    name: string,
    city: string,
    address: string,
}

export default async (req: NextApiRequest, res: NextApiResponse<Place[]>) => {
    await init();
    const {placeCollection} = collections();

    const placeData = (await ( await placeCollection.find({})
        .map((p: any) =>  ({
            name: p.google_data.formatted.main_text,
            giftCardURL: p.gift_card_url,
            emailContact: p.email,
            formatted_address: p.google_details.result.formatted_address,
            location: p.google_details.result.geometry.location,
            areaToMatchNeighborhood: p.google_details.result.adr_address.match('(?<=\"locality">)(.*?)(?=\</)')[0],
            key: p._id,
        }))).toArray());

    const data = placeData;
    res.status(200).json(data);
}