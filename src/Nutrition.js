import "./App.css";

function Nutrition ({ label, quantity, unit }) {
    return(
        <div className="label-style">
            <p className="label-text"><b>{label}</b></p>
            <p className="label-text">{quantity.toFixed()} {unit}</p>
        </div>
    )
}

export default Nutrition;