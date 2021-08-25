import Link from "next/link";
import moment from "moment";
import ResourceLabel from "components/ResourceLabel";

const ResourceHighlight = ({resourceProps}) => {

    return (
        <section className="hero ">
            <div className="hero-body">
                <div className="container">
                {resourceProps.map (resource => {
                    return(
                        <section key={resource.id} className="section">
                            <div className="columns">
                                <div className="column is-8 is-offset-2">
                                    <div className="content is-medium">
                                        <h2 className="subtitle is-4">{moment(resource.createdAt).format("LLL")}
                                            <ResourceLabel status={resource.status} />
                                        </h2>
                                        <h1 className="title">{resource.title}</h1>
                                        <p>{resource.description}</p>
                                        <Link href={`/resources/${resource.id}`}>
                                            <a className="button is-small is-info is-outlined">Learn More...</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )})
                }
                </div>
            </div>
        </section>
    )
}

export default ResourceHighlight;