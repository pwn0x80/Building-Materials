import React, { Component } from "react";
export class ErrorBoundary extends Component<any, any> {
  state: {
    hasError: boolean;
    error?: Error;
  };

  constructor(props: any) {
    super(props);

    this.state = {
      hasError: false,
      error: undefined,
    };
  }

  static getDerivedStateFromError(error:any) {
    return {
      hasError: true,
      error: error,
    };
  }

  componentDidCatch(error:any, errorInfo:any) {
    console.log("Error caught!");
  }

  render() {
    if (this.state.hasError) {
      return <h1> errro</h1>;
    } else {
      return this.props.children;
    }
  }
}
