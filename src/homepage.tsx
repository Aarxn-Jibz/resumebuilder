import type { Component } from 'solid-js';

const Home: Component = () => {
    return (
        <main class="min-h-screen flex flex-col bg-main-bg text-main-text items-center justify-start pt-[10vh] p-6">
            <h1 class="font-heading text-6xl md:text-8xl text-center leading-tight max-w-none">
                Build a resume that gets you hired.
            </h1>

        </main>
    )
}

export default Home;