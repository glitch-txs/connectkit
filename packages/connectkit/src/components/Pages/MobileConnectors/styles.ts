import { css, keyframes } from "styled-components"
import styled from "./../../../styles/styled"
import { CSSProps } from "../../../types"

export const WalletItem = styled.div<{ $waiting?: boolean }>`
  text-align: center;
  transition: opacity 100ms ease;
  opacity: ${(props: CSSProps) => (props.$waiting ? 0.4 : 1)};
`
export const WalletIcon = styled.div<{ $outline?: boolean }>`
  z-index: 9;
  position: relative;
  margin: 0 auto 10px;
  border-radius: 16px;
  width: 60px;
  height: 60px;
  overflow: hidden;
  ${(props: CSSProps) =>
		props.$outline &&
		`
  &:before {
    content: '';
    z-index: 2;
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.04);
  }`}
  svg {
    display: block;
    position: relative;
    width: 100%;
    height: auto;
  }
`
export const WalletLabel = styled.div`
  color: var(--ck-body-color);
  font-size: 13px;
  line-height: 15px;
  font-weight: 500;
  opacity: 0.75;
`

const PulseKeyframes = keyframes`
  0%,100% { opacity:1; }
  50% { opacity:0.5; }
`

export const WalletList = styled.div<{ $disabled?: boolean }>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px 8px;
  margin: 0 -10px -20px;
  padding: 4px 0 0;
  transition: opacity 300ms ease;
  ${(props: CSSProps) =>
		props.$disabled &&
		css`
      pointer-events: none;
      opacity: 0.4;
      ${WalletItem} {
        animation: ${PulseKeyframes} 1s infinite ease-in-out;
      }
    `}
`
export const Container = styled.div``
