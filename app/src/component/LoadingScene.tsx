import { Flex, Progress } from 'antd';
import type { ProgressProps } from 'antd';

const twoColors: ProgressProps['strokeColor'] = {
    '0%': '#108ee9',
    '100%': '#87d068',
};

const LoadingScene = ({ progress }: { progress: number }) => (
    <Flex vertical gap="middle">
        <Progress percent={progress} strokeColor={twoColors} />
    </Flex>
);

export default LoadingScene;