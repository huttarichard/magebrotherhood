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

const eventSteps = {
  sending: {
    title: "sending",
    nextEvent: "transactionHash",
  },
  transactionHash: {
    title: "transactionHash",
    nextEvent: "receipt",
  },
  receipt: {
    title: "receipt",
    nextEvent: null,
  },
};

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
].map((s) => ({
  ...s,
  processing: false,
  done: false,
  error: false,
}));

export default function MintModal({ show, handleClose }) {
  const [steps, setSteps] = useState({ ...eventSteps });

  const { wallet } = useContext(WalletContext);

  const handleError = (error, receipt) => {
    const currentStepIndex = steps.findIndex((s) => s.processing === true);

    if (currentStepIndex === -1) {
      return;
    }

    steps[currentStepIndex].processing = false;
    steps[currentStepIndex].error = true;

    setSteps([...steps]);
  };

  const handleSending = () => {
    steps.sending.processing = false;
    steps.sending.done = true;

    if (steps.sending.nextEvent) {
      steps[steps.sending.nextEvent].processing = true;
    }

    setSteps({ ...steps });
  };

  const handleTransactionHash = (hash) => {
    steps.transactionHash.processing = false;
    steps.transactionHash.done = true;

    if (steps.transactionHash.nextEvent) {
      steps[steps.transactionHash.nextEvent].processing = true;
    }

    setSteps({ ...steps });
  };

  const handleReceipt = () => {
    steps.receipt.processing = false;
    steps.receipt.done = true;

    if (steps.receipt.nextEvent) {
      steps[steps.receipt.nextEvent].processing = true;
    }

    setSteps({ ...steps });
  };

  // const defaultTransactionEventHandler = (eventName) => {
  //   const stepIndex = steps.findIndex((s) => s.eventName === eventName);

  //   steps[stepIndex].processing = false;
  //   steps[stepIndex].done = true;
  //   steps[stepIndex].error = false;

  //   if (stepIndex + 1 < steps.length) {
  //     steps[stepIndex + 1].processing = true;
  //     steps[stepIndex + 1].done = false;
  //     steps[stepIndex + 1].error = false;
  //   }

  //   setSteps([...steps]);
  // };

  const mintMockTest = () => {
    const foo = { ...eventSteps };
    for (const f in foo) {
      foo[f] = {
        ...foo[f],
        processing: false,
        done: false,
        error: false,
      };
    }

    foo.sending.processing = true;

    setSteps(foo);

    wallet.mint({
      callbacks: {
        sending: handleSending,
        transactionHash: handleTransactionHash,
        receipt: handleReceipt,
        // error: handleError,
      },
      quantity: 1,
    });
  };

  if (show) {
    return (
      <ModalBase onClick={handleClose}>
        <ModalWrapper onClick={(e) => e.stopPropagation()}>
          <h2>Mint</h2>
          <StepsWrapper>
            <ul>
              {Object.keys(steps).map((key) => {
                const step = steps[key];

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
