import Layout from "components/Layout";
import ResourceHighlight from "components/ResourceHighlight";
import Newsletter from "components/Newsletter";
import ResourceList from "components/ResourceList";

// CORS -- Cross Origins Resource Sharing -- (this you must avoid doing)

function Home({resources}) {

    return (
        <Layout>
            <ResourceHighlight
                resourceProps = {resources.slice(0,2)}
            />
            <Newsletter />
            <ResourceList
                resourceProps = {resources.slice(2)}
            />
        </Layout>
    )
}

// is called everytime you visit the page
// function is executed on the server
export async function getServerSideProps() {
    const fetchData = await fetch(`${process.env.API_URL}/resources`);
    const responseData = await fetchData.json();

    return {
        props: {
            resources: responseData
        }
    }
}

// is called at the build time
// function is only executed once
/*export async function getStaticProps() {
    //const fetchData = await fetch("http://localhost:3000/api/resources");
    //const responseData = await fetchData.json();

    console.log("Calling getStaticProps");

    return {
        props: {
            resources: data
        }
    }
}*/

export default Home;
