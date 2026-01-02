import type { Component } from 'solid-js';

const Header: Component = () => {
    return (
        <header class="sticky top-0 z-50 bg-main-bg">
            <div class="h-16 items-center flex px-6">
                <span class="font-heading text-main-text text-xl">ResumeBuilder</span>
            </div>
        </header>
    )
}

export default Header;