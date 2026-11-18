
import './Button.scss';

function Button({ onClick }) {
    return (
        <button className="vintage-button" onClick={onClick}>
            <span className="button-star">✦</span>
            RISERVA IL TUO POSTO
            <span className="button-star">✦</span>
        </button>
    );
}

export default Button;
