import axios from 'axios';

const url =`https://api.cloudinary.com/v1_1/df6hnx3oc/image/upload`

const UploadImage = async(image) =>{

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'IMDB_Movies');
 

    const response  = await axios.post(url, formData);

    console.log("image uploaded", response);
    return response.data.secure_url;
}

export default UploadImage;