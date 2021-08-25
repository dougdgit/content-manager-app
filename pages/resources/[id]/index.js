import Layout from "components/Layout";
import ResourceLabel from "components/ResourceLabel";
import Link from "next/link";
import axios from "axios";
import moment from "moment";

const ResourceById = ({resource}) => {

    const activateResource = () => {
        axios.patch("/api/resources", {...resource, status: "active"})
            .then(_ => location.reload())
            .catch(_ => alert("CANNOT ACTIVATE: Unable to activate Resource!"))
    }

    return (
        <Layout>
            <section className="hero ">
                <div className="hero-body">
                    <div className="container">
                        <section className="section">
                            <div className="columns">
                                <div className="column is-8 is-offset-2">
                                    <div className="content is-medium">
                                        <h2 className="subtitle is-4">{moment(resource.createdAt).format("LLL")}
                                            <ResourceLabel status={resource.status} />
                                        </h2>
                                        <h1 className="title">{resource.title}</h1>
                                        <p>{resource.description}</p>
                                        <p>Time left to finish: {resource.timeToFinish} minutes</p>
                                        { resource.status === "inactive" &&
                                            <>
                                                <Link href={`/resources/${resource.id}/edit`}>
                                                    <a className="button is-warning">Edit</a>
                                                </Link>
                                                <button
                                                    onClick={activateResource}
                                                    className="button is-success ml-2"
                                                >
                                                    Activate</button>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
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

/*ResourceById.getInitialProps = async ({query}) => {
    // backtick quotes ` ` syntax allows variable inside backtick quotes using ${ }
    const fetchData = await fetch(`${process.env.API_URL}/resources/${query.id}`);

    const responseData = await fetchData.json();

    return {
        resource: responseData
    }
}*/

/*export async function getStaticPaths() {

    // backtik quotes ` syntax allows variable inside backtik quotes usin ${ }
    const fetchData = await fetch(`${process.env.API_URL}/resources/`);
    const responseData = await fetchData.json();

    const staticPaths = responseData.map(resource => {
        return {
            params: {id: resource.id}
        }
    });

    return {
        paths: staticPaths,
        // false fallback means other non-existing paths will go to 404 page
        fallback: false
    }
}

export async function getStaticProps({params}) {

    // backtik quotes ` syntax allows variable inside backtik quotes usin ${ }
    const fetchData = await fetch(`${process.env.API_URL}/resources/${params.id}`);
    // standard syntax with double quotes " " + var
    //const fetchData = await fetch("${process.env.API_URL}/resources/" + params.id);

    const responseData = await fetchData.json();

    return {
        props: {
            resource: responseData
        },
        revalidate: 1
    }
}*/

export default ResourceById;
