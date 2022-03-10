type Props = {
    children: React.ReactNode;
    reverse?: boolean;
};

const Card: React.FC<Props> = ({ children, reverse = false }) => {
    return <div className={`card ${reverse && 'reverse'}`}>{children}</div>;
};

export default Card;
