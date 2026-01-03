import type { Component } from 'solid-js';
import { A } from '@solidjs/router';

const Home: Component = () => {
    return (
        <main class="min-h-screen pt-16 flex flex-col bg-main-bg text-main-text items-center justify-start p-6">
            <h1 class="font-heading text-6xl md:text-8xl text-center leading-tight max-w-none">
                Build a resume that gets you hired.
            </h1>
            <A href="/create">
                <button class="mt-8 px-6 py-3 rounded-lg">
                    CREATE
                </button>
            </A>
        </main>
    )
}

export default Home;