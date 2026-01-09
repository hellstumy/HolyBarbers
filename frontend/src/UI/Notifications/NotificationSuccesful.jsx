import succes from "../../assets/icons/succes.svg";
export default function NotificationSuccesful({ message }) {
    return (
        <div className='notification noti-successful'>
            <img src={succes} alt="Success" />
            <div >
                <h3>Success</h3>
                <p>{message}</p>
            </div>
        </div>
    );
}