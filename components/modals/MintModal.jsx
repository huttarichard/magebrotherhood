import { useEffect, useState, useContext } from "react";
import styled from "@emotion/styled";
import { WalletContext } from "../../contexts/walletContext";

const ModalBase = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0 2rem;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalWrapper = styled.div`
  position: relative;
  max-width: 400px;
  padding: 3rem 3rem 2rem 3rem;
  background-color: #fff;

  h2 {
    margin: 0 0 2rem;
    text-align: center;
    font-size: 3rem;
  }
`;

const StepsWrapper = styled.div`
  > ul {
    list-style: none;
    padding: 0;
    margin: 0 0 1rem;

    > li {
      &.processing {
        background-color: #75e0db;
      }

      &.done {
        background-color: #a1dd5c;
      }

      &.error {
        background-color: #c76c6c;
      }
    }
  }
`;

const initialSteps = [
  {
    title: "sending",
    eventName: "sending",
  },
  {
    title: "transactionHash",
    eventName: "transactionHash",
  },
  {
    title: "receipt",
    eventName: "receipt",
  },
];

export default function MintModal({ show, handleClose }) {
  const [steps, setSteps] = useState(initialSteps);

  const { wallet } = useContext(WalletContext);

  const handleError = (error, receipt) => {
    console.log(error);

    const currentStepIndex = steps.findIndex((s) => s.processing === true);

    steps[currentStepIndex].processing = false;
    steps[currentStepIndex].error = true;

    setSteps([...steps]);
  };

  const handleTransactionHash = (hash) => {
    const stepIndex = steps.findIndex((s) => s.eventName === "transactionHash");

    steps[stepIndex].processing = false;
    steps[stepIndex].done = true;

    if (stepIndex + 1 < steps.length) {
      steps[stepIndex + 1].processing = true;
      // temp fix
      steps[stepIndex + 1].error = false;
      steps[stepIndex + 1].done = false;
    }

    setSteps([...steps]);
  };

  const defaultTransactionEventHandler = (eventName) => {
    const stepIndex = steps.findIndex((s) => s.eventName === eventName);

    steps[stepIndex].processing = false;
    steps[stepIndex].done = true;

    if (stepIndex + 1 < steps.length) {
      steps[stepIndex + 1].processing = true;
      // temp fix
      steps[stepIndex + 1].error = false;
      steps[stepIndex + 1].done = false;
    }

    setSteps([...steps]);
  };

  const mintMockTest = () => {
    let resetedSteps = initialSteps.map((s) => {
      return {
        ...s,
        processing: false,
        done: false,
        error: false,
      };
    });

    resetedSteps[0].processing = true;
    setSteps(resetedSteps);

    const callbacks = {
      sending: () => defaultTransactionEventHandler("sending"),
      transactionHash: handleTransactionHash,
      receipt: () => defaultTransactionEventHandler("receipt"),
      error: handleError,
    };

    wallet.mint(callbacks);
  };

  if (show) {
    return (
      <ModalBase onClick={handleClose}>
        <ModalWrapper onClick={(e) => e.stopPropagation()}>
          <h2>Mint</h2>
          <StepsWrapper>
            <ul>
              {steps.map((step) => {
                const stepClass = [
                  step.processing ? "processing" : false,
                  step.done ? "done" : false,
                  step.error ? "error" : false,
                ]
                  .filter((s) => !!s)
                  .join(" ");
                return (
                  <li className={stepClass} key={step.title}>
                    <strong>{step.title}</strong>
                    <ul>
                      <li>processing: {step.processing ? "true" : "false"}</li>
                      <li>done: {step.done ? "true" : "false"}</li>
                      <li>error: {step.error ? "true" : "false"}</li>
                    </ul>
                  </li>
                );
              })}
            </ul>
          </StepsWrapper>
          <button onClick={mintMockTest}>Mint mock test</button>
        </ModalWrapper>
      </ModalBase>
    );
  } else {
    return <></>;
  }
}
