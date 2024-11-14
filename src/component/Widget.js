import React, { useState } from 'react';
import './widget.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Widget({data}) {
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const handleLinkClick = (data) => {
        setModalContent(data);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <div className='widget'>
            <div className='left'>
                <span className='title'>{data?.symbol}</span>
                <span className='counter'>
                    ฿ 
                    {data?.last}
                </span>
                <span className='link' onClick={() => handleLinkClick(data)}>
                    {data.symbol}
                </span>
            </div>
            <div className='right'>
                <div className={`percentage ${data?.change > 0 ? 'positive' : 'negative'}`}>
                    {data?.change > 0 ? (
                        <KeyboardArrowUpIcon />
                    ) : (
                        <KeyboardArrowDownIcon />
                    )}
                    {data?.change} 
                </div>
            </div>

            {openModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{modalContent.symbol}</h2>
                        <p>
                        <strong>Symbol:</strong> {modalContent.symbol} <br />
                        <strong>High:</strong> {modalContent.high} <br />
                        <strong>Low:</strong> {modalContent.low} <br />
                        <strong>Last:</strong> {modalContent.last} <br />
                        <strong>Total Volume:</strong> {modalContent.total_volume.toLocaleString('th-TH')} <br />
                        <strong>PO Price:</strong> {modalContent.projected_open_price} <br />
                        <strong>Change:</strong> {modalContent.change} <br />
                        <strong>Total Value:</strong> {modalContent.total_value.toLocaleString('th-TH')} <br />
                        <strong>Market Status:</strong> {modalContent.market_status} <br />
                        </p>
                        <br/>
                        <button className="close-btn" onClick={handleCloseModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Widget;