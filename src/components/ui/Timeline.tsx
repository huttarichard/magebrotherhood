import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ReactNode } from "react";

export enum Position {
  Left,
  Right,
}

interface ITimelineItem {
  title: string;
  period?: string;
  desc?: ReactNode;
  position?: Position;
}

interface TimelineProps {
  items: ITimelineItem[];
}

const Wrapper = styled.ul`
  position: relative;
  width: 660px;
  margin: 20px auto 0 auto;
  padding: 1em 0;
  list-style: none;
  z-index: 10;

  &::before {
    content: " ";
    position: absolute;
    left: 50%;
    top: 0;
    display: block;
    width: 6px;
    height: 100%;
    margin-left: -3px;
    background: rgb(80, 80, 80);
    background: linear-gradient(
      to bottom,
      rgba(80, 80, 80, 0) 0%,
      rgb(80, 80, 80) 8%,
      rgb(80, 80, 80) 92%,
      rgba(80, 80, 80, 0) 100%
    );
    z-index: 5;
  }

  @media screen and (max-width: 660px) {
    width: 100%;
    padding: 0em 0 1em 0;
  }
`;

function TimelineItem({ title, period, desc, position }: ITimelineItem) {
  const Item = styled.li`
    padding: 1em 0;

    &::after {
      content: "";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }

    .item-wrapper {
      position: relative;
      width: 300px;
      float: right;
    }

    .flag-wrapper {
      position: relative;
      display: inline-block;
      text-align: center;
    }

    .flag {
      position: relative;
      display: inline;
      background: rgb(248, 248, 248);
      padding: 6px 10px;
      border-radius: 5px;
      font-weight: 600;
      text-align: left;

      &:before {
        content: " ";
        position: absolute;
        top: 50%;
        right: -40px;
        box-sizing: border-box;
        display: block;
        width: 18px;
        height: 18px;
        margin-top: -10px;
        background: #fff;
        border-radius: 10px;
        border: 4px solid rgb(255, 80, 80);
        z-index: 10;
      }
    }

    .time-wrapper {
      display: inline;
      line-height: 1em;
      font-size: 0.66666em;
      color: rgb(250, 80, 80);
      vertical-align: middle;
    }

    .time {
      display: inline-block;
      padding: 4px 6px;
      background: rgb(248, 248, 248);
    }

    .desc {
      margin: 1em 0.75em 0 0;
      font-size: 0.77777em;
      font-style: italic;
      line-height: 1.5em;
      ${({ theme }) => theme.breakpoints.up("sm")} {
        color: white;
      }
    }

    /* left */
    ${position === Position.Left &&
    css`
      text-align: right;

      .item-wrapper {
        float: left;
      }

      .flag {
        box-shadow: -1px 1px 1px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.15);

        &:after {
          content: "";
          position: absolute;
          left: 100%;
          top: 50%;
          height: 0;
          width: 0;
          margin-top: -8px;
          border: solid transparent;
          border-left-color: rgb(248, 248, 248);
          border-width: 8px;
          pointer-events: none;
        }
      }

      .time-wrapper {
        float: left;
      }
    `}

    /* right */
    ${position === Position.Right &&
    css`
      .flag {
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.15);

        &:before {
          left: -40px;
        }

        &:after {
          content: "";
          position: absolute;
          right: 100%;
          top: 50%;
          height: 0;
          width: 0;
          margin-top: -8px;
          border: solid transparent;
          border-right-color: rgb(248, 248, 248);
          border-width: 8px;
          pointer-events: none;
        }
      }

      .time-wrapper {
        float: right;
      }

      .desc {
        margin: 1em 0 0 0.75em;
      }
    `}

    @media screen and (max-width: 660px) {
      padding: 2em 0;

      .item-wrapper {
        float: none;
        width: 100%;
        text-align: center;
      }

      .flag-wrapper {
        text-align: center;
      }

      .flag {
        background: rgb(255, 255, 255);
        z-index: 15;

        &::before {
          position: absolute;
          top: -30px;
          left: 50%;
          content: " ";
          display: block;
          width: 18px;
          height: 18px;
          margin-left: -9px;
          background: #fff;
          border-radius: 10px;
          border: 4px solid ${({ theme }) => theme.primary1};
          z-index: 10;
        }

        &::after {
          content: "";
          position: absolute;
          left: 50%;
          top: -8px;
          height: 0;
          width: 0;
          margin-left: -8px;
          border: solid transparent;
          border-bottom-color: rgb(255, 255, 255);
          border-width: 8px;
          pointer-events: none;
        }
      }

      .time-wrapper {
        display: block;
        position: relative;
        margin: 4px 0 0 0;
        z-index: 14;
      }

      /* left */
      ${position === Position.Left &&
      css`
        .time-wrapper {
          float: none;
        }
      `}

      /* right */
      ${position === Position.Right &&
      css`
        .time-wrapper {
          float: none;
        }
      `}

      .desc {
        position: relative;
        margin: 1em 1em 0 1em;
        padding: 1em;
        background: rgb(245, 245, 245);
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
        z-index: 15;
      }
    }

    @media screen and (min-width: 400px) or (max-width: 660px) {
      .desc {
        margin: 1em 4em 0 4em;
      }
    }
  `;

  return (
    <Item>
      <div className="item-wrapper">
        <div className="flag-wrapper">
          <span className="flag">{title}</span>
          <span className="time-wrapper">
            <span className="time">{period}</span>
          </span>
        </div>
        <div className="desc">{desc}</div>
      </div>
    </Item>
  );
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <Wrapper>
      {items.map((item, i) => {
        const position = item.position || i % 2 ? Position.Left : Position.Right;

        return <TimelineItem {...item} position={position} key={i} />;
      })}
    </Wrapper>
  );
}
