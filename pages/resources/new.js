import Layout from "components/Layout";
import ResourceForm from "components/ResourceForm";
import axios from "axios";
import {useRouter} from "next/router";

const ResourceCreate = () => {
    const responseRouter = useRouter();

    const createNewResource = (formData) => {
        axios.post("/api/resources", formData)
            .then((_) => {
                responseRouter.push("/");
            })
            .catch((err) => {
                alert(err?.response?.data);
            })
        /*fetch("/api/resources", {
            body: JSON.stringify(form),
            headers: {"content-type": "application/json"},
            method: "POST"
        })*/
    }

    return (
        <Layout>
            <div className="container">
                <div className="columns">
                    <div className="column is-8 is-offset-2">
                        <ResourceForm
                            formSubmitCallback={createNewResource}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ResourceCreate;
