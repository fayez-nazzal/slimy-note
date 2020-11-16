import { styled } from '@fayez-nazzal/react-richmon'

export default styled.div`
  border: #cccccc;
  background-color: transparent;
  color: #7eb2cd;
  user-select: none;
  font-size: ${(props: { fontSize: string; css?: string }) => props.fontSize};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: #01c5c4;
  }

  &:active,
  &:focus {
    outline: none;
  }
  ${(props: { fontSize: string; css?: string }) => props.css};
`
