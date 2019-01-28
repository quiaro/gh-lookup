import styled from "styled-components";

const DropDownItem = styled.div`
  border-bottom: 1px solid #cbcbcb;
  background: ${props => (props.highlighted ? "#f7f7f7" : "white")};
  padding: 1rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? "padding-left: 2rem;" : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid ${props => (props.highlighted ? "#cbcbcb" : "white")};
`;

export default DropDownItem;
