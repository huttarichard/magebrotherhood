import styled from "@emotion/styled";
import { useEffect, useState } from "react";

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

const StepsWrapper = styled.div``;

const mockRequest = ({ delay = 500, success = true, eventName }) => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      if (success) {
        const event = new Event(eventName);
        window.dispatchEvent(event);

        resolve("success");
      } else {
        reject("error");
      }
    }, delay);
  });
};

const initialSteps = [
  {
    title: "step 1",
    processing: false,
    done: false,
    error: false,
    eventName: "event0",
  },
  {
    title: "step 2",
    processing: false,
    done: false,
    error: false,
    eventName: "event1",
  },
  {
    title: "step 3",
    processing: false,
    done: false,
    error: false,
    eventName: "event2",
  },
];

const events = [
  {
    action: mockRequest, // mock only
    actionParams: { delay: 1000, success: true, eventName: "event0" },
  },
  {
    action: mockRequest, // mock only
    actionParams: { delay: 2000, success: true, eventName: "event1" },
  },
  {
    action: mockRequest, // mock only
    actionParams: { delay: 3000, success: true, eventName: "event2" },
  },
];

export default function MintModal({ show, handleClose }) {
  const [steps, setSteps] = useState(initialSteps);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const listener = (e) => {
        const stepIndex = steps.findIndex((s) => s.eventName === e.type);

        console.log(steps[stepIndex]);

        steps[stepIndex].processing = false;
        steps[stepIndex].done = true;

        console.log(steps[stepIndex]);

        setSteps([...steps]);
      };

      for (const e of events) {
        window.removeEventListener(e.actionParams.eventName, listener);
        window.addEventListener(e.actionParams.eventName, listener);
      }
    }
  }, []);

  const mintMockTest = () => {
    steps[0].processing = true;

    setSteps([...steps]);

    for (const event of events) {
      event.action(event.actionParams);
    }
  };

  if (show) {
    console.log("render");

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
                    {step.title} - processing: {step.processing ? "true" : "false"}
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
