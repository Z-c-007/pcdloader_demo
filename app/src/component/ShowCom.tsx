
import React from 'react';
import { Card } from 'antd';
import SliderCom from "./SliderCom"
import useSliderStore from "../store/SliderStroe";

const ShowCom: React.FC = () => {
    const sliderValue = useSliderStore((state) => state.SliderValue);
    const formatNumber = useSliderStore((state) => state.formatNumber);

    return (
        <div>
            <SliderCom />
            <Card
                style={{ width: 380, height: 150, display: 'flex', flexDirection: 'column' }}
                cover={
                    <img style={{
                        flex: 1, overflow: 'auto', width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                        draggable={false}
                        alt="example"
                        src={`/public/image_00/data/${formatNumber(sliderValue)}.png`} />
                }
            >
            </Card>
        </div >
    )
}

export default ShowCom