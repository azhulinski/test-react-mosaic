import "../css/app.css";
// @ts-ignore
export default (props) => {
    const _ = require('lodash');

    const fullCompanyInfo = !_.isEmpty(props.data) && props.data.length !== 0 ?
        props.data.find((company: { id: any }) => company.id === props.company)
        : {}

    const toUpperCase = (element: string) => {
        return  element.charAt(0).toUpperCase() + element.slice(1);
    }

    return (
        fullCompanyInfo && Object.keys(fullCompanyInfo).length !== 0
            ? <div>
                {Object.keys(fullCompanyInfo).map(key => (
                    <div key={key}>
                        <span className="text-xs inline">
                            <strong>{toUpperCase(key.replace("_", " "))}</strong> : {fullCompanyInfo[key]}
                        <p/>
                        </span>
                    </div>

                ))}
            </div>
            : <div/>
    )
}