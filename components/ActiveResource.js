import Link from "next/link";
import {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";

const ActiveResource = () => {
    const [activeResource, setActiveResource] = useState({});
    const [seconds, setSeconds] = useState();

    useEffect( () => {
        async function fetchActiveResource() {
            const axiosResponse = await axios.get("/api/activeresource");
            const axiosResponseData = axiosResponse.data;
            const timeToFinish = parseInt(axiosResponseData.timeToFinish, 10);
            const elapsedTime = moment().diff(moment(axiosResponseData.activationTime), "seconds");
            const updatedTimeToFinish = (timeToFinish * 60) - elapsedTime;
            if (updatedTimeToFinish >= 0) {
                axiosResponseData.timeToFinish = updatedTimeToFinish;
                setSeconds(updatedTimeToFinish);
            }

            setActiveResource(axiosResponseData);
        }
        fetchActiveResource();
    }, [])

    useEffect(() => {
        const countDown = setInterval(() => {
            setSeconds(seconds - 1);
        }, 1000)
        if (seconds < 0) {
            clearInterval(countDown);
        }
        return () => {clearInterval(countDown)}
    }, [seconds])

    const completeResource = () => {
        axios.patch("/api/resources", {...activeResource, status: "complete"})
            .then(_ => location.reload())
            .catch(_ => alert("CANNOT COMPLETE: Update attempt failed!"))
    }

    const hasResource = activeResource && activeResource.id;
    return (
        <div className="active-resource">
            <h1 className="resource-title">
                {hasResource ? activeResource.title : "No Active Resource"}
            </h1>
            <div className="time-wrapper">
                { hasResource &&
                    ( seconds > 0 ?
                        <h2 className="elapsed-time">
                            {seconds}
                        </h2> :
                        <h2 className="elapsed-time">
                            <button
                                onClick={completeResource}
                                className="button is-success">
                                Click and Done!
                            </button>
                        </h2>
                    )
                }
            </div>
            { hasResource ?
                <Link href={`/resources/${activeResource.id}`}>
                    <a className="button">Go To Resource</a>
                </Link> :
                <Link href="/">
                    &nbsp;
                </Link>
            }
        </div>
    )
}

export  default ActiveResource;
