import GoogleImages from 'google-images'
import {APP_K} from "../constants";

export const fetchImageFromGoogle = (imageName) => {
    const client = new GoogleImages(APP_K.CSE, APP_K.A_K);
    return client.search(imageName, {
        size: 'small',
        type: 'face',
        safe: 'high'
    })
};
