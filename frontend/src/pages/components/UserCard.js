function UserCard({ user, onClick }) {
    return (
        <div className="userCard">
            <span>{user.name}</span>
        </div>
    )
}

export default UserCard;