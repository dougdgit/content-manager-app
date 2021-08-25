import Layout from "components/Layout";
import ResourceForm from "components/ResourceForm";
import axios from "axios";

const ResourceEdit = ({resource}) => {

    const updateResource = (formData) => {
        axios.patch("/api/resources", formData)
            .then((_) => {
                alert("Data has been updated successfully!");
            })
            .catch((err) => {
                alert(err?.response?.data);
            })
    }

    return (
        <Layout>
            <div className="container">
                <div className="columns">
                    <div className="column is-8 is-offset-2">
                        <ResourceForm
                            formSubmitCallback={updateResource}
                            initialFormData={resource}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({params}) {

    // backtick quotes ` ` syntax allows variables inserted within backtick quotes using ${ }
    const fetchData = await fetch(`${process.env.API_URL}/resources/${params.id}`);

    const responseData = await fetchData.json();

    return {
        props: {
            resource: responseData
        }
    }
}

export default ResourceEdit;
