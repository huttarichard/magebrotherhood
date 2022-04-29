import styled from "@emotion/styled";
import { ReactNode } from "react";

interface ITimelineItem {
  title: string;
  period?: string;
  desc?: ReactNode;
}

interface TimelineProps {
  items: ITimelineItem[];
}

const Wrapper = styled.ul`
  position: relative;
  padding: 1em 0;
  list-style: none;
  z-index: 10;

  &::before {
    content: " ";
    position: absolute;
    left: 33px;
    top: 0;
    display: block;
    width: 6px;
    height: 100%;
    margin-left: -3px;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      to bottom,
      rgba(17, 17, 17, 0) 0%,
      rgba(17, 17, 17, 1) 8%,
      rgba(17, 17, 17, 1) 92%,
      rgba(17, 17, 17, 0) 100%
    );
    z-index: 5;
  }

  @media screen and (max-width: 660px) {
    width: 100%;
    padding: 0em 0 1em 0;
  }
`;

const Item = styled.li`
  padding: 1.2em 0 1.2em 4rem;

  &::after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .item-wrapper {
    position: relative;
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
    padding: 16px 20px;
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
      border: 4px solid rgba(17, 17, 17, 1);
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
    font-style: italic;
    line-height: 1.5em;
    ${({ theme }) => theme.breakpoints.up("sm")} {
      color: white;
    }
  }

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

    .time-wrapper {
      float: none;
    }

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

function TimelineItem({ title, period, desc }: ITimelineItem) {
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
        return <TimelineItem {...item} key={i} />;
      })}
    </Wrapper>
  );
}
