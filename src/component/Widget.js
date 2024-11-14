import React, { useState } from 'react';
import './widget.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function Widget({data}) {
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState('');


    console.log("data =>" , data)

    // let data;

    // Temporary data (mock)
    // switch(type){


    //     case 'total':
    //         data = {
    //             title: 'Total Profit',
    //             isMoney: true,
    //             amount: '6,801.19',
    //             percentage: '15.81',
    //             link: 'View All Total',
    //         };
    //         break;
    //     case 'average':
    //         data = {
    //             title: 'Average',
    //             isMoney: true,
    //             amount: '523',
    //             percentage: '1.34',
    //             link: 'View All AVG',
    //         };
    //         break;
    //     case 'best':
    //         data = {
    //             title: 'Best Profit',
    //             isMoney: true,
    //             amount: '2,090,789',
    //             percentage: '0.18',
    //             link: 'BTC(Bitcoin)',
    //         };
    //         break;
    //     case 'ptt':
    //         data = {
    //             title: 'PTT',
    //             isMoney: true,
    //             amount: '33.25',
    //             percentage: '0.12',
    //             link: 'View All PTT',
    //         };
    //         break;
    //     case 'scg':
    //         data = {
    //             title: 'SCG',
    //             isMoney: true,
    //             amount: '3.68',
    //             percentage: '0.55',
    //             link: 'View All SCG',
    //         };
    //         break;
    //     case 'bitkub':
    //         data = {
    //             title: 'BITKUB',
    //             isMoney: true,
    //             amount: '60.10',
    //             percentage: '0.17',
    //             link: 'View All BITKUB',
    //         };
    //         break;
    //     case 'xlm':
    //         data = {
    //             title: 'XLM',
    //             isMoney: true,
    //             amount: '3.17',
    //             percentage: '-0.31',
    //             link: 'Stellar',
    //         };
    //         break;
    //     case 'btc':
    //         data = {
    //             title: 'BTC',
    //             isMoney: true,
    //             amount: '2,090,789',
    //             percentage: '0.18',
    //             link: 'Bitcoin',
    //         };
    //         break;
    //     default:
    //         break;
    // }

    const handleLinkClick = (link) => {
        setModalContent(link);
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
                {/* <span className='link' onClick={() => handleLinkClick(data.link)}>
                    {data.link}
                </span> */}
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
                        <h2>{modalContent}</h2>
                        <p>You clicked on the link:{modalContent}</p>
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