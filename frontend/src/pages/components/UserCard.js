// function UserCard({ user, onClick }) {
//     const handleClick = () => {
//         onClick(user.token)
//     }

//     return (
//         <div className="userCard card text-center bg-secondary text-dark border-dark align-items-center m-3 p-0 rounded-3" style={{boxShadow: "0px 0px 15px black"}} onClick={ handleClick }>
//             <img className="card-img-top img-fluid" style={{width: "200px"}} src={user.imgURL} alt="Profile" />
//             <div className="card-footer bg-warning w-100">
//                 <span className="card-title">{user.name}</span>
//             </div>
//         </div>
//     )
// }

// export default UserCard;

function UserCard({ user }) {
    return (
        <div className="userCard text-center bg-secondary text-dark border-dark align-items-center m-3 p-0 rounded-3" style={{boxShadow: "0px 0px 15px black"}}>
            <img className="card-img-botton img-fluid" style={{width: "200px"}} src={user.imgURL} alt="Profile" />
            {/*<div className="card-footer bg-warning w-100">
                <span className="card-title">{user.name}</span>
            </div>*/}
        </div>
    )
}

export default UserCard;