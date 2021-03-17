function Button({ color, onClick, disabled, text }) {
    return (
        <button
            className={"m-2 border-0 " + color}
            style={{boxShadow: "0px 0px 15px black"}}
            onClick={ onClick }
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default Button;