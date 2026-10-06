import type { ContactResult, PortfolioContent } from '@/types/content';

/** Everything the engine receives from the server-rendered page. */
export interface EngineProps {
  content: PortfolioContent;
  email: string;
  sendMessage: (form: FormData) => Promise<ContactResult>;
}

/** What the engine needs from the React component that hosts it. */
export interface EngineHost {
  commit(callback?: () => void): void;
}

/**
 * Minimal base for the animation engine: React-like `props` and `state`,
 * with `setState` re-rendering the host component.
 */
export class EngineBase<P extends object, S extends object> {
  props: P;
  state = {} as S;
  host: EngineHost | null = null;

  constructor(props: P) {
    this.props = props;
  }

  setState(update: Partial<S> | ((prev: S) => Partial<S>), callback?: () => void): void {
    const patch = typeof update === 'function' ? update(this.state) : update;
    this.state = { ...this.state, ...patch };
    this.host?.commit(callback);
  }

  forceUpdate(): void {
    this.host?.commit();
  }

  componentDidMount(): void {}
  componentDidUpdate(): void {}
  componentWillUnmount(): void {}
}
