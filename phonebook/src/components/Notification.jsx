export const Notification = ({feedbackMessage}) => {
    if (feedbackMessage === null) {
        return null
    }

    return (
        <div className={`feedback ${feedbackMessage.type} `}>
            {feedbackMessage.message}
        </div>
    )
}
