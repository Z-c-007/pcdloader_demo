import React from "react";
import type { InputNumberProps } from "antd";
import { Col, InputNumber, Row, Slider, Space } from "antd";
import useSliderStore, { SliderState } from "../store/SliderStroe";
const IntegerStep: React.FC = () => {
    const sliderValue = useSliderStore((state: SliderState) => state.SliderValue);

    const onChange: InputNumberProps["onChange"] = (newValue) => {
        if (typeof newValue === "number") {
            useSliderStore.getState().changeSliderValue(newValue);
        }
    };

    return (
        <div
            style={{
                width: "380px",
                height: "48px",
                top: "7%",
                left: "9px",
                backgroundColor: "#7ec3f1ff",
                borderRadius: "5px",
                padding: "9px",
            }}
        >
            <Row>
                <Col span={12}>
                    <Slider
                        min={0}
                        max={77}
                        onChange={onChange}
                        value={typeof sliderValue === "number" ? sliderValue : 0}
                    />
                </Col>
                <Col span={4}>
                    <InputNumber
                        min={0}
                        max={77}
                        style={{ margin: "0 16px" }}
                        value={sliderValue}
                        onChange={onChange}
                    />
                </Col>
            </Row>
        </div>
    );
};

const SliderCom: React.FC = () => (
    <Space style={{ width: "100%" }} direction="vertical">
        <IntegerStep />
    </Space>
);

export default SliderCom;
