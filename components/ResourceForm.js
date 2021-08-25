import {useState} from "react";

const DEFAULT_DATA = {
    title: "",
    description: "",
    link: "",
    priority: "2",
    timeToFinish: "60"
}

const ResourceForm = ({formSubmitCallback, initialFormData}) => {
    const [formData, setFormData] = useState(initialFormData || DEFAULT_DATA);

    const resetForm = () => {
        setFormData(initialFormData || DEFAULT_DATA);
    }

    const changeFormData = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const submitResourceForm =() => {
        formSubmitCallback(formData);
    }

    return (
        <div className="resource-form">
            <h1 className="title">Add New Resource</h1>
            <form>
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input className="input"
                               value={formData.title}
                               onChange={changeFormData}
                               name="title"
                               type="text"
                               placeholder="ie: Lear Next JS and Sanity IO" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                                        <textarea className="textarea"
                                                  value={formData.description}
                                                  onChange={changeFormData}
                                                  name="description"
                                                  placeholder="ie: Learn these technologies because they are very popular and good to know for better SEO"></textarea>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Link</label>
                    <div className="control">
                        <input className="input"
                               value={formData.link}
                               onChange={changeFormData}
                               name="link"
                               type="text"
                               placeholder="ie: http://any.link.com" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Priority</label>
                    <p className="help">Higher number is greater priority</p>
                    <div className="control">
                        <div className="select">
                            <select
                                value={formData.priority}
                                onChange={changeFormData}
                                name="priority"
                            >
                                <option>-- Select Priority --</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Time To Finish</label>
                    <p className="help">Number will be in minutes</p>
                    <div className="control">
                        <input className="input"
                               value={formData.timeToFinish}
                               onChange={changeFormData}
                               name="timeToFinish"
                               type="number"
                               placeholder="ie: 60" />
                    </div>
                </div>
                <div className="field is-grouped resource-form-button-group">
                    <div className="control">
                        <button
                            onClick={submitResourceForm}
                            type="button"
                            className="button is-link">Submit</button>
                    </div>
                    <div className="control">
                        <button
                            onClick={resetForm}
                            type="button"
                            className="button is-link is-light">Reset Form</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ResourceForm;
