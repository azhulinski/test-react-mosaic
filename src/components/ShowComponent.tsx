import "../css/app.css";
// @ts-ignore
export default (props) => {

    const _ = require('lodash');
    let fullCompanyInfo = {}

    try {
        fullCompanyInfo = props.data.find((company: { id: any }) => company.id === props.company)
    } catch (e) {
        console.log("ShowComponent received an empty object")
    }

    const toUpperCase = (element: string) => {
        return element.charAt(0).toUpperCase() + element.slice(1);
    }

    return (
        fullCompanyInfo && Object.keys(fullCompanyInfo).length !== 0
            ? <div>
                {Object.keys(fullCompanyInfo).map(key => {
                    // @ts-ignore
                    const info: string = fullCompanyInfo[key]
                    return <div key={key}>
                        <span className="text-xs inline">
                            <strong>{toUpperCase(key.replace("_", " "))}</strong> : {info}
                            <p/>
                        </span>
                    </div>
                })}
            </div>
            : <div/>
    )
}
