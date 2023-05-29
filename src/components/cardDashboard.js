import React from "react";
import '../styles/dashboard.css'

const CardDasboard = (props) => {
    const { amount, bgColor, title, icons } = props
    return (
        <div className="card card1 mt-5 mb-5 col-4">
            <div className="card-body" style={{ backgroundColor: `${bgColor}`, display: 'flex' }}>
                <div className="textRight col-8">
                    <p className='size24700'>{amount}</p>
                    <p className='size16500'>{title}</p>
                </div>
                <div className="textLeft col-4">
                    {icons}
                </div>
            </div>
        </div>
    )
}

export default CardDasboard;