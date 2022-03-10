import styled from 'styled-components';

const Header = () => {
    return (
        <HeaderNav>
            <div className="container">
                <h2>My Feedback</h2>
            </div>
        </HeaderNav>
    );
};

const HeaderNav = styled.header`
    background-color: rgba(0, 0, 0.4);
    color: #ff6a95;
`;

export default Header;
