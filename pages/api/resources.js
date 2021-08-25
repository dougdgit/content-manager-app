import axios from "axios";

export default async function (request, response) {

    if (request.method === "GET") {
        const fetchData = await fetch(`${process.env.API_URL}/resources`);
        const responseData = await fetchData.json();
        return response.send(responseData);
    }

    if (request.method === "POST" || request.method === "PATCH") {
        const { id, title, description, link, priority, timeToFinish } = request.body;
        if (!title || !description || !link || !priority || !timeToFinish) {
            return response.status(422).send("Some POST Data is missing!");
        }

        const apiPostUrl = request.method === "POST"
            // for 'POST' method to add new resource
            ? `${process.env.API_URL}/resources`
            // for 'PATCH' method to edit existing resource
            : `${process.env.API_URL}/resources/${id}`

        try {
            const postResponse = await axios.[request.method.toLowerCase()](apiPostUrl, request.body);
            return response.send(postResponse.data);
        } catch {
            return response.status(422).send("UPDATE FAILED: Data cannot not be updated");
        }
    }

}
