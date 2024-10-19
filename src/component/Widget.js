import React from 'react'
import './widget.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


function Widget({type}) {
    let data;

    //temporary
    /* const amount = 100
    const diff = 20 */

    switch(type){
        case 'total':
            data = {
                title: 'Total Profit',
                isMoney: true,
                amount : '6,801.19',
                percentage: '15.81',
                link: 'View All Total',
            };
            break;

            case 'average':
            data = {
                title: 'Average',
                isMoney: true,
                amount : '523',
                percentage: '1.34',
                link: 'View All AVG',
            };
            break;

            case 'best':
            data = {
                title: 'Best Profit',
                isMoney: true,
                amount : '2,090,789',
                percentage: '0.18',
                link: 'BTC(Bitcoin)',
            };
            break;

        case 'ptt':
            data = {
                title: 'PTT',
                isMoney: true,
                amount : '33.25',
                percentage: '0.12',
                link: 'View All PTT',
            };
            break;          
        
        case 'scg':
            data = {
                title: 'SCG',
                isMoney: true,
                amount : '3.68',
                percentage: '0.55',
                link: 'View All SCG',
            };
            break; 

        case 'bitkub':
            data = {
                title: 'BITKUB',
                isMoney: true,
                amount : '60.10',
                percentage: '0.17',
                link: 'View All BITKUB',
            };
            break; 

            case 'xlm':
            data = {
                title: 'XLM',
                isMoney: true,
                amount : '3.17',
                percentage: '-0.31',
                link: 'Stellar',
            };
            break;

            case 'btc':
            data = {
                title: 'BTC',
                isMoney: true,
                amount : '2,090,789',
                percentage: '0.18',
                link: 'Bitcoin',
            };
            break;
        default:
            break;

    }


  return (
    <div className='widget'>
        <div className='left'>
            <span className='title'>{data.title}</span>
            <span className='counter'>
                {data.isMoney && '฿'} {data.amount}
            </span>
            <span className='link'>{data.link}</span>
        </div>
        <div className='right'>
            <div className={`percentage ${data.percentage > 0 ? 'positive' : 'negative'}`}>
                {data.percentage > 0 ? (
                        <KeyboardArrowUpIcon />
                    ) : (
                        <KeyboardArrowDownIcon />
                    )}
                    {data.percentage} %
            </div>
        </div>
    </div>
  )
}

export default Widget