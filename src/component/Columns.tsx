import styled from 'styled-components'

interface Props {
    variant?: 'space-around' | 'start'
}

const Columns = styled.div<Props>`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: ${props => props.variant === 'start' ? 'flex-start' : 'space-around'};

    & > * {
        flex: ${props => props.variant === 'start' ? '1 1 0' : '0 1 auto'};
    }
`

Columns.defaultProps = {
    variant: 'start'
}

export default Columns
