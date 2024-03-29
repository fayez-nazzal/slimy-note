import { styled } from '@fayez-nazzal/react-richmon'

interface ColFlexProps {
  direction: string
  reverse?: boolean
  css?: string
  alignItemsCenter?: boolean
}

export default styled.span`
  display: flex;
  flex-direction: ${(props: ColFlexProps) =>
    props.reverse ? props.direction + '-reverse' : props.direction};
  background-color: #f9f9f9;
  ${(props: ColFlexProps) => props.css}
`
