import type { Component, JSX } from 'solid-js';
import Header from './Header';

const App: Component<{ children?: JSX.Element }> = (props) => {
    return (
        <div class="min-h-screen bg-main-bg">
            <Header />
            {props.children}
        </div>
    );
};

export default App;