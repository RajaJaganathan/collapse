import "./styles.css";

/* eslint-disable react/no-did-update-set-state */
/* eslint-disable default-case */
import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./styles.css";

export default class Collapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationState: "idle"
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen } = this.props;

    if (isOpen !== nextProps.isOpen) {
      this.setState({
        animationState: "measuring"
      });
      // if (this.state.animationState === "idle" && !nextProps.isOpen) {
      //   this.setState({
      //     animationState: "openingStart",
      //     height: this.heightNode ? this.heightNode.scrollHeight : 0
      //   });
      // }else {

      // }
    }
  }

  componentDidUpdate(prevProps) {
    const { animationState } = this.state;

    //disable-eslint
    switch (animationState) {
      case "idle":
        break;
      case "measuring":
        this.setState({
          animationState: prevProps.isOpen ? "closingStart" : "openingStart",
          height:
            prevProps.isOpen && this.heightNode
              ? this.heightNode.scrollHeight
              : 0
        });
        break;
      case "closingStart":
        this.setState({
          animationState: "closing",
          height: 0
        });
        break;
      case "openingStart":
        this.setState({
          animationState: "opening",
          height: this.heightNode ? this.heightNode.scrollHeight : 0
        });
    }
  }

  componentDidMount() {
    if (this.node === null) {
      return;
    }
    this.node.addEventListener("transitionend", this.handleTransitionEnd);
  }

  componentWillUnmount() {
    if (this.node === null) {
      return;
    }
    this.node.removeEventListener("transitionend", this.handleTransitionEnd);
  }

  handleTransitionEnd = event => {
    const { target } = event;
    if (target === this.node) {
      this.setState({ animationState: "idle", height: null });
    }
  };

  bindNode = node => {
    this.node = node;
  };

  bindHeightNode = node => {
    this.heightNode = node;
  };

  render() {
    const { animationState, height } = this.state;
    const { isOpen, children } = this.props;
    const isAnimating = animationState !== "idle";
    const containerClass = clsx({
      Collapse: true,
      "Collapse--open": isOpen,
      "Collapse--animating": isAnimating,
      "Collapse--fully-open": !isAnimating && isOpen
    });
    const newHeight = collapsibleHeight(isOpen, animationState, height);
    // const icon = this.state.isOpen ? 'chevron-up' : 'chevron-down'
    const content = isAnimating || isOpen ? children : null;
    return (
      <div
        aria-hidden={!isOpen}
        ref={this.bindNode}
        style={{ height: newHeight }}
        className={containerClass}
      >
        <div ref={this.bindHeightNode}>{content}</div>
      </div>
    );
  }
}

Collapse.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool
};

function collapsibleHeight(open, animationState, height) {
  if (animationState === "idle" && open) {
    return open ? "auto" : undefined;
  }

  if (animationState === "measuring") {
    return open ? undefined : "auto";
  }

  return `${height || 0}px`;
}
