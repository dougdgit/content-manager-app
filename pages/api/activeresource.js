import axios from "axios";

export default async function activeResource(request, response) {
    const axiosResponse = await axios.get(`${process.env.API_URL}/activeresource`);
    const axiosResponseData = axiosResponse.data;

    return response.send(axiosResponseData);
}
