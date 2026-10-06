'use client';

import { Component } from 'react';
import { PortfolioEngine } from '@/lib/experience/engine';
import type { EngineHost, EngineProps } from '@/lib/experience/engine-base';
import { Stage } from './Stage';

/**
 * The interactive portfolio. One client component hosts the animation engine,
 * which owns scroll, sound and motion; the sections it renders are plain
 * presentational components fed from the engine's view model.
 */
export class PortfolioExperience extends Component<EngineProps, { version: number }> implements EngineHost {
  state = { version: 0 };
  private engine: PortfolioEngine;

  constructor(props: EngineProps) {
    super(props);
    this.engine = new PortfolioEngine(props);
    this.engine.host = this;
  }

  commit(callback?: () => void): void {
    this.setState((s) => ({ version: s.version + 1 }), callback);
  }

  componentDidMount(): void {
    this.engine.componentDidMount();
  }

  componentDidUpdate(): void {
    this.engine.props = this.props;
    this.engine.componentDidUpdate();
  }

  componentWillUnmount(): void {
    this.engine.componentWillUnmount();
  }

  render() {
    this.engine.props = this.props;
    return <Stage v={this.engine.renderVals()} />;
  }
}
