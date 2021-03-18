function ClientCard({ client }) {
    return (
        <div className="clientCard text-center bg-secondary text-dark border-dark align-items-center m-3 p-0 rounded-3" style={{boxShadow: "0px 0px 15px black"}}>
            <img className="card-img-botton img-fluid" style={{width: "200px"}} src={client.imgURL} alt="Profile" />
        </div>
    )
}

export default ClientCard;