import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button, Image, Modal, Select, Table} from 'antd';

interface Row {
    key: string
    title: {
        name: string;
        image: string;
    };
    current_price: number;
    circulating_supply: number;
}

type Rows = Row[]

const Currency = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [rows, setRows] = useState<Rows>([]);
    const [currency, setCurrency] = useState<string>('usd')
    const [marketCap, setMarketCap] = useState<string>("market_cap_desc");

    const fetchData = async () => {
        const response =
            await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${marketCap}&per_page=1000&page=1&sparkline=false`)
        // @ts-ignore
        return response.data.map(({id, name, image, current_price, circulating_supply}) => {
            return {
                key: id,
                title: {name, image},
                currentPrice: current_price,
                circulatingSupply: circulating_supply
            }
        });
    }

    useEffect(() => {
        if (open) {
            fetchData()
                .then(rows => {
                    setRows(rows)
                })
                .catch(error => console.log(error));
        }
    }, [currency, marketCap, open]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'title',
            key: 'name',
            // @ts-ignore
            render: (title) => <div className={'ant-flex css-m4timi ant-flex-align-center'}
                                  style={{gap: '16px', display: 'flex'}}>
                <Image alt={title.image} src={title.image} width={32}/>
                <span className={'ant-typography css-m4timi'} style={{marginTop: '0.3rem'}}>{title.name}</span>
            </div>
        },
        {
            title: 'Current Price',
            dataIndex: 'currentPrice',
            key: 'current_price',
            // @ts-ignore
            render: (currentPrice) => <div
                className={"ant-flex css-m4timi ant-flex-align-center"}
                style={{gap: 4}}>
                <span className={"ant-typography css-m4timi"}>{currentPrice}</span>
                <span className={"ant-typography css-m4timi"} style={{marginLeft: '0.5rem'}}>{currency}</span></div>
        },
        {
            title: 'Circulating Supply',
            dataIndex: 'circulatingSupply',
            key: 'circulating_supply'
        }
    ]

    const showModal = () => {
        fetchData()
            .then(rows => {
                setRows(rows)
                setOpen(true);
            })
            .catch(error => console.log(error));

    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Show Coins & Markets
            </Button>
            <Modal width={860}
                   open={open}
                   title="Coins & Markets"
                   onOk={handleOk}
                   onCancel={handleCancel}
                   footer={[
                       <Button key="back" onClick={handleCancel}>
                           Return
                       </Button>,
                       <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                           Submit
                       </Button>,
                       <Button
                           key="link"
                           href="https://google.com"
                           type="primary"
                           loading={loading}
                           onClick={handleOk}
                       >
                           Search on Google
                       </Button>,
                   ]}
            >
                <div className={'ant-flex css-m4timi'} style={{display: 'flex', gap: '24px'}}>
                    <Select onChange={value => setCurrency(value)}
                            defaultValue={'usd'}
                            options={[{value: 'usd', label: 'USD'}, {
                                value: 'eur',
                                label: 'EURO'
                            }]}
                            style={{width: 200}}
                    />
                    <Select onChange={value => setMarketCap(value)}
                            defaultValue={'market_cap_desc'}
                            options={[{value: 'market_cap_asc', label: 'Market cap ascending'}, {
                                value: 'market_cap_desc',
                                label: 'Market cap descending'
                            }]}
                            style={{width: 200}}
                    />
                </div>
                <Table dataSource={rows} columns={columns}/>
            </Modal>
        </>
    );
};

export default Currency;