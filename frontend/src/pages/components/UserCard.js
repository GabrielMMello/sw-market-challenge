function UserCard({ user, onClick }) {
    const handleClick = () => {
        onClick(user.token)
    }

    return (
        <div className="userCard" onClick={ handleClick }>
            <span>{user.name}</span>
        </div>
    )
}

export default UserCard;