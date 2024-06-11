export default function Comment({name, title}){
    return(
        <div className="alert alert-light d-flex align-items-center">
            <img className="p-1" style={{width: '100px', marginRight: '1rem'}} src="images/person.svg" alt="" />
            <div style={{width: '100%'}} className="p-2 content d-flex flex-column justify-content-center">
                <div style={{width: '100%'}} className="cont_txt d-flex justify-content-between">
                    <span className="fs-3">{name}</span>
                    <span className="fs-6">24.06.11</span>
                </div>
            <p className="pt-2">{title}</p>
            </div>
        </div>
    )
}